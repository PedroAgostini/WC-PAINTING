import Image from "next/image";

type Tone = "light" | "deep" | "onDark";

type PhotoFrameProps = {
  /** Path under /public. When absent, the painted placeholder renders. */
  src?: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. "4 / 3". The box is reserved either way, so real
   *  photos drop in later without shifting any layout or spacing. */
  ratio?: string;
  className?: string;
  priority?: boolean;
  /** `onDark` belongs to the deep green bands, where the light tones would
   *  read as blank rectangles sitting on the ground. */
  tone?: Tone;
  sizes?: string;
};

/**
 * Reserves the exact box a project photograph will occupy.
 *
 * Until the client's project folders arrive it paints a two-tone color field
 * — the way a paint card carries a shade over its deeper companion. It is
 * deliberately flat and unmarked: no centered logo, no inset frame, no faint
 * texture, because those are the signatures of an image that failed to load.
 * A committed block of the page's own color reads as a design decision.
 */

const tones: Record<Tone, { field: string; band: string }> = {
  light: { field: "#e4e2d9", band: "#3a7b4b" },
  deep: { field: "#3a7b4b", band: "#1c3d25" },
  onDark: { field: "#4d9160", band: "#1c3d25" },
};

export function PhotoFrame({
  src,
  alt = "",
  ratio = "4 / 3",
  className = "",
  priority = false,
  tone = "light",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: PhotoFrameProps) {
  const t = tones[tone];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, backgroundColor: t.field }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0"
          style={{ height: "32%", backgroundColor: t.band }}
        />
      )}
    </div>
  );
}
