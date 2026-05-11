import { AREAS } from "@/data/areas";
import { BUILDINGS } from "@/data/buildings";

export type SearchIntent = {
  query: string;
  propertyType?: "condo" | "house";
  minBeds?: number;
  maxPrice?: number;
  location?: string;
};

export const parseSearchQuery = (query: string): SearchIntent => {
  const q = query.toLowerCase();
  const intent: SearchIntent = { query };

  // Property Type Parsing
  if (q.includes("house") || q.includes("home") || q.includes("estate") || q.includes("villa")) {
    intent.propertyType = "house";
  } else if (q.includes("condo") || q.includes("apartment") || q.includes("unit") || q.includes("tower")) {
    intent.propertyType = "condo";
  }

  // Bedroom Parsing (e.g., "3 bed", "4 bedroom")
  const bedMatch = q.match(/(\d+)\s*(?:bed|bd|bedroom)/);
  if (bedMatch) {
    intent.minBeds = parseInt(bedMatch[1]);
  }

  // Price Parsing (e.g., "under 5m", "max 2.5m", "below 800k")
  const priceMatch = q.match(/(?:under|max|below|up to)\s*\$?(\d+(?:\.\d+)?)\s*(m|k)/);
  if (priceMatch) {
    let price = parseFloat(priceMatch[1]);
    const unit = priceMatch[2];
    if (unit === "m") price *= 1_000_000;
    if (unit === "k") price *= 1_000;
    intent.maxPrice = price;
  }

  return intent;
};

export const getSmartSuggestions = (query: string) => {
  const intent = parseSearchQuery(query);
  const q = intent.query.trim().toLowerCase();
  
  if (!q) return [];

  // Filter Areas
  const areaMatches = AREAS.filter(area => 
    area.name.toLowerCase().includes(q) || 
    (area.aliases ?? []).some(a => a.toLowerCase().includes(q))
  ).map(area => ({
    kind: "area" as const,
    slug: area.slug,
    title: area.name,
    sub: area.signature,
    image: area.cardImage ?? area.portraitImage ?? area.image,
    score: area.name.toLowerCase() === q ? 100 : 80
  }));

  // Filter Residences
  const buildingMatches = BUILDINGS.filter(b => {
    const nameMatch = b.name.toLowerCase().includes(q) || 
                     (b.profile?.searchAliases ?? []).some(a => a.toLowerCase().includes(q));
    
    // Apply filters from intent
    if (intent.propertyType && b.propertyType !== intent.propertyType && b.propertyType !== "enclave") return false;
    if (intent.minBeds) {
       const hasEnoughBeds = b.listings.some(l => l.bedrooms >= (intent.minBeds || 0));
       if (!hasEnoughBeds) return false;
    }
    if (intent.maxPrice) {
       if (b.priceRange.saleMin > intent.maxPrice) return false;
    }

    return nameMatch;
  }).map(b => ({
    kind: "building" as const,
    slug: b.slug,
    title: b.name,
    sub: `${b.neighborhood} · ${b.city}`,
    image: b.image,
    score: b.name.toLowerCase() === q ? 95 : 70
  }));

  return [...areaMatches, ...buildingMatches]
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
};
