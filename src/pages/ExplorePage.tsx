import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";
import AreaImage from "@/components/aura/AreaImage";
import { AREAS } from "@/data/areas";
import { GEOGRAPHY_BANDS } from "@/data/geography";
import { AuraIntent, normalizeIntent } from "@/lib/intent";
import sunnyIslesAerial from "@/assets/areas/sunny-isles-aerial.jpg";
import edgewater from "@/assets/areas/edgewater.jpg";
import brickell from "@/assets/areas/brickell.jpg";
import midBeachFaena from "@/assets/areas/mid-beach-faena.jpg";
import coconutGrove from "@/assets/areas/coconut-grove.jpg";
import keyBiscayne from "@/assets/areas/key-biscayne.jpg";

const layerImages: Record<string, string> = {
  "Northern Luxury Belt": sunnyIslesAerial,
  "Upper Miami Luxury Core": edgewater,
  "Financial and Urban Elite Core": brickell,
  "Miami Beach Luxury Axis": midBeachFaena,
  "Coconut Grove and Coral Gables Prestige Belt": coconutGrove,
  "Southern Waterfront and Estate Zone": keyBiscayne,
};

const intents = [
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "lease" },
  { label: "Sell", value: "sell" },
] as const;

const tags = [
  "Oceanfront",
  "Bayfront",
  "Branded",
  "Quiet Luxury",
  "New Development",
  "Investor",
  "Design",
  "Walkable",
];

const groups = [
  "North Ocean Corridor",
  "North Beach Corridor",
  "North Corridor",
  "Central Core",
  "Miami Beach",
  "Coral Gables / Grove",
  "Island & Key Corridors",
];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const layerOptions = GEOGRAPHY_BANDS.map((band) => ({
  title: band.title,
  layer: band.layer,
  signal: band.signal,
  slugs: band.areas.map((area) => area.slug).filter((slug): slug is string => Boolean(slug)),
}));

