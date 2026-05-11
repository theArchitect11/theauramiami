import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Compass, HandCoins, Home, KeyRound } from "lucide-react";
import HeroBackground from "./HeroBackground";
import { buildExplorePath, resolveIntentFromPath } from "@/lib/intent";

const commandLinks = [
  {
    label: "Buy",
    intent: "buy",
    detail: "Private purchase route",
    Icon: Home,
  },
  {
    label: "Rent",
    intent: "lease",
    detail: "Lease strategy, no noise",
    Icon: KeyRound,
  },
  {
    label: "Sell",
    intent: "sell",
    detail: "Quiet seller execution",
    Icon: HandCoins,
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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 flex w-full flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8">
        <p className="animate-fade-in mb-7 text-[9px] uppercase tracking-[0.35em] text-primary/90 sm:mb-10 sm:text-[10px] sm:tracking-[0.45em]">
          The Aura Miami Private Gateway
        </p>

        <h1 className="serif mx-auto mb-6 animate-fade-up text-foreground sm:mb-8">
          <span className="block text-[2.6rem] leading-[1.02] tracking-tight min-[390px]:text-[3rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem]">
            Built for
          </span>
          <span className="gold-text block text-[2.6rem] italic leading-[1.02] tracking-tight min-[390px]:text-[3rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem]">
            <span className="block sm:inline">the decisive move</span>
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-xs animate-fade-up text-sm font-light leading-relaxed tracking-wide text-foreground/72 sm:mb-10 sm:max-w-md sm:text-base md:max-w-xl md:text-lg">
          <span className="block">Buy, rent, or sell with a single private system.</span>
          <span className="block">No portal noise. No scattered advice.</span>
        </p>

        <div className="flex w-full max-w-sm animate-fade-up flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={() => navigate(buildExplorePath(intent))}
            className="group inline-flex min-h-14 items-center justify-center gap-3 border border-primary/60 bg-[linear-gradient(135deg,hsl(var(--midnight)/0.82),hsl(var(--midnight-deep)/0.7))] px-7 py-4 text-[10px] uppercase tracking-[0.24em] text-primary shadow-[0_18px_60px_-34px_hsl(var(--gold)/0.95)] backdrop-blur transition-all duration-500 hover:border-primary hover:bg-background/24 hover:shadow-gold sm:min-h-12 sm:px-9 sm:text-[11px] sm:tracking-[0.28em]"
          >
            <Compass className="h-3.5 w-3.5" strokeWidth={1.5} />
            Begin Private Search
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </button>
          <button
            type="button"
            onClick={() => navigate(buildExplorePath(intent, "areas"))}
            className="min-h-14 border border-primary/20 px-4 text-[10px] uppercase tracking-[0.24em] text-foreground/68 transition-colors duration-300 hover:text-primary sm:min-h-12 sm:border-0 sm:text-[11px] sm:tracking-[0.28em]"
          >
            Explore Areas
          </button>
        </div>

        <p className="mt-6 animate-fade-up text-[9px] uppercase tracking-[0.22em] text-foreground/52 sm:text-[10px]">
          Quiet. Fast. Private.
        </p>

        <div className="mt-8 grid w-full max-w-4xl animate-fade-up gap-2 sm:mt-10 sm:grid-cols-3">
          {commandLinks.map(({ label, detail, Icon, intent }) => (
            <button
              key={intent}
              type="button"
              onClick={() => navigate(buildExplorePath(intent))}
              className="group flex min-h-[82px] items-center justify-between gap-4 border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--midnight)/0.48),hsl(var(--midnight-deep)/0.42))] px-4 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_60px_-44px_hsl(var(--gold)/0.8)] backdrop-blur-md transition-all duration-300 hover:border-primary/55 hover:bg-background/72 sm:min-h-[96px] sm:px-5"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="serif block text-xl leading-none text-foreground transition-colors group-hover:text-primary">
                    {label}
                  </span>
                  <span className="mt-2 block text-[9px] uppercase leading-relaxed tracking-[0.18em] text-foreground/52">
                    {detail}
                  </span>
                </span>
              </span>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 text-primary/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 animate-fade-in flex-col items-center gap-2">
        <span className="text-[8px] uppercase tracking-[0.4em] text-foreground/35">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-primary/50 to-transparent" />
      </div>

      <div className="hairline absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default Hero;
