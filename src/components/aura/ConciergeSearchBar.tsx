import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, HandCoins, Home, KeyRound, MapPin, Search, Loader2 } from "lucide-react";
import { getSmartSuggestions } from "@/lib/search-utils";
import { AuraIntent, buildConsultationPath, buildExplorePath, resolveIntentFromPath } from "@/lib/intent";

type ConciergeSearchBarProps = {
  visible?: boolean;
  placement?: "floating" | "inline";
};
type Intent = AuraIntent;

type Suggestion = {
  kind: "building" | "area";
  slug: string;
  title: string;
  sub: string;
  image?: string;
};

const intentOptions = [
  { label: "Buy", intent: "buy", Icon: Home },
  { label: "Rent", intent: "lease", Icon: KeyRound },
  { label: "Sell", intent: "sell", Icon: HandCoins },
] as const;

const inquiryCopy: Record<Intent, string> = {
  buy: "Purchase residence search",
  lease: "Rental residence search",
  sell: "Selling address",
};

const getIntentPath = (currentPath: string, nextIntent: Intent) => {
  if (currentPath === "/") {
    return buildExplorePath(nextIntent);
  }

  if (currentPath.startsWith("/area/")) {
    return `${currentPath}?intent=${nextIntent}#area-profiles`;
  }

  if (currentPath.startsWith("/building/")) {
    return `${currentPath}?intent=${nextIntent}`;
  }

  if (currentPath.startsWith("/explore")) {
    return buildExplorePath(nextIntent);
  }

  if (currentPath === "/buy" || currentPath === "/rent" || currentPath === "/sell") {
    return buildExplorePath(nextIntent);
  }

  return buildExplorePath(nextIntent);
};

