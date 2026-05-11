import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  Bed,
  Building2,
  Gem,
  HandCoins,
  KeyRound,
  MapPin,
  Maximize2,
  Sparkles,
  Waves,
} from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";
import ConciergeSearchBar from "@/components/aura/ConciergeSearchBar";
import AreaImage from "@/components/aura/AreaImage";
import { getAreaBySlug, AREAS } from "@/data/areas";
import { BUILDINGS, formatPrice, type Building, type Listing } from "@/data/buildings";
import { buildConsultationPath, buildExplorePath, normalizeIntent } from "@/lib/intent";

type AreaProfile = Listing & {
  buildingName: string;
  buildingSlug: string;
};

const matchByKeywords = (buildings: string[], keywords: string[], limit = 4) => {
  const normalizedKeywords = keywords.map((keyword) => keyword.toLowerCase());
  return buildings
    .filter((building) =>
      normalizedKeywords.some((keyword) => building.toLowerCase().includes(keyword)),
    )
    .slice(0, limit);
};

const fillBuildings = (primary: string[], fallback: string[], limit = 4) => {
  const merged = [...primary, ...fallback].filter(
    (building, index, all) => all.indexOf(building) === index,
  );
  return merged.slice(0, limit);
};

const AreaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const area = slug ? getAreaBySlug(slug) : undefined;

  useEffect(() => {
    if (!area) return;

    document.title = `${area.name}, Miami | The Aura Miami`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", `Explore ${area.name} residences — buildings, price ranges, lifestyle, and private inquiry through The Aura Miami.`);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://theauramiami.com/area/${area.slug}`;
    const areaDesc = `Explore ${area.name} residences — buildings, price ranges, lifestyle, and private inquiry through The Aura Miami.`;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", `${area.name}, Miami | The Aura Miami`);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", areaDesc);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", `${area.name}, Miami | The Aura Miami`);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", areaDesc);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://theauramiami.com/area/${area.slug}`);
  }, [area]);

  useEffect(() => {
    if (!area || !location.hash) return;

    const hash = location.hash.replace(/^#/, "");
    const target = document.getElementById(hash);

    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [area, location.hash]);

  if (!area) {
    return (
      <main className="editorial-page editorial-area-page min-h-screen bg-background animate-fade-in">
        <Navbar />
        <section className="container mx-auto px-6 pt-40 pb-32 text-center">
          <p className="eyebrow mb-6">Not Found</p>
          <h1 className="serif text-4xl md:text-5xl mb-6">
            Area not in our index.
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary hover:text-primary-glow transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Return Home
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const currentIntent = normalizeIntent(new URLSearchParams(location.search).get("intent"));
  const isLease = currentIntent === "lease" || currentIntent === "rent";
  const isSell = currentIntent === "sell";

  // Match curated names against detailed building data, where present
  const detailed = area.buildings.map((name) => {
    const match = BUILDINGS.find((b) =>
      name.toLowerCase().includes(b.name.toLowerCase())
    );
    return { name, slug: match?.slug, architect: match?.architect, building: match };
  });

  const areaBuildings = detailed
    .map((item) => item.building)
    .filter((building): building is Building => Boolean(building));
  const activeProfiles: AreaProfile[] = areaBuildings
    .flatMap((building) =>
      building.listings
        .filter((listing) => listing.type === (isLease ? "rent" : "sale"))
        .map((listing) => ({
          ...listing,
          buildingName: building.name,
          buildingSlug: building.slug,
        })),
    )
    .slice(0, 6);
  const otherAreas = AREAS.filter((a) => a.slug !== area.slug).slice(0, 3);
  const areaInquiryUrl = buildConsultationPath(currentIntent, {
    interest: isSell ? `Selling in ${area.name}` : area.name,
    area: area.name,
  });
  const areaExploreLink = buildExplorePath(currentIntent);
  const pageMode = isSell ? "sell" : isLease ? "rent" : "buy";
  const profileTitle =
    pageMode === "rent"
      ? "Lease profiles in this area"
      : pageMode === "sell"
        ? `Selling in ${area.name}`
        : "Purchase profiles in this area";
  const profileBody =
    pageMode === "rent"
      ? "Only lease examples are shown here. Exact rental availability is verified privately after inquiry."
      : pageMode === "sell"
        ? "Start with the address you may sell. We can route the request for a private valuation and positioning conversation."
        : "Only purchase examples are shown here. Exact sale availability is verified privately after inquiry.";
  const signatureBuildings = area.buildings.slice(0, 4);
  const lifestyleSignal = area.lifestyleTags?.slice(0, 3).join(", ") || area.signature;
  const areaFitCards = [
    {
      label: "Buyer Fit",
      body: `${area.name} works for buyers who value ${lifestyleSignal.toLowerCase()} and want the area decision clarified before comparing buildings or residences.`,
    },
    {
      label: "Rental Fit",
      body: `Lease clients should use ${area.name} to compare lifestyle rhythm, service expectations, commute pattern, furnishing quality, and current building rules.`,
    },
    {
      label: "Seller Signal",
      body: `Owners need a read on competing inventory, buyer pool, view or lot advantage, and whether the residence is better positioned publicly, privately, or off-market.`,
    },
    {
      label: "Signature Buildings",
      body: signatureBuildings.length
        ? signatureBuildings.join(", ")
        : "The strongest address list is verified privately after the area strategy is clear.",
    },
    {
      label: "Market Notes",
      body: `${area.name} is treated as a ${area.areaType?.toLowerCase() || "Miami luxury"} layer inside the broader ${area.regionGroup || "Miami"} map, not as a generic search zone.`,
    },
    {
      label: "Inquiry CTA",
      body: "After inquiry, AURA routes the request by intent and prepares either a residence shortlist, lease verification path, or seller positioning brief.",
    },
  ];
  const boutiqueBuildings = fillBuildings(
    matchByKeywords(area.buildings, [
      "house",
      "club",
      "boutique",
      "fendi",
      "arte",
      "onda",
      "bijou",
      "pearl",
      "fairchild",
      "glass",
      "surf club",
      "st. regis",
      "st regis",
      "four seasons",
    ]),
    area.buildings.slice(4, 10),
  );
  const developmentWatch = fillBuildings(
    matchByKeywords(area.buildings, [
      "residences",
      "reserve",
      "edition",
      "rivage",
      "bentley",
      "cipriani",
      "waldorf",
      "okan",
      "legacy",
      "villa",
      "elle",
      "standard",
      "perigon",
      "well",
    ]),
    area.buildings.slice(0, 8),
  );
  const buyBuildings = fillBuildings(
    matchByKeywords(area.buildings, ["tower", "residences", "acqualina", "continuum", "paraiso", "park grove"]),
    area.buildings.slice(0, 5),
  );
  const rentBuildings = fillBuildings(
    matchByKeywords(area.buildings, ["club", "tower", "plaza", "midtown", "one", "point", "icon", "marina"]),
    area.buildings.slice(5, 12),
  );
  const sellBuildings = area.buildings.slice(0, 4);
  const dossierCards = [
    {
      title: "Signature Buildings",
      eyebrow: "Start Here",
      body: `The addresses that define ${area.name}'s public identity and give the area its strongest first impression.`,
      buildings: signatureBuildings,
      icon: Building2,
      action: "Study the signatures",
      to: `#area-index`,
    },
    {
      title: "Boutique / Quiet Luxury",
      eyebrow: "Private Feel",
      body: "Smaller, more discreet, or service-led addresses for clients who value calm over spectacle.",
      buildings: boutiqueBuildings,
      icon: Gem,
      action: "View quiet options",
      to: `#area-index`,
    },
    {
      title: "New Development Watch",
      eyebrow: "Pipeline",
      body: "Design-led residences, branded launches, and newer projects worth tracking before public inventory becomes obvious.",
      buildings: developmentWatch,
      icon: Sparkles,
      action: "Track development",
      to: areaInquiryUrl,
    },
    {
      title: "Best For Buy",
      eyebrow: "Purchase Path",
      body: "Use this path to compare view lines, price bands, building reputation, and long-term ownership fit.",
      buildings: buyBuildings,
      icon: KeyRound,
      action: "Request purchase match",
      to: `/?${new URLSearchParams({ interest: area.name, area: area.name, intent: "buy" }).toString()}#consultation`,
    },
    {
      title: "Best For Rent",
      eyebrow: "Lease Path",
      body: "Use this path for seasonal, annual, furnished, and lifestyle-driven lease conversations.",
      buildings: rentBuildings,
      icon: Waves,
      action: "Request lease match",
      to: `/?${new URLSearchParams({ interest: area.name, area: area.name, intent: "lease" }).toString()}#consultation`,
    },
    {
      title: "Private Sell Strategy",
      eyebrow: "Owner Path",
      body: "Start with the address, then position the residence against building demand, competing inventory, and private buyer fit.",
      buildings: sellBuildings,
      icon: HandCoins,
      action: "Enter selling address",
      to: `/?${new URLSearchParams({ interest: `Selling in ${area.name}`, area: area.name, intent: "sell" }).toString()}#consultation`,
    },
  ];

  return (
    <main className="editorial-page editorial-area-page min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 md:pt-32 overflow-hidden">
        <div className="relative h-[58svh] min-h-[330px] w-full overflow-hidden md:h-[60vh] md:min-h-[440px]">
          <img
            src={area.image}
            alt={`${area.name}, Miami`}
            width={1280}
            height={896}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.78] saturate-[0.86] contrast-[1.08]"
            style={{ objectPosition: area.imagePosition ?? "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/35 to-background/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,hsl(var(--gold)/0.16),transparent_38%)]" />

          <div className="absolute inset-0 flex items-center md:items-end">
            <div className="container mx-auto px-5 pt-14 sm:px-6 md:pt-0 md:pb-16">
              <Link
                to={areaExploreLink}
                className="mb-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary sm:tracking-[0.3em] md:mb-8"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                All Areas
              </Link>

              <div className="mb-4 flex items-center gap-3 text-muted-foreground md:mb-6">
                <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.3em]">
                  {area.signature}
                </span>
              </div>

              <h1 className="serif mb-3 max-w-4xl text-5xl leading-[1.02] tracking-tight text-foreground md:mb-4 md:text-7xl lg:text-8xl">
                {area.name}
              </h1>
              <p className="serif italic text-xl md:text-2xl text-primary/90 max-w-2xl">
                {area.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ConciergeSearchBar placement="inline" />

      {/* Overview */}
      <section className="py-16 md:py-24 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">The Neighborhood</p>
              <h2 className="serif text-3xl md:text-4xl leading-[1.1]">
                A <span className="italic text-primary">sense of place</span>.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                {area.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Area hierarchy */}
      <section className="border-t border-primary/10 bg-card/20 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <aside>
              <p className="eyebrow mb-4">Area Dossier</p>
              <h2 className="serif text-3xl leading-[1.08] md:text-5xl">
                Who this area is for before inventory appears.
              </h2>
              <Link
                to={areaInquiryUrl}
                className="mt-8 inline-flex min-h-12 items-center justify-center border border-primary/45 px-6 py-4 text-[10px] uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Request area strategy
                <ArrowRight className="ml-3 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </aside>

            <div className="grid gap-px border border-primary/14 bg-primary/14 md:grid-cols-2">
              {areaFitCards.map((card) => (
                <article key={card.label} className="min-h-[190px] bg-background p-6 md:p-7">
                  <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-primary/80">
                    {card.label}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Area intelligence */}
      <section className="py-16 md:py-24 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <aside className="xl:sticky xl:top-28">
              <p className="eyebrow mb-4">Area Intelligence</p>
              <h2 className="serif max-w-xl text-4xl leading-[1.04] md:text-6xl">
                Read {area.name} by{" "}
                <span className="italic text-primary">layer</span>.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground font-light">
                A cleaner path than a generic map: first understand the area
                character, then select the right building, residence type, and
                private next step.
              </p>

              <div className="relative mt-9 aspect-[5/4] overflow-hidden border border-primary/18 bg-card/70 shadow-[0_28px_90px_-62px_hsl(190_44%_14%/0.7)]">
                <img
                  src={area.image}
                  alt={`${area.name} coastal context`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.96] saturate-[0.88] contrast-[1.02]"
                  style={{ objectPosition: area.imagePosition ?? "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/86 via-background/18 to-transparent" />
                <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--gold)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--gold)/0.08)_1px,transparent_1px)] [background-size:92px_92px]" />
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-primary/18 bg-background/78 backdrop-blur-sm">
                  {[
                    ["Layer", area.regionGroup || "Miami"],
                    ["Index", `${area.buildings.length} addresses`],
                    ["Mode", pageMode],
                  ].map(([label, value]) => (
                    <div key={label} className="border-r border-primary/14 px-4 py-4 last:border-r-0">
                      <p className="text-[8px] uppercase tracking-[0.24em] text-primary/70">
                        {label}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-foreground/80">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="grid gap-3 md:grid-cols-2">
              {dossierCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="group flex min-h-[260px] flex-col border border-primary/14 bg-background p-5 transition-colors duration-500 hover:bg-secondary/35 md:p-6"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-primary/75">
                          {card.eyebrow}
                        </p>
                        <h3 className="serif text-2xl leading-tight text-foreground">
                          {card.title}
                        </h3>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/24 bg-primary/8 text-primary">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground font-light">
                      {card.body}
                    </p>

                    <div className="mb-6 space-y-2">
                      {card.buildings.slice(0, 3).map((building) => (
                        <div
                          key={`${card.title}-${building}`}
                          className="flex items-center justify-between gap-4 border-b border-primary/10 pb-2 last:border-b-0"
                        >
                          <span className="text-sm text-foreground/85">
                            {building}
                          </span>
                          <span className="h-px w-8 shrink-0 bg-primary/25" />
                        </div>
                      ))}
                    </div>

                    <Link
                      to={card.to}
                      className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 border border-primary/25 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-foreground/80 transition-colors group-hover:border-primary/50 group-hover:text-primary sm:tracking-[0.22em]"
                    >
                      {card.action}
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Buildings */}
      <section id="area-index" className="py-16 md:py-24 border-t border-primary/10 scroll-mt-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-4">Area Index</p>
              <h2 className="serif text-3xl md:text-4xl leading-[1.1]">
                The addresses worth{" "}
                <span className="italic text-primary">knowing</span>.
              </h2>
            </div>
            <p className="text-xs text-muted-foreground/70 italic max-w-sm">
              {area.buildings.length} curated addresses · expanded privately on request
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 border border-primary/10">
            {detailed.map((b) => {
              const card = (
                <div className="bg-background p-7 h-full flex flex-col justify-between min-h-[180px] group-hover:bg-secondary/40 transition-all duration-700 group-hover:-translate-y-0.5">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-primary/70 mb-3">
                      {area.name}
                    </div>
                    <h3 className="serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-500 mb-2">
                      {b.name}
                    </h3>
                    {b.architect && (
                      <p className="text-xs text-muted-foreground/80 font-light">
                        {b.architect}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
                      View building brief
                    </span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              );

              return (
                <Link
                  key={b.name}
                  to={`/building/${b.slug}?intent=${isLease ? "lease" : "buy"}`}
                  className="group"
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intent-specific profiles */}
      <section id="area-profiles" className="py-16 md:py-24 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow mb-4">
                {pageMode === "rent" ? "Rent" : pageMode === "sell" ? "Sell" : "Buy"}
              </p>
              <h2 className="serif text-3xl md:text-4xl leading-[1.1]">
                {profileTitle}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground/70 italic max-w-md">
              {profileBody}
            </p>
          </div>

          {isSell ? (
            <div className="grid lg:grid-cols-[1fr_0.8fr] gap-px bg-primary/12 border border-primary/12">
              <div className="bg-background p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <HandCoins className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-primary">
                    Seller concierge
                  </span>
                </div>
                <h3 className="serif text-3xl md:text-4xl mb-5">
                  Enter your selling address and we will prepare the right next step.
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light max-w-2xl">
                  The first seller response should be precise: property address,
                  building, current position, likely buyer pool, rental alternative,
                  and whether a quiet/off-market strategy makes sense.
                </p>
              </div>
              <div className="bg-background p-8 md:p-10 flex flex-col justify-center">
                <Link
                  to={areaInquiryUrl}
                  className="group inline-flex min-h-12 items-center justify-center bg-gradient-gold px-7 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-5px_hsl(var(--gold)/0.6)] sm:px-8 sm:tracking-[0.25em]"
                >
                  Enter Selling Address
                  <ArrowRight className="w-3.5 h-3.5 ml-3 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-px md:bg-primary/15 md:border md:border-primary/15">
              {activeProfiles.map((profile) => (
                <article
                  key={`${profile.buildingSlug}-${profile.id}`}
                  className="bg-background border border-primary/12 md:border-0 p-6 sm:p-7 flex flex-col group hover:bg-secondary/40 transition-colors duration-500"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.24em] text-primary/80">
                        {isLease ? "Representative Lease" : "Representative Purchase"}
                      </span>
                      <h3 className="serif text-2xl text-foreground mt-2 leading-tight">
                        {profile.buildingName}
                      </h3>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-1 border border-primary/30 text-primary/80">
                      {profile.id}
                    </span>
                  </div>

                  <div className="serif text-4xl md:text-3xl text-foreground leading-tight mb-1">
                    {isLease ? `$${profile.price.toLocaleString()}/mo` : formatPrice(profile.price)}
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/55 mb-6">
                    {profile.view}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-foreground/80 text-sm font-light mb-8 border-y border-primary/10 py-4">
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                      {profile.bedrooms} BD
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                      {profile.bathrooms} BA
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                      {profile.sqft.toLocaleString()} sf
                    </span>
                  </div>

                  <Link
                  to={`/building/${profile.buildingSlug}?intent=${isLease ? "lease" : "buy"}`}
                    className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 border border-primary/25 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-foreground/80 transition-colors group-hover:border-primary/50 group-hover:text-primary sm:tracking-[0.22em]"
                  >
                    Verify privately
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                  </Link>
                </article>
              ))}
            </div>
          )}

          {!isSell && (
            <p className="mt-6 text-xs text-foreground/55 italic leading-relaxed max-w-3xl">
              These are editorial residence profiles, not live IDX inventory.
              The selected mode controls this section, so purchase shows purchase
              units and rent shows lease units only.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Private Consultation</p>
            <h2 className="serif text-4xl md:text-6xl leading-[1.05] mb-8">
              Considering {area.name}?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-light">
              Tell us what kind of residence, view, and price band you want.
              We will route the inquiry and verify matching options privately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={areaInquiryUrl}
                className="group inline-flex min-h-12 items-center justify-center px-8 py-4 bg-gradient-gold text-center text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-5px_hsl(var(--gold)/0.6)] sm:tracking-[0.26em]"
              >
                {isSell ? "Enter Selling Address" : isLease ? "Request Lease Match" : "Request Purchase Match"}
                <ArrowRight
                  className="w-3.5 h-3.5 ml-3 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
              <Link
                to={areaExploreLink}
                className="inline-flex min-h-12 items-center justify-center border border-primary/40 px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-all duration-500 hover:border-primary hover:bg-primary/5 sm:tracking-[0.26em]"
              >
                Explore Other Areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related areas */}
      <section className="py-20 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <p className="eyebrow mb-8">Continue Exploring</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherAreas.map((a) => (
              <Link
                key={a.slug}
                to={`/area/${a.slug}?intent=${isLease ? "lease" : "buy"}`}
                className="group relative overflow-hidden border border-primary/10 hover:border-primary/40 transition-all duration-700 aspect-[4/3]"
              >
                <AreaImage area={a} className="h-full">
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="serif text-2xl text-foreground group-hover:text-primary transition-colors duration-500">
                      {a.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80 mt-1">
                      {a.signature}
                    </p>
                  </div>
                </AreaImage>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AreaPage;
