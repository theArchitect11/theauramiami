import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { buildExplorePath, resolveIntentFromPath } from "@/lib/intent";
import balHarbour from "@/assets/areas/bal-harbour.jpg";
import brickellKey from "@/assets/areas/brickell-key.jpg";
import downtownMiami from "@/assets/areas/downtown-miami.jpg";
import keyBiscayne from "@/assets/areas/key-biscayne.jpg";
import midtown from "@/assets/areas/midtown.jpg";

const heroPanels = [
  {
    title: "Downtown\nMiami",
    body: "The urban core where capital, culture, skyline, and water converge.",
    image: downtownMiami,
    to: "/area/downtown-miami?intent=buy",
    className: "md:col-span-6 md:row-span-1",
    objectPosition: "center",
  },
  {
    title: "Branded\nWaterfront",
    body: "Design-led residences, bay frontage, service, and vertical identity.",
    image: brickellKey,
    to: "/building/aston-martin-residences?intent=buy",
    className: "md:col-span-6 md:row-span-1",
    objectPosition: "center",
  },
  {
    title: "Bal Harbour\nShops",
    body: "Luxury retail gravity, oceanfront towers, and quiet coastal prestige.",
    image: balHarbour,
    to: "/area/bal-harbour?intent=buy",
    className: "md:col-span-4 md:row-span-1",
    objectPosition: "center",
  },
  {
    title: "Private\nMarina",
    body: "Water, movement, dockage, privacy, and the rhythm of the bay.",
    image: keyBiscayne,
    to: buildExplorePath("buy", "areas"),
    className: "md:col-span-4 md:row-span-1",
    objectPosition: "center",
  },
  {
    title: "Midtown\nMiami",
    body: "Creative energy, design corridors, walkability, and modern living.",
    image: midtown,
    to: "/area/midtown?intent=buy",
    className: "md:col-span-4 md:row-span-1",
    objectPosition: "center",
  },
] as const;

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const intent = resolveIntentFromPath(
    location.pathname,
    new URLSearchParams(location.search).get("intent"),
  );

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-[#050505] pt-[78px] text-white md:pt-[86px]"
    >
      <h1 className="sr-only">
        The Aura Miami private atlas for luxury Miami real estate
      </h1>
      <div className="grid min-h-[calc(100svh-78px)] grid-cols-1 gap-px bg-white/85 md:min-h-[calc(100svh-86px)] md:grid-cols-12 md:grid-rows-[minmax(0,1.04fr)_minmax(0,0.9fr)]">
        {heroPanels.map((panel, index) => (
          <button
            key={panel.title}
            type="button"
            onClick={() => navigate(panel.to)}
            className={`group relative min-h-[320px] overflow-hidden bg-black text-left md:min-h-0 ${panel.className}`}
            aria-label={`Open ${panel.title.replace("\n", " ")}`}
          >
            <img
              src={panel.image}
              alt={`${panel.title.replace("\n", " ")} editorial view`}
              width={1280}
              height={860}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              style={{
                filter: "saturate(0.9) contrast(1.08) brightness(0.9)",
                objectPosition: panel.objectPosition,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.12)_45%,rgba(0,0,0,0.58)_100%)] transition-opacity duration-700 group-hover:opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.12),transparent_34%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-8 lg:p-10">
              <div>
                <p className="mb-5 text-[10px] uppercase tracking-[0.34em] text-white/72">
                  AURA / {String(index + 1).padStart(2, "0")}
                </p>
                <h2
                  className={`serif whitespace-pre-line text-5xl leading-[0.92] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] ${
                    index < 2 ? "sm:text-6xl xl:text-7xl" : "sm:text-5xl xl:text-6xl"
                  }`}
                >
                  {panel.title}
                </h2>
                <div className="mt-4 h-px w-10 bg-white/82" />
                <p className="mt-4 max-w-[250px] text-sm font-light leading-6 text-white/80">
                  {panel.body}
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-primary opacity-80 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                Open
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/18 bg-black/48 px-5 py-4 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1680px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-primary">
              The Aura Miami / Private Atlas
            </p>
            <p className="mt-1 max-w-xl text-sm leading-6 text-white/72">
              A magazine-style entry into Miami: geography, buildings, lifestyle,
              then private inquiry.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(buildExplorePath(intent))}
              className="group inline-flex min-h-11 items-center justify-center gap-3 border border-primary/70 bg-white/8 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Compass className="h-3.5 w-3.5" strokeWidth={1.5} />
              Begin Search
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => navigate(`/geography?intent=${intent}#geography`)}
              className="inline-flex min-h-11 items-center justify-center border border-white/24 bg-black/20 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/78 transition-colors hover:border-primary/70 hover:text-primary"
            >
              Open Atlas
            </button>
          </div>
        </div>
      </div>

      <div className="hairline absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default Hero;
