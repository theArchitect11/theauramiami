import { Link, useLocation } from "react-router-dom";
import { ArrowRight, MapPin, Maximize2, Loader2, Signal } from "lucide-react";
import { BUILDINGS, formatPrice } from "@/data/buildings";
import { useLiveListings } from "@/hooks/useLiveListings";
import { buildConsultationPath, buildExplorePath, normalizeIntent } from "@/lib/intent";

type EstateCard = {
  key: string;
  link: string;
  image?: string;
  neighborhood?: string;
  name: string;
  price: number;
  lotSize: string;
  detail: string;
  isLive: boolean;
};

const EstateGallery = () => {
  const location = useLocation();
  const currentIntent = normalizeIntent(new URLSearchParams(location.search).get("intent"));
  const { data: liveEstates, isLoading } = useLiveListings({ propertyType: "house", limit: 3 });
  const estateCards: EstateCard[] =
    liveEstates && liveEstates.length > 0
      ? liveEstates.map((estate) => ({
          key: estate.mls_id,
          link: buildConsultationPath("buy", { interest: estate.address }),
          image: estate.images[0],
          neighborhood: estate.neighborhood,
          name: estate.address,
          price: estate.price,
          lotSize: "Signature Lot",
          detail: `${estate.bedrooms} Bed · ${estate.bathrooms} Bath`,
          isLive: true,
        }))
      : BUILDINGS.filter((building) => building.propertyType === "house")
          .slice(0, 3)
          .map((building) => ({
            key: building.slug,
            link: `/building/${building.slug}?intent=${currentIntent}`,
            image: building.image,
            neighborhood: building.neighborhood,
            name: building.name,
            price: building.priceRange.saleMin,
            lotSize: building.listings[0]?.lotSize ?? "Signature Lot",
            detail: "Private Brief",
            isLive: false,
          }));

  if (!isLoading && estateCards.length === 0) {
    return null;
  }

  return (
    <section id="estates" className="relative overflow-hidden bg-secondary/15 py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 relative">
        <div className="mb-10 flex flex-col gap-7 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <p className="eyebrow m-0">Private Residences</p>
              {liveEstates && liveEstates.length > 0 && (
                <div className="flex items-center gap-1.5 border border-primary/20 bg-primary/10 px-2 py-0.5">
                  <Signal className="w-2.5 h-2.5 text-primary animate-pulse" />
                  <span className="text-[8px] uppercase tracking-wider text-primary font-medium">Live Feed</span>
                </div>
              )}
            </div>
            <h2 className="serif mb-5 text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
              Residences with weight.<br />
              <span className="italic text-primary">Not just inventory.</span>
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              A tighter first look at significant homes and private enclaves,
              positioned by frontage, privacy, and long-term fit.
            </p>
          </div>
          <Link
            to={buildExplorePath(currentIntent)}
            className="group inline-flex w-fit items-center gap-3 border border-primary/30 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-primary transition-all hover:border-primary hover:bg-primary/10"
          >
            View all areas
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 text-primary/40 animate-spin" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Verifying live availability...</p>
          </div>
        ) : (
          <div className="grid gap-px border border-primary/12 bg-primary/12 md:grid-cols-2 lg:grid-cols-3">
            {estateCards.map((estate) => (
              <Link
                key={estate.key}
                to={estate.link}
                className="group flex h-full flex-col bg-background transition-all duration-500 hover:bg-card/80"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {estate.image ? (
                    <img
                      src={estate.image}
                      alt={estate.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                      <MapPin className="w-12 h-12" strokeWidth={0.5} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute top-5 right-5">
                    {estate.isLive && (
                      <div className="bg-primary px-3 py-1 text-[8px] uppercase tracking-widest text-primary-foreground shadow-lg">
                        Live Listing
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-5 left-5">
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-light">
                        {estate.neighborhood || "Private Enclave"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="serif mb-4 text-2xl leading-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    {estate.name}
                  </h3>

                  <div className="flex items-center gap-6 mb-8 text-muted-foreground/80">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
                      <span className="text-xs font-light tracking-wide">
                        {estate.lotSize}
                      </span>
                    </div>
                    <div className="h-4 w-px bg-primary/20" />
                    <div className="text-xs font-light tracking-wide uppercase">
                      {estate.detail}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-primary/10 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-1">
                        Guide From
                      </div>
                      <div className="text-lg font-light text-foreground">
                        {formatPrice(estate.price)}
                      </div>
                    </div>
                    <div className="h-10 w-10 flex items-center justify-center border border-primary/20 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EstateGallery;
