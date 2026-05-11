import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type QueryValue = string | string[] | undefined;

const firstQueryValue = (value: QueryValue) => (Array.isArray(value) ? value[0] : value);

const parsePositiveInt = (value: QueryValue) => {
  const parsed = Number.parseInt(firstQueryValue(value) ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: "Database is not configured" });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const { type, neighborhood, min_beds, max_price, limit = "12" } = req.query;

    const params: Array<string | number> = [];
    const conditions = ["status = 'Active'"];
    const listingType = firstQueryValue(type);
    const neighborhoodValue = firstQueryValue(neighborhood);
    const minBeds = parsePositiveInt(min_beds);
    const maxPrice = parsePositiveInt(max_price);
    const limitValue = Math.min(parsePositiveInt(limit) ?? 12, 50);

    if (listingType === "sale" || listingType === "rent") {
      params.push(listingType);
      conditions.push(`listing_type = $${params.length}`);
    }

    if (neighborhoodValue) {
      params.push(`%${neighborhoodValue}%`);
      conditions.push(`neighborhood ILIKE $${params.length}`);
    }

    if (minBeds) {
      params.push(minBeds);
      conditions.push(`bedrooms >= $${params.length}`);
    }

    if (maxPrice) {
      params.push(maxPrice);
      conditions.push(`price <= $${params.length}`);
    }

    const where = conditions.join(" AND ");
    params.push(limitValue);

    const listings = await sql.query(
      `
      SELECT
        l.*,
        COALESCE(
          json_agg(
            json_build_object('url', m.url, 'order', m."order", 'is_primary', m.is_primary)
            ORDER BY m."order"
          ) FILTER (WHERE m.id IS NOT NULL),
          '[]'
        ) AS media
      FROM live_listings l
      LEFT JOIN listing_media m ON m.listing_id = l.id
      WHERE ${where}
      GROUP BY l.id
      ORDER BY l.created_at DESC
      LIMIT $${params.length}
    `,
      params,
    );

    return res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch listings" });
  }
}
