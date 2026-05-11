import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Compass,
  Gem,
  Home,
  KeyRound,
  Landmark,
  MapPinned,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import ConsultationForm from "./ConsultationForm";
import { buildConsultationPath, buildExplorePath, resolveIntentFromPath } from "@/lib/intent";
import heroInterior from "@/assets/hero-3.jpg";
import skyline from "@/assets/hero-4.jpg";
import balHarbour from "@/assets/areas/bal-harbour.jpg";
import brickell from "@/assets/areas/brickell.jpg";
import coconutGrove from "@/assets/areas/coconut-grove.jpg";
import keyBiscayne from "@/assets/areas/key-biscayne.jpg";
import sunnyIsles from "@/assets/areas/sunny-isles-aerial.jpg";

const editorialSlides = [
  {
    issue: "AURA / Home Issue 01",
    side: "Private Miami residence intelligence. Edited for clarity, not noise.",
    kicker: "The Market Has Changed",
    title: "Miami is no longer one market.",
    body: "It is a layered luxury map: resort coastline, financial core, private islands, cultural retail districts, estate corridors, and branded residential towers. AURA reads those layers before asking you to choose a property.",
    image: heroInterior,
    caption: "View, privacy, service, timing",
  },
  {
    issue: "AURA / Home Issue 02",
    side: "The best decisions start with geography, then narrow into building logic.",
    kicker: "The City Became Layered",
    title: "Luxury now moves by corridor.",
    body: "Bal Harbour is not Brickell. Coconut Grove is not Sunny Isles. Miami Worldcenter, Faena, Design District, and the islands each create a different buyer psychology and value story.",
    image: skyline,
    caption: "Infrastructure, scarcity, culture",
  },
  {
    issue: "AURA / Home Issue 03",
    side: "AURA turns the public search into a cleaner private sequence.",
    kicker: "The Search Gets Edited",
    title: "The search becomes private.",
    body: "No random feed, no scattered decisions. The sequence is area, building, residence, timing, then private negotiation context.",
    image: brickell,
    caption: "Area, building, residence, inquiry",
  },
];

const issueNav = [
  { label: "Evolution", href: "#miami-evolution" },
  { label: "Method", href: "#process" },
  { label: "Market Layers", href: "#areas" },
  { label: "Private Path", href: "#client-paths" },
];

const evolution = [
  {
    label: "Shoreline",
    title: "The resort coastline became a residential asset.",
    body: "The old Miami story was beach access. The sharper reading is now view control, service depth, and which buildings can hold long-term relevance.",
  },
  {
    label: "Finance",
    title: "Brickell moved from district to gravity center.",
    body: "Corporate migration, branded residences, and walkable density changed how buyers evaluate central Miami.",
  },
  {
    label: "Design",
    title: "Retail, hospitality, and art started shaping value.",
    body: "Bal Harbour, the Design District, Faena, and Miami Worldcenter made lifestyle infrastructure part of the real estate equation.",
  },
  {
    label: "Privacy",
    title: "Islands and estate pockets became their own language.",
    body: "Waterfront privacy, dockage, lot rarity, and access control are read differently from tower inventory.",
  },
  {
    label: "Discipline",
    title: "The best move depends on the layer, not the hype.",
    body: "Trend context comes first. Exact appreciation data should be verified by area, building, line, and closing history before a client decision.",
  },
];

const method = [
  {
    icon: MapPinned,
    title: "Area",
    body: "Start with the corridor: shoreline, urban core, island, village, estate, or emerging waterfront.",
  },
  {
    icon: Building2,
    title: "Building",
    body: "Read the service profile, construction quality, ownership mix, views, amenities, and future supply nearby.",
  },
  {
    icon: Home,
    title: "Residence",
    body: "Narrow to the exact line, exposure, floor height, condition, carrying cost, and exit logic.",
  },
  {
    icon: ShieldCheck,
    title: "Private Inquiry",
    body: "Move quietly through availability, negotiation context, and seller or landlord motivation.",
  },
];

