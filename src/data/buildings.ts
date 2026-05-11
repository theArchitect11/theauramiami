import { AREAS, type Area } from "./areas";

export type Listing = {
  id: string;
  type: "sale" | "rent";
  propertyType?: "condo" | "house" | "land";
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: string;
  price: number;
  view: string;
  status: "Available" | "Reserved" | "Off-Market";
};

export type BuildingProfile = {
  marketPosition: string;
  residenceMix: string;
  viewProfile: string;
  serviceProfile: string;
  bestFor: string[];
  buyerNotes: string;
  rentalNotes: string;
  sellNotes: string;
  dueDiligence: string[];
  searchAliases: string[];
};

export type Building = {
  slug: string;
  name: string;
  propertyType: "condo" | "house" | "enclave";
  neighborhood: string;
  city: string;
  architect: string;
  year: string;
  stories?: number;
  residences?: number;
  overview: string;
  highlights: string[];
  amenities: string[];
  priceRange: { saleMin: number; saleMax: number; rentMin: number; rentMax: number };
  listings: Listing[];
  image?: string;
  areaSlug?: string;
  isGenerated?: boolean;
  profile?: BuildingProfile;
};

const BASE_BUILDINGS: Building[] = [
  {
    slug: "missoni-baia",
    name: "Missoni Baia",
    propertyType: "condo",
    neighborhood: "East Edgewater",
    city: "Miami",
    architect: "Asymptote Architecture",
    year: "2022",
    stories: 57,
    residences: 249,
    overview:
      "A 57-story bayfront tower designed in collaboration with the Missoni fashion house. Sculpted balconies and panoramic Biscayne Bay views define the silhouette, while a five-pool amenity deck establishes a new standard for resort-style living in Edgewater.",
    highlights: [
      "Direct frontage on Biscayne Bay",
      "Sculptural cantilevered balconies",
      "Interiors styled in collaboration with Missoni",
    ],
    amenities: [
      "Five swimming pools",
      "Bayfront spa and hammam",
      "Tennis and pickleball courts",
      "Children's playroom and teen lounge",
    ],
    priceRange: { saleMin: 1450000, saleMax: 8900000, rentMin: 7500, rentMax: 28000 },
    listings: [
      { id: "MB-2204", type: "sale", propertyType: "condo", bedrooms: 2, bathrooms: 3, sqft: 1620, price: 1850000, view: "Bay & Skyline", status: "Available" },
      { id: "MB-3601", type: "sale", propertyType: "condo", bedrooms: 3, bathrooms: 4, sqft: 2280, price: 3450000, view: "Bay", status: "Available" },
      { id: "MB-PH02", type: "sale", propertyType: "condo", bedrooms: 5, bathrooms: 6, sqft: 4980, price: 8900000, view: "Panoramic Bay", status: "Reserved" },
      { id: "MB-1808", type: "rent", propertyType: "condo", bedrooms: 2, bathrooms: 2, sqft: 1480, price: 9200, view: "City", status: "Available" },
      { id: "MB-4205", type: "rent", propertyType: "condo", bedrooms: 3, bathrooms: 3, sqft: 2110, price: 16500, view: "Bay", status: "Available" },
    ],
  },
  {
    slug: "one-thousand-museum",
    name: "One Thousand Museum",
    propertyType: "condo",
    neighborhood: "Downtown",
    city: "Miami",
    architect: "Zaha Hadid",
    year: "2019",
    stories: 62,
    residences: 83,
    overview:
      "Zaha Hadid's only residential tower in the Western Hemisphere. A flowing exoskeleton, double-height sky lounge, and rooftop helipad define an architectural landmark with a strict limit of 83 residences.",
    highlights: [
      "Designed by Pritzker Prize laureate Zaha Hadid",
      "Limited collection of 83 residences",
      "Private rooftop helipad",
    ],
    amenities: [
      "Double-height sky lounge",
      "Aquatic center with indoor pool and spa",
      "Private bank vault",
      "Concierge by 1000 Group",
    ],
    priceRange: { saleMin: 5800000, saleMax: 24000000, rentMin: 22000, rentMax: 65000 },
    listings: [
      { id: "OTM-3801", type: "sale", propertyType: "condo", bedrooms: 4, bathrooms: 5, sqft: 4630, price: 7900000, view: "Bay & Ocean", status: "Available" },
      { id: "OTM-5202", type: "sale", propertyType: "condo", bedrooms: 5, bathrooms: 6, sqft: 6200, price: 14500000, view: "Panoramic", status: "Available" },
      { id: "OTM-PH01", type: "sale", propertyType: "condo", bedrooms: 6, bathrooms: 8, sqft: 9800, price: 24000000, view: "Full-floor Penthouse", status: "Off-Market" },
      { id: "OTM-2802", type: "rent", propertyType: "condo", bedrooms: 4, bathrooms: 5, sqft: 4500, price: 38000, view: "Bay", status: "Available" },
    ],
  },
  {
    slug: "faena-house",
    name: "Faena House",
    propertyType: "condo",
    neighborhood: "Mid-Beach",
    city: "Miami Beach",
    architect: "Foster + Partners",
    year: "2015",
    stories: 18,
    residences: 47,
    overview:
      "The crown jewel of the Faena District. Tiered wraparound terraces frame ocean and bay views from every residence, while owners enjoy direct access to the Faena Hotel's curated cultural programming and concierge.",
    highlights: [
      "Designed by Foster + Partners",
      "Boutique collection of 47 residences",
      "Full access to Faena Hotel services",
    ],
    amenities: [
      "Oceanfront pool deck and beach club",
      "Tierra Santa Healing House spa",
      "Faena Theater and Forum access",
      "In-residence Faena dining service",
    ],
    priceRange: { saleMin: 6500000, saleMax: 32000000, rentMin: 28000, rentMax: 85000 },
    listings: [
      { id: "FH-901", type: "sale", propertyType: "condo", bedrooms: 3, bathrooms: 4, sqft: 3450, price: 9800000, view: "Ocean", status: "Available" },
      { id: "FH-1402", type: "sale", propertyType: "condo", bedrooms: 4, bathrooms: 5, sqft: 4920, price: 18500000, view: "Ocean & Bay", status: "Available" },
      { id: "FH-PH", type: "sale", propertyType: "condo", bedrooms: 5, bathrooms: 7, sqft: 8273, price: 32000000, view: "Duplex Penthouse", status: "Off-Market" },
      { id: "FH-705", type: "rent", propertyType: "condo", bedrooms: 3, bathrooms: 4, sqft: 3380, price: 42000, view: "Ocean", status: "Available" },
    ],
  },
  {
    slug: "eighty-seven-park",
    name: "Eighty Seven Park",
    propertyType: "condo",
    neighborhood: "North Beach",
    city: "Miami Beach",
    architect: "Renzo Piano",
    year: "2019",
    stories: 18,
    residences: 70,
    overview:
      "Renzo Piano's first residential project in the United States. Set against a private 35,000 sq ft park between the Atlantic and Biscayne Bay, with floor-to-ceiling glass and oceanfront amenities throughout.",
    highlights: [
      "Designed by Pritzker laureate Renzo Piano",
      "Private 35,000 sq ft park",
      "Oceanfront positioning",
    ],
    amenities: [
      "Oceanfront pool and beach club",
      "Spa, sauna and fitness pavilion",
      "Library and screening room",
      "Park-side dining by Quattro Gastronomia",
    ],
    priceRange: { saleMin: 3200000, saleMax: 18000000, rentMin: 14000, rentMax: 48000 },
    listings: [
      { id: "ESP-503", type: "sale", propertyType: "condo", bedrooms: 2, bathrooms: 3, sqft: 1990, price: 3950000, view: "Park & Ocean", status: "Available" },
      { id: "ESP-1101", type: "sale", propertyType: "condo", bedrooms: 4, bathrooms: 5, sqft: 4250, price: 11500000, view: "Ocean", status: "Available" },
      { id: "ESP-902", type: "rent", propertyType: "condo", bedrooms: 3, bathrooms: 4, sqft: 3120, price: 24000, view: "Ocean", status: "Available" },
    ],
  },
  {
    slug: "the-surf-club",
    name: "The Surf Club Four Seasons",
    propertyType: "condo",
    neighborhood: "Surfside",
    city: "Miami Beach",
    architect: "Richard Meier",
    year: "2017",
    stories: 12,
    residences: 119,
    overview:
      "A reimagining of the historic 1930s Surf Club, paired with two Richard Meier towers and full Four Seasons residential service. A rare blend of cultural heritage and contemporary architecture.",
    highlights: [
      "Designed by Pritzker laureate Richard Meier",
      "Four Seasons-managed residences",
      "Historic oceanfront cabanas",
    ],
    amenities: [
      "Four oceanfront pools",
      "Le Sirenuse restaurant by the Sersale family",
      "Surf Club Spa",
      "Private beach club and cabanas",
    ],
    priceRange: { saleMin: 4800000, saleMax: 28000000, rentMin: 18000, rentMax: 75000 },
    listings: [
      { id: "SC-N502", type: "sale", propertyType: "condo", bedrooms: 3, bathrooms: 4, sqft: 2890, price: 7250000, view: "Ocean", status: "Available" },
      { id: "SC-S1101", type: "sale", propertyType: "condo", bedrooms: 4, bathrooms: 5, sqft: 4680, price: 16800000, view: "Direct Ocean", status: "Available" },
      { id: "SC-N305", type: "rent", propertyType: "condo", bedrooms: 3, bathrooms: 4, sqft: 2750, price: 32000, view: "Ocean", status: "Available" },
    ],
  },
  {
    slug: "aston-martin-residences",
    name: "Aston Martin Residences",
    propertyType: "condo",
    neighborhood: "Downtown Riverfront",
    city: "Miami",
    architect: "Bodas Miani Anger / Revuelta",
    year: "2024",
    stories: 66,
    residences: 391,
    overview:
      "A sail-shaped 66-story tower at the mouth of the Miami River. Aston Martin's first branded residential project in the world, paired with a private superyacht marina and signature design details.",
    highlights: [
      "Aston Martin's first branded residential tower",
      "Private superyacht marina access",
      "Sky-level infinity pool",
    ],
    amenities: [
      "Sky-level infinity pool and spa",
      "Art gallery and cigar lounge",
      "Two-story fitness and wellness center",
      "Private superyacht marina",
    ],
    priceRange: { saleMin: 1900000, saleMax: 59000000, rentMin: 9500, rentMax: 65000 },
    listings: [
      { id: "AM-2305", type: "sale", propertyType: "condo", bedrooms: 2, bathrooms: 3, sqft: 1740, price: 2450000, view: "River & Bay", status: "Available" },
      { id: "AM-4801", type: "sale", propertyType: "condo", bedrooms: 4, bathrooms: 5, sqft: 4120, price: 9800000, view: "Bay & Ocean", status: "Available" },
      { id: "AM-PH", type: "sale", propertyType: "condo", bedrooms: 7, bathrooms: 8, sqft: 19200, price: 59000000, view: "Triplex Penthouse", status: "Off-Market" },
      { id: "AM-1908", type: "rent", propertyType: "condo", bedrooms: 2, bathrooms: 2, sqft: 1620, price: 11500, view: "River", status: "Available" },
      { id: "AM-3502", type: "rent", propertyType: "condo", bedrooms: 3, bathrooms: 4, sqft: 2480, price: 22000, view: "Bay", status: "Available" },
    ],
  },
  {
    slug: "indian-creek-estate",
    name: "Indian Creek Estate",
    propertyType: "house",
    neighborhood: "Indian Creek Island",
    city: "Indian Creek",
    architect: "Kobi Karp",
    year: "Curated",
    overview: "A custom waterfront estate on Indian Creek Island.",
    highlights: ["Exclusive Island", "Waterfront"],
    amenities: ["Private Dock", "Pool"],
    priceRange: { saleMin: 45000000, saleMax: 120000000, rentMin: 150000, rentMax: 300000 },
    listings: [
      { id: "ICE-01", type: "sale", propertyType: "house", bedrooms: 7, bathrooms: 10, sqft: 16000, price: 68000000, view: "Biscayne Bay", status: "Available" },
    ],
  },
  {
    slug: "gables-estate-waterfront",
    name: "Gables Estates Waterfront",
    propertyType: "house",
    neighborhood: "Gables Estates",
    city: "Coral Gables",
    architect: "Ramon Pacheco",
    year: "Curated",
    overview: "A classical Mediterranean masterpiece in Gables Estates.",
    highlights: ["Direct Bay Access", "No Fixed Bridges"],
    amenities: ["Private Dock", "Tennis Court"],
    priceRange: { saleMin: 25000000, saleMax: 85000000, rentMin: 80000, rentMax: 200000 },
    listings: [
      { id: "GE-01", type: "sale", propertyType: "house", bedrooms: 6, bathrooms: 8, sqft: 12500, price: 35000000, view: "Waterway & Bay", status: "Available" },
    ],
  },
];

