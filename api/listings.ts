import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const sql = neon(process.env.DATABASE_URL!);

    const { type, neighborhood, min_beds, max_price, limit = "12" } = req.query;

    const conditions = ["status = 'Active'"];
    if (type) conditions.push(`listing_type = '${type}'`);
    if (neighborhood) conditions.push(`neighborhood ILIKE '%${neighborhood}%'`);
    if (min_beds) conditions.push(`bedrooms >= ${parseInt(min_beds as string)}`);
    if (max_price) conditions.push(`price <= ${parseInt(max_price as string)}`);

    const where = conditions.join(" AND ");

    const listings = await sql(`
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
      LIMIT ${parseInt(limit as string)}
    `);

    return res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch listings" });
  }
}
