/**
 * The site's icon set. Authored here rather than pulled from a library so the
 * stroke weight, cap and join stay identical across every icon on the page.
 * All icons are 24x24, 1.5 stroke, round cap and join, and inherit currentColor.
 */

type IconProps = {
  className?: string;
};

function Svg({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.06a1.5 1.5 0 0 1 1.46 1.15l.62 2.6a1.5 1.5 0 0 1-.42 1.43l-1.2 1.2a13.5 13.5 0 0 0 5.6 5.6l1.2-1.2a1.5 1.5 0 0 1 1.43-.42l2.6.62A1.5 1.5 0 0 1 20 16.44v2.06a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 4 5.5Z" />
    </Svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3.5 6 8.5 6.5L20.5 6" />
    </Svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 21s7-6.03 7-11a7 7 0 1 0-14 0c0 4.97 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3.5 5 6v5.5c0 4 2.9 7.6 7 9 4.1-1.4 7-5 7-9V6l-7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4.5 12h15" />
      <path d="m13 5.5 6.5 6.5-6.5 6.5" />
    </Svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function BroomIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M14.5 3.5 10 8" />
      <path d="m8 6 4 4" />
      <path d="M10.5 8.5 5 14l5 5 5.5-5.5a2 2 0 0 0 0-2.83l-2.17-2.17a2 2 0 0 0-2.83 0Z" />
      <path d="m7 12 5 5" />
    </Svg>
  );
}

export function BrushIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M15.5 3.5h4a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M15 6.5H6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h9" />
      <path d="M9 11.5v3a3 3 0 0 0 6 0v-3" />
      <path d="M12 17.5v3" />
    </Svg>
  );
}

export function NoSmokeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6 18 18 6" />
      <path d="M7 12h6" />
      <path d="M16 12h1.5" />
    </Svg>
  );
}

export function BadgeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m8.5 14.5-1 6 4.5-2.5 4.5 2.5-1-6" />
    </Svg>
  );
}

export function StarIcon({
  className,
  fill = "currentColor",
}: IconProps & { fill?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5a13 13 0 0 1 0 17 13 13 0 0 1 0-17Z" />
    </Svg>
  );
}

/**
 * Brand marks are filled paths rather than strokes, because that is how the
 * platforms define them. Lucide dropped both for trademark reasons.
 */
export function FacebookGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.07C24 5.44 18.63 0 12 0S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.41c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07Z" />
    </svg>
  );
}

export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.16c3.2 0 3.58.02 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.18 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.89 1.44 1.44 0 0 0 0-2.89Z" />
    </svg>
  );
}

/**
 * The client's own Yelp mark, in `public/yelp.png`.
 *
 * Painted through a CSS mask rather than placed as an image, so the shape
 * takes `currentColor` and behaves exactly like the drawn glyphs beside it:
 * dark on the green disc of the contact card, white on the dark disc in the
 * footer, from one black-on-transparent file.
 */
export function YelpGlyph({ className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className ?? ""}`}
      style={{
        maskImage: "url(/yelp.png)",
        WebkitMaskImage: "url(/yelp.png)",
        // The file carries its own padding, so it reads smaller than the drawn
        // glyphs beside it at the same box. Scaled up to match their weight.
        maskSize: "118%",
        WebkitMaskSize: "118%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

/**
 * The single-colour Google mark, for surfaces where the icon has to change
 * colour with its container.
 *
 * The full-colour version cannot: on a green hover state its own green segment
 * disappears into the disc, and the rest muddies. Use this one wherever the
 * background moves, and the colour version only on a stable light ground.
 */
export function GoogleGlyphMono({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24Z" />
    </svg>
  );
}

export function GoogleGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.7-.06-1.37-.18-2.02H12v3.82h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.32Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.9a6 6 0 0 1 0-3.8V7.51H3.07a10 10 0 0 0 0 8.98l3.34-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.99 14.7 2 12 2A10 10 0 0 0 3.07 7.51l3.34 2.59C7.2 7.74 9.4 5.98 12 5.98Z"
      />
    </svg>
  );
}