const areaPriceGuides: Record<
  string,
  { saleMin: number; saleMax: number; rentMin: number; rentMax: number }
> = {
  "sunny-isles": { saleMin: 1800000, saleMax: 22000000, rentMin: 9000, rentMax: 60000 },
  "bal-harbour": { saleMin: 2200000, saleMax: 26000000, rentMin: 11000, rentMax: 70000 },
  "bay-harbor-islands": { saleMin: 850000, saleMax: 9000000, rentMin: 4500, rentMax: 28000 },
  aventura: { saleMin: 650000, saleMax: 14000000, rentMin: 3800, rentMax: 35000 },
  brickell: { saleMin: 950000, saleMax: 12000000, rentMin: 5500, rentMax: 38000 },
  "brickell-key": { saleMin: 850000, saleMax: 11000000, rentMin: 5200, rentMax: 36000 },
  edgewater: { saleMin: 900000, saleMax: 10000000, rentMin: 5000, rentMax: 30000 },
  "design-district": { saleMin: 1400000, saleMax: 14000000, rentMin: 7000, rentMax: 42000 },
  midtown: { saleMin: 650000, saleMax: 3500000, rentMin: 3800, rentMax: 16000 },
  "south-of-fifth": { saleMin: 1500000, saleMax: 25000000, rentMin: 8000, rentMax: 65000 },
  "mid-beach-faena": { saleMin: 1400000, saleMax: 32000000, rentMin: 8000, rentMax: 85000 },
  surfside: { saleMin: 1800000, saleMax: 30000000, rentMin: 9000, rentMax: 75000 },
  "downtown-miami": { saleMin: 800000, saleMax: 18000000, rentMin: 4500, rentMax: 45000 },
  "coconut-grove": { saleMin: 1200000, saleMax: 16000000, rentMin: 7000, rentMax: 42000 },
  "key-biscayne": { saleMin: 900000, saleMax: 18000000, rentMin: 5500, rentMax: 45000 },
};

