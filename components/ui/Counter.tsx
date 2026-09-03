"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a figure the first time it enters the viewport. Renders the
 * final value immediately under reduced motion or without an observer, so the
 * number is never missing.
 */
export function Counter({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // The true figure is what renders on the server and what stays without
  // scripting, an observer or with reduced motion. It is only reset to zero at
  // the moment the count actually begins, so the number never flashes down and
  // back up on first paint.
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1100;
        const start = performance.now();
        setValue(0);

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // Exponential ease-out, the page's single easing.
          const eased = 1 - Math.pow(2, -10 * progress);
          setValue(Math.round(eased * to));
          if (progress < 1) requestAnimationFrame(step);
          else setValue(to);
        };

        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {value}
    </span>
  );
}
