import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Compass, ShieldCheck } from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";
import { JOURNAL_ARTICLES, type JournalArticle } from "@/data/journal";
import { buildConsultationPath } from "@/lib/intent";

const articleSections: Record<string, { title: string; body: string }[]> = {
  "miami-worldcenter-new-downtown-gravity": [
    {
      title: "Downtown is becoming residential, not only central.",
      body: "Miami Worldcenter changes the Downtown conversation because it adds daily gravity: hospitality, dining, retail, transit proximity, and new residential scale in one walkable district. For buyers, the question is no longer only whether a tower has views. It is whether the neighborhood can support a fuller lifestyle outside the elevator.",
    },
    {
      title: "The comparison set matters.",
      body: "Downtown should be read against Brickell, Edgewater, Miami River, and Arts & Entertainment District rather than treated as one broad map pin. A client choosing between Waldorf Astoria, One Thousand Museum, Aston Martin, or a newer Worldcenter-adjacent address needs clarity on walkability, service, completion risk, parking, and resale identity.",
    },
    {
      title: "AURA relevance.",
      body: "For buyers, this is a building-by-building due diligence conversation. For renters, it is about convenience and service. For sellers, new supply can either create stronger attention or stronger competition depending on view, line, finishes, and timing.",
    },
  ],
  "design-district-buying-signal": [
    {
      title: "Culture can change the residence decision.",
      body: "The Design District is not a conventional residential district, but its influence is real. Proximity to fashion houses, galleries, collectible design, restaurants, and architecture changes the way a nearby residence feels to a client who cares about daily cultural access, not only square footage.",
    },
    {
      title: "The strongest fit is selective.",
      body: "This signal matters most for clients comparing Midtown, Edgewater, Wynwood, Upper East Side, and select bayfront buildings. The right buyer may accept a different view or building profile if the lifestyle benefit is immediate access to design, dining, and social rhythm.",
    },
    {
      title: "AURA relevance.",
      body: "For buyers and renters, the Design District becomes a lifestyle anchor. For sellers nearby, the story is positioning: the residence should be presented through access, culture, and convenience rather than only interior specifications.",
    },
  ],
  "branded-residences-identity-systems": [
    {
      title: "Brand is no longer decoration.",
      body: "The strongest branded residences are not selling a logo. They sell a complete identity system: arrival, amenity language, materials, service behavior, hospitality rhythm, and the type of owner or tenant the building attracts.",
    },
    {
      title: "The due diligence is deeper.",
      body: "Aston Martin, Cipriani, Missoni Baia, Bentley, Armani/Casa, St. Regis, and similar projects should be evaluated by delivery quality, association rules, service depth, line quality, amenity durability, and whether the brand story supports resale after the first launch cycle.",
    },
    {
      title: "AURA relevance.",
      body: "Buyers need to know where brand strengthens value and where it creates premium without enough substance. Renters need service and lifestyle fit. Sellers need to understand whether the brand is still pulling attention or whether competing branded supply is diluting the signal.",
    },
  ],
  "private-interiors-after-closing": [
    {
      title: "The residence is not finished at closing.",
      body: "In Miami luxury, closing is often the beginning of the real design work. The best outcomes happen when interior design, art, lighting, millwork, outdoor furniture, and residence operations are considered before the client takes possession.",
    },
    {
      title: "The building controls the possibilities.",
      body: "Renovation rules, elevator access, contractor requirements, sound restrictions, balcony policies, and association approvals can affect what is practical. A beautiful plan fails if the building process is misunderstood.",
    },
    {
      title: "AURA relevance.",
      body: "For buyers, AURA can flag residences where customization is likely to be easier. For sellers, design readiness and staging can change perception. For renters, furnished quality and maintenance expectations matter more than brochure language.",
    },
  ],
  "brochures-to-buyer-intelligence": [
    {
      title: "Developer material is the start, not the answer.",
      body: "A brochure is designed to sell the project. Buyer intelligence reads behind it: stack plans, exposure, ceiling heights, deposit timing, delivery assumptions, amenity depth, parking, rental rules, competing supply, and exit logic.",
    },
    {
      title: "New development has timing risk.",
      body: "In Brickell, Downtown, Edgewater, Sunny Isles, and the Beach, new supply can be powerful when the building has a durable identity. The risk is buying a story without understanding the future comparison set at delivery.",
    },
    {
      title: "AURA relevance.",
      body: "For buyers, this brief becomes a verification checklist. For sellers in existing buildings, it helps explain how upcoming inventory may affect pricing. For investors, it frames rental logic and resale timing before deposit decisions.",
    },
  ],
  "waterfront-living-by-mood": [
    {
      title: "Waterfront is not one lifestyle.",
      body: "Bal Harbour, Surfside, Sunny Isles, Edgewater, South of Fifth, Coconut Grove, Key Biscayne, and private island pockets all offer water, but the daily experience is completely different. The right question is not only ocean or bay. It is mood, access, service, privacy, and rhythm.",
    },
    {
      title: "The map should be emotional and practical.",
      body: "Sunny Isles may fit branded oceanfront scale. Bal Harbour and Surfside may fit quiet retail and resort calm. Edgewater may fit bay views with urban access. South of Fifth may fit walkability and status. Key Biscayne may fit island privacy and resort atmosphere.",
    },
    {
      title: "AURA relevance.",
      body: "Buyers should compare waterfront by lifestyle and building rules before pricing. Renters should verify seasonality, furnishing, and service. Sellers should position the water story precisely because broad waterfront language is too generic.",
    },
  ],
};