const baseBuildingProfiles: Record<string, BuildingProfile> = {
  "missoni-baia": {
    marketPosition:
      "Design-led bayfront tower in Edgewater with strong brand recognition and a resort-style amenity story.",
    residenceMix:
      "Mostly larger two- to four-bedroom residences, with select penthouse and high-floor lines positioned around bay exposure.",
    viewProfile:
      "Best lines face Biscayne Bay, Miami Beach, and the Downtown skyline; lower lines should be checked carefully for neighboring tower impact.",
    serviceProfile:
      "Condo service and amenity depth rather than hotel-managed service; strong fit for buyers who want design identity without South Beach energy.",
    bestFor: ["Design buyer", "Bayfront lifestyle", "International owner", "Amenity depth"],
    buyerNotes:
      "Compare line, floor height, bay exposure, balcony depth, and monthly carrying cost before deciding between Missoni Baia and Paraiso/Elysee alternatives.",
    rentalNotes:
      "Premium furnished leases can perform well when the residence has open bay views and clean designer presentation.",
    sellNotes:
      "The strongest resale story is photography, view proof, furnishing quality, and the Missoni brand/design narrative.",
    dueDiligence: ["Verify current association budget and reserves", "Confirm rental rules", "Review view corridor and nearby development exposure"],
    searchAliases: ["Missoni", "Missoni Edgewater", "Missoni Miami", "Missoni Baia Miami"],
  },
  "one-thousand-museum": {
    marketPosition:
      "Architectural landmark with global recognition, limited inventory, and one of Miami's clearest trophy-tower identities.",
    residenceMix:
      "Large half-floor, full-floor, and penthouse-style residences built for privacy, volume, and collector-level ownership.",
    viewProfile:
      "Bay, Museum Park, ocean, PortMiami, and Downtown views; exposure and elevation materially change the experience.",
    serviceProfile:
      "High-touch luxury condominium service with a private-club feeling and a strong architectural ownership story.",
    bestFor: ["Architecture collector", "Trophy residence", "Privacy", "Downtown landmark"],
    buyerNotes:
      "This is a conviction purchase: compare floor plan scale, elevator privacy, view exposure, and long-term landmark scarcity.",
    rentalNotes:
      "Lease demand is narrower but premium; strongest for fully finished large residences with flexible timing.",
    sellNotes:
      "Resale should lead with Zaha Hadid, limited residence count, view drama, and interior scale.",
    dueDiligence: ["Study comparable full-floor trades", "Review building financials", "Confirm parking, storage, and service inclusions"],
    searchAliases: ["1000 Museum", "One Thousand Museum", "Zaha Hadid Miami"],
  },
  "faena-house": {
    marketPosition:
      "Boutique oceanfront icon inside the Faena District, combining architecture, hotel culture, and deep scarcity.",
    residenceMix:
      "Large oceanfront residences with wraparound terraces, limited turnover, and a small-building ownership profile.",
    viewProfile:
      "Direct ocean is the hero; bay and city orientation can add sunset value depending on the line.",
    serviceProfile:
      "Hotel-adjacent lifestyle with access to Faena's cultural and hospitality ecosystem.",
    bestFor: ["Oceanfront icon", "Boutique scarcity", "Hotel culture", "Design collector"],
    buyerNotes:
      "Inventory is limited, so compare actual line quality more than headline price. Terrace depth and privacy are central.",
    rentalNotes:
      "Premium leases depend heavily on finish, furniture, and seasonality; verify rules before underwriting.",
    sellNotes:
      "Lead with scarcity, Faena District lifestyle, Foster + Partners architecture, and direct ocean terrace living.",
    dueDiligence: ["Confirm lease restrictions", "Review recent boutique oceanfront comps", "Verify hotel/service access details"],
    searchAliases: ["Faena", "Faena House", "Faena Miami Beach"],
  },
  "eighty-seven-park": {
    marketPosition:
      "Renzo Piano oceanfront building at the edge of North Beach, positioned around park adjacency and quiet design luxury.",
    residenceMix:
      "Low-density residences with glass, terraces, and an emphasis on indoor-outdoor living.",
    viewProfile:
      "Ocean, park, and coastline views; stack and height matter because the building is intentionally lower scale.",
    serviceProfile:
      "Quiet luxury service profile, more residential and design-focused than hotel-branded.",
    bestFor: ["Quiet oceanfront", "Design architecture", "Park setting", "Long-term lifestyle"],
    buyerNotes:
      "Best for buyers who want Miami Beach without South Beach density. Compare park adjacency, line, and beach approach.",
    rentalNotes:
      "Lease appeal is strongest for refined furnished residences and longer-term lifestyle tenants.",
    sellNotes:
      "Resale narrative should emphasize Renzo Piano, private park setting, and oceanfront calm.",
    dueDiligence: ["Verify building reserve posture", "Review beach/park maintenance context", "Confirm rental and pet rules"],
    searchAliases: ["87 Park", "Eighty Seven Park", "Renzo Piano Miami"],
  },
  "the-surf-club": {
    marketPosition:
      "Heritage oceanfront address with Four Seasons service, historic cachet, and a rare Surfside luxury identity.",
    residenceMix:
      "A mix of tower residences and larger private homes, generally positioned around direct service and oceanfront access.",
    viewProfile:
      "Direct ocean and beach club proximity are core; tower, stack, and historic-club orientation should be compared carefully.",
    serviceProfile:
      "Four Seasons-managed residential service with hotel, dining, spa, and beach club advantages.",
    bestFor: ["Four Seasons service", "Heritage address", "Oceanfront", "Discreet luxury"],
    buyerNotes:
      "The value logic is service plus scarcity. Compare tower, line, privacy, and hotel proximity before choosing.",
    rentalNotes:
      "Premium leases can command strong attention, but service rules and timing need verification.",
    sellNotes:
      "The strongest story is Four Seasons service, Surf Club history, and direct oceanfront lifestyle.",
    dueDiligence: ["Confirm service fees and inclusions", "Review hotel/residential access rules", "Verify current rental policy"],
    searchAliases: ["Surf Club", "Four Seasons Surf Club", "Surf Club Residences"],
  },
  "aston-martin-residences": {
    marketPosition:
      "Branded downtown waterfront tower at the Miami River mouth with strong international recognition and large-scale amenities.",
    residenceMix:
      "Broad mix from smaller branded residences to dramatic upper-floor and penthouse inventory.",
    viewProfile:
      "River, bay, ocean, and skyline exposures vary widely; upper floors and corner lines carry the strongest story.",
    serviceProfile:
      "Branded luxury condominium with expansive wellness, entertainment, and marina-facing lifestyle positioning.",
    bestFor: ["Branded residence", "Downtown waterfront", "Investor visibility", "Amenity scale"],
    buyerNotes:
      "Compare line, floor, completion/finish package, and carrying costs against other branded Downtown and Brickell options.",
    rentalNotes:
      "Rental interest is helped by brand recognition and location, but verify lease rules and furnishing expectations.",
    sellNotes:
      "Resale should use brand identity, water position, skyline views, and amenity scale as the core narrative.",
    dueDiligence: ["Verify current developer/resale spread", "Review association budget", "Confirm parking, storage, and rental restrictions"],
    searchAliases: ["Aston Martin", "Aston Martin Miami", "Aston Martin Residences"],
  },
};

