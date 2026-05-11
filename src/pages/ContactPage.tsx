import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";
import ConsultationForm from "@/components/aura/ConsultationForm";
import { buildExplorePath } from "@/lib/intent";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@theauramiami.com",
    href: "mailto:hello@theauramiami.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(305) 697-8918",
    href: "tel:+13056978918",
  },
  {
    icon: MapPin,
    label: "Market",
    value: "Miami and South Florida",
    href: "/geography",
  },
];

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact The Aura Miami | Private Inquiry";
    const description =
      "Contact The Aura Miami for private buy, rent, sell, relocation, and investment inquiries across Miami luxury residences.";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://theauramiami.com/contact";
  }, []);

  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <Navbar />

      <section className="border-b border-primary/10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow mb-5 text-[10px] sm:text-xs">Contact</p>
              <h1 className="serif text-5xl leading-[0.96] sm:text-6xl md:text-7xl">
                Start with the question. We will route the next move.
              </h1>
            </div>
            <p className="max-w-2xl text-base font-light leading-relaxed text-foreground/76 md:justify-self-end md:text-lg">
              Use this page for buy, rent, sell, relocation, investment,
              building research, developer collaboration, or editorial
              partnership requests.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/10 py-14 md:py-20">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid gap-px border border-primary/14 bg-primary/14 md:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <Icon className="mb-7 h-6 w-6 text-primary" strokeWidth={1.5} />
                  <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-primary/80">
                    {card.label}
                  </p>
                  <h2 className="serif text-3xl leading-tight">{card.value}</h2>
                </>
              );

              return card.href.startsWith("/") ? (
                <Link
                  key={card.label}
                  to={card.href}
                  className="group bg-background p-7 transition-colors hover:bg-secondary/45 md:p-9"
                >
                  {content}
                </Link>
              ) : (
                <a
                  key={card.label}
                  href={card.href}
                  className="group bg-background p-7 transition-colors hover:bg-secondary/45 md:p-9"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="consultation" className="py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <p className="eyebrow mb-5 text-[10px] sm:text-xs">Private Form</p>
              <h2 className="serif text-4xl leading-tight md:text-5xl">
                What happens after inquiry.
              </h2>
              <div className="mt-8 grid gap-px border border-primary/14 bg-primary/14">
                {[
                  { icon: Clock, label: "Response", text: "Typically reviewed within 24 hours. Your request is routed by intent." },
                  { icon: ShieldCheck, label: "Context", text: "Availability, pricing, and strategy are verified privately." },
                  { icon: ArrowRight, label: "Next step", text: "A focused shortlist or seller path is prepared." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-background/80 p-5">
                      <div className="mb-3 flex items-center gap-3 text-primary">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                        <span className="text-[10px] uppercase tracking-[0.22em]">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="tel:+13056978918"
                  className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-primary hover:text-foreground"
                >
                  <Calendar className="h-4 w-4" strokeWidth={1.5} />
                  Schedule a call
                </a>
                <Link
                  to={buildExplorePath("buy")}
                  className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-primary/70 hover:text-primary"
                >
                  Explore before inquiry
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </aside>

            <ConsultationForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
