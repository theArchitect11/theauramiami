import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Building2, Compass, ShieldCheck, UserRound } from "lucide-react"; // UserRound used in philosophy grid
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";
import { buildConsultationPath } from "@/lib/intent";

const principles = [
  {
    icon: Compass,
    title: "Area before property",
    body: "AURA starts with Miami geography, lifestyle fit, and the market layer before discussing individual residences.",
  },
  {
    icon: Building2,
    title: "Building intelligence",
    body: "Every serious move needs building context: service, line quality, carrying cost, view control, and future competition.",
  },
  {
    icon: ShieldCheck,
    title: "Private execution",
    body: "The strongest clients do not need more noise. They need a controlled path from question to verified opportunity.",
  },
];

const AboutPage = () => {
  useEffect(() => {
    document.title = "About The Aura Miami | Private Residence Intelligence";
    const description =
      "About The Aura Miami, a private Miami residence intelligence and inquiry concierge built around geography, building context, and disciplined client execution.";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://theauramiami.com/about";
  }, []);

  return (
    <main className="editorial-page editorial-journal-page min-h-screen bg-background animate-fade-in">
      <Navbar />

      <section className="relative overflow-hidden border-b border-primary/10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute -right-44 top-0 h-[520px] w-[520px] rounded-full bg-primary/8 blur-3xl" />
        <div className="container relative mx-auto px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow mb-5 text-[10px] sm:text-xs">About AURA</p>
              <h1 className="serif text-5xl leading-[0.96] sm:text-6xl md:text-7xl">
                Built for clients who want the Miami map read clearly.
              </h1>
            </div>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base font-light leading-relaxed text-foreground/76 md:text-lg">
                The Aura Miami is a private residence intelligence layer for
                buyers, renters, sellers, and investors who need context before
                action. It is not a cluttered portal. It is a disciplined way to
                understand Miami luxury by area, building, residence, and timing.
              </p>
              <Link
                to={buildConsultationPath("buy")}
                className="mt-8 inline-flex min-h-12 items-center gap-3 border border-primary/45 px-6 py-4 text-[10px] uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Begin private inquiry
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="reveal grid gap-px border border-primary/14 bg-primary/14 md:grid-cols-3">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-background p-7 md:p-9">
                  <Icon className="mb-7 h-6 w-6 text-primary" strokeWidth={1.5} />
                  <h2 className="serif mb-4 text-3xl leading-tight">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="space-y-7">
              <p className="eyebrow mb-5 text-[10px] sm:text-xs">CEO Profile</p>
              <h2 className="serif text-4xl leading-tight md:text-5xl">
                Founder-led standards, not portal behavior.
              </h2>
              <div className="relative min-h-[380px] overflow-hidden border border-primary/14 bg-[linear-gradient(135deg,rgba(8,62,70,0.88),rgba(3,28,34,0.96))]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--gold)/0.18),transparent_40%),radial-gradient(circle_at_85%_85%,hsl(182_64%_34%/0.14),transparent_38%)]" />
                <div className="relative flex h-full min-h-[380px] flex-col justify-between p-8 md:p-10">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-primary/70">
                      The Aura Miami
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-foreground/38">
                      Miami &amp; South Florida
                    </p>
                  </div>
                  <div>
                    <p className="serif text-2xl leading-snug text-foreground/88 md:text-3xl">
                      "The luxury is not more listings.
                      <br />
                      It is a clearer path."
                    </p>
                    <div className="mt-8 h-px w-12 bg-primary/40" />
                    <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-primary/60">
                      Founder statement
                    </p>
                  </div>
                </div>
              </div>
            </aside>
            <div>
              <div className="mb-8 border-l border-primary/30 pl-6">
                <p className="text-base leading-relaxed text-foreground/78 md:text-lg">
                  AURA exists because Miami luxury is not one market. It is a
                  layered map of branded oceanfront towers, financial-core
                  condominiums, private islands, design districts, estate
                  corridors, and resort neighborhoods. The founder standard is
                  to organize that complexity before a client commits time,
                  attention, or capital.
                </p>
              </div>

              <div className="grid gap-px border border-primary/14 bg-primary/14 md:grid-cols-2">
                {[
                  {
                    title: "Professional background",
                    body: "The operating focus is real estate intelligence, client routing, private inquiry handling, market organization, and high-touch coordination with licensed brokerage and specialist partners.",
                    icon: UserRound,
                  },
                  {
                    title: "Why AURA exists",
                    body: "Luxury clients do not need another feed. They need a clear path through Miami's geography, buildings, rules, view lines, carrying costs, and seller signals.",
                    icon: Compass,
                  },
                  {
                    title: "Miami market philosophy",
                    body: "The area comes first, the building comes second, and the residence comes third. Price only becomes useful after lifestyle fit, scarcity, service, and timing are understood.",
                    icon: Building2,
                  },
                  {
                    title: "Client standard",
                    body: "Every inquiry should produce a more organized decision: what to study, what to ignore, what to verify privately, and what the next move should be.",
                    icon: BadgeCheck,
                  },
                  {
                    title: "Trust positioning",
                    body: "Real estate services are provided through licensed brokerage partners. AURA protects discretion, routes context carefully, and avoids presenting editorial examples as live inventory.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Execution promise",
                    body: "The goal is fast clarity, not pressure: a focused shortlist for buyers and renters, or a valuation and launch-path conversation for sellers.",
                    icon: ArrowRight,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="bg-background p-7 md:p-9">
                      <Icon className="mb-7 h-6 w-6 text-primary" strokeWidth={1.5} />
                      <h3 className="serif mb-4 text-3xl leading-tight">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
