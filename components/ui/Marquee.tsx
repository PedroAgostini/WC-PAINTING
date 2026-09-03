import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A horizontally scrolling row.
 *
 * One track holds the content twice and translates half its own width, so the
 * loop closes with no visible seam at any content length. Speed is set per row
 * through the `--duration` custom property:
 *
 *   <Marquee className="[--duration:34s]" reverse pauseOnHover>
 *
 * The duplicate copy is hidden from assistive technology, so a screen reader
 * hears each item once. Motion stops entirely under `prefers-reduced-motion`,
 * which leaves the row static and readable rather than empty.
 */
export function Marquee({
  children,
  reverse = false,
  pauseOnHover = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden",
        pauseOnHover && "marquee-group",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max",
          reverse ? "marquee-track-reverse" : "marquee-track",
          pauseOnHover && "marquee-pausable",
        )}
      >
        <div className="flex shrink-0 items-stretch">{children}</div>
        <div className="flex shrink-0 items-stretch" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