const cityForArea = (area: Area) => {
  if (["Aventura", "Bal Harbour", "Bay Harbor Islands", "Key Biscayne", "Surfside"].includes(area.name)) return area.name;
  if (["Mid-Beach / Faena", "South of Fifth", "Sunny Isles"].includes(area.name)) return "Miami Beach";
  return "Miami";
};

const profileForArea = (name: string, area: Area, _index: number): BuildingProfile => {
  const aliases = [name];

  return {
    marketPosition: `${name} is an address within AURA's ${area.name} collection.`,
    residenceMix: "Likely to include a mix of luxury residence profiles.",
    viewProfile: "Views vary by floor and stack; verified privately.",
    serviceProfile: "Service and amenities specific to building management.",
    bestFor: [
      `${area.name} lifestyle`,
      area.propertyType === "estate" ? "Private ownership" : "Building comparison",
      "AURA-guided shortlist",
    ],
    buyerNotes: "Compare against neighborhood alternatives.",
    rentalNotes: "Verify lease policies.",
    sellNotes: "Focus on building recognition and line quality.",
    dueDiligence: [
      "Confirm current status and availability",
      "Review carrying costs, rules, and rental policy",
      "Verify line, view exposure, and comparable trades",
    ],
    searchAliases: aliases,
  };
};