const marketLayers = [
  {
    label: "Northern Shore",
    title: "Sunny Isles, Bal Harbour, Surfside, Bay Harbor",
    body: "A luxury coastline built around towers, retail access, quiet villages, and oceanfront service.",
    image: sunnyIsles,
  },
  {
    label: "Urban Core",
    title: "Downtown, Brickell, Edgewater, Miami River",
    body: "High-density Miami where finance, branded residences, bay views, and walkability create a different buyer profile.",
    image: brickell,
  },
  {
    label: "Beach Axis",
    title: "SoFi, Venetian Islands, Faena, Fisher Island",
    body: "Global lifestyle demand, island privacy, hospitality culture, and limited waterfront inventory.",
    image: balHarbour,
  },
  {
    label: "Grove and Gables",
    title: "Coconut Grove, Coral Gables, estate enclaves",
    body: "Canopy streets, generational wealth, Mediterranean architecture, school proximity, and larger land logic.",
    image: coconutGrove,
  },
  {
    label: "Southern Estates",
    title: "Key Biscayne, Pinecrest, Old Cutler, Deering Bay",
    body: "Resort atmosphere, family estate living, marina access, golf, and long-hold residential privacy.",
    image: keyBiscayne,
  },
];

const paths = [
  {
    icon: Home,
    label: "Buy",
    cta: "Start Buying",
    title: "Find the right layer before the right residence.",
    body: "A disciplined path through areas, buildings, inventory, and private inquiry.",
    to: buildExplorePath("buy"),
  },
  {
    icon: KeyRound,
    label: "Rent",
    cta: "Start Renting",
    title: "Lease with the same standard as ownership.",
    body: "Match lifestyle, building service, timing, and negotiation context before touring.",
    to: buildExplorePath("lease"),
  },
  {
    icon: Landmark,
    label: "Sell",
    cta: "Start Selling",
    title: "Position the residence before it reaches the market.",
    body: "Read the buyer pool, the competing inventory, and the story the listing has to own.",
    to: buildConsultationPath("sell", { interest: "Selling strategy consultation" }),
  },
];

const trustLayer = [
  {
    label: "Disclosure",
    title: "Editorial guide, licensed execution.",
    body: "AURA is a private residence intelligence and inquiry layer. Real estate services are routed through appropriate licensed brokerage partners where required.",
  },
  {
    label: "Response",
    title: "The first reply should reduce uncertainty.",
    body: "A useful response clarifies the goal, the market layer, the likely path, and what must be verified before any showing or negotiation.",
  },
  {
    label: "Verification",
    title: "Availability is checked privately.",
    body: "Pricing, rental status, property details, seller motivation, and building context are verified before clients rely on them.",
  },
  {
    label: "Privacy",
    title: "The client path stays controlled.",
    body: "Buy, rent, and sell inquiries are handled as focused strategy conversations, not generic lead forms.",
  },
];

