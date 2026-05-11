import auraMark from "@/assets/aura-mark.png";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

const BrandMark = ({ compact = false, className }: BrandMarkProps) => {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary/75 bg-[#20242d] shadow-[0_0_30px_-10px_hsl(var(--gold)/0.95)] sm:h-11 sm:w-11">
        <img
          src={auraMark}
          alt="The Aura Miami monogram"
          width={48}
          height={48}
          className="h-6 w-6 object-contain transition-transform duration-500 group-hover:rotate-[10deg] sm:h-7 sm:w-7"
          style={{ filter: "drop-shadow(0 0 16px hsl(41 70% 68% / 0.95))" }}
        />
      </span>
      <span className="brand-copy flex flex-col justify-center leading-none">
        <span
          className={cn(
            "serif uppercase tracking-[0.2em] text-foreground drop-shadow-[0_1px_14px_hsl(220_60%_4%_/_1)]",
            compact ? "text-base" : "text-lg sm:text-xl",
          )}
        >
          The Aura
        </span>
        <span className="mt-1 text-[8px] uppercase tracking-[0.46em] text-primary sm:text-[9px]">
          Miami
        </span>
      </span>
    </div>
  );
};

export default BrandMark;
