import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Handshake, Layers, Sparkles } from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";
import { JOURNAL_ARTICLES, JOURNAL_CATEGORIES } from "@/data/journal";

const collaborationTracks = [
  {
    icon: Layers,
    title: "Interior design and architecture",
    body: "Profiles, studio conversations, material palettes, renovation notes, and post-closing design roadmaps.",
  },
  {
    icon: Sparkles,
    title: "Lifestyle and cultural partners",
    body: "Art advisors, private chefs, wellness operators, galleries, restaurants, and neighborhood tastemakers.",
  },
  {
    icon: Handshake,
    title: "Developer and building media",
    body: "Official brochures, galleries, amenity stories, and verified building assets requested directly from the source.",
  },
];

const JournalPage = () => {
  const [heroArticle, ...allArticles] = JOURNAL_ARTICLES;
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const articles = activeCategory === "All"
    ? allArticles
    : allArticles.filter((a) => a.category === activeCategory);

  useEffect(() => {
    document.title = "Journal | The Aura Miami";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "The Aura Miami Journal — design, architecture, lifestyle, and market intelligence from Miami's most distinctive neighborhoods.");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://theauramiami.com/journal";
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Journal | The Aura Miami");
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://theauramiami.com/journal");
  }, []);

  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <Navbar />

      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 border-b border-primary/10 overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Home
          </Link>

          <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-10 md:gap-14 items-end">
            <div>
              <p className="eyebrow mb-5 text-[10px] sm:text-xs">The Aura Journal</p>
              <h1 className="serif text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-8">
                Miami residences,{" "}
                <span className="italic text-primary">read like culture.</span>
              </h1>
              <p className="text-foreground/75 text-base md:text-lg leading-relaxed font-light">
                A magazine-style layer for new developments, architecture,
                neighborhood signals, interior design, and private residence
                collaborations.
              </p>
            </div>

            <Link
              to={`/journal/${heroArticle.slug}`}
              className="group relative min-h-[420px] overflow-hidden border border-primary/15 bg-card md:min-h-[500px]"
            >
              <img
                src={heroArticle.image}
                alt={heroArticle.title}
                width={1280}
                height={896}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                <div className="flex flex-wrap items-center gap-3 mb-5 text-[10px] uppercase tracking-[0.22em] text-primary">
                  <span>{heroArticle.category}</span>
                  <span className="h-px w-8 bg-primary/45" />
                  <span>{heroArticle.signal}</span>
                </div>
                <h2 className="serif text-3xl md:text-5xl leading-tight mb-4">
                  {heroArticle.title}
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-foreground/75 max-w-2xl">
                  {heroArticle.dek}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 border-b border-primary/10">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="flex flex-wrap gap-3">
            {["All", ...JOURNAL_CATEGORIES].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
                  activeCategory === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/18 bg-card/55 text-foreground/70 hover:border-primary/45 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6">
          {articles.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No articles in this category yet.
            </p>
          )}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/journal/${article.slug}`}
                className="group border border-primary/12 bg-card/65 hover:border-primary/45 transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.08]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4 mb-5 text-[10px] uppercase tracking-[0.22em] text-primary/80">
                    <span>{article.category}</span>
                    <span className="text-foreground/45">{article.date} · {article.readTime}</span>
                  </div>
                  <h2 className="serif text-3xl leading-tight mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-6">{article.dek}</p>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary">
                    Editorial brief <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y border-primary/10 bg-card/25">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="eyebrow mb-5 text-[10px] sm:text-xs">Collaborations</p>
            <h2 className="serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              The editorial layer becomes a{" "}
              <span className="italic text-primary">partner network.</span>
            </h2>
            <p className="text-foreground/75 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              The Aura Miami can invite buildings, designers, architects, and
              lifestyle collaborators into the story while keeping inquiries
              routed through the proper licensed partners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {collaborationTracks.map((track) => (
              <div key={track.title} className="border border-primary/12 bg-background/55 p-7 md:p-8">
                <track.icon className="w-5 h-5 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="serif text-2xl md:text-3xl mb-4">{track.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{track.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default JournalPage;
