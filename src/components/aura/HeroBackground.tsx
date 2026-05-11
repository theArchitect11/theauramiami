import { useEffect, useRef, useState } from "react";
import heroVilla from "@/assets/hero-1.jpg";
import heroInterior from "@/assets/hero-3.jpg";
import heroSkyline from "@/assets/hero-4.jpg";

const slides = [
  {
    src: heroVilla,
    alt: "Private South Florida waterfront villa at golden hour",
    position: "center",
  },
  {
    src: heroInterior,
    alt: "Oceanfront Miami penthouse interior at golden hour",
    position: "center",
  },
  {
    src: heroSkyline,
    alt: "Miami skyline over Biscayne Bay at golden hour",
    position: "center",
  },
];

const HeroBackground = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (layerRef.current) {
          layerRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
        }
        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={layerRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1920}
            height={1080}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] ease-out ${
              index === activeIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.045]"
            }`}
            style={{
              objectPosition: slide.position,
              transitionDuration: "1800ms",
              filter: "brightness(0.82) saturate(0.82) sepia(0.2) contrast(1.08)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/62 via-background/24 to-background/92" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_42%,hsl(var(--background)/0.42)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,hsl(var(--background)/0.55)_0%,transparent_38%,hsl(var(--background)/0.4)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default HeroBackground;
