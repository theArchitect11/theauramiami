import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RevealObserver = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll<HTMLElement>(".reveal:not(.revealed)");
      if (!els.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );

      els.forEach((el) => observer.observe(el));
      return observer;
    };

    const timer = setTimeout(() => {
      const observer = observe();
      return () => observer?.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default RevealObserver;