const HomeMagazine = () => {
  const location = useLocation();
  const rawIntent = new URLSearchParams(location.search).get("intent");
  const currentIntent = resolveIntentFromPath(location.pathname, rawIntent);
  const atlasPath = `/geography?intent=${currentIntent}#geography`;
  const sliderRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const easedProgressRef = useRef(0);
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isWide, setIsWide] = useState(false);
  const activeSlide = Math.min(
    editorialSlides.length - 1,
    Math.max(0, Math.round(sliderProgress * (editorialSlides.length - 1))),
  );
  const slideTranslate = sliderProgress * (editorialSlides.length - 1) * 100;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const syncMedia = () => setIsWide(media.matches);
    syncMedia();
    media.addEventListener("change", syncMedia);
    return () => media.removeEventListener("change", syncMedia);
  }, []);

  useEffect(() => {
    let readFrame = 0;
    let animationFrame = 0;

    const animateProgress = () => {
      const current = easedProgressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * 0.14;
      const settled = Math.abs(next - target) < 0.001;
      const eased = settled ? target : next;

      easedProgressRef.current = eased;
      setSliderProgress((previous) =>
        Math.abs(previous - eased) > 0.0008 ? eased : previous,
      );

      if (settled) {
        animationFrame = 0;
        return;
      }

      animationFrame = window.requestAnimationFrame(animateProgress);
    };

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      }
    };

    const updateTargetProgress = () => {
      const section = sliderRef.current;
      if (!section || !isWide) {
        targetProgressRef.current = 0;
        easedProgressRef.current = 0;
        setSliderProgress(0);
        readFrame = 0;
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const nextProgress =
        scrollableDistance > 0 ? Math.min(1, Math.max(0, -rect.top / scrollableDistance)) : 0;

      targetProgressRef.current = nextProgress;
      startAnimation();
      readFrame = 0;
    };

    const requestUpdate = () => {
      if (readFrame) return;
      readFrame = window.requestAnimationFrame(updateTargetProgress);
    };

    updateTargetProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (readFrame) window.cancelAnimationFrame(readFrame);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isWide]);

  const goToSlide = (index: number) => {
    const target = Math.min(editorialSlides.length - 1, Math.max(0, index));

    if (isWide && sliderRef.current) {
      const section = sliderRef.current;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const targetTop =
        sectionTop + (scrollableDistance * target) / (editorialSlides.length - 1);

      window.scrollTo({ top: targetTop, behavior: "smooth" });
      return;
    }

    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: trackRef.current.clientWidth * target,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-[#f7f3ea] text-[#0b3e46]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0b3e46]/18 to-transparent" />

      <section
        id="strategy"
        ref={sliderRef}
        className="relative scroll-mt-28 lg:h-[335vh]"
      >
        <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto lg:h-full lg:snap-none lg:overflow-visible"
            style={
              isWide
                ? {
                    width: `${editorialSlides.length * 100}vw`,
                    transform: `translate3d(-${slideTranslate}vw, 0, 0)`,
                    willChange: "transform",
                  }
                : undefined
            }
          >
            {editorialSlides.map((slide, slideIndex) => (
              <article
                key={slide.issue}
                className="min-h-[100svh] w-screen shrink-0 snap-start px-5 py-16 sm:px-6 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pb-36 lg:pt-24"
              >
                <div className="container mx-auto">
                  <div className="grid gap-10 lg:grid-cols-[0.55fr_1.25fr_0.85fr] lg:gap-14">
                    <aside className="border-y border-[#0b3e46]/15 py-5 lg:border-y-0 lg:border-r lg:pr-8">
                      <p className="text-[10px] uppercase tracking-[0.34em] text-[#b1842e]">
                        {slide.issue}
                      </p>
                      <div className="mt-8 hidden h-px w-full bg-[#0b3e46]/15 lg:block" />
                      <p className="mt-8 max-w-xs text-xs uppercase leading-loose tracking-[0.22em] text-[#0b3e46]/55">
                        {slide.side}
                      </p>
                    </aside>

                    <div>
                      <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[#b1842e]">
                        {slide.kicker}
                      </p>
                      <h2 className="serif max-w-4xl text-5xl leading-[0.95] text-[#0b3e46] sm:text-6xl md:text-7xl xl:text-8xl">
                        {slide.title}
                      </h2>
                      <p className="mt-7 max-w-2xl text-base leading-8 text-[#0b3e46]/70 md:text-lg">
                        {slide.body}
                      </p>
                    </div>

                    <figure className="relative min-h-[340px] overflow-hidden border border-[#0b3e46]/15 bg-[#0b3e46] lg:min-h-[380px]">
                      <img
                        src={slide.image}
                        alt={`${slide.kicker} editorial visual`}
                        className="h-full min-h-[340px] w-full object-cover lg:min-h-[380px]"
                        loading={slideIndex === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b3e46]/45 via-transparent to-transparent" />
                      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[10px] uppercase tracking-[0.24em] text-white/78">
                        {slide.caption}
                      </figcaption>
                    </figure>
                  </div>

                </div>
              </article>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-6 z-10 hidden px-5 sm:px-6 lg:block">
            <div className="container mx-auto">
              <nav
                className="pointer-events-auto grid overflow-hidden border-y border-[#0b3e46]/15 bg-[#f7f3ea]/90 shadow-[0_18px_60px_-42px_rgba(11,62,70,0.45)] backdrop-blur md:grid-cols-4"
                aria-label="Homepage sections"
              >
                {issueNav.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-[72px] items-center justify-between gap-4 border-r border-[#0b3e46]/12 px-5 py-4 transition-colors hover:bg-white last:border-r-0"
                  >
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.24em] text-[#b1842e]">
                        0{index + 1}
                      </span>
                      <span className="mt-2 block text-[11px] uppercase tracking-[0.22em] text-[#0b3e46]/70">
                        {item.label}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-[#b1842e] transition-transform group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-5 right-5 z-10 hidden items-center justify-between lg:flex">
            <button
              type="button"
              onClick={() => goToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center border border-[#0b3e46]/20 bg-[#f7f3ea]/85 text-[#0b3e46] backdrop-blur transition-colors hover:border-[#b1842e] hover:text-[#b1842e] disabled:pointer-events-none disabled:opacity-25"
              aria-label="Previous editorial slide"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => goToSlide(activeSlide + 1)}
              disabled={activeSlide === editorialSlides.length - 1}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center border border-[#0b3e46]/20 bg-[#f7f3ea]/85 text-[#0b3e46] backdrop-blur transition-colors hover:border-[#b1842e] hover:text-[#b1842e] disabled:pointer-events-none disabled:opacity-25"
              aria-label="Next editorial slide"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="pointer-events-none absolute right-8 top-28 z-10 hidden lg:flex">
            <div className="pointer-events-auto flex items-center gap-3 border border-[#0b3e46]/15 bg-[#f7f3ea]/85 px-4 py-3 backdrop-blur">
              {editorialSlides.map((slide, index) => (
                <button
                  key={slide.issue}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 transition-all ${
                    activeSlide === index ? "w-10 bg-[#b1842e]" : "w-5 bg-[#0b3e46]/25"
                  }`}
                  aria-label={`Go to editorial slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="px-5 pb-8 sm:px-6 lg:hidden">
            <div className="mb-6 flex justify-center gap-3">
              {editorialSlides.map((slide, index) => (
                <button
                  key={slide.issue}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className="h-10 min-w-10 border border-[#0b3e46]/15 px-3 text-[10px] uppercase tracking-[0.18em] text-[#0b3e46]/65"
                  aria-label={`Go to editorial slide ${index + 1}`}
                >
                  0{index + 1}
                </button>
              ))}
            </div>

            <nav
              className="grid border-y border-[#0b3e46]/15 md:grid-cols-4"
              aria-label="Homepage sections"
            >
              {issueNav.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-16 items-center justify-between gap-4 border-b border-[#0b3e46]/15 px-4 py-4 transition-colors hover:bg-white md:border-b-0 md:border-r last:md:border-r-0"
                >
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.24em] text-[#b1842e]">
                      0{index + 1}
                    </span>
                    <span className="mt-2 block text-[11px] uppercase tracking-[0.22em] text-[#0b3e46]/70">
                      {item.label}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-[#b1842e] transition-transform group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section id="miami-evolution" className="scroll-mt-28 px-5 py-16 sm:px-6 md:py-24">
        <div className="container mx-auto">
          <div className="reveal mb-10 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-[#b1842e]">
                Miami Evolution
              </p>
              <h2 className="serif text-4xl leading-tight text-[#0b3e46] sm:text-5xl md:text-6xl">
                Value follows infrastructure, scarcity, and culture.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#0b3e46]/68 md:justify-self-end md:text-base">
              The homepage should explain why AURA exists before sending a
              visitor into neighborhoods. This section gives the buyer, renter,
              or seller a clear mental model for Miami.
            </p>
          </div>

          <div className="grid border-y border-[#0b3e46]/15 lg:grid-cols-5">
            {evolution.map((item, index) => (
              <article
                key={item.label}
                className="min-h-[270px] border-b border-[#0b3e46]/15 px-5 py-7 transition-colors hover:bg-white lg:border-b-0 lg:border-r last:lg:border-r-0"
              >
                <div className="mb-10 flex items-center justify-between gap-4">
                  <span className="text-[10px] uppercase tracking-[0.26em] text-[#b1842e]">
                    {item.label}
                  </span>
                  <span className="serif text-3xl text-[#0b3e46]/22">0{index + 1}</span>
                </div>
                <h3 className="serif text-2xl leading-tight text-[#0b3e46]">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-[#0b3e46]/64">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 md:py-16">
        <div className="container mx-auto">
          <div className="grid overflow-hidden border border-[#0b3e46]/15 bg-white lg:grid-cols-[1.08fr_0.92fr]">
            <figure className="relative min-h-[420px]">
              <img
                src={skyline}
                alt="Miami skyline over Biscayne Bay"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b3e46]/15 via-transparent to-[#0b3e46]/55" />
            </figure>
            <div className="flex flex-col justify-between p-6 sm:p-8 md:p-12">
              <div>
                <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[#b1842e]">
                  Editorial Position
                </p>
                <h2 className="serif max-w-xl text-4xl leading-tight text-[#0b3e46] sm:text-5xl">
                  A luxury search should feel calm before it feels fast.
                </h2>
                <p className="mt-6 max-w-xl text-sm leading-7 text-[#0b3e46]/68 md:text-base">
                  The public portals show everything at once. AURA turns the
                  search into a sequence: understand the market layer, choose
                  the corridor, study the building, then move privately.
                </p>
              </div>
              <div className="mt-10 grid gap-px border border-[#0b3e46]/15 bg-[#0b3e46]/15 sm:grid-cols-3">
                {["No portal noise", "Building first", "Private context"].map((label) => (
                  <div key={label} className="bg-[#f7f3ea] px-4 py-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#0b3e46]/62">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-28 bg-[radial-gradient(circle_at_12%_0%,rgba(34,150,168,0.28),transparent_38%),linear-gradient(145deg,#0c4b55_0%,#052f38_74%)] px-5 py-16 text-white sm:px-6 md:py-24">
        <div className="container mx-auto">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[#d8b56d]">
                The AURA Method
              </p>
              <h2 className="serif text-4xl leading-tight sm:text-5xl md:text-6xl">
                From area story to private inquiry.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/65 md:justify-self-end md:text-base">
              This is the discipline underneath the design. Each decision gets
              narrower and more precise, so the client is not thrown into random
              listings.
            </p>
          </div>

          <div className="reveal mt-12 grid border-y border-[#d8b56d]/25 md:grid-cols-4">
            {method.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="border-b border-[#d8b56d]/20 px-5 py-7 md:border-b-0 md:border-r last:md:border-r-0"
                >
                  <div className="mb-9 flex items-center justify-between">
                    <Icon className="h-6 w-6 text-[#d8b56d]" strokeWidth={1.4} />
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="serif text-3xl text-white">{item.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-white/62">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="areas" className="scroll-mt-28 px-5 py-16 sm:px-6 md:py-24">
        <div className="container mx-auto">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[#b1842e]">
                North To South
              </p>
              <h2 className="serif text-4xl leading-tight text-[#0b3e46] sm:text-5xl">
                The map belongs on its own page. The homepage only previews the logic.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#0b3e46]/65">
                Each layer needs different advice. Oceanfront towers are not
                estate pockets. Brickell is not Bal Harbour. Coconut Grove is
                not Sunny Isles.
              </p>
              <Link
                to={atlasPath}
                className="group mt-8 inline-flex min-h-12 items-center gap-3 border border-[#b1842e] px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#0b3e46] transition-colors hover:bg-[#0b3e46] hover:text-white"
              >
                Open the atlas
                <Compass
                  className="h-4 w-4 text-[#b1842e] transition-transform group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </Link>
            </aside>

            <div className="divide-y divide-[#0b3e46]/15 border-y border-[#0b3e46]/15">
              {marketLayers.map((layer, index) => (
                <article
                  key={layer.label}
                  className="group grid gap-5 py-6 md:grid-cols-[170px_1fr_0.95fr] md:items-center md:gap-8"
                >
                  <figure className="relative h-44 overflow-hidden bg-[#0b3e46] md:h-32">
                    <img
                      src={layer.image}
                      alt={`${layer.label} Miami luxury area`}
                      className="h-full w-full object-cover grayscale-[18%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0b3e46]/18 transition-opacity group-hover:opacity-0" />
                  </figure>
                  <div>
                    <div className="mb-3 flex items-center gap-4">
                      <span className="serif text-3xl text-[#0b3e46]/22">0{index + 1}</span>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-[#b1842e]">
                        {layer.label}
                      </span>
                    </div>
                    <h3 className="serif text-3xl leading-tight text-[#0b3e46]">
                      {layer.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-[#0b3e46]/64">{layer.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="client-paths" className="px-5 py-16 sm:px-6 md:py-24">
        <div className="container mx-auto">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[#b1842e]">
                Choose The Path
              </p>
              <h2 className="serif max-w-3xl text-4xl leading-tight text-[#0b3e46] sm:text-5xl md:text-6xl">
                One homepage. Three disciplined next moves.
              </h2>
            </div>
            <Link
              to={buildExplorePath(currentIntent)}
              className="group inline-flex w-fit min-h-12 items-center gap-3 border border-[#0b3e46]/25 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#0b3e46] transition-colors hover:border-[#b1842e] hover:bg-white"
            >
              Explore inventory
              <ArrowRight
                className="h-4 w-4 text-[#b1842e] transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>

          <div className="grid border-y border-[#0b3e46]/15 md:grid-cols-3">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.label}
                  to={path.to}
                  className="group flex min-h-[300px] flex-col justify-between border-b border-[#0b3e46]/15 px-6 py-7 transition-colors hover:bg-white md:border-b-0 md:border-r last:md:border-r-0"
                >
                  <div>
                    <div className="mb-9 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#b1842e]">
                        {path.label}
                      </span>
                      <Icon className="h-6 w-6 text-[#b1842e]" strokeWidth={1.4} />
                    </div>
                    <h3 className="serif text-3xl leading-tight text-[#0b3e46]">
                      {path.title}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-[#0b3e46]/64">{path.body}</p>
                  </div>
                  <span className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[#0b3e46]/70">
                    {path.cta}
                    <ArrowRight
                      className="h-4 w-4 text-[#b1842e] transition-transform group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#0b3e46]/10 bg-white/50 px-5 py-16 sm:px-6 md:py-24">
        <div className="container mx-auto">
          <div className="mb-10 grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:items-end">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[#b1842e]">
                Why AURA
              </p>
              <h2 className="serif text-4xl leading-tight text-[#0b3e46] sm:text-5xl md:text-6xl">
                The luxury is not more listings. It is a clearer path.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#0b3e46]/68 md:justify-self-end md:text-base">
              The final question before inquiry is simple: what happens next?
              This section makes the product promise explicit before a client
              sends personal information.
            </p>
          </div>

          <div className="reveal grid border-y border-[#0b3e46]/15 md:grid-cols-4">
            {trustLayer.map((item, index) => (
              <article
                key={item.label}
                className="border-b border-[#0b3e46]/15 px-5 py-7 transition-colors hover:bg-white md:border-b-0 md:border-r last:md:border-r-0"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="text-[10px] uppercase tracking-[0.26em] text-[#b1842e]">
                    {item.label}
                  </span>
                  <span className="serif text-3xl text-[#0b3e46]/22">0{index + 1}</span>
                </div>
                <h3 className="serif text-2xl leading-tight text-[#0b3e46]">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-[#0b3e46]/64">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="scroll-mt-28 bg-[radial-gradient(circle_at_85%_0%,rgba(216,181,109,0.16),transparent_34%),linear-gradient(145deg,#0c4b55_0%,#052f38_76%)] px-5 py-16 text-white sm:px-6 md:py-24">
        <div className="container mx-auto">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[#d8b56d]">
                Private Consultation
              </p>
              <h2 className="serif text-4xl leading-tight sm:text-5xl md:text-6xl">
                Bring the question. We will map the move.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 md:text-base">
                Use the form for buy, rent, sell, relocation, or investment.
                The first response should clarify the objective, the preferred
                layer of Miami, and the next private step.
              </p>
              <div className="mt-10 grid gap-px border border-[#d8b56d]/25 bg-[#d8b56d]/25 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { icon: Gem, label: "Luxury retail standard" },
                  { icon: TrendingUp, label: "Market context first" },
                  { icon: ShieldCheck, label: "Discretion by default" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 bg-[#0b3e46]/80 px-4 py-4 backdrop-blur">
                      <Icon className="h-4 w-4 text-[#d8b56d]" strokeWidth={1.5} />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/62">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <ConsultationForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeMagazine;
