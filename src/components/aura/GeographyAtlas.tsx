import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Compass, Map } from "lucide-react";
import { GEOGRAPHY_BANDS } from "@/data/geography";
import { buildExplorePath, normalizeIntent } from "@/lib/intent";

const GeographyAtlas = () => {
  const location = useLocation();
  const currentIntent = normalizeIntent(new URLSearchParams(location.search).get("intent"));

  return (
    <section
      id="geography"
      className="relative overflow-hidden border-b border-primary/10 bg-secondary/10 py-20 scroll-mt-28 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--gold)/0.045)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--gold)/0.035)_1px,transparent_1px)] bg-[size:96px_96px] opacity-35" />
      <div className="container relative mx-auto px-5 sm:px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.85fr_1fr] md:items-end">
          <div>
            <p className="eyebrow mb-5 text-[10px] sm:text-xs">North to South</p>
            <h2 className="serif text-5xl leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
              Miami geography,<br />
              <span className="italic text-primary">organized.</span>
            </h2>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="text-sm leading-relaxed text-foreground/66 sm:text-base md:text-lg">
              A disciplined read of the luxury map from Golden Beach to the
              southern estate corridors. Live AURA pages are highlighted; the
              remaining pockets stay visible as market context.
            </p>
            <Link
              to={buildExplorePath(currentIntent)}
              className="mt-6 inline-flex items-center gap-3 border border-primary/30 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-primary transition-all hover:border-primary hover:bg-primary/10"
            >
              Open full map
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-px border border-primary/12 bg-primary/12">
            {GEOGRAPHY_BANDS.map((band, index) => (
              <article
                key={band.title}
                className="relative overflow-hidden bg-background/95 p-5 sm:p-6 md:p-7"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-primary/80">
                      {index === 0 ? (
                        <Compass className="h-4 w-4" strokeWidth={1.5} />
                      ) : (
                        <Map className="h-4 w-4" strokeWidth={1.5} />
                      )}
                      <span className="text-[9px] uppercase tracking-[0.24em]">
                        Band {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="serif text-3xl leading-tight text-foreground md:text-4xl">
                      {band.title}
                    </h3>
                    <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-foreground/44">
                      {band.layer}
                    </p>
                  </div>
                  <span className="serif text-5xl leading-none text-primary/12">
                    {index + 1}
                  </span>
                </div>

                <p className="mb-6 max-w-xl text-sm leading-relaxed text-foreground/62">
                  {band.signal}
                </p>

                <div className="grid gap-2 md:grid-cols-2">
                  {band.areas.map((area) =>
                    area.slug ? (
                      <Link
                        key={area.name}
                        to={`/area/${area.slug}?intent=${currentIntent}#area-index`}
                        className="group grid gap-1 border border-primary/16 bg-primary/[0.035] px-3 py-3 transition-colors hover:border-primary/45 hover:bg-primary/[0.08]"
                      >
                        <span className="text-[10px] uppercase tracking-[0.2em] text-primary">
                          {area.name}
                        </span>
                        <span className="flex items-center justify-between gap-3 text-xs leading-relaxed text-foreground/62">
                          {area.note}
                          <ArrowRight
                            className="h-3.5 w-3.5 shrink-0 text-primary/70 transition-transform group-hover:translate-x-1"
                            strokeWidth={1.5}
                          />
                        </span>
                      </Link>
                    ) : (
                      <div
                        key={area.name}
                        className="grid gap-1 border border-primary/8 px-3 py-3"
                      >
                        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/62">
                          {area.name}
                        </span>
                        <span className="text-xs leading-relaxed text-foreground/46">
                          {area.note}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden border border-primary/14 bg-background/82 p-6 shadow-elegant backdrop-blur">
              <div className="mb-8 flex items-center gap-3 text-primary">
                <Compass className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.28em]">
                  Atlas spine
                </span>
              </div>
              <div className="relative pl-6">
                <div className="absolute bottom-4 left-1 top-4 w-px bg-gradient-to-b from-primary/80 via-primary/30 to-transparent" />
                {GEOGRAPHY_BANDS.map((band, index) => {
                  const liveCount = band.areas.filter((area) => area.slug).length;
                  return (
                    <a
                      key={band.title}
                      href="#geography"
                      className="group relative mb-7 block last:mb-0"
                    >
                      <span className="absolute -left-[1.55rem] top-1 flex h-5 w-5 items-center justify-center border border-primary/40 bg-background text-[9px] text-primary">
                        {index + 1}
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-primary/80">
                        {band.layer}
                      </span>
                      <span className="serif mt-1 block text-2xl leading-tight text-foreground transition-colors group-hover:text-primary">
                        {band.title}
                      </span>
                      <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-foreground/42">
                        {liveCount} live AURA links
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default GeographyAtlas;
