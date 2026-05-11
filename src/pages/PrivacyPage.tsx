import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";

const PrivacyPage = () => {
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
          <p className="eyebrow mb-5 text-[10px] sm:text-xs">Privacy</p>
          <h1 className="serif text-5xl sm:text-6xl md:text-7xl leading-[0.98] mb-8">
            Privacy <span className="italic text-primary">notice</span>.
          </h1>
          <p className="max-w-3xl text-foreground/75 text-base md:text-lg leading-relaxed font-light">
            The Aura Miami uses inquiry information to understand what a client
            is looking for, route the request, and coordinate follow-up through
            appropriate licensed partners and service providers.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <div className="space-y-10 text-sm md:text-base leading-relaxed text-muted-foreground">
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">Information We Collect</h2>
              <p>
                We may collect contact details, inquiry preferences, budget,
                timeline, financing preference, building or neighborhood interest,
                page context, and basic analytics or campaign parameters submitted
                through the website.
              </p>
            </div>
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">How We Use It</h2>
              <p>
                We use inquiry information to respond, summarize your request,
                coordinate private matching, route relevant information to
                licensed brokerage partners, and improve the quality of the
                residence guide.
              </p>
            </div>
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">Communication</h2>
              <p>
                If you submit an inquiry, you agree that The Aura Miami or its
                partners may contact you by email, phone, or SMS about that
                inquiry. Message and data rates may apply. You may opt out of
                marketing communications at any time.
              </p>
            </div>
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">Sharing</h2>
              <p>
                We do not sell personal information. We may share inquiry details
                with trusted service providers, automation tools, and licensed
                brokerage partners when needed to respond to your request.
              </p>
            </div>
            <div>
              <h2 className="serif text-3xl text-foreground mb-4">Contact</h2>
              <p>
                Questions about privacy can be sent to{" "}
                <a href="mailto:hello@theauramiami.com" className="text-primary hover:text-primary-glow">
                  hello@theauramiami.com
                </a>
                .
              </p>
            </div>
            <p className="text-xs italic text-muted-foreground/70">
              Last updated May 2026. This notice may be updated as The Aura
              Miami refines its brokerage partner relationships, automation
              systems, and client communication process.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PrivacyPage;
