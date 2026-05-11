import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const sql = neon(process.env.DATABASE_URL!);

    const { q = "", type, max_price, min_beds, limit = "20" } = req.query;
    const query = String(q).trim();

    const results = await sql(`
      SELECT
        l.id,
        l.listing_type,
        l.property_type,
        l.status,
        l.price,
        l.bedrooms,
        l.bathrooms,
        l.sqft,
        l.address,
        l.unit,
        l.city,
        l.neighborhood,
        l.building_name,
        l.created_at,
        (
          SELECT m.url FROM listing_media m
          WHERE m.listing_id = l.id AND m.is_primary = true
          LIMIT 1
        ) AS primary_image
      FROM live_listings l
      WHERE
        l.status = 'Active'
        AND (
          $1 = '' OR
          l.address ILIKE '%' || $1 || '%' OR
          l.neighborhood ILIKE '%' || $1 || '%' OR
          l.building_name ILIKE '%' || $1 || '%' OR
          l.city ILIKE '%' || $1 || '%'
        )
        AND ($2::text IS NULL OR l.listing_type = $2)
        AND ($3::numeric IS NULL OR l.price <= $3)
        AND ($4::integer IS NULL OR l.bedrooms >= $4)
      ORDER BY l.created_at DESC
      LIMIT $5
    `, [
      query,
      type || null,
      max_price ? parseInt(max_price as string) : null,
      min_beds ? parseInt(min_beds as string) : null,
      parseInt(limit as string),
    ]);

    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Search failed" });
  }
}
