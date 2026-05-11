import type { ReactNode } from "react";
import type { Area } from "@/data/areas";
import { cn } from "@/lib/utils";

type AreaImageVariant = "wide" | "portrait";

type AreaImageProps = {
  area: Area;
  variant?: AreaImageVariant;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
};

const imageToneFilters: Record<NonNullable<Area["visualTone"]>, string> = {
  coastal: "saturate(1.04) contrast(1.08)",
  urban: "saturate(0.94) contrast(1.06)",
  retail: "saturate(1) contrast(1.05)",
  garden: "saturate(1.08) contrast(1.08)",
  estate: "saturate(0.92) contrast(1.08)",
  island: "saturate(1.02) contrast(1.08)",
  resort: "grayscale(0.05) sepia(0.08) saturate(0.9) contrast(1.08)",
};

const veilToneClasses: Record<NonNullable<Area["visualTone"]>, string> = {
  coastal: "from-background/40 via-background/6 to-background/0",
  urban: "from-background/54 via-background/12 to-background/0",
  retail: "from-background/48 via-background/10 to-background/0",
  garden: "from-background/44 via-background/8 to-background/0",
  estate: "from-background/58 via-background/16 to-background/0",
  island: "from-background/50 via-background/10 to-background/0",
  resort: "from-background/54 via-background/12 to-background/0",
};

const glowToneClasses: Record<NonNullable<Area["visualTone"]>, string> = {
  coastal: "opacity-55 group-hover:opacity-70",
  urban: "opacity-50 group-hover:opacity-70",
  retail: "opacity-55 group-hover:opacity-72",
  garden: "opacity-50 group-hover:opacity-68",
  estate: "opacity-58 group-hover:opacity-72",
  island: "opacity-52 group-hover:opacity-70",
  resort: "opacity-56 group-hover:opacity-70",
};

const getImage = (area: Area, variant: AreaImageVariant) =>
  variant === "portrait"
    ? area.portraitImage ?? area.cardImage ?? area.image
    : area.cardImage ?? area.image;

const getImagePosition = (area: Area, variant: AreaImageVariant) =>
  variant === "portrait"
    ? area.portraitImagePosition ??
      area.cardImagePosition ??
      area.imagePosition ??
      "center"
    : area.cardImagePosition ?? area.imagePosition ?? "center";

const AreaImage = ({
  area,
  variant = "wide",
  className,
  imageClassName,
  children,
}: AreaImageProps) => {
  const tone = area.visualTone ?? "urban";

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <img
        src={getImage(area, variant)}
        alt={`${area.name}, Miami`}
        loading="lazy"
        decoding="async"
        width={variant === "portrait" ? 1080 : 1280}
        height={variant === "portrait" ? 1440 : 720}
        className={cn(
          "h-full w-full object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.045]",
          imageClassName,
        )}
        style={{
          objectPosition: getImagePosition(area, variant),
          filter: `${imageToneFilters[tone]} brightness(0.86)`,
        }}
      />
      <div className="absolute inset-0 bg-black/25 transition-opacity duration-700 group-hover:opacity-0" />
      <div className={cn("absolute inset-0 bg-gradient-to-t transition-opacity duration-700 group-hover:opacity-0", veilToneClasses[tone])} />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,hsl(var(--gold)/0.16),transparent_34%)] transition-opacity duration-700 group-hover:opacity-100",
          glowToneClasses[tone],
        )}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/10 transition-colors duration-500 group-hover:ring-primary/30" />
      {children}
    </div>
  );
};

export default AreaImage;
