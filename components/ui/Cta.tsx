import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "./Icons";

type Variant = "solid" | "light" | "outline";
type Size = "md" | "lg";

/**
 * Every call to action on the site.
 *
 * One shape, one motion, two modes, both taken from the logo:
 *
 * - `solid` on light ground — the wordmark's black, white label, accent-green
 *   disc. 21:1, and the only black fill on the page, so black reads as "click".
 * - `light` on the deep green bands — black is 1.7:1 there and disappears, so
 *   the same button inverts rather than being restated in a new colour.
 *
 * Hovers stay inside their own family: a jump to a different hue reads as a
 * different button rather than the same one under the cursor.
 */
export function Cta({
  href,
  children,
  variant = "solid",
  size = "md",
  icon,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Replaces the arrow in the trailing disc. */
  icon?: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  const shell: Record<Variant, string> = {
    solid: "bg-action text-white hover:bg-brand-darkest",
    light: "bg-on-brand text-action hover:bg-white",
    outline:
      "border border-current/30 bg-transparent text-current hover:border-current/60",
  };

  const disc: Record<Variant, string> = {
    solid: "bg-accent text-action",
    light: "bg-brand text-white",
    outline: "bg-current/10 text-current",
  };

  const shellSize =
    size === "lg"
      ? "py-2.5 pl-8 pr-2.5 text-[15px]"
      : "py-2 pl-7 pr-2 text-[13.5px]";

  const discSize = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  const iconSize = size === "lg" ? "h-5 w-5" : "h-[1.05rem] w-[1.05rem]";

  return (
    <a
      href={href}
      className={cn(
        // Nowrap only from `sm` up. On a phone a long label would set the
        // button's minimum width, and inside a grid column that pushes the
        // whole page wider than the screen — so there the label wraps instead.
        // The disc never shrinks either way.
        "group inline-flex max-w-full items-center gap-4 rounded-full font-extrabold uppercase tracking-[0.06em] sm:whitespace-nowrap",
        "transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        shell[variant],
        shellSize,
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-[-45deg]",
          disc[variant],
          discSize,
        )}
      >
        {icon ?? <ArrowRightIcon className={iconSize} />}
      </span>
    </a>
  );
}

/**
 * The quiet companion to `Cta` — same height and radius, no trailing disc, for
 * the secondary action that sits beside the primary one.
 */
export function CtaGhost({
  href,
  children,
  tone = "onDark",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: "onDark" | "onLight";
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-7 py-4 text-[13.5px] font-extrabold uppercase tracking-[0.06em]",
        "transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "onDark"
          ? "border border-white/30 text-white hover:border-white hover:bg-white/10"
          : "border border-action/25 text-action hover:border-action hover:bg-action/[0.06]",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
