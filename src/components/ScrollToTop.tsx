import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll on route change. If a hash is present, lets the browser
 * scroll to it; otherwise scrolls instantly to the top.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      };
      window.requestAnimationFrame(scrollToHash);
      const timeout = window.setTimeout(scrollToHash, 150);
      const lateTimeout = window.setTimeout(scrollToHash, 700);
      return () => {
        window.clearTimeout(timeout);
        window.clearTimeout(lateTimeout);
      };
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
