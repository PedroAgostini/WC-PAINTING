import Image from "next/image";
import { services } from "@/lib/site.config";
import { Cta } from "@/components/ui/Cta";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Service cards.
 *
 * Every card carries the same treatment, so the photographs are the only thing
 * that changes between them and the eye reads the work rather than the wrapper.
 *
 * The tint is deliberately light enough to see through: the photographs are the
 * argument, and a card that hides them is a coloured rectangle with a caption.
 */
const CARD = {
  tint: "bg-brand-darkest/[0.6]",
  scrim: "from-brand-darkest via-brand-darkest/85",
} as const;

export function Services() {
  return (
    <section id="services" className="bg-surface py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="reveal mx-auto max-w-[52rem] text-center">
          <h2 className="serif-display h-section">
            Reliable painting for Greater Boston properties
          </h2>
          <p className="mx-auto mt-6 max-w-[44rem] text-[16.5px] leading-relaxed text-ink-muted">
            Complete prep, clear scope, clean daily work, and a finish reviewed
            with the owner before the project closes.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-2">
          {services.map((service, index) => {
            return (
              <article
                key={service.id}
                id={service.id}
                className={cn(
                  "reveal group relative isolate flex min-h-[26rem] flex-col overflow-hidden rounded-[1.8rem] text-on-brand shadow-lifted sm:min-h-[29rem]",
                  // An odd last card on a two-column grid would sit alone; let
                  // it take the full width instead of half-empty.
                  index === services.length - 1 && services.length % 2 === 1
                    ? "lg:col-span-2 lg:min-h-[24rem]"
                    : "",
                )}
                style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
              >
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  className={cn("absolute inset-0 -z-10", CARD.tint)}
                  aria-hidden="true"
                />
                {/* Holds the copy legible without flattening the photograph:
                    opaque where the words sit, gone by the top of the card. */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 -z-10 h-4/5 bg-gradient-to-t to-transparent",
                    CARD.scrim,
                  )}
                  aria-hidden="true"
                />

                <div className="flex flex-1 flex-col justify-end p-7 sm:p-10 lg:p-12">
                  <h3 className="serif-display h-card">{service.name}</h3>
                  <p className="mt-4 max-w-[38rem] text-[16px] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between gap-5">
                    <a
                      href="#contact-estimate"
                      className="text-[13px] font-extrabold uppercase tracking-[0.06em] underline-offset-4 hover:underline"
                    >
                      Get a quote for this
                    </a>
                    <a
                      href="#contact-estimate"
                      aria-label={`Request an estimate for ${service.name}`}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-on-brand text-action transition-[transform,background-color] duration-300 group-hover:rotate-[-45deg] group-hover:bg-white"
                    >
                      <ArrowRightIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Cta href="#contact-estimate" variant="solid" size="lg">
            Transform your space
          </Cta>
        </div>
      </div>
    </section>
  );
}
