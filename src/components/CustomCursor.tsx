import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="interactive"]';

/**
 * Animated custom cursor. Disabled entirely for touch/coarse pointers and for
 * users who prefer reduced motion, so it never interferes with a11y tests.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const frame = useRef<number>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(fine.matches && !reduce.matches);
    sync();
    reduce.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = e.target as Element | null;
      setActive(Boolean(el?.closest?.(INTERACTIVE)));
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${active ? 2.1 : 1})`;
      }
      frame.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [enabled, active]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" data-testid="custom-cursor" className="pointer-events-none">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-primary/70 mix-blend-difference transition-[opacity] duration-200"
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-primary"
      />
    </div>
  );
};

export default CustomCursor;