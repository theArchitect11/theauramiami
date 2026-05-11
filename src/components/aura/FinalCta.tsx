import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCta = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden border-t border-primary/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--gold)/0.10)_0%,_transparent_60%)]" />
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-6 relative text-center">
        <div className="inline-flex items-center gap-2 mb-8">
          <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
          <p className="eyebrow animate-shimmer">Begin</p>
          <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
        </div>
        <h2 className="serif text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl mx-auto mb-12">
          Your South Florida move starts with{" "}
          <span className="italic gold-text">one private strategy session.</span>
        </h2>
        <Link
          to="/?intent=buy#consultation"
          className="group inline-flex min-h-12 items-center justify-center bg-gradient-gold px-7 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-gold transition-all duration-500 hover:shadow-[0_0_100px_-5px_hsl(var(--gold)/0.7)] sm:px-10 sm:py-5 sm:tracking-[0.28em]"
        >
          Request Consultation
          <ArrowRight className="w-3.5 h-3.5 ml-3 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
};

export default FinalCta;