const ConciergeSearchBar = ({ visible = true, placement = "floating" }: ConciergeSearchBarProps) => {
  const [intent, setIntent] = useState<Intent>("buy");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const blurTimeout = useRef<number | null>(null);
  const searchTimeout = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentIntent = new URLSearchParams(location.search).get("intent");
    setIntent(resolveIntentFromPath(location.pathname, currentIntent));
  }, [location.pathname, location.search]);

  const suggestions = useMemo(() => {
    if (intent === "sell") return [];
    return getSmartSuggestions(query);
  }, [intent, query]);

  const inquiryUrl = (nextIntent = intent, nextInterest = query.trim() || inquiryCopy[nextIntent]) => {
    return buildConsultationPath(nextIntent, { interest: nextInterest });
  };

  const submitInquiry = () => {
    navigate(inquiryUrl());
    setOpen(false);
  };

  const chooseSuggestion = (suggestion: Suggestion) => {
    const params = new URLSearchParams({ intent });
    navigate(
      suggestion.kind === "building"
        ? `/building/${suggestion.slug}?${params.toString()}`
        : `/area/${suggestion.slug}?${params.toString()}`,
    );
    setOpen(false);
    setQuery("");
  };

  const onIntentClick = (nextIntent: Intent) => {
    setIntent(nextIntent);
    setOpen(false);
    navigate(getIntentPath(location.pathname, nextIntent));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = suggestions[activeIndex];
      if (pick) {
        chooseSuggestion(pick);
      } else {
        submitInquiry();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);
    setActiveIndex(0);

    if (val.trim()) {
      setIsSearching(true);
      if (searchTimeout.current) window.clearTimeout(searchTimeout.current);
      searchTimeout.current = window.setTimeout(() => {
        setIsSearching(false);
      }, 350);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <div
      className={
        placement === "inline"
          ? "relative z-20 border-y border-primary/20 bg-background/70 shadow-[0_22px_70px_-46px_hsl(var(--gold)/0.5)] backdrop-blur-2xl backdrop-saturate-150"
          : `absolute left-0 right-0 top-full border-b border-primary/20 bg-background/70 shadow-[0_22px_70px_-46px_hsl(var(--gold)/0.5)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ${
              visible
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-3 opacity-0 pointer-events-none"
            }`
      }
    >
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center">
          <div className="grid grid-cols-3 gap-1 rounded-full border border-primary/20 bg-background/30 p-1 shadow-[inset_0_1px_0_hsl(var(--gold)/0.12)] backdrop-blur-xl">
            {intentOptions.map(({ label, intent: optionIntent, Icon }) => {
              const isActive = intent === optionIntent;
              return (
                <button
                  key={optionIntent}
                  type="button"
                  onClick={() => onIntentClick(optionIntent)}
                  className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[9px] uppercase tracking-[0.16em] transition-all duration-300 sm:tracking-[0.2em] ${
                    isActive
                      ? "bg-gradient-gold text-primary-foreground shadow-gold"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-0 flex-1">
            <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-input/40 px-4 py-2.5 shadow-[inset_0_1px_0_hsl(var(--gold)/0.1)] backdrop-blur-xl transition-colors focus-within:border-primary/60">
              {isSearching ? (
                <Loader2 className="h-4 w-4 shrink-0 text-primary animate-spin" />
              ) : (
                <Search className="h-4 w-4 shrink-0 text-primary/80" strokeWidth={1.5} />
              )}
              <input
                value={query}
                onChange={handleQueryChange}
                onFocus={() => setOpen(true)}
                onBlur={() => {
                  blurTimeout.current = window.setTimeout(() => setOpen(false), 140);
                }}
                onKeyDown={onKeyDown}
                placeholder={
                  intent === "sell"
                    ? "Enter selling address"
                    : "Search residence, neighborhood, or intent (e.g. 3 bed under 5M)"
                }
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                aria-label="Search buildings and neighborhoods"
              />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={submitInquiry}
                className="inline-flex min-h-9 shrink-0 items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-primary hover:text-primary-glow sm:tracking-[0.22em]"
              >
                Inquire <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>

            {open && !isSearching && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-primary/20 bg-background/95 shadow-elegant backdrop-blur-xl">
                {suggestions.map((suggestion, index) => {
                      const Icon = suggestion.kind === "building" ? Building2 : MapPin;
                      const active = index === activeIndex;
                      return (
                        <button
                          key={`${suggestion.kind}-${suggestion.slug}`}
                          type="button"
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            if (blurTimeout.current) window.clearTimeout(blurTimeout.current);
                            chooseSuggestion(suggestion);
                          }}
                          className={`flex w-full items-center justify-between gap-4 border-b border-primary/10 px-4 py-3 text-left last:border-0 ${
                            active ? "bg-primary/12" : "hover:bg-primary/8"
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            {suggestion.image ? (
                          <img
                            src={suggestion.image}
                            alt={suggestion.title}
                            width={36}
                            height={36}
                            loading="lazy"
                            decoding="async"
                            className="h-9 w-9 rounded-full object-cover border border-primary/25 shrink-0"
                            />
                          ) : (
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Icon className="h-4 w-4" strokeWidth={1.5} />
                            </span>
                          )}
                        <span className="min-w-0">
                          <span className="block truncate serif text-base text-foreground">
                            {suggestion.title}
                          </span>
                          <span className="block truncate text-[10px] uppercase tracking-[0.22em] text-foreground/55">
                            {suggestion.sub}
                          </span>
                        </span>
                      </span>
                      <div className="flex items-center gap-3">
                        <ArrowRight className="h-4 w-4 shrink-0 text-primary/70" strokeWidth={1.5} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            
            {open && !isSearching && query.trim() && suggestions.length === 0 && (
               <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-primary/20 bg-background/95 shadow-elegant backdrop-blur-xl p-6 text-center">
                  <p className="serif text-lg text-foreground mb-2">Private search required.</p>
                  <p className="text-xs text-muted-foreground mb-4 font-light">We don't have a public dossier for "{query}" yet. Inquire to search our private index.</p>
                  <button 
                    onClick={submitInquiry}
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary hover:text-primary-glow"
                  >
                    Request Private Search <ArrowRight className="h-3.5 w-3.5" />
                  </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConciergeSearchBar;
