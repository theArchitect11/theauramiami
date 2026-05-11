import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bath,
  Bed,
  Building2,
  CalendarDays,
  Gem,
  HandCoins,
  Home,
  KeyRound,
  MapPinned,
  Maximize2,
  ShieldCheck,
  TrendingUp,
  Waves,
} from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";
import ConciergeSearchBar from "@/components/aura/ConciergeSearchBar";
import AreaImage from "@/components/aura/AreaImage";
import { AREAS } from "@/data/areas";
import { BUILDINGS, formatPrice, type Building, type Listing } from "@/data/buildings";
import { AuraIntent, buildConsultationPath, buildExplorePath } from "@/lib/intent";

type IntentMode = "buy" | "rent" | "sell";

type IntentPageProps = {
  mode: IntentMode;
};

type Profile = Listing & {
  buildingName: string;
  buildingSlug: string;
  areaSlug?: string;
  neighborhood: string;
  image?: string;
};

const pageContent = {
  buy: {
    eyebrow: "Buy",
    title: "Buy a Miami residence with precision.",
    accent: "precision",
    body: "Move directly to the shortlist: curated buildings, view quality, and market band before private verification begins.",
    intent: "buy",
    profileLabel: "Purchase Units",
    cta: "Request Purchase Match",
    Icon: Home,
  },
  rent: {
    eyebrow: "Rent",
    title: "Lease the right Miami home, not the cluttered feed.",
    accent: "cluttered",
    body: "Compare seasonal and annual lines, then route through private inquiry for current lease availability.",
    intent: "lease",
    profileLabel: "Rental Units",
    cta: "Request Lease Match",
    Icon: KeyRound,
  },
  sell: {
    eyebrow: "Sell",
    title: "Sell your residence with control.",
    accent: "control",
    body: "Start with the address. Then we handle valuation context, buyer fit, and whether a public, private, or off-market path is strongest.",
    intent: "sell",
    profileLabel: "Seller Strategy",
    cta: "Enter Selling Address",
    Icon: HandCoins,
  },
} as const;

const getProfiles = (mode: IntentMode): Profile[] => {
  const listingType = mode === "rent" ? "rent" : "sale";
  const results: Profile[] = [];

  // Helper to extract a representative listing from a building
  const getListing = (building: Building) => {
    const available = building.listings.filter(
      (l) => l.type === listingType && l.status === "Available",
    );
    if (available.length > 0) {
      return {
        ...available[0],
        buildingName: building.name,
        buildingSlug: building.slug,
        areaSlug: building.areaSlug,
        neighborhood: building.neighborhood,
        image: building.image,
      };
    }
    return null;
  };

  // Find 3 condos and 3 houses (if available) for diversity
  const condos = BUILDINGS.filter(
    (building) => building.propertyType === "condo",
  );
  const houses = BUILDINGS.filter(
    (building) =>
      building.propertyType === "house" || building.propertyType === "enclave",
  );

  // Pick some condos
  for (const b of condos) {
    if (results.length >= 3) break;
    const l = getListing(b);
    if (l) results.push(l);
  }

  // Pick some houses
  for (const b of houses) {
    if (results.length >= 6) break;
    const l = getListing(b);
    if (l) results.push(l);
  }

  // Fill up if needed
  if (results.length < 6) {
    for (const b of BUILDINGS) {
      if (results.length >= 6) break;
      if (results.some((r) => r.buildingSlug === b.slug)) continue;
      const l = getListing(b);
      if (l) results.push(l);
    }
  }

  return results;
};

const pageMeta = {
  buy: {
    title: "Buy in Miami | The Aura Miami",
    description:
      "Browse curated purchase listings across Miami's most distinctive waterfront buildings. Private residence matching after inquiry.",
    canonical: "https://theauramiami.com/buy",
  },
  rent: {
    title: "Rent in Miami | The Aura Miami",
    description:
      "Browse lease profiles and seasonal rental listings across Miami's top waterfront buildings. Concierge verification after inquiry.",
    canonical: "https://theauramiami.com/rent",
  },
  sell: {
    title: "Sell in Miami | The Aura Miami",
    description:
      "Get a private seller strategy for your Miami residence. Valuation context, buyer fit, and off-market options through The Aura Miami.",
    canonical: "https://theauramiami.com/sell",
  },
} as const;

