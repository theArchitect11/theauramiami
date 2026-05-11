import ConsultationForm from "./ConsultationForm";
import { MessageCircle, Phone, Shield, Clock } from "lucide-react";
import ambient from "@/assets/consultation-ambient.jpg";

const ConsultationSection = () => {
  return (
    <section id="consultation" className="relative py-20 md:py-32 overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-5 sm:px-6 relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-5 md:mb-6 text-[10px] sm:text-xs">Consultation</p>
            <h2 className="serif text-4xl md:text-6xl leading-[1.05] mb-6 md:mb-8">
              A private conversation, <span className="italic text-primary">first.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Tell us whether you are buying, selling, leasing, or investing.
              We'll route the inquiry privately. No mailing lists. No mass marketing.
            </p>

            {/* Ambient image */}
            <div className="relative rounded-md overflow-hidden border border-primary/15 mb-8 group">
              <div className="aspect-[16/10] lg:aspect-[5/4] xl:aspect-[16/10] overflow-hidden">
                <img
                  src={ambient}
                  alt="Penthouse interior at golden hour overlooking Biscayne Bay"
                  loading="lazy"
                  decoding="async"
                  width={1024}
                  height={1280}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-card/85 via-card/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[10px] uppercase tracking-[0.24em] md:tracking-[0.3em] text-primary/90 mb-1">
                  Discreet · Direct · Considered
                </p>
                <p className="serif text-foreground text-lg md:text-xl italic">
                  "We move at the pace of certainty."
                </p>
              </div>
            </div>

            <div className="hairline max-w-[160px] mb-6" />
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="pt-1.5">Direct response from our principals — typically within one business day.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="pt-1.5">Discreet handling of your information. Your inquiry is not shared.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="pt-1.5">No pressure, no obligation, no portals.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-primary/10">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-3">Prefer to call?</p>
              <a
                href="tel:+13056978918"
                className="inline-flex items-center gap-2.5 text-primary hover:text-primary-glow transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                </div>
                <span className="serif text-lg tracking-wide">(305) 697-8918</span>
              </a>
            </div>
          </div>
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
