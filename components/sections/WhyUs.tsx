import { Award, ClipboardCheck, ShieldCheck, Sparkles } from "lucide-react";
import { site } from "@/lib/site.config";
import { Cta } from "@/components/ui/Cta";

/**
 * Each card carries the claim and the thing that backs it. A title alone is an
 * adjective; the line under it is why a homeowner believes the adjective.
 */
const differentiators = [
  {
    title: "Owner inspected",
    body: `${site.ownerShort} walks the finished work with you before the contract closes and payment is taken.`,
    icon: ClipboardCheck,
    tone: "bg-mint text-brand-darkest",
  },
  {
    title: `${site.yearsExperience} years experience`,
    body: `${site.yearsExperience} years painting in the United States and ${site.yearsInBusiness} as an established company.`,
    icon: Award,
    tone: "bg-brand text-on-brand",
  },
  {
    title: "Clean worksite",
    body: "Uniformed crew, floors and furniture covered, the site swept at the end of every day.",
    icon: Sparkles,
    tone: "bg-card-cream text-brand-darkest",
  },
  {
    title: site.credentials.licensed ? "Licensed & insured" : "Fully insured",
    body: site.credentials.licensed
      ? `Massachusetts HIC ${site.credentials.hicNumber}, with liability coverage in force on every job.`
      : "Liability coverage in force on every job, so your property is protected while we work.",
    icon: ShieldCheck,
    tone: "bg-on-brand text-brand-darkest",
  },
];

/**
 * The cascade down the stack. The offsets stay small on purpose: the right
 * column already ends flush with the container, so a larger shift pushes the
 * page wider than the screen at exactly the width where the layout is tightest.
 */
const stackMotion = [
  "lg:-rotate-1 lg:translate-x-0",
  "lg:rotate-1 lg:translate-x-2",
  "lg:-rotate-1 lg:translate-x-4",
  "lg:rotate-1 lg:translate-x-6",
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative bg-brand-darkest py-20 text-on-brand sm:py-24 lg:py-32"
    >
      <div
        className="absolute inset-0 bg-[url('/services/exterior-painting.png')] bg-cover bg-center opacity-[0.12]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-brand-darkest/[0.86]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-[92rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* The claim holds still while the proof stack scrolls past it, so the
            two are read together rather than one after the other. */}
        <div className="reveal min-w-0 text-center lg:col-span-5 lg:sticky lg:top-32 lg:self-start lg:text-left">
          <h2 className="serif-display h-section-narrow mx-auto max-w-[18ch] lg:mx-0">
            The reliable choice for your painting project
          </h2>
          <p className="mx-auto mt-7 max-w-[34rem] text-[18px] leading-relaxed text-on-brand lg:mx-0">
            Painting your home should be simple and stress free. WC Painting
            keeps the quote clear, the job clean, and the final walkthrough
            personal.
          </p>
          <Cta href="#contact-estimate" variant="light" size="lg" className="mt-9">
            Choose stress-free painting
          </Cta>
        </div>

        <div className="reveal relative min-w-0 lg:col-span-7">
          <div
            className="pointer-events-none absolute left-8 top-[-4rem] hidden h-[34rem] w-1 rounded-full lg:block"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-accent) 0 55%, transparent 55% 100%)",
              backgroundSize: "4px 20px",
            }}
            aria-hidden="true"
          />
          <div className="-space-y-7">
            {differentiators.map(({ title, body, icon: Icon, tone }, index) => (
              <article
                key={title}
                // The stack overlaps by 1.75rem, so the bottom padding has to
                // clear that much or the card below crops the last line.
                className={`relative flex min-h-[13rem] flex-col justify-end overflow-hidden rounded-[1.8rem] px-7 pb-14 pt-7 shadow-lifted sm:min-h-[15rem] sm:px-10 sm:pb-16 sm:pt-9 ${tone} ${stackMotion[index]}`}
                style={{ zIndex: index + 1 }}
              >
                <Icon
                  strokeWidth={1.25}
                  className="pointer-events-none absolute -right-8 -top-10 h-52 w-52 opacity-[0.14] sm:h-64 sm:w-64"
                />
                <h3 className="serif-display h-card relative z-10">{title}</h3>
                <p className="relative z-10 mt-3 max-w-[42ch] text-[15.5px] leading-relaxed opacity-90">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
