import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import BrandMark from "./BrandMark";
import ConciergeSearchBar from "./ConciergeSearchBar";
import ScrollProgress from "./ScrollProgress";
import { buildConsultationPath, buildExplorePath, resolveIntentFromPath } from "@/lib/intent";

const primaryLinks = [
  { label: "Explore", to: "/explore" },
  { label: "Buy", to: "/buy" },
  { label: "Rent", to: "/rent" },
  { label: "Sell", to: "/sell" },
  { label: "Atlas", to: "/geography" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
] as const;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const rawIntent = new URLSearchParams(location.search).get("intent");
  const currentIntent = resolveIntentFromPath(location.pathname, rawIntent);
  const consultationUrl = buildConsultationPath(currentIntent);
  const explorePath = buildExplorePath(currentIntent);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled((current) => {
          const next = window.scrollY > 30;
          return current === next ? current : next;
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-primary/45 bg-[linear-gradient(135deg,rgba(7,47,54,0.96),rgba(4,30,36,0.92))] shadow-[0_18px_60px_-36px_hsl(var(--gold)/0.45)] backdrop-blur-md transition-all duration-500 ${
        scrolled ? "py-3" : "py-4 md:py-5"
      }`}
    >
      <ScrollProgress />
      <nav
        className="container mx-auto flex items-center justify-between px-5 sm:px-6"
        aria-label="Primary navigation"
      >
        <Link to="/#top" aria-label="The Aura Miami home">
          <BrandMark
            compact
            className="[&_.brand-copy]:hidden min-[430px]:[&_.brand-copy]:flex"
          />
        </Link>

        <div className="hidden items-center gap-4 text-[10px] uppercase tracking-[0.16em] text-foreground/85 xl:gap-5 xl:tracking-[0.18em] lg:flex">
          {primaryLinks.map((item) => {
            const isExplore = item.to === "/explore";
            const active = isExplore
              ? location.pathname === "/explore"
              : item.to === "/geography"
                ? location.pathname === "/geography"
                : location.pathname === item.to;
            const href =
              item.to === "/explore"
                ? explorePath
                : item.to === "/geography"
                  ? `/geography?intent=${currentIntent}#geography`
                  : item.to;
            return (
              <Link
                key={item.to}
                to={href}
                className={`relative pb-0.5 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100 ${
                  active ? "text-primary after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open);
              setMobileOpen(false);
            }}
            aria-label={searchOpen ? "Close concierge search" : "Open concierge search"}
            aria-expanded={searchOpen}
            className={`inline-flex h-11 w-11 items-center justify-center border transition-all duration-300 ${
              searchOpen
                ? "border-primary bg-primary/15 text-primary"
                : "border-primary/30 bg-transparent text-foreground/70 hover:border-primary/60 hover:text-primary"
            }`}
          >
            {searchOpen ? (
              <X className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Search className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
          <Link
            to={consultationUrl}
            className="hidden bg-primary px-4 py-2.5 text-[11px] uppercase tracking-[0.25em] text-primary-foreground shadow-[0_8px_32px_-10px_hsl(var(--gold)/0.7)] transition-all duration-500 hover:brightness-110 hover:shadow-gold sm:inline-flex"
          >
            Inquire
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileOpen((open) => !open);
              setSearchOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center border border-primary/55 bg-background/55 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-primary/75 hover:text-primary lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {searchOpen && <ConciergeSearchBar placement="inline" />}

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full border-y border-primary/25 bg-[linear-gradient(135deg,rgba(7,47,54,0.98),rgba(4,30,36,0.96))] px-5 py-4 shadow-[0_28px_80px_-36px_hsl(var(--gold)/0.55)] lg:hidden"
        >
          <div className="mx-auto flex max-w-md flex-col divide-y divide-primary/12 text-xs uppercase tracking-[0.18em] text-foreground/90">
            {[...primaryLinks, { label: "Contact", to: "/contact" }].map((item) => (
              <Link
                key={item.to}
                to={item.to === "/explore" ? explorePath : item.to}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-12 items-center justify-between py-3 transition-colors hover:text-primary"
              >
                {item.label}
                <span className="h-px w-8 bg-primary/35" />
              </Link>
            ))}
            <Link
              to={consultationUrl}
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex min-h-12 items-center justify-center border border-primary/55 bg-primary/8 px-6 py-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              Inquire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
