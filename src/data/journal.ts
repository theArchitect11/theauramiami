import balHarbour from "@/assets/areas/bal-harbour.jpg";
import brickell from "@/assets/areas/brickell.jpg";
import designDistrict from "@/assets/areas/design-district.jpg";
import downtownMiami from "@/assets/areas/downtown-miami.jpg";
import edgewater from "@/assets/areas/edgewater.jpg";
import surfside from "@/assets/areas/surfside.jpg";

export type JournalArticle = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  image: string;
  readTime: string;
  signal: string;
  date: string;
};

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "miami-worldcenter-new-downtown-gravity",
    category: "Market Notes",
    title: "Miami Worldcenter and the new downtown gravity",
    dek: "A look at how culture, hospitality, transit, and new towers are reshaping Downtown Miami into a more complete residential core.",
    image: downtownMiami,
    readTime: "5 min read",
    signal: "New development",
    date: "May 2026",
  },
  {
    slug: "design-district-buying-signal",
    category: "Neighborhood Culture",
    title: "The Design District as a buying signal",
    dek: "Why proximity to galleries, maisons, restaurants, and collectible design can change how a residence is experienced beyond the floor plan.",
    image: designDistrict,
    readTime: "4 min read",
    signal: "Culture map",
    date: "April 2026",
  },
  {
    slug: "branded-residences-identity-systems",
    category: "Architecture",
    title: "Branded towers are becoming identity systems",
    dek: "From Missoni Baia to Aston Martin and Cipriani, the strongest buildings now sell a visual language, service rhythm, and lifestyle point of view.",
    image: edgewater,
    readTime: "6 min read",
    signal: "Design lens",
    date: "April 2026",
  },
  {
    slug: "private-interiors-after-closing",
    category: "Design Collaboration",
    title: "Private interiors after the closing",
    dek: "How Aura can connect buyers with interior designers, architects, art advisors, and staging partners once the right residence is found.",
    image: balHarbour,
    readTime: "3 min read",
    signal: "Partner network",
    date: "March 2026",
  },
  {
    slug: "brochures-to-buyer-intelligence",
    category: "Development Briefs",
    title: "Turning brochures into buyer intelligence",
    dek: "A smarter way to read developer materials: stack plans, exposure, amenity depth, delivery risk, resale logic, and lifestyle fit.",
    image: brickell,
    readTime: "5 min read",
    signal: "Private brief",
    date: "March 2026",
  },
  {
    slug: "waterfront-living-by-mood",
    category: "The Aura Edit",
    title: "Waterfront living by mood, not map pin",
    dek: "A curated comparison of Bal Harbour, Surfside, Sunny Isles, Edgewater, and South of Fifth for buyers who know the feeling before the address.",
    image: surfside,
    readTime: "7 min read",
    signal: "Curated guide",
    date: "February 2026",
  },
];

export const JOURNAL_CATEGORIES = [
  "Market Notes",
  "Neighborhood Culture",
  "Architecture",
  "Design Collaboration",
  "Development Briefs",
  "The Aura Edit",
];
