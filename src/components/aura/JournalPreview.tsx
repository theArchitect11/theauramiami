import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/data/journal";

const articles = JOURNAL_ARTICLES.slice(0, 3);

const JournalPreview = () => {
  const [lead, ...rest] = articles;

  return (
    <section id="journal" className="relative py-24 md:py-32 border-t border-primary/10 scroll-mt-32">
      <div className="container mx-auto px-5 sm:px-6">

        {/* Editorial header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <div>
            <p className="eyebrow mb-5 text-[10px] sm:text-xs">The Journal</p>
            <h2 className="serif text-5xl md:text-7xl leading-[1.0] tracking-tight">
              Miami residences,<br />
              <span className="italic text-primary">read like culture.</span>
            </h2>
          </div>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-primary hover:text-foreground transition-colors shrink-0 md:pb-2"
          >
            Open the journal <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Magazine spread layout */}
        <div className="grid md:grid-cols-[1.6fr_1fr] gap-3 md:gap-4">

          {/* Lead article — large */}
          <Link
            to="/journal"
            className="group relative overflow-hidden bg-card"
          >
            <div className="aspect-[4/3] md:aspect-auto md:h-[540px] overflow-hidden">
              <img
                src={lead.image}
                alt={lead.title}
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <span className="text-[9px] uppercase tracking-[0.32em] text-primary/80 mb-4 block">
                {lead.category} · {lead.readTime}
              </span>
              <h3 className="serif text-3xl md:text-4xl leading-tight text-foreground group-hover:text-primary transition-colors mb-3">
                {lead.title}
              </h3>
              <p className="text-sm text-foreground/55 leading-relaxed font-light hidden md:block max-w-lg">
                {lead.dek}
              </p>
            </div>
          </Link>

          {/* Side articles — stacked */}
          <div className="flex flex-col gap-3 md:gap-4">
            {rest.map((article) => (
              <Link
                key={article.slug}
                to="/journal"
                className="group relative overflow-hidden bg-card flex-1"
              >
                <div className="aspect-[16/9] md:aspect-auto md:h-[calc(270px-8px)] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[9px] uppercase tracking-[0.32em] text-primary/75 mb-2 block">
                    {article.category} · {article.readTime}
                  </span>
                  <h3 className="serif text-xl md:text-2xl leading-tight text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default JournalPreview;
