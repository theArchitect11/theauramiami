import signalImg from "@/assets/process/signal.jpg";
import strategyImg from "@/assets/process/strategy.jpg";
import actionImg from "@/assets/process/action.jpg";

const steps = [
  {
    num: "I",
    label: "Signal",
    body: "We read the move first: timing, lifestyle fit, capital position, and the market signals around your preferred areas.",
    image: signalImg,
    alt: "Private command interface with warm architectural lighting",
  },
  {
    num: "II",
    label: "Strategy",
    body: "We narrow the map into a disciplined brief: target corridors, price bands, residence types, and the right specialists.",
    image: strategyImg,
    alt: "Digital architectural strategy plan with refined lighting",
  },
  {
    num: "III",
    label: "Action",
    body: "We move through direct inquiry, verified availability, partner coordination, and a path that stays focused until decision.",
    image: actionImg,
    alt: "Modern residence access detail with luxury finish",
  },
];

const Process = () => {
  return (
    <section id="process" className="relative overflow-hidden border-y border-primary/10 py-20 scroll-mt-24 md:py-28">
      <div className="container mx-auto px-6 relative">

        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[0.85fr_1fr] md:items-end">
          <div>
            <p className="eyebrow mb-6">Process</p>
            <h2 className="serif text-5xl leading-[0.98] tracking-tight md:text-7xl">
              Signal. Strategy.<br />
              <span className="italic text-primary">Action.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/62 md:justify-self-end md:text-base">
            A private sequence designed to reduce noise before it asks for
            speed. Each step has a purpose and a next action.
          </p>
        </div>

        <div className="grid gap-px border border-primary/12 bg-primary/12 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.label}
              className="group relative min-h-[460px] overflow-hidden bg-card md:min-h-[540px]"
            >
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                width={1024}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{
                  filter:
                    "brightness(0.7) saturate(0.72) sepia(0.14) contrast(1.12)",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/10" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--gold)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--gold)/0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35 mix-blend-screen" />
              <div className="absolute left-8 right-8 top-12 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:left-10 md:right-10 md:top-14" />

              <span className="absolute right-5 top-5 select-none serif text-[7rem] leading-none text-primary/10 transition-colors duration-700 group-hover:text-primary/18 md:right-6 md:text-[9rem]">
                {s.num}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                <div className="hairline mb-5 max-w-[48px]" />
                <h3 className="serif text-3xl md:text-4xl text-foreground mb-3">
                  {s.label}
                </h3>
                <p className="text-sm font-light leading-relaxed text-foreground/64 md:text-base">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