const intentArchitecture = {
  buy: [
    { label: "Condo", body: "High-service towers, views, amenities, and resale logic.", icon: Building2, to: "/explore?intent=buy&interest=Condo#areas" },
    { label: "Waterfront Estate", body: "Privacy, dockage, land scarcity, and estate-level fit.", icon: Waves, to: "/explore?intent=buy&interest=Waterfront%20Estate#areas" },
    { label: "New Development", body: "Delivery timing, deposit structure, stack quality, and future supply.", icon: TrendingUp, to: "/explore?intent=buy&interest=New%20Development#areas" },
    { label: "Branded Residence", body: "Service language, design identity, and long-term building relevance.", icon: Gem, to: "/explore?intent=buy&interest=Branded%20Residence#areas" },
    { label: "Investment", body: "Rental logic, carrying cost, liquidity, and exit path.", icon: MapPinned, to: "/explore?intent=buy&interest=Investment#areas" },
  ],
  rent: [
    { label: "Seasonal", body: "Shorter-term lifestyle fit, furnished quality, and current building rules.", icon: CalendarDays, to: "/explore?intent=lease&interest=Seasonal%20Lease#areas" },
    { label: "Annual", body: "Stable lease options with service, commute, school, and building fit.", icon: KeyRound, to: "/explore?intent=lease&interest=Annual%20Lease#areas" },
    { label: "Furnished", body: "Move-in ready residences where condition and design matter.", icon: Home, to: "/explore?intent=lease&interest=Furnished%20Lease#areas" },
    { label: "Waterfront", body: "Bayfront, oceanfront, marina, and island lease positioning.", icon: Waves, to: "/explore?intent=lease&interest=Waterfront%20Lease#areas" },
    { label: "Service-led", body: "Buildings where staff, amenities, parking, and access simplify daily life.", icon: ShieldCheck, to: "/explore?intent=lease&interest=Service%20Building#areas" },
  ],
  sell: [
    { label: "Address Intake", body: "Start with the exact residence so the strategy is specific.", icon: Home, to: "/?intent=sell&interest=Seller%20address%20intake#consultation" },
    { label: "Valuation Context", body: "Read view, line, condition, competing supply, and recent closes.", icon: TrendingUp, to: "/?intent=sell&interest=Valuation%20context#consultation" },
    { label: "Buyer Pool", body: "Identify whether the strongest audience is local, national, or global.", icon: MapPinned, to: "/?intent=sell&interest=Buyer%20pool%20strategy#consultation" },
    { label: "Launch Path", body: "Choose public, private, pre-market, or quiet off-market execution.", icon: ShieldCheck, to: "/?intent=sell&interest=Launch%20path%20strategy#consultation" },
  ],
} as const;

const getTitleParts = (title: string, accent: string) => {
  const start = title.toLowerCase().indexOf(accent.toLowerCase());
  if (start === -1) return { before: title, accentText: "", after: "" };

  return {
    before: title.slice(0, start),
    accentText: title.slice(start, start + accent.length),
    after: title.slice(start + accent.length),
  };
};

