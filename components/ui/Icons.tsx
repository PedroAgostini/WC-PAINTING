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