const ExplorePage = () => {
  const location = useLocation();
  const queryIntent = new URLSearchParams(location.search).get("intent");
  const normalizedIntent = normalizeIntent(queryIntent);
  const [intent, setIntent] = useState< AuraIntent >(normalizedIntent);
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedLayer, setSelectedLayer] = useState("all");

  useEffect(() => {
    document.title = "Explore Miami Neighborhoods | The Aura Miami";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Explore 15+ Miami neighborhoods — Brickell, Edgewater, Bal Harbour, Coconut Grove, and more. Building profiles, price ranges, and lifestyle guides.");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://theauramiami.com/explore";
    const exploreDesc = "Explore 15+ Miami neighborhoods — Brickell, Edgewater, Bal Harbour, Coconut Grove, and more. Building profiles, price ranges, and lifestyle guides.";
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Explore Miami Neighborhoods | The Aura Miami");
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", exploreDesc);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", "Explore Miami Neighborhoods | The Aura Miami");
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", exploreDesc);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://theauramiami.com/explore");
  }, []);
  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIntent(normalizedIntent);
  }, [normalizedIntent]);

  const areaOptions = useMemo(
    () => [...AREAS].sort((a, b) => (a.launchPriority ?? 99) - (b.launchPriority ?? 99)),
    [],
  );
  const selectedLayerInfo = selectedLayer === "all"
    ? undefined
    : layerOptions.find((layer) => layer.title === selectedLayer);
  const visibleAreaOptions = useMemo(() => {
    if (selectedLayerInfo) {
      return areaOptions.filter((area) => selectedLayerInfo.slugs.includes(area.slug));
    }

    return areaOptions.slice(0, 9);
  }, [areaOptions, selectedLayerInfo]);
  const intentLabel = intent === "lease" ? "Rent" : intent === "sell" ? "Sell" : "Buy";

  const filteredAreas = useMemo(() => {
    const q = normalize(query);
    return AREAS.filter((area) => {
      const matchesLayer =
        selectedLayer === "all" ||
        Boolean(layerOptions.find((layer) => layer.title === selectedLayer)?.slugs.includes(area.slug));
      const matchesArea = selectedArea === "all" || area.slug === selectedArea;
      const matchesTag =
        activeTag === "All" || area.lifestyleTags?.includes(activeTag);
      const searchable = [
        area.name,
        area.signature,
        area.areaType,
        area.regionGroup,
        ...(area.aliases ?? []),
        ...area.buildings,
      ]
        .filter(Boolean)
        .map((item) => normalize(String(item)))
        .join(" ");
      const matchesQuery = !q || searchable.includes(q);
      return matchesLayer && matchesArea && matchesTag && matchesQuery;
    }).sort((a, b) => (a.launchPriority ?? 99) - (b.launchPriority ?? 99));
  }, [activeTag, query, selectedArea, selectedLayer]);

  return (
    <main className="editorial-page editorial-explore-page min-h-screen overflow-x-hidden bg-background animate-fade-in">
      <Navbar />

      <section className="relative overflow-hidden border-b border-primary/18 pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="absolute left-0 top-0 hidden h-full w-[12vw] border-r border-primary/15 bg-card/35 lg:block" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.22fr_0.78fr_0.52fr] lg:items-end">
            <aside className="hidden h-full border-r border-primary/18 pr-7 lg:flex lg:flex-col lg:justify-between">
              <p className="text-[10px] uppercase tracking-[0.32em] text-primary">
                AURA / Explore
              </p>
              <p className="max-w-[9rem] text-[11px] uppercase leading-loose tracking-[0.3em] text-muted-foreground">
                Private Miami atlas. Edited by layer.
              </p>
            </aside>

            <div>
              <p className="eyebrow mb-5 text-[10px] sm:text-xs">Private Atlas</p>
              <h1 className="serif max-w-4xl text-5xl leading-[0.96] sm:text-6xl md:text-7xl">
                Define the layer before the address.
              </h1>
              <p className="mt-7 max-w-3xl text-base font-light leading-relaxed text-foreground/76 md:text-lg">
                Start north-to-south, then narrow by intent, lifestyle, and
                product type. The result is a cleaner Miami map before property
                cards begin.
              </p>
            </div>

            <div className="border border-primary/18 bg-card/75 p-6 shadow-[0_34px_82px_-62px_hsl(190_44%_14%/0.55)] md:p-7">
              <div className="grid grid-cols-3 gap-px bg-primary/18">
                {[
                  { label: "Mode", value: intentLabel },
                  { label: "Layer", value: selectedLayerInfo ? selectedLayerInfo.layer : "All Miami" },
                  { label: "Visible", value: `${filteredAreas.length}` },
                ].map((item) => (
                  <div key={item.label} className="bg-card px-4 py-4">
                    <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-primary/80">
                      {item.label}
                    </p>
                    <p className="serif text-xl leading-tight text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to={`/geography?intent=${intent}#geography`}
                className="mt-5 inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary transition-colors hover:text-foreground"
              >
                Open north-to-south atlas
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/12 py-10 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3 text-[10px] sm:text-xs">Choose the Miami layer</p>
              <h2 className="serif text-3xl leading-tight md:text-5xl">
                Six corridors, one cleaner map.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedLayer("all");
                setSelectedArea("all");
              }}
              className="w-fit border border-primary/35 bg-card/55 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Reset layers
            </button>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:-mx-6 sm:px-6">
            <button
              type="button"
              onClick={() => setSelectedLayer("all")}
              className={`relative min-h-[240px] w-[78vw] shrink-0 snap-start overflow-hidden border p-6 text-left transition-colors sm:w-[370px] ${
                selectedLayer === "all"
                  ? "border-primary bg-[linear-gradient(135deg,hsl(186_44%_14%),hsl(188_58%_8%))] text-white"
                  : "border-primary/18 bg-card/85 hover:border-primary/45"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--gold)/0.18),transparent_34%)]" />
              <span className="relative text-[10px] uppercase tracking-[0.24em] text-primary">
                All Miami
              </span>
              <span className="serif relative mt-5 block text-4xl leading-tight">
                Entire private map
              </span>
              <span className={`relative mt-5 block text-sm leading-relaxed ${
                selectedLayer === "all" ? "text-white/72" : "text-muted-foreground"
              }`}>
                See every live AURA area before narrowing by lifestyle or intent.
              </span>
              <span className="relative mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-primary">
                {AREAS.length} indexed areas
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </button>

            {layerOptions.map((layer, index) => {
              const img = layerImages[layer.title];
              const isActive = selectedLayer === layer.title;
              return (
                <button
                  key={layer.title}
                  type="button"
                  onClick={() => {
                    setSelectedLayer(layer.title);
                    setSelectedArea("all");
                  }}
                  className={`group relative min-h-[240px] w-[78vw] shrink-0 snap-start overflow-hidden border p-6 text-left transition-all duration-500 sm:w-[370px] ${
                    isActive
                      ? "border-primary"
                      : "border-primary/12 hover:border-primary/45"
                  }`}
                >
                  {img && (
                    <>
                      <img
                        src={img}
                        alt={layer.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: isActive ? "brightness(0.58) saturate(0.92) contrast(1.08)" : "brightness(0.42) saturate(0.78) contrast(1.08)" }}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, rgba(5, 45, 52, 0.42), rgba(7, 24, 28, 0.62))"
                            : "linear-gradient(135deg, rgba(5, 45, 52, 0.58), rgba(7, 24, 28, 0.72))",
                        }}
                      />
                    </>
                  )}
                  <div className="relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-primary-glow">
                      Layer {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="serif mt-5 block text-3xl leading-tight text-white">
                      {layer.title}
                    </span>
                    <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-white/58">
                      {layer.layer}
                    </span>
                    <span className="mt-5 block text-sm leading-relaxed text-white/78">
                      {layer.signal}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-4 right-4 z-10 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--gold)/0.8)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-20 border-b border-primary/15 bg-background/94 backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-6">
          <div className="grid gap-5 border border-primary/18 bg-card/72 p-4 shadow-[0_28px_72px_-58px_hsl(190_44%_14%/0.6)] md:p-5">
            <div className="flex min-w-0 flex-col gap-4 lg:grid lg:grid-cols-[auto_minmax(0,38rem)] lg:items-center lg:justify-between">
              <div className="inline-grid w-fit max-w-full grid-cols-3 gap-1 rounded-full border border-primary/15 bg-background/45 p-1">
                {intents.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setIntent(item.value)}
                    className={`min-h-10 min-w-[72px] rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.16em] transition-all sm:min-w-[82px] sm:px-4 sm:tracking-[0.22em] ${
                      intent === item.value
                        ? "bg-gradient-gold text-primary-foreground shadow-gold"
                        : "text-foreground/70 hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex min-w-0 w-full max-w-[38rem] items-center gap-3 rounded-full border border-primary/25 bg-input/75 px-4 py-3 shadow-[inset_0_1px_0_hsl(var(--gold)/0.16)]">
                <Search className="h-4 w-4 shrink-0 text-primary/80" strokeWidth={1.5} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Bal Harbour, Sunny Isles, Missoni, SoFi, Brickell..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-primary/80">
                  Quick area focus
                </span>
                <span className="hidden sm:inline text-[10px] uppercase tracking-[0.18em] text-muted-foreground/65">
                  {selectedLayerInfo ? selectedLayerInfo.title : "Top priority areas"}
                </span>
              </div>
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                <button
                  type="button"
                  onClick={() => setSelectedArea("all")}
                  className={`rounded-full border px-3 py-2 text-[9px] uppercase tracking-[0.16em] transition-colors sm:px-4 sm:text-[10px] sm:tracking-[0.18em] ${
                    selectedArea === "all"
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-primary/15 text-foreground/70 hover:text-primary hover:border-primary/45"
                  }`}
                >
                  All Areas
                </button>
                {visibleAreaOptions.map((area) => (
                  <button
                    key={area.slug}
                    type="button"
                    onClick={() => setSelectedArea(area.slug)}
                    className={`whitespace-nowrap rounded-full border px-3 py-2 text-[9px] uppercase tracking-[0.16em] transition-colors sm:px-4 sm:text-[10px] sm:tracking-[0.18em] ${
                      selectedArea === area.slug
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-primary/15 text-foreground/70 hover:text-primary hover:border-primary/45"
                    }`}
                  >
                    {area.name}
                  </button>
                ))}
                {selectedLayer === "all" && (
                  <Link
                    to={`/geography?intent=${intent}#geography`}
                    className="whitespace-nowrap rounded-full border border-primary/20 px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary/45 hover:bg-primary/10 sm:px-4 sm:text-[10px] sm:tracking-[0.18em]"
                  >
                    Full atlas
                  </Link>
                )}
              </div>
            </div>

            <div className="border-t border-primary/10 pt-3">
              <div className="mb-2 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-primary/70" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                  Secondary refinement
                </span>
              </div>
              <div className="no-scrollbar flex items-center gap-2 pb-1 lg:pb-0 overflow-x-auto">
                {["All", ...tags].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`rounded-full border px-3 py-2 text-[9px] uppercase tracking-[0.16em] transition-colors sm:tracking-[0.18em] ${
                      activeTag === tag
                        ? "border-primary/70 bg-primary/10 text-primary"
                        : "border-primary/10 text-foreground/55 hover:text-primary"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="areas" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          {filteredAreas.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No areas match your filters.
            </p>
          )}
          {groups.map((group) => {
            const groupAreas = filteredAreas.filter((area) => area.regionGroup === group);
            if (groupAreas.length === 0) return null;
            return (
              <div key={group} className="mb-12 last:mb-0">
                <div className="mb-5 flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary/70">{group}</span>
                  <span className="h-px flex-1 bg-primary/12" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">{groupAreas.length}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupAreas.map((area) => (
                    <Link
                      key={area.slug}
                      to={`/area/${area.slug}?intent=${intent}`}
                      className="group overflow-hidden border border-primary/12 bg-card/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_12px_40px_-20px_hsl(var(--gold)/0.25)]"
                    >
                      <AreaImage area={area} className="aspect-[4/3]">
                        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                          {(area.lifestyleTags ?? []).slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-primary/25 bg-background/65 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.16em] text-primary backdrop-blur"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </AreaImage>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="serif text-xl leading-tight group-hover:text-primary transition-colors">
                              {area.name}
                            </h3>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/50 mt-1.5">
                              {area.areaType}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full border border-primary/22 bg-primary/7 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-primary/80">
                            {area.buildings.length} bldgs
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 mb-4">
                          {area.shortDescription}
                        </p>
                        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/55">
                            {intent === "lease" ? "Rent" : intent === "sell" ? "Sell" : "Buy"}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-primary/70 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ExplorePage;