const IntentPage = ({ mode }: IntentPageProps) => {
  const content = pageContent[mode];
  const profiles = getProfiles(mode);
  const titleParts = getTitleParts(content.title, content.accent);

  useEffect(() => {
    const meta = pageMeta[mode];
    document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", meta.description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = meta.canonical;

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", meta.canonical);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", meta.title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", meta.description);
  }, [mode]);
  const Icon = content.Icon;
  const exploreMode: AuraIntent =
    mode === "rent" ? "lease" : mode === "sell" ? "sell" : "buy";
  const exploreRoute = buildExplorePath(exploreMode);
  const formUrl = buildConsultationPath(content.intent);
  const architectureCards = intentArchitecture[mode];

  return (
    <main className={`editorial-page ${mode === "sell" ? "editorial-sell-page" : "editorial-intent-page"} min-h-screen bg-background animate-fade-in`}>
      <Navbar />

      <section className="relative pt-32 md:pt-40 pb-14 md:pb-20 border-b border-primary/10 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/6 blur-[90px]" />
        <div className="container mx-auto px-5 sm:px-6 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="eyebrow text-[10px] sm:text-xs">{content.eyebrow}</p>
            </div>
            <h1 className="serif text-5xl sm:text-6xl md:text-7xl leading-[0.98] mb-7">
              {titleParts.before}
              {titleParts.accentText && (
                <span className="italic text-primary">{titleParts.accentText}</span>
              )}
              {titleParts.after}
            </h1>
            <p className="text-foreground/75 text-base md:text-lg leading-relaxed font-light max-w-3xl">
              {content.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={exploreRoute}
                className="inline-flex min-h-12 items-center justify-center px-6 py-4 border border-primary/45 text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-primary"
              >
                Open Area Map
              </Link>
              <Link
                to={formUrl}
                className="inline-flex min-h-12 items-center justify-center px-7 py-4 bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-[0.18em] shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-5px_hsl(var(--gold)/0.7)] sm:tracking-[0.22em]"
              >
                {content.cta}
                <ArrowRight className="w-3.5 h-3.5 ml-2.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/10 py-12 md:py-16">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4 text-[10px] sm:text-xs">
                {mode === "sell" ? "Seller Strategy" : `${content.eyebrow} Paths`}
              </p>
              <h2 className="serif text-3xl leading-tight md:text-5xl">
                {mode === "sell"
                  ? "Start with the address, then choose the launch path."
                  : mode === "rent"
                    ? "Lease by lifestyle, timing, and service."
                    : "Buy by product type, not by random feed."}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              {mode === "sell"
                ? "A seller page should not look like a buyer page. It should explain control, valuation, buyer pool, and launch strategy."
                : "Each card routes into the map with a clearer intent, so the search begins with structure before inventory."}
            </p>
          </div>

          <div className={`grid gap-px border border-primary/14 bg-primary/14 ${
            mode === "sell" ? "md:grid-cols-4" : "md:grid-cols-5"
          }`}>
            {architectureCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.label}
                  to={card.to}
                  className="group min-h-[220px] bg-background p-5 transition-all duration-300 hover:bg-secondary/45 hover:shadow-[inset_0_0_0_1px_hsl(var(--gold)/0.45)] md:p-6"
                >
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-primary/65 transition-transform group-hover:translate-x-1 group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="serif mb-4 text-2xl leading-tight transition-colors group-hover:text-primary">{card.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ConciergeSearchBar placement="inline" />

      {mode === "sell" ? (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="grid lg:grid-cols-[1fr_0.85fr] gap-px bg-primary/12 border border-primary/12">
              <div className="bg-background p-8 md:p-12">
                <p className="eyebrow mb-5 text-[10px] sm:text-xs">Seller Intake</p>
                <h2 className="serif text-4xl md:text-5xl leading-tight mb-6">
                  The first signal is the address.
                </h2>
                <p className="text-muted-foreground leading-relaxed font-light max-w-2xl">
                  Once we know the property, the response can be specific:
                  building, view line, competing inventory, likely buyer segment,
                  rental alternative, and whether the strongest strategy is public,
                  private, or off-market.
                </p>
                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {[
                    "Property address",
                    "Building / neighborhood",
                    "Timeline",
                    "Reason for selling",
                    "Occupancy status",
                    "Public, private, or off-market preference",
                    "Estimated value range",
                    "Seller notes",
                  ].map((item) => (
                    <div
                      key={item}
                      className="border border-primary/12 bg-card/35 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-foreground/70"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background p-8 md:p-12 flex flex-col justify-center">
                <Link
                  to={formUrl}
                  className="group inline-flex min-h-12 items-center justify-center px-8 py-4 bg-gradient-gold text-center text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-5px_hsl(var(--gold)/0.6)] sm:tracking-[0.25em]"
                >
                  {content.cta}
                  <ArrowRight className="w-3.5 h-3.5 ml-3 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="eyebrow mb-4 text-[10px] sm:text-xs">{content.profileLabel}</p>
                <h2 className="serif text-3xl md:text-4xl leading-[1.1]">
                  {mode === "rent" ? "Lease profiles only." : "Purchase profiles only."}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground/70 italic max-w-md">
                These are editorial residence profiles, not live IDX inventory.
                The concierge flow verifies exact availability after inquiry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-px md:bg-primary/15 md:border md:border-primary/15">
              {profiles.map((profile) => (
                <article
                  key={`${profile.buildingSlug}-${profile.id}`}
                  className="bg-background border border-primary/12 md:border-0 flex flex-col group hover:bg-secondary/40 transition-colors duration-500"
                >
                  {profile.image && (
                    <div className="relative overflow-hidden h-44 sm:h-48">
                    <img
                      src={profile.image}
                      alt={profile.buildingName}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.06]"
                    />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.24em] text-primary/80">
                          {mode === "rent" ? "Representative Lease" : "Representative Purchase"}
                        </span>
                        <h3 className="serif text-2xl text-foreground mt-2 leading-tight">
                          {profile.buildingName}
                        </h3>
                        <p className="mt-2 inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/8 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-primary/85">
                          {profile.neighborhood}
                        </p>
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-1 border border-primary/30 text-primary/80">
                        {profile.id}
                      </span>
                    </div>

                    <div className="serif text-4xl md:text-3xl text-foreground leading-tight mb-1">
                      {mode === "rent"
                        ? `$${profile.price.toLocaleString()}/mo`
                        : formatPrice(profile.price)}
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/55 mb-6">
                      {profile.view}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-foreground/80 text-sm font-light mb-8 border-y border-primary/10 py-4">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Bed className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                        {profile.bedrooms} BD
                      </span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Bath className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                        {profile.bathrooms} BA
                      </span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Maximize2 className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                        {profile.sqft.toLocaleString()} sf
                      </span>
                    </div>

                    <Link
                      to={`/building/${profile.buildingSlug}?intent=${content.intent}`}
                      className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 border border-primary/25 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-foreground/80 transition-colors group-hover:border-primary/50 group-hover:text-primary sm:tracking-[0.22em]"
                    >
                      Verify privately
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="areas" className="py-16 md:py-24 border-t border-primary/10">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow mb-4 text-[10px] sm:text-xs">AURA Map</p>
              <h2 className="serif text-3xl md:text-4xl leading-[1.1]">
                Choose the {mode === "sell" ? "seller" : mode} path in context.
              </h2>
            </div>
            <Link
              to={buildExplorePath(content.intent)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary hover:text-foreground transition-colors"
            >
              Open full map <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 px-5 sm:-mx-6 sm:px-6 no-scrollbar">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                to={`/area/${area.slug}?intent=${content.intent}#area-index`}
                className={`group relative shrink-0 overflow-hidden border border-primary/12 bg-card/65 transition-[border-color,transform,box-shadow] duration-300 hover:border-primary/45 hover:shadow-gold ${
                  area.slug === AREAS[0].slug
                    ? "h-[440px] w-[84vw] sm:h-[520px] sm:w-[600px]"
                    : "h-[380px] w-[76vw] sm:h-[500px] sm:w-[430px]"
                }`}
              >
                <AreaImage area={area} className="h-full">
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {(area.lifestyleTags ?? []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/25 bg-background/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-primary backdrop-blur"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </AreaImage>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="serif text-2xl leading-tight group-hover:text-primary transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/55 mt-2">
                        {area.areaType}
                      </p>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-primary/80">
                      {area.buildings.length} buildings
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {area.signature}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IntentPage;
