export type GeographyArea = {
  name: string;
  note: string;
  slug?: string;
};

export type GeographyBand = {
  title: string;
  layer: string;
  signal: string;
  areas: GeographyArea[];
};

export const GEOGRAPHY_BANDS: GeographyBand[] = [
  {
    title: "Northern Luxury Belt",
    layer: "Golden Beach to North Bay Village",
    signal: "Oceanfront towers, private waterfront, and boutique island living.",
    areas: [
      { name: "Golden Beach", note: "Ultra-private oceanfront estates" },
      { name: "Sunny Isles Beach", note: "Branded high-rise corridor", slug: "sunny-isles" },
      { name: "Eastern Shores", note: "Gated waterfront and yacht lifestyle" },
      { name: "Keystone Islands", note: "Canal-front enclave" },
      { name: "Aventura", note: "Residential and retail nucleus", slug: "aventura" },
      { name: "Bal Harbour", note: "Retail and oceanfront luxury", slug: "bal-harbour" },
      { name: "Bay Harbor Islands", note: "Boutique waterfront living", slug: "bay-harbor-islands" },
      { name: "Indian Creek", note: "Private island estate enclave", slug: "indian-creek" },
      { name: "Surfside", note: "Quiet coastal village", slug: "surfside" },
      { name: "North Bay Village", note: "Waterfront redevelopment zone" },
    ],
  },
  {
    title: "Upper Miami Luxury Core",
    layer: "Upper East Side to Edgewater",
    signal: "Historic gates, bayfront towers, creative districts, and design retail.",
    areas: [
      { name: "MiMo District", note: "Boutique hospitality and waterfront culture" },
      { name: "Belle Meade", note: "Gated historic neighborhood" },
      { name: "Morningside", note: "Estate homes and canopy streets" },
      { name: "Upper East Side", note: "Quiet residential corridor" },
      { name: "Design District", note: "Fashion houses and architecture", slug: "design-district" },
      { name: "Midtown Miami", note: "Urban luxury and creative energy", slug: "midtown" },
      { name: "Wynwood", note: "Galleries, dining, and nightlife" },
      { name: "Edgewater", note: "Modern Biscayne Bay towers", slug: "edgewater" },
    ],
  },
  {
    title: "Financial and Urban Elite Core",
    layer: "Downtown to The Roads",
    signal: "Corporate skyline, branded towers, island privacy, and riverfront growth.",
    areas: [
      { name: "Downtown Miami", note: "Corporate towers and branded residences", slug: "downtown-miami" },
      { name: "Miami River", note: "Yacht and residential corridor" },
      { name: "Brickell", note: "Financial district and condo capital", slug: "brickell" },
      { name: "Brickell Key", note: "Private island inside Brickell", slug: "brickell-key" },
      { name: "The Roads", note: "Old Miami residential pocket" },
    ],
  },
  {
    title: "Miami Beach Luxury Axis",
    layer: "Faena to Fisher Island",
    signal: "Beachfront lifestyle, island estates, cultural hospitality, and prime residential pockets.",
    areas: [
      { name: "Faena District", note: "Hospitality-driven cultural corridor" },
      { name: "Sunset Islands", note: "Private island community" },
      { name: "Venetian Islands", note: "Waterfront homes between Miami and Beach" },
      { name: "Palm Island", note: "Gated waterfront mansions" },
      { name: "Hibiscus Island", note: "Elite residential island enclave" },
      { name: "Star Island", note: "Ultra-prime waterfront estates" },
      { name: "West Avenue", note: "Bayfront towers and marina culture" },
      { name: "South Beach", note: "Global tourism and nightlife icon" },
      { name: "SoFi", note: "Ultra-prime residential district", slug: "south-of-fifth" },
      { name: "Fisher Island", note: "Private island luxury" },
    ],
  },
  {
    title: "Coconut Grove and Coral Gables Prestige Belt",
    layer: "The Grove to Snapper Creek Lakes",
    signal: "Canopy streets, Mediterranean estates, private gates, and generational waterfront addresses.",
    areas: [
      { name: "North Grove", note: "Walkable village atmosphere" },
      { name: "Coconut Grove", note: "Tropical old-Miami luxury", slug: "coconut-grove" },
      { name: "South Grove", note: "Secluded estate homes and greenery" },
      { name: "Coral Gables", note: "Mediterranean estates and prestige", slug: "coral-gables" },
      { name: "Gables Estates", note: "Exclusive gated waterfront community" },
      { name: "Journeys End", note: "Ultra-private waterfront mansions" },
      { name: "Snapper Creek Lakes", note: "Gated residential enclave" },
    ],
  },
  {
    title: "Southern Waterfront and Estate Zone",
    layer: "Key Biscayne to Redland",
    signal: "Island resort living, large-lot estates, golf, marina, and canopy-road privacy.",
    areas: [
      { name: "Key Biscayne", note: "Island luxury with resort atmosphere", slug: "key-biscayne" },
      { name: "Pinecrest", note: "Large-lot estate living" },
      { name: "Deering Bay", note: "Golf and marina enclave" },
      { name: "Old Cutler Road Corridor", note: "Historic canopy-road estates" },
      { name: "Palmetto Bay", note: "Upscale suburban waterfront lifestyle" },
      { name: "Cutler Bay", note: "Southern waterfront growth corridor" },
      { name: "Redland", note: "Agricultural estates and hidden compounds" },
    ],
  },
];
