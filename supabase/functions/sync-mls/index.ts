import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const MLS_API_KEY = Deno.env.get("MLS_API_KEY")!;
const MLS_API_URL = "https://api.bridgeinteractive.com/api/v1/reso/listings"; // Example for Bridge

type BridgeMedia = {
  MediaURL: string;
};

type BridgeListing = {
  ListingId: string;
  ListType?: string;
  PropertyType?: string;
  StandardStatus?: string;
  ListPrice?: number;
  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  LivingArea?: number;
  UnparsedAddress?: string;
  City?: string;
  SubdivisionName?: string;
  ModificationTimestamp?: string;
  Media?: BridgeMedia[];
};

Deno.serve(async (_req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log("Starting MLS sync...");

    // 1. Fetch from MLS API
    // This is a simplified example. Real MLS APIs often use OData or RETS.
    const res = await fetch(`${MLS_API_URL}?$filter=City eq 'Miami' and ListPrice ge 1000000&$expand=Media`, {
      headers: {
        "Authorization": `Bearer ${MLS_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`MLS API error: ${await res.text()}`);
    }

    const { value: listings } = (await res.json()) as { value: BridgeListing[] };
    console.log(`Fetched ${listings.length} listings from MLS.`);

    // 2. Map and Upsert to Supabase
    for (const item of listings) {
      const { data: listing, error: listingError } = await supabase
        .from("live_listings")
        .upsert({
          mls_id: item.ListingId,
          listing_type: item.ListType === "Rental" ? "rent" : "sale",
          property_type: item.PropertyType === "Residential" ? "house" : "condo",
          status: item.StandardStatus,
          price: item.ListPrice,
          bedrooms: item.BedroomsTotal,
          bathrooms: item.BathroomsTotalInteger,
          sqft: item.LivingArea,
          address: item.UnparsedAddress,
          city: item.City,
          neighborhood: item.SubdivisionName,
          last_mls_update: item.ModificationTimestamp,
        }, { onConflict: "mls_id" })
        .select()
        .single();

      if (listingError) {
        console.error(`Error upserting listing ${item.ListingId}:`, listingError);
        continue;
      }

      // 3. Sync Media
      if (item.Media && item.Media.length > 0) {
        const mediaToInsert = item.Media.map((m, index) => ({
          listing_id: listing.id,
          url: m.MediaURL,
          "order": index,
          is_primary: index === 0,
        }));

        const { error: mediaError } = await supabase
          .from("listing_media")
          .upsert(mediaToInsert, { onConflict: "listing_id, url" });

        if (mediaError) {
          console.error(`Error upserting media for ${item.ListingId}:`, mediaError);
        }
      }
    }

    return new Response(JSON.stringify({ success: true, count: listings.length }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown sync error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
