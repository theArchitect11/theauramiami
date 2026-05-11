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
    <main className="min-h-screen overflow-x-hidden bg-background animate-fade-in">
      <Navbar />

      <section className="relative pt-32 md:pt-40 pb-14 md:pb-20 border-b border-primary/10 overflow-hidden">
        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-end">
            <div>
              <p className="eyebrow mb-5 text-[10px] sm:text-xs">AURA Map Command</p>
              <h1 className="serif text-4xl sm:text-5xl md:text-6xl leading-[1.02] mb-6">
                First define the{" "}
                <span className="italic text-primary">area.</span>
              </h1>
            </div>
            <div className="max-w-[21rem] sm:max-w-2xl">
              <p className="text-base font-light leading-relaxed text-foreground/75 md:text-lg">
                Start with the right pocket, then align the path: buy, rent, or
                sell. Every area follows a single, private signal flow.
              </p>
              <Link
                to={`/geography?intent=${intent}#geography`}
                className="mt-5 inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary transition-colors hover:text-foreground"
              >
                North to South Atlas
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/10 py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3 text-[10px] sm:text-xs">Choose the Miami layer</p>
              <h2 className="serif text-3xl leading-tight md:text-5xl">
                Start with geography before filters.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedLayer("all");
                setSelectedArea("all");
              }}
              className="w-fit border border-primary/25 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Reset layers
            </button>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 no-scrollbar sm:-mx-6 sm:px-6">
            <button
              type="button"
              onClick={() => setSelectedLayer("all")}
              className={`min-h-[190px] w-[78vw] shrink-0 snap-start border p-5 text-left transition-colors sm:w-[330px] ${
                selectedLayer === "all"
                  ? "border-primary bg-primary/12"
                  : "border-primary/12 bg-card/45 hover:border-primary/45"
              }`}
            >
              <span className="text-[10px] uppercase tracking-[0.24em] text-primary">
                All Miami
              </span>
              <span className="serif mt-5 block text-3xl leading-tight text-foreground">
                Entire private map
              </span>
              <span className="mt-5 block text-sm leading-relaxed text-muted-foreground">
                See every live AURA area before narrowing by lifestyle or intent.
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
                  className={`group relative min-h-[220px] w-[78vw] shrink-0 snap-start overflow-hidden border p-5 text-left transition-all duration-500 sm:w-[330px] ${
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
                        style={{ filter: isActive ? "brightness(0.45) saturate(0.7)" : "brightness(0.3) saturate(0.5)" }}
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "bg-primary/20" : "bg-background/40"}`} />
                    </>
                  )}
                  <div className="relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-primary">
                      Layer {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="serif mt-5 block text-3xl leading-tight text-foreground">
                      {layer.title}
                    </span>
                    <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-foreground/55">
                      {layer.layer}
                    </span>
                    <span className="mt-5 block text-sm leading-relaxed text-foreground/70">
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
        <div className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-6">
          <div className="grid gap-4">
            <div className="flex min-w-0 flex-col gap-3 lg:grid lg:grid-cols-[auto_minmax(0,36rem)] lg:items-center lg:justify-between">
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

              <div className="flex min-w-0 w-full max-w-[36rem] items-center gap-3 rounded-full border border-primary/15 bg-input/55 px-4 py-2.5">
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
                  Area first
                </span>
                <span className="hidden sm:inline text-[10px] uppercase tracking-[0.18em] text-muted-foreground/65">
                  {filteredAreas.length} visible
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
                {areaOptions.map((area) => (
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
          {groups.map((group) => {
            const groupAreas = filteredAreas.filter(
              (area) => area.regionGroup === group,
            );
            if (groupAreas.length === 0) return null;

            return (
              <div key={group} className="mb-14 last:mb-0">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
                  <div>
                    <p className="eyebrow mb-3 text-[10px] sm:text-xs">{group}</p>
                    <h2 className="serif text-2xl md:text-4xl leading-tight">
                      {groupAreas.length} curated {groupAreas.length === 1 ? "area" : "areas"}
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground/70 italic max-w-sm">
                    Oceanfront, bayfront, and branded signals refine the area story.
                  </p>
                </div>

                <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 px-5 no-scrollbar">
                  {groupAreas.map((area, areaIndex) => (
                    <Link
                      key={area.slug}
                      to={`/area/${area.slug}?intent=${intent}`}
                      className={`group relative shrink-0 overflow-hidden border border-primary/12 bg-card/65 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/45 ${
                        areaIndex === 0
                          ? "w-[84vw] sm:w-[540px]"
                          : "w-[80vw] sm:w-[360px]"
                      }`}
                    >
                      <AreaImage area={area} className="aspect-[16/9]">
                        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                          {(area.lifestyleTags ?? []).slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-primary/25 bg-background/60 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-primary backdrop-blur"
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
                          <span className="rounded-full border border-primary/25 bg-primary/8 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-primary/85">
                            {area.buildings.length} buildings
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                          {area.shortDescription}
                        </p>
                        <div className="flex items-center justify-between border-t border-primary/10 pt-4">
                          <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/60">
                            {intent === "lease" ? "Rent mode" : intent === "sell" ? "Sell mode" : "Buy mode"}
                          </span>
                          <ArrowRight className="h-4 w-4 text-primary/75 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
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
