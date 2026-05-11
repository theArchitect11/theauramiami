const cards = [
  {
    num: "01",
    title: "Area Discipline",
    body: "Start with the right pocket, then remove the buildings that do not fit timing, privacy, view quality, or lifestyle pattern.",
  },
  {
    num: "02",
    title: "Residence Clarity",
    body: "Compare addresses by service profile, floor plan, exposure, ownership context, and the tradeoffs hidden behind the headline price.",
  },
  {
    num: "03",
    title: "Private Execution",
    body: "When the path is clear, we route the next step through direct inquiry, vetted specialists, and a controlled decision process.",
  },
];

const Strategy = () => {
  return (
    <section id="strategy" className="relative overflow-hidden py-20 scroll-mt-24 md:py-32">
      <div className="container mx-auto px-6 relative">

        {/* Editorial header */}
        <div className="mb-14 grid gap-10 md:mb-20 md:grid-cols-2 md:items-end md:gap-20">
          <div>
            <p className="eyebrow mb-6">Strategy</p>
            <h2 className="serif text-5xl leading-[0.98] tracking-tight md:text-7xl">
              The discipline is<br />
              in the <span className="italic gold-text">filter.</span>
            </h2>
          </div>
          <p className="text-base font-light leading-relaxed text-foreground/64 md:pb-2 md:text-lg">
            Every move begins with restraint: fewer choices, sharper context,
            and a cleaner route to the residence that actually fits.
          </p>
        </div>

        {/* Editorial stacked rows */}
        <div className="divide-y divide-primary/10 border-t border-primary/10">
          {cards.map((card) => (
            <div
              key={card.num}
              className="group grid md:grid-cols-[100px_1fr_1.4fr] gap-6 md:gap-12 py-10 md:py-12 items-start transition-colors duration-300 hover:bg-primary/[0.02]"
            >
              <span className="serif text-5xl leading-none text-primary/45 transition-colors duration-500 group-hover:text-primary md:text-6xl">
                {card.num}
              </span>
              <h3 className="serif text-2xl md:text-3xl text-foreground pt-1">
                {card.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed text-sm md:text-base font-light pt-1">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strategy;