const getArticleSections = (article: JournalArticle) =>
  articleSections[article.slug] ?? [
    {
      title: "The signal",
      body: `This brief reads ${article.signal.toLowerCase()} as a practical decision layer, not a decorative trend. The goal is to understand what the topic changes about location, building quality, timing, or client fit.`,
    },
    {
      title: "Why it matters",
      body: "Miami luxury is shaped by more than price. Culture, access, service, privacy, views, walkability, future supply, and brand identity all affect how a residence is experienced and how it should be evaluated.",
    },
    {
      title: "How AURA uses it",
      body: "AURA turns the editorial signal into a private inquiry path: which areas to compare, which buildings to study, what questions to verify, and where the client should avoid noise.",
    },
  ];

const JournalArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = JOURNAL_ARTICLES.find((item) => item.slug === slug);

  useEffect(() => {
    if (!article) return;

    document.title = `${article.title} | The Aura Miami Journal`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", article.dek);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://theauramiami.com/journal/${article.slug}`;
  }, [article]);

  if (!article) {
    return (
      <main className="editorial-page editorial-journal-page min-h-screen bg-background animate-fade-in">
        <Navbar />
        <section className="container mx-auto px-6 pt-40 pb-32 text-center">
          <p className="eyebrow mb-6">Journal</p>
          <h1 className="serif mb-6 text-4xl md:text-5xl">Article not found.</h1>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary hover:text-primary-glow"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Return to journal
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const related = JOURNAL_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main className="editorial-page editorial-journal-page min-h-screen bg-background animate-fade-in">
      <Navbar />

      <article>
        <section className="relative overflow-hidden border-b border-primary/10 pt-32 pb-14 md:pt-40 md:pb-20">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/68 via-background/86 to-background" />
          <div className="container relative mx-auto px-5 sm:px-6">
            <Link
              to="/journal"
              className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Journal
            </Link>

            <div className="max-w-5xl">
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-primary">
                <span>{article.category}</span>
                <span className="h-px w-8 bg-primary/45" />
                <span>{article.readTime}</span>
                <span className="h-px w-8 bg-primary/45" />
                <span>{article.signal}</span>
              </div>
              <h1 className="serif text-5xl leading-[0.96] sm:text-6xl md:text-7xl">
                {article.title}
              </h1>
              <p className="mt-7 max-w-3xl text-base font-light leading-relaxed text-foreground/76 md:text-lg">
                {article.dek}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-5 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <p className="eyebrow mb-5 text-[10px] sm:text-xs">Editorial Brief</p>
                <h2 className="serif text-4xl leading-tight md:text-5xl">
                  Read the story as strategy.
                </h2>
                <Link
                  to={buildConsultationPath("buy", { interest: article.title })}
                  className="mt-8 inline-flex min-h-12 items-center gap-3 border border-primary/45 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Discuss this brief
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </aside>

              <div className="space-y-10">
                {getArticleSections(article).map((section, index) => (
                  <section key={section.title} className="border-t border-primary/14 pt-8">
                    <div className="mb-5 flex items-center gap-3 text-primary">
                      {index === 0 ? (
                        <BookOpen className="h-4 w-4" strokeWidth={1.5} />
                      ) : index === 1 ? (
                        <Compass className="h-4 w-4" strokeWidth={1.5} />
                      ) : (
                        <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
                      )}
                      <span className="text-[10px] uppercase tracking-[0.24em]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="serif mb-5 text-3xl leading-tight md:text-4xl">
                      {section.title}
                    </h3>
                    <p className="max-w-3xl text-base leading-relaxed text-foreground/76">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>

      <section className="border-y border-primary/10 bg-card/25 py-16 md:py-20">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4 text-[10px] sm:text-xs">Continue Reading</p>
              <h2 className="serif text-4xl leading-tight">Related briefs.</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/journal/${item.slug}`}
                className="group border border-primary/12 bg-background/65 p-6 transition-colors hover:border-primary/45 hover:bg-background"
              >
                <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-primary/80">
                  {item.category}
                </p>
                <h3 className="serif text-2xl leading-tight transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default JournalArticlePage;
