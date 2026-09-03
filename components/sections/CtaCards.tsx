import Image from "next/image";
import { site } from "@/lib/site.config";
import { Cta, CtaGhost } from "@/components/ui/Cta";
import { PhoneIcon } from "@/components/ui/Icons";

function CtaShell({
  id,
  title,
  copy,
  image,
  ctaLabel,
  tone = "dark",
}: {
  id?: string;
  title: string;
  copy: string;
  image: string;
  ctaLabel: string;
  tone?: "dark" | "mint";
}) {
  const isDark = tone === "dark";

  return (
    <section id={id} className={isDark ? "bg-ground py-14" : "bg-surface py-14"}>
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div
          className={`reveal relative overflow-hidden rounded-[2rem] shadow-lifted ${
            isDark ? "bg-brand-darkest text-on-brand" : "bg-mint text-brand-darkest"
          }`}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover ${isDark ? "opacity-[0.38]" : "opacity-[0.2]"}`}
          />
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-brand-darkest/[0.62]"
                : "bg-mint/[0.88]"
            }`}
            aria-hidden="true"
          />

          {/* The mark, bled off the corner, the same way the company
              watermarks its own photographs. */}
          <div
            aria-hidden="true"
            // Black on mint reads far heavier than white on deep green, so the
            // light card gets roughly half the opacity of the dark one.
            className={`pointer-events-none absolute -bottom-16 -right-20 w-[22rem] sm:-bottom-20 sm:-right-28 sm:w-[32rem] lg:w-[40rem] ${
              isDark ? "opacity-[0.07]" : "opacity-[0.035]"
            }`}
          >
            <Image
              src={isDark ? "/logo-white.webp" : "/logo-black.webp"}
              alt=""
              width={788}
              height={364}
              className="h-auto w-full"
            />
          </div>

          <div className="relative z-10 grid gap-10 px-7 py-12 text-center sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:px-16 lg:py-20 lg:text-left">
            <div className="lg:col-span-7">
              <h2 className="serif-display h-section mx-auto max-w-[16ch] lg:mx-0">
                {title}
              </h2>
              <p
                className={`mx-auto mt-6 max-w-[42rem] text-[17px] leading-relaxed lg:mx-0 ${
                  isDark ? "text-on-brand" : "text-brand-darkest"
                }`}
              >
                {copy}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row lg:col-span-5 lg:justify-end">
              <Cta
                href="#contact-estimate"
                variant={isDark ? "light" : "solid"}
                size="lg"
              >
                {ctaLabel}
              </Cta>
              <CtaGhost
                href={site.phone.href}
                tone={isDark ? "onDark" : "onLight"}
              >
                <PhoneIcon className="h-4 w-4" />
                Call {site.phone.display}
              </CtaGhost>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Sits after the services, where the visitor knows what is on offer but has
 * not committed. The lever is how little it costs to find out, and the fact
 * that the owner turns up rather than a commissioned closer.
 */
export function MiddleCta() {
  return (
    <CtaShell
      id="transform-space"
      title="Get your price in 24 hours"
      copy="The owner comes out, measures the work himself and sends back an itemized price. No deposit, no obligation, and nobody trying to close you on your own doorstep."
      ctaLabel="Get my free estimate"
      image="/services/interior-painting.png"
      tone="mint"
    />
  );
}

/**
 * Sits after the process, immediately before the form. The visitor already
 * knows how the job runs, so this one answers the last thing holding them
 * back: what happens if the work is not right.
 */
export function ContactCta() {
  return (
    <CtaShell
      id="start-project"
      title="One visit, then a real number"
      copy="Pick a time that suits your household. The owner measures the work himself, talks the finishes through with you, and the itemized price lands in your inbox inside 24 hours."
      ctaLabel="Book my visit"
      image="/services/exterior-painting.png"
      tone="dark"
    />
  );
}
