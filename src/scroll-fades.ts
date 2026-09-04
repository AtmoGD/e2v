import { useLayoutEffect, useState } from "preact/hooks";
import type { RefObject } from "preact";

const RANGE = 72;

function edgeAmount(distance: number): number {
  if (distance <= 0) return 0;
  return Math.min(1, distance / RANGE);
}

export function useEdgeFades(
  ref: RefObject<HTMLElement | null>,
  deps: unknown[],
): { top: number; bottom: number } {
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 1) {
        setTop(0);
        setBottom(0);
        return;
      }
      setTop(edgeAmount(el.scrollTop));
      setBottom(edgeAmount(max - el.scrollTop));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const inner = el.firstElementChild;
    if (inner) ro.observe(inner);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, deps);

  return { top, bottom };
}
