import { site } from "@/lib/site.config";
import { Cta } from "@/components/ui/Cta";
import { ClipboardCheck, MapPin, Send } from "lucide-react";

/**
 * The three-step journey, first contact through a cleaned handover. Each card
 * names the step and says what actually happens in it — a homeowner deciding
 * who to let into the house is reading for the detail, not the label.
 */
const steps = [
  {
    title: "Request estimate",
    body: "Send the five-field form or call. We come back to arrange a visit at a time that suits your household.",
    icon: Send,
    tone: "bg-mint text-brand-darkest",
  },
  {
    title: "On-site visit",
    body: `${site.ownerShort} measures the work himself and sends an itemized price within ${site.responseHours} hours.`,
    icon: MapPin,
    tone: "bg-card-cream text-brand-darkest",
  },
  {
    title: "Owner inspection",
    body: "The crew works clean and tidies daily. At the end, we walk the finished job together before the contract closes.",
    icon: ClipboardCheck,
    tone: "bg-brand-darkest text-on-brand",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="border-t border-rule bg-ground py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="reveal mx-auto max-w-[64rem] text-center">
          <h2 className="serif-display h-section">How to get started</h2>
          <p className="mx-auto mt-6 max-w-[42rem] text-[16.5px] leading-relaxed text-ink-muted">
            Three clear steps from your first message to a finished, cleaned home. You always know what happens next.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {steps.map(({ title, body, icon: Icon, tone }, index) => (
            <li
              key={title}
              className={`reveal relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-[1.8rem] px-8 py-8 shadow-lifted sm:min-h-[23rem] sm:px-10 sm:py-10 ${tone}`}
              style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
            >
              <Icon
                strokeWidth={1.25}
                className="pointer-events-none absolute -right-10 -top-8 h-56 w-56 opacity-[0.14] sm:h-72 sm:w-72"
              />
              <h3 className="serif-display h-card relative z-10">{title}</h3>
              <p className="relative z-10 mt-3 max-w-[40ch] text-[15.5px] leading-relaxed opacity-90">
                {body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Cta href="#contact-estimate" variant="solid" size="lg">
            Start step one today
          </Cta>
        </div>
      </div>
    </section>
  );
}