const buildingCode = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part.replace(/[^a-z0-9]/gi, "")[0])
    .filter(Boolean)
    .join("")
    .slice(0, 4)
    .toUpperCase();

const hasBaseBuilding = (name: string) =>
  BASE_BUILDINGS.some((b) => {
    const areaName = name.toLowerCase();
    const baseName = b.name.toLowerCase();
    return areaName.includes(baseName) || baseName.includes(areaName);
  });

const createGeneratedBuilding = (name: string, area: Area, index: number): Building => {
  const guide = areaPriceGuides[area.slug] ?? areaPriceGuides.brickell;
  const code = buildingCode(name);
  const saleStep = Math.round((guide.saleMax - guide.saleMin) / 5);
  const rentStep = Math.round((guide.rentMax - guide.rentMin) / 5);
  const saleOne = guide.saleMin + saleStep;
  const saleTwo = guide.saleMin + saleStep * 2;
  const saleThree = guide.saleMin + saleStep * 4;
  const rentOne = guide.rentMin + rentStep;
  const rentTwo = guide.rentMin + rentStep * 3;

  const isHouse = 
    name.toLowerCase().includes("estates") || 
    name.toLowerCase().includes("villas") || 
    name.toLowerCase().includes("homes") ||
    name.toLowerCase().includes("residence") ||
    (area.propertyType === "estate" && !name.toLowerCase().includes("tower") && !name.toLowerCase().includes("condo"));

  const propertyType = isHouse ? "house" : "condo";

  return {
    slug: slugifyBuilding(name),
    name,
    propertyType,
    neighborhood: area.name,
    city: cityForArea(area),
    architect: isHouse ? "Custom / Signature" : "Private brief",
    year: "Curated",
    stories: isHouse ? 2 : 18 + ((index * 7) % 45),
    residences: isHouse ? 1 : 60 + ((index * 37) % 280),
    overview: isHouse 
      ? `${name} represents a signature estate residence within our ${area.name} collection. This dossier provides a market orientation: exact lot size, waterfront frontage, and interior specifications are verified privately.`
      : `${name} is part of The Aura Miami's private ${area.name} building guide.`,
    highlights: isHouse ? [
      "Private estate orientation",
      "Lot size and frontage verification",
    ] : [
      `${area.signature} positioning`,
      "Private match review after inquiry",
    ],
    amenities: isHouse ? [
      "Private pool and grounds",
      "Security and privacy profile",
    ] : [
      "Concierge-style inquiry routing",
      "Curated residence profile review",
    ],
    profile: profileForArea(name, area, index),
    priceRange: guide,
    image: area.image,
    areaSlug: area.slug,
    isGenerated: true,
    listings: [
      { id: `${code}-P2`, type: "sale", propertyType, bedrooms: 2 + (isHouse ? 3 : 0), bathrooms: 2 + (isHouse ? 3 : 0), sqft: (isHouse ? 4500 : 1350) + index * 35, price: saleOne, view: "City & Water Profile", status: "Available", lotSize: isHouse ? "12,500 SF" : undefined },
      { id: `${code}-P3`, type: "sale", propertyType, bedrooms: 3 + (isHouse ? 3 : 0), bathrooms: 3 + (isHouse ? 3 : 0), sqft: (isHouse ? 6500 : 2100) + index * 45, price: saleTwo, view: "Signature Line Profile", status: "Available", lotSize: isHouse ? "18,000 SF" : undefined },
      { id: `${code}-PH`, type: "sale", propertyType, bedrooms: 4 + (isHouse ? 4 : 0), bathrooms: 5 + (isHouse ? 4 : 0), sqft: (isHouse ? 9500 : 3600) + index * 90, price: saleThree, view: "Penthouse Profile", status: "Off-Market", lotSize: isHouse ? "35,000 SF" : undefined },
      { id: `${code}-L2`, type: "rent", propertyType, bedrooms: 2 + (isHouse ? 2 : 0), bathrooms: 2 + (isHouse ? 2 : 0), sqft: (isHouse ? 4000 : 1250) + index * 30, price: rentOne, view: "Seasonal Lease Profile", status: "Available" },
      { id: `${code}-L3`, type: "rent", propertyType, bedrooms: 3 + (isHouse ? 3 : 0), bathrooms: 3 + (isHouse ? 3 : 0), sqft: (isHouse ? 6000 : 2050) + index * 40, price: rentTwo, view: "Annual Lease Profile", status: "Available" },
    ],
  };
};

const withAreaImage = (building: Building): Building => {
  const area = AREAS.find((candidate) =>
    candidate.buildings.some((name) => {
      const candidateName = name.toLowerCase();
      const buildingName = building.name.toLowerCase();
      return candidateName.includes(buildingName) || buildingName.includes(candidateName);
    }),
  );

  return {
    ...building,
    image: building.image ?? area?.image,
    areaSlug: building.areaSlug ?? area?.slug,
    profile:
      building.profile ??
      baseBuildingProfiles[building.slug] ??
      (area ? profileForArea(building.name, area, 0) : undefined),
  };
};

const GENERATED_BUILDINGS = AREAS.flatMap((area) =>
  area.buildings
    .filter((name) => !hasBaseBuilding(name))
    .map((name, index) => createGeneratedBuilding(name, area, index)),
);

export const BUILDINGS: Building[] = [
  ...BASE_BUILDINGS.map(withAreaImage),
  ...GENERATED_BUILDINGS,
];

export const getBuildingBySlug = (slug: string) =>
  BUILDINGS.find((b) => b.slug === slug);

export const formatPrice = (n: number) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
};

export function slugifyBuilding(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
