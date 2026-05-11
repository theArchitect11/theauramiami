import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AREAS } from "@/data/areas";
import AreaImage from "./AreaImage";
import { buildExplorePath, normalizeIntent } from "@/lib/intent";

const featuredAreaSlugs = [
  "sunny-isles",
  "coral-gables",
  "bal-harbour",
  "design-district",
  "brickell",
];

const AreaExplorer = () => {
  const location = useLocation();
  const currentIntent = normalizeIntent(new URLSearchParams(location.search).get("intent"));

  const featuredAreas = featuredAreaSlugs
    .map((slug) => AREAS.find((area) => area.slug === slug))
    .filter((area): area is (typeof AREAS)[number] => Boolean(area));

  return (
    <section
      id="areas"
      className="relative overflow-hidden border-y border-primary/10 bg-background py-20 scroll-mt-32 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container mx-auto px-5 sm:px-6 relative">
        <div className="mb-10 md:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5 text-[10px] sm:text-xs md:mb-6">AURA Map</p>
            <h2 className="serif mb-5 text-5xl leading-[0.98] tracking-tight sm:text-6xl md:mb-6 md:text-7xl">
              Start with the corridor.<br />
              <span className="italic text-primary">Then sharpen the move.</span>
            </h2>
            <p className="text-foreground/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
              A cleaner first pass through the Miami map: oceanfront towers,
              quiet villages, estate pockets, and central high-rise corridors.
            </p>
          </div>
          <Link
            to={buildExplorePath(currentIntent)}
            className="group inline-flex w-fit items-center gap-3 border border-primary/30 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-primary transition-all hover:border-primary hover:bg-primary/10"
          >
            View all areas
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute bottom-4 left-0 top-0 z-10 w-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute bottom-4 right-0 top-0 z-10 w-10 bg-gradient-to-l from-background to-transparent" />
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:px-6 md:gap-5">
            {featuredAreas.map((area, index) => (
              <Link
                key={area.slug}
                to={`/area/${area.slug}?intent=${currentIntent}#area-index`}
                className={`group relative snap-start overflow-hidden border border-primary/15 bg-card transition-[border-color,box-shadow] duration-300 hover:border-primary/60 hover:shadow-gold ${
                  index === 0
                    ? "h-[410px] w-[84vw] shrink-0 sm:h-[500px] sm:w-[560px] lg:h-[560px] lg:w-[650px]"
                    : "h-[360px] w-[74vw] shrink-0 sm:h-[500px] sm:w-[360px] lg:h-[560px] lg:w-[410px]"
                }`}
              >
                <AreaImage
                  area={area}
                  variant="portrait"
                  className="h-full"
                />

                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-card/95 via-card/70 to-transparent">
                  <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-primary/80">
                    {area.areaType}
                  </p>
                  <h3 className={`serif text-foreground group-hover:text-primary transition-colors duration-500 leading-tight ${
                    index === 0 ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
                  }`}>
                    {area.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-foreground/75 mt-1.5 leading-snug">
                    {area.signature}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/15">
                    <span className="text-[9px] uppercase tracking-[0.24em] md:tracking-[0.3em] text-foreground/60">
                      {area.buildings.length} buildings
                    </span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary group-hover:translate-x-1 transition-all duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-px border border-primary/10 bg-primary/10 text-xs text-foreground/58 md:mt-10 md:grid-cols-3">
          {["Oceanfront towers", "Estate pockets", "Central corridors"].map((label) => (
            <div key={label} className="bg-background px-4 py-3">
              <span className="uppercase tracking-[0.2em]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreaExplorer;
