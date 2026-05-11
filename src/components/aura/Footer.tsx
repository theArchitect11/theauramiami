import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import BrandMark from "./BrandMark";
import { buildConsultationPath, buildExplorePath, resolveIntentFromPath } from "@/lib/intent";

const Footer = () => {
  const location = useLocation();
  const rawIntent = new URLSearchParams(location.search).get("intent");
  const currentIntent = resolveIntentFromPath(location.pathname, rawIntent);
  const consultationUrl = buildConsultationPath(currentIntent);

  return (
    <footer className="border-t border-primary/10 py-14 bg-background relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="mb-3">
              <BrandMark compact />
            </div>
            <p className="text-xs text-muted-foreground tracking-wider uppercase">
              Private Miami residence guide and inquiry concierge
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to={buildExplorePath(currentIntent)} className="hover:text-primary transition-colors inline-flex items-center gap-1">Explore <ArrowUpRight className="w-3 h-3" /></Link>
            <Link to={`/geography?intent=${currentIntent}#geography`} className="hover:text-primary transition-colors inline-flex items-center gap-1">Atlas <ArrowUpRight className="w-3 h-3" /></Link>
            <Link to="/#strategy" className="hover:text-primary transition-colors inline-flex items-center gap-1">Strategy <ArrowUpRight className="w-3 h-3" /></Link>
            <Link to="/#process" className="hover:text-primary transition-colors inline-flex items-center gap-1">Process <ArrowUpRight className="w-3 h-3" /></Link>
            <Link to="/journal" className="hover:text-primary transition-colors inline-flex items-center gap-1">Journal <ArrowUpRight className="w-3 h-3" /></Link>
            <Link to="/about" className="hover:text-primary transition-colors inline-flex items-center gap-1">About <ArrowUpRight className="w-3 h-3" /></Link>
            <Link to="/contact" className="hover:text-primary transition-colors inline-flex items-center gap-1">Contact <ArrowUpRight className="w-3 h-3" /></Link>
            <Link
              to={consultationUrl}
              className="hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              Consultation <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row justify-between gap-6 text-xs text-muted-foreground/70 leading-relaxed">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <p>© {new Date().getFullYear()} The Aura Miami. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@theauramiami.com" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                <Mail className="w-3 h-3" /> hello@theauramiami.com
              </a>
              <a href="tel:+13056978918" className="hover:text-primary transition-colors inline-flex items-center gap-1.5 whitespace-nowrap">
                <Phone className="w-3 h-3" /> (305) 697-8918
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
          <p className="max-w-2xl md:text-right italic">
            Private residence intelligence and inquiry concierge. Real estate
            services are provided through licensed brokerage partners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
