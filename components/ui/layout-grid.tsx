"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type LayoutGridCard = {
  id: string | number;
  title: string;
  content?: ReactNode;
  className?: string;
  thumbnail: string;
  alt: string;
};

export function LayoutGrid({ cards }: { cards: LayoutGridCard[] }) {
  const [selected, setSelected] = useState<LayoutGridCard | null>(null);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="relative grid min-h-[44rem] w-full grid-cols-1 gap-4 md:grid-cols-3 lg:min-h-[48rem]">
      {cards.map((card) => {
        const isSelected = selected?.id === card.id;

        return (
          <motion.button
            key={card.id}
            type="button"
            layoutId={`gallery-card-${card.id}`}
            onClick={() => setSelected(card)}
            aria-label={`Open ${card.title}`}
            aria-expanded={isSelected}
            className={cn(
              "group relative min-h-[20rem] overflow-hidden rounded-[1.8rem] bg-brand-darkest text-left shadow-lifted outline-offset-4 transition-[filter] duration-300 hover:brightness-105 md:min-h-[22rem] lg:min-h-[23.5rem]",
              card.className,
              isSelected &&
                "fixed inset-5 z-[90] m-auto h-[min(42rem,calc(100svh-2.5rem))] w-[calc(100vw-2.5rem)] max-w-[72rem] cursor-zoom-out md:inset-8 md:h-[min(44rem,calc(100svh-4rem))] md:w-[calc(100vw-4rem)]",
            )}
          >
            <motion.img
              layoutId={`gallery-image-${card.id}`}
              src={card.thumbnail}
              alt={card.alt}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </motion.button>
        );
      })}

      <motion.button
        type="button"
        aria-label="Close gallery card"
        aria-hidden={!selected}
        tabIndex={selected ? 0 : -1}
        onClick={() => setSelected(null)}
        className={cn(
          "fixed inset-0 z-[80] bg-brand-darkest opacity-0 transition-opacity duration-300",
          selected
            ? "pointer-events-auto opacity-[0.72]"
            : "pointer-events-none",
        )}
      />
    </div>
  );
}
