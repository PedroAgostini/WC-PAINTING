"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole page, mounted once in the layout of
 * the page component. Any element carrying `.reveal` rises into place the
 * first time it enters, on the single easing defined in globals.css.
 *
 * Content is visible by default: the hiding rule only applies once the `js`
 * class is on <html>, and it is skipped entirely under reduced motion.
 */
export function RevealObserver() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = document.querySelectorAll<HTMLElement>(".reveal");

    if (prefersReduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
