import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { BUILDINGS, formatPrice } from "@/data/buildings";
import { parseSearchQuery } from "@/lib/search-utils";

const BuildingSearch = () => {
  const [query, setQuery] = useState("");
  const [propertyFilter, setPropertyFilter] = useState<"all" | "condo" | "house">("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    const intent = parseSearchQuery(query);
    const effectivePropertyType = propertyFilter !== "all" ? propertyFilter : intent.propertyType;
    
    return BUILDINGS.filter((b) => {
      const nameMatch = !q || b.name.toLowerCase().includes(q) ||
        b.neighborhood.toLowerCase().includes(q) ||
        b.architect.toLowerCase().includes(q) ||
        (b.profile?.searchAliases ?? []).some((alias) =>
          alias.toLowerCase().includes(q),
        );

      if (effectivePropertyType && b.propertyType !== effectivePropertyType && b.propertyType !== "enclave") return false;
      if (intent.minBeds) {
         const hasEnoughBeds = b.listings.some(l => l.bedrooms >= (intent.minBeds || 0));
         if (!hasEnoughBeds) return false;
      }
      if (intent.maxPrice) {
         if (b.priceRange.saleMin > intent.maxPrice) return false;
      }

      return nameMatch;
    });
  }, [query, propertyFilter]);

  return (
    <section
      id="buildings"
      className="relative py-24 md:py-32 overflow-hidden border-t border-primary/10"
    >
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow mb-6">Building Guide</p>
          <h2 className="serif text-4xl md:text-5xl leading-[1.1] mb-6">
            South Florida's most{" "}
            <span className="italic text-primary">coveted</span> addresses.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
            Browse the editorial index. Pricing, availability, and matching
            residences are verified privately after inquiry.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
          {/* Search bar */}
          <div className="relative flex-1 max-w-2xl">
            <div className="glass-panel flex items-center gap-3 px-5 py-4">
              <Search className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search an estate, building, architect, or neighborhood…"
                className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground/70 text-sm md:text-base font-light tracking-wide"
                aria-label="Search buildings"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Property Type Toggle */}
          <div className="flex p-1 bg-primary/5 border border-primary/10 rounded-full w-fit">
            <button
              onClick={() => setPropertyFilter("all")}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all ${
                propertyFilter === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPropertyFilter("condo")}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all ${
                propertyFilter === "condo"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Residences
            </button>
            <button
              onClick={() => setPropertyFilter("house")}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all ${
                propertyFilter === "house"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Signature Estates
            </button>
          </div>
        </div>

        {/* Building grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 border border-primary/10">
          {results.length === 0 ? (
            <div className="col-span-full bg-background p-16 text-center">
              <p className="serif text-2xl text-foreground mb-3">
                No matches in our current index.
              </p>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Our private list extends beyond what we publish. Request a
                consultation to discuss the building you have in mind.
              </p>
            </div>
          ) : (
            results.map((b) => (
              <Link
                key={b.slug}
                to={`/building/${b.slug}`}
                className="group bg-background p-8 md:p-10 text-left hover:bg-secondary/40 transition-colors duration-700"
              >
                <div className="flex items-center gap-3 mb-6 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.3em]">
                    {b.neighborhood} · {b.city}
                  </span>
                </div>
                <h3 className="serif text-2xl md:text-3xl mb-2 text-foreground group-hover:text-primary transition-colors duration-500">
                  {b.name}
                </h3>
                <p className="text-sm text-muted-foreground/80 mb-6 font-light">
                  {b.propertyType === "house" || b.propertyType === "enclave" 
                    ? `Private Estate · ${b.neighborhood}` 
                    : `${b.architect} · ${b.year}`}
                </p>
                <div className="hairline mb-6" />
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70 mb-1">
                      Guide from
                    </div>
                    <div className="text-foreground font-light">
                      {formatPrice(b.priceRange.saleMin)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70 mb-1">
                      {b.propertyType === "house" ? "Lot size" : "Type"}
                    </div>
                    <div className="text-foreground font-light">
                      {b.propertyType === "house" ? "Signature" : "Residence"}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <p className="mt-8 text-xs text-muted-foreground/60 italic max-w-2xl">
          Building information is editorial and non-MLS. Live availability is
          verified through licensed partners after inquiry.
        </p>
      </div>
    </section>
  );
};

export default BuildingSearch;
