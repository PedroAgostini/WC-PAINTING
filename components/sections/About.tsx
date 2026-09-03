import { site } from "@/lib/site.config";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Counter } from "@/components/ui/Counter";
import { Cta } from "@/components/ui/Cta";
import { CheckIcon } from "@/components/ui/Icons";

export function About() {
  return (
    <section id="about" className="bg-surface-sunk py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="reveal lg:col-span-6">
            <h2 className="serif-display h-section-narrow max-w-[26ch]">
              Over two decades of uncompromising painting quality
            </h2>

            <div className="measure mt-7 space-y-5 text-[17px] leading-relaxed text-ink-muted">
              <p>
                {site.legalName} brings {site.yearsExperience} years of hands-on
                experience and {site.yearsInBusiness} years of established local
                business to every project.
              </p>
              <p>
                Founded by {site.owner}, our team provides reliable interior and
                exterior painting throughout Greater Boston, Malden, Newton,
                Wellesley, and Cape Cod. We deliver detailed estimates within{" "}
                {site.responseHours} hours, maintain a clean workspace, and make
                sure {site.ownerShort} personally inspects the finished work
                alongside you.
              </p>
            </div>

            <Cta href="#contact-estimate" variant="solid" size="lg" className="mt-9">
              Work with our team
            </Cta>
          </div>

          <div
            className="reveal lg:col-span-6"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <PhotoFrame
              src="/services/interior-painting.png"
              alt="Protected home interior prepared for painting"
              ratio="5 / 4"
              className="rounded-[2rem] shadow-lifted"
              tone="deep"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
