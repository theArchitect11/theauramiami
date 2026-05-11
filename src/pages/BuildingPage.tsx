import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  ArrowRight,
  Building2,
  Home,
  KeyRound,
  TrendingUp,
  Bed,
  Bath,
  Maximize2,
  BadgeCheck,
  ClipboardCheck,
} from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";
import ConciergeSearchBar from "@/components/aura/ConciergeSearchBar";
import { getBuildingBySlug, formatPrice, type Listing } from "@/data/buildings";
import { buildConsultationPath, normalizeIntent, buildExplorePath } from "@/lib/intent";

const BuildingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const building = slug ? getBuildingBySlug(slug) : undefined;
  const [tab, setTab] = useState<"sale" | "rent">("sale");
  const currentIntent = normalizeIntent(new URLSearchParams(location.search).get("intent"));
  const explorePath = buildExplorePath(currentIntent === "sell" ? "buy" : currentIntent);

  useEffect(() => {
    const requestedIntent = new URLSearchParams(location.search).get("intent");
    if (requestedIntent === "lease" || requestedIntent === "rent") setTab("rent");
    if (requestedIntent === "buy") setTab("sale");
  }, [location.search]);

  useEffect(() => {
    if (!building) return;
    document.title = `${building.name} | The Aura Miami`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", `${building.name} — ${building.neighborhood}, ${building.city}. Purchase and lease profiles, building overview, and private inquiry through The Aura Miami.`);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://theauramiami.com/building/${building.slug}`;
    const buildingDesc = `${building.name} — ${building.neighborhood}, ${building.city}. Purchase and lease profiles, building overview, and private inquiry through The Aura Miami.`;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", `${building.name} | The Aura Miami`);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", buildingDesc);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", `${building.name} | The Aura Miami`);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", buildingDesc);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://theauramiami.com/building/${building.slug}`);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Accommodation",
      "name": building.name,
      "url": `https://theauramiami.com/building/${building.slug}`,
      "description": `${building.name} — ${building.neighborhood}, ${building.city}. ${building.profile?.tagline ?? ""}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": building.city,
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "containedInPlace": {
        "@type": "Place",
        "name": building.neighborhood
      }
    };
    let script = document.getElementById("jsonld-building") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "jsonld-building";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
    return () => { document.getElementById("jsonld-building")?.remove(); };
  }, [building]);

  const saleListings = useMemo(
    () => building?.listings.filter((l) => l.type === "sale") ?? [],
    [building],
  );
  const rentListings = useMemo(
    () => building?.listings.filter((l) => l.type === "rent") ?? [],
    [building],
  );

  if (!building) {
    return (
      <main className="min-h-screen bg-background animate-fade-in">
        <Navbar />
        <section className="container mx-auto px-6 pt-40 pb-32 text-center">
          <p className="eyebrow mb-6">Not Found</p>
          <h1 className="serif text-4xl md:text-5xl mb-6">
            Building not in our index.
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary hover:text-primary-glow transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Return to Search
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  // Market profile stats based on curated representative residence examples.
  const avgSale =
    saleListings.length > 0
      ? saleListings.reduce((s, l) => s + l.price, 0) / saleListings.length
      : 0;
  const avgPpsf =
    saleListings.length > 0
      ? saleListings.reduce((s, l) => s + l.price / l.sqft, 0) /
        saleListings.length
      : 0;
  const isHouse = building.propertyType === "house" || building.propertyType === "enclave";
  const propertyLabel = isHouse ? "Estate" : "Building";
  const active = tab === "rent" ? rentListings : saleListings;
  const formatRent = (value: number) => `$${value.toLocaleString()}/mo`;
  const inquiryUrl = (listing?: Listing) => {
    const inquiryIntent = currentIntent === "sell" ? "sell" : tab === "rent" ? "lease" : "buy";
    const params: Record<string, string> = {
      interest: currentIntent === "sell" ? `Selling in ${building.name}` : building.name,
      building: building.name,
      area: building.neighborhood,
    };

    if (listing) {
      params.residence = listing.id;
      params.type = listing.type;
      params.price = listing.type === "rent" ? formatRent(listing.price) : formatPrice(listing.price);
      params.beds = `${listing.bedrooms}`;
      params.view = listing.view;
    }

    return buildConsultationPath(inquiryIntent, params);
  };
  const dossierIntelligence = building.profile
    ? [
        {
          label: "Best for",
          body: building.profile.bestFor.join(", "),
        },
        {
          label: "Watchouts",
          body: building.profile.dueDiligence.join(" "),
        },
        {
          label: "Amenities",
          body: building.amenities.join(", "),
        },
        {
          label: "Building rules",
          body: "Verify rental minimums, guest access, pet rules, renovation approvals, association documents, and any current building restrictions before contract.",
        },
        {
          label: "Carrying cost notes",
          body: "Review monthly maintenance, reserves, assessments, insurance exposure, taxes, parking, storage, and service charges before comparing price alone.",
        },
        {
          label: "View stack / line quality",
          body: building.profile.viewProfile,
        },
        {
          label: "Floor plan notes",
          body: building.profile.residenceMix,
        },
        {
          label: "Rental policy notes",
          body: building.profile.rentalNotes,
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-14 md:pb-24 overflow-hidden">
        {building.image && (
          <>
            <img
              src={building.image}
              alt={`${building.name} visual brief`}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              width={1280}
              height={896}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/90 to-background" />
          </>
        )}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-5 sm:px-6 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] md:tracking-[0.3em] text-foreground/65 hover:text-primary transition-colors mb-9 md:mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to Search
          </Link>

          <div className="flex items-center gap-3 mb-5 md:mb-6 text-foreground/70">
            <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.22em] md:tracking-[0.3em]">
              {building.neighborhood} · {building.city}
            </span>
          </div>

          <h1 className="serif text-[3.5rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.98] md:leading-[1.02] tracking-tight text-foreground mb-5 md:mb-6 max-w-4xl">
            {building.name}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <p className="text-foreground/72 text-sm md:text-lg font-light">
              {building.architect === "Private brief" || building.architect === "Custom / Signature"
                ? `${building.neighborhood} · Private residence brief`
                : `${building.architect} · Completed ${building.year}`}
            </p>
            <span className="w-fit border border-primary/25 bg-primary/8 px-3 py-1.5 text-[9px] uppercase tracking-[0.28em] text-primary">
              Private Dossier
            </span>
          </div>
        </div>
      </section>

      <ConciergeSearchBar placement="inline" />

      {/* Overview */}
      <section className="py-14 md:py-20 border-t border-primary/10">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-9 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4 text-[10px] sm:text-xs">Overview</p>
              <h2 className="serif text-3xl md:text-4xl leading-[1.05] md:leading-[1.1]">
                The <span className="italic text-primary">{propertyLabel.toLowerCase()}</span>.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <p className="text-foreground/85 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                {building.overview}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/15 border border-primary/15 rounded-md overflow-hidden">
                {[
                  { label: "Type", value: isHouse ? "Private Estate" : "Condominium" },
                  { label: isHouse ? "Category" : "Stories", value: isHouse ? (building.propertyType === "enclave" ? "Enclave" : "Single-Family") : (building.stories?.toString() ?? "-") },
                  { label: isHouse ? "Orientation" : "Residences", value: isHouse ? "Waterfront / Gated" : (building.residences?.toString() ?? "-") },
                  { label: "Architect", value: building.architect.split(" ")[0] },
                ].map((s) => (
                  <div key={s.label} className="bg-background p-4 sm:p-5">
                    <div className="text-[9px] uppercase tracking-[0.22em] md:tracking-[0.3em] text-foreground/55 mb-2">
                      {s.label}
                    </div>
                    <div className="serif text-lg md:text-lg text-foreground leading-tight">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {building.profile && (
        <section className="py-14 md:py-20 border-t border-primary/10">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-9 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="eyebrow mb-4 text-[10px] sm:text-xs">AURA Notes</p>
                <h2 className="serif text-3xl md:text-4xl leading-[1.05] md:leading-[1.1]">
                  {propertyLabel} <span className="italic text-primary">intelligence</span>.
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {building.profile.bestFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-px overflow-hidden rounded-md border border-primary/15 bg-primary/15">
                  {[
                    { label: "Market Position", value: building.profile.marketPosition },
                    { label: "Residence Mix", value: building.profile.residenceMix },
                    { label: "View Profile", value: building.profile.viewProfile },
                    { label: "Service Profile", value: building.profile.serviceProfile },
                  ].map((item) => (
                    <article key={item.label} className="bg-background p-5 sm:p-6">
                      <div className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-primary/75">
                        <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {item.label}
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/78">
                        {item.value}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { label: "Buy", value: building.profile.buyerNotes },
                    { label: "Rent", value: building.profile.rentalNotes },
                    { label: "Sell", value: building.profile.sellNotes },
                  ].map((item) => (
                    <article key={item.label} className="border border-primary/12 bg-card/55 p-5">
                      <h3 className="serif text-2xl text-foreground mb-3">{item.label}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.value}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="border border-primary/15 bg-background/70 p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-primary/80">
                    <ClipboardCheck className="h-4 w-4" strokeWidth={1.5} />
                    Private verification checklist
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {building.profile.dueDiligence.map((item) => (
                      <p key={item} className="text-xs leading-relaxed text-muted-foreground">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {building.profile && (
        <section className="py-14 md:py-20 border-t border-primary/10 bg-card/20">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-4 text-[10px] sm:text-xs">Private Dossier</p>
                <h2 className="serif max-w-3xl text-3xl leading-[1.05] md:text-5xl">
                  Intelligence before a showing, offer, or lease.
                </h2>
              </div>
              <Link
                to={inquiryUrl()}
                className="inline-flex min-h-12 items-center justify-center border border-primary/45 px-6 py-4 text-[10px] uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Verify privately
                <ArrowRight className="ml-3 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="grid gap-px border border-primary/14 bg-primary/14 md:grid-cols-2 xl:grid-cols-4">
              {dossierIntelligence.map((item) => (
                <article key={item.label} className="min-h-[210px] bg-background p-6">
                  <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-primary/80">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Market Profile */}
      <section className="py-14 md:py-20 border-t border-primary/10">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div>
              <p className="eyebrow mb-4 text-[10px] sm:text-xs">Market Profile</p>
              <h2 className="serif text-3xl md:text-4xl leading-[1.05] md:leading-[1.1] max-w-2xl">
                A private read on the <span className="italic text-primary">{propertyLabel.toLowerCase()}</span>.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] md:tracking-[0.3em] text-foreground/60">
              <TrendingUp className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
              Curated Guide
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/15 border border-primary/15 rounded-md overflow-hidden">
            {[
              {
                label: "Sale Guide",
                value: `${formatPrice(building.priceRange.saleMin)} – ${formatPrice(building.priceRange.saleMax)}`,
              },
              {
                label: "Sample Avg",
                value: avgSale ? formatPrice(Math.round(avgSale)) : "-",
              },
              {
                label: isHouse ? "Avg Lot Size" : "Sample $ / sqft",
                value: isHouse 
                  ? (active[0]?.lotSize ?? "Signature Lot") 
                  : (avgPpsf ? `$${Math.round(avgPpsf).toLocaleString()}` : "-"),
              },
              {
                label: "Profiles",
                value: `${building.listings.length} examples`,
              },
            ].map((s) => (
              <div key={s.label} className="bg-background p-5 sm:p-6">
                <div className="text-[9px] uppercase tracking-[0.22em] md:tracking-[0.3em] text-foreground/55 mb-3">
                  {s.label}
                </div>
                <div className="serif text-2xl md:text-3xl text-foreground leading-tight break-words">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Residence Profiles — Tabs */}
      <section className="py-14 md:py-24 border-t border-primary/10">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="mb-8 md:mb-10">
            <p className="eyebrow mb-4 text-[10px] sm:text-xs">Residence Profiles</p>
            <h2 className="serif text-3xl md:text-4xl leading-[1.05] md:leading-[1.1] max-w-2xl">
              Example {isHouse ? "estates" : "lines"}, <span className="italic text-primary">privately verified</span>.
            </h2>
          </div>

          {/* Tab bar */}
          <div className="inline-flex w-full sm:w-auto items-center gap-1 p-1 rounded-md sm:rounded-full border border-primary/20 bg-background/60 backdrop-blur mb-8 md:mb-10">
            {([
              { key: "sale", label: "Purchase", Icon: Home, count: saleListings.length },
              { key: "rent", label: "Lease", Icon: KeyRound, count: rentListings.length },
            ] as const).map(({ key, label, Icon, count }) => {
              const isActive = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-sm px-4 py-3 text-[10px] uppercase tracking-[0.18em] transition-all duration-300 sm:min-h-10 sm:flex-none sm:rounded-full sm:px-5 sm:py-2.5 sm:tracking-[0.26em] ${
                    isActive
                      ? "bg-gradient-gold text-primary-foreground shadow-gold"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {label}
                  <span
                    className={`text-[9px] ml-1 ${
                      isActive ? "text-primary-foreground/80" : "text-foreground/45"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Listings grid */}
          {active.length === 0 ? (
            <div className="glass-panel rounded-md p-10 text-center">
              <p className="text-foreground/75 font-light">
                No curated {tab === "sale" ? "purchase" : "lease"} profiles are shown for this {propertyLabel.toLowerCase()} yet.
                We can still verify relevant lines through a private consultation.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-px md:bg-primary/15 md:border md:border-primary/15 rounded-md overflow-hidden">
              {active.map((l: Listing) => (
                <article
                  key={l.id}
                  className="bg-background border border-primary/12 md:border-0 p-6 sm:p-7 flex flex-col group hover:bg-secondary/40 transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[9px] uppercase tracking-[0.24em] md:tracking-[0.3em] text-primary/80">
                      Representative {isHouse ? "Estate" : "Unit"} {l.id}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-sm border border-primary/30 text-primary/80">
                      Verify Privately
                    </span>
                  </div>

                  <h3 className="serif text-4xl md:text-3xl text-foreground leading-tight mb-1">
                    {l.type === "sale"
                      ? formatPrice(l.price)
                      : formatRent(l.price)}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/55 mb-6">
                    {l.view}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-foreground/80 text-sm font-light mb-8 border-y border-primary/10 py-4">
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                      {l.bedrooms} BD
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                      {l.bathrooms} BA
                    </span>
                    <span className="flex items-center gap-1.5">
                      {isHouse && l.lotSize ? (
                        <>
                          <Maximize2 className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                          {l.lotSize}
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-3.5 h-3.5 text-primary/70" strokeWidth={1.5} />
                          {l.sqft.toLocaleString()} sf
                        </>
                      )}
                    </span>
                  </div>

                  <Link
                    to={inquiryUrl(l)}
                    className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 border border-primary/25 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-foreground/80 transition-colors group-hover:border-primary/50 group-hover:text-primary md:tracking-[0.26em]"
                  >
                    Request private match
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </Link>
                </article>
              ))}
            </div>
          )}

          <p className="mt-6 text-xs text-foreground/55 italic leading-relaxed max-w-3xl">
            Residence profiles are editorial examples, not live IDX inventory.
            Exact availability, pricing, and property details are verified with
            licensed partners after inquiry.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 border-t border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-5 sm:px-6 relative">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5 md:mb-6 text-[10px] sm:text-xs">Private Consultation</p>
            <h2 className="serif text-4xl md:text-6xl leading-[1.05] mb-6 md:mb-8">
              Interested in {building.name}?
            </h2>
            <p className="text-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl font-light">
              Tell us the {isHouse ? "specifications" : "line"}, view, or price band you like. We will route the
              inquiry, verify what is real, and send back the closest current match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={inquiryUrl()}
                className="group inline-flex min-h-12 items-center justify-center px-7 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground bg-gradient-gold shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-5px_hsl(var(--gold)/0.6)] sm:px-8 sm:tracking-[0.26em]"
              >
                Speak to an Advisor
                <ArrowRight className="w-3.5 h-3.5 ml-3 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
              <Link
                to={explorePath}
                className="inline-flex min-h-12 items-center justify-center border border-primary/40 px-7 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-all duration-500 hover:border-primary hover:bg-primary/5 sm:px-8 sm:tracking-[0.26em]"
              >
                <Building2 className="w-4 h-4 mr-3" strokeWidth={1.5} />
                Explore More {isHouse ? "Residences" : "Buildings"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BuildingPage;
