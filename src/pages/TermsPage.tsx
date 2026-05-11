import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";

const TermsPage = () => {
  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      <section className="pt-32 md:pt-40 pb-20 md:pb-28 border-b border-primary/10">
        <div className="container mx-auto px-5 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Home
          </Link>
          <p className="eyebrow mb-5 text-[10px] sm:text-xs">Terms</p>
          <h1 className="serif text-5xl sm:text-6xl md:text-7xl leading-[0.98] mb-8">
            Terms of <span className="italic text-primary">use</span>.
          </h1>
          <p className="max-w-3xl text-foreground/75 text-base md:text-lg leading-relaxed font-light">
            The Aura Miami is an editorial residence guide and inquiry concierge.
            Published profiles are intended for orientation and private matching,
            not as live IDX inventory or a brokerage representation.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <div className="space-y-10 text-sm md:text-base leading-relaxed text-muted-foreground">
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">Editorial Content</h2>
              <p>
                Building, neighborhood, pricing, and residence examples are
                editorial guides. Availability, pricing, property details, and
                suitability must be verified with appropriate licensed partners
                before any decision is made.
              </p>
            </div>
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">No Brokerage Representation</h2>
              <p>
                The Aura Miami is not presented as a licensed real estate
                brokerage. Real estate services are provided through licensed
                brokerage partners where required.
              </p>
            </div>
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">No Financial or Legal Advice</h2>
              <p>
                Content on this site is informational only and does not replace
                advice from licensed real estate, legal, tax, lending, or financial
                professionals.
              </p>
            </div>
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">Inquiries</h2>
              <p>
                Submitting a form does not create a brokerage relationship,
                guarantee availability, or reserve any property. Inquiry details
                may be used to route your request and coordinate follow-up.
              </p>
            </div>
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">Contact</h2>
              <p>
                Questions can be sent to{" "}
                <a href="mailto:hello@theauramiami.com" className="text-primary hover:text-primary-glow">
                  hello@theauramiami.com
                </a>
                .
              </p>
            </div>
            <p className="text-xs italic text-muted-foreground/70">
              Last updated May 2026. These terms may be updated as The Aura
              Miami refines its brokerage partner relationships, client
              communication process, and residence intelligence platform.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default TermsPage;
