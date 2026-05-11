import { useEffect, useRef } from "react";

const AuraCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(0);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      if (el) el.style.cssText = `left:${pos.current.x}px;top:${pos.current.y}px`;
      raf.current = requestAnimationFrame(tick);
    };

    const onEnter = () => el?.classList.add("hovering");
    const onLeave = () => el?.classList.remove("hovering");

    const bindHoverTargets = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((t) => {
        t.addEventListener("mouseenter", onEnter);
        t.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    bindHoverTargets();

    const observer = new MutationObserver(bindHoverTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="aura-cursor" aria-hidden="true" />;
};

export default AuraCursor;
