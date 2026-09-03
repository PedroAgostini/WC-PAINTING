import { reviews, reviewSummary, site, type Review } from "@/lib/site.config";
import { Cta } from "@/components/ui/Cta";
import { Marquee } from "@/components/ui/Marquee";
import { GoogleGlyph, StarIcon } from "@/components/ui/Icons";

/**
 * Reviews, read from the hand-entered list in site.config.
 *
 * Two rows running in opposite directions, paused on hover so a visitor can
 * actually read one. Nothing here is generated: an empty list renders an
 * honest panel pointing at the Google profile rather than a placeholder rating
 * or an invented quote.
 */
function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="mx-2 flex w-[20rem] shrink-0 flex-col rounded-[1.5rem] bg-ground p-6 text-left shadow-raised transition-transform duration-300 hover:-translate-y-1 sm:w-[24rem] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div
          role="img"
          className="flex gap-0.5 text-brand"
          aria-label={`Rated ${review.rating} out of 5`}
        >
          {Array.from({ length: review.rating }).map((_, star) => (
            <StarIcon key={star} className="h-4 w-4" />
          ))}
        </div>
        <GoogleGlyph className="h-4 w-4 shrink-0 opacity-60" />
      </div>

      <blockquote className="mt-5 overflow-hidden text-[16px] leading-relaxed text-ink [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6]">
        {review.text}
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-rule pt-4">
        {/* The initial stands in for an avatar: Google does not license the
            reviewer photos for reuse off its own surfaces. */}
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint text-[14px] font-bold text-brand-darkest"
        >
          {review.author.trim().charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14.5px] font-semibold text-ink">
            {review.author}
          </span>
          <span className="block text-[13px] text-ink-soft">{review.date}</span>
        </span>
      </footer>
    </article>
  );
}

export function Reviews() {
  const hasReviews = reviews.length > 0;
  const half = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.slice(half);

  return (
    <section id="reviews" className="bg-surface py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-5 text-center sm:px-8">
        <div className="reveal mx-auto max-w-[72rem]">
          <h2 className="serif-display h-section mx-auto max-w-[22ch]">
            Feedback from our local Massachusetts clients
          </h2>
          <p className="mx-auto mt-6 max-w-[44rem] text-[16.5px] leading-relaxed text-ink-muted">
            Verified Google feedback from homeowners who already worked with WC
            Painting.
          </p>

          {reviewSummary.rating !== null && (
            <p className="mt-7 inline-flex items-center gap-3 rounded-full bg-surface-sunk px-6 py-3">
              <GoogleGlyph className="h-5 w-5 shrink-0" />
              <span className="tnum text-[19px] font-bold leading-none text-ink">
                {reviewSummary.rating.toFixed(1)}
              </span>
              <span className="flex gap-0.5 text-brand" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="h-4 w-4" />
                ))}
              </span>
              {reviewSummary.total !== null && (
                <span className="tnum text-[14px] text-ink-muted">
                  {reviewSummary.total} reviews
                </span>
              )}
            </p>
          )}

        </div>
      </div>

      {hasReviews ? (
        <div className="reveal relative mt-14 lg:mt-16">
          <Marquee pauseOnHover className="[--duration:46s]">
            {firstRow.map((review, index) => (
              <ReviewCard key={`a-${review.author}-${index}`} review={review} />
            ))}
          </Marquee>

          {secondRow.length > 0 && (
            <Marquee reverse pauseOnHover className="mt-4 [--duration:52s]">
              {secondRow.map((review, index) => (
                <ReviewCard
                  key={`b-${review.author}-${index}`}
                  review={review}
                />
              ))}
            </Marquee>
          )}

          {/* The rows run to the edge and fade, rather than stopping at a hard
              line that would read as a cropped container. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface to-transparent sm:w-32" />
        </div>
      ) : (
        <div className="reveal mx-auto mt-14 max-w-[42rem] px-5 text-center sm:px-8 lg:mt-16">
          <div className="rounded-[1.8rem] bg-mint px-8 py-10 text-brand-darkest shadow-raised">
            <GoogleGlyph className="mx-auto h-8 w-8" />
            <h3 className="serif-display h-card mx-auto mt-6">
              Read them on Google
            </h3>
            <p className="mx-auto mt-5 max-w-[32rem] text-[16px] leading-relaxed">
              Our reviews are written by homeowners across Greater Boston on our
              Google Business Profile, where we cannot edit a word of them.
            </p>
          </div>
        </div>
      )}

      {/* Both closing actions together: the primary sends them to the form,
          the outline sends them to the profile the reviews came from. */}
      <div className="mx-auto mt-12 flex max-w-[92rem] flex-col items-center justify-center gap-3.5 px-5 sm:flex-row sm:px-8">
        <Cta href="#contact-estimate" variant="solid" size="lg">
          Be our next success
        </Cta>
        <Cta
          href={site.googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="lg"
          icon={<GoogleGlyph className="h-5 w-5" />}
        >
          Read on Google
        </Cta>
      </div>
    </section>
  );
}
