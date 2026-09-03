import { site } from "@/lib/site.config";
import { EstimateForm } from "@/components/ui/EstimateForm";
import { OfficeMap } from "@/components/ui/OfficeMap";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";

/**
 * The closing conversion block: how to reach the company, where it is, and the
 * same five-field request as the hero.
 *
 * Email is the client's preferred channel and leads the list. Each channel is
 * a tile in the page's own card language rather than a row in a ruled table,
 * and the two that can be acted on — email and phone — are the whole tile, not
 * a link buried inside one.
 */
const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: MailIcon,
  },
  {
    label: "Phone",
    value: site.phone.display,
    href: site.phone.href,
    icon: PhoneIcon,
    tabular: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-surface-sunk py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — how to reach them, and where they are */}
          <div className="reveal lg:col-span-6">
            <h2 className="serif-display h-section max-w-[16ch]">
              Start your project today
            </h2>
            <p className="measure mt-6 text-[16.5px] leading-relaxed text-ink-muted">
              Send the form and {site.ownerShort} will call to arrange the
              visit. Prefer to talk first? The phone is answered during working
              hours.
            </p>

            <ul className="mt-10 grid gap-4">
              {channels.map(
                ({ label, value, href, icon: Icon, tabular }) => {
                  const body = (
                    <>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mint text-brand-darkest transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="label block text-ink-soft">
                          {label}
                        </span>
                        <span
                          className={`mt-1.5 block text-[16.5px] font-semibold leading-snug text-ink ${tabular ? "tnum" : ""}`}
                        >
                          {value}
                        </span>
                      </span>
                    </>
                  );

                  const shell =
                    "group flex h-full items-start gap-4 rounded-[1.25rem] bg-surface p-6 shadow-raised";

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className={`${shell} transition-transform duration-300 hover:-translate-y-1`}
                        >
                          {body}
                        </a>
                      ) : (
                        <div className={shell}>{body}</div>
                      )}
                    </li>
                  );
                },
              )}
            </ul>

            <OfficeMap />
          </div>

          {/* Right — the request itself */}
          <div
            className="reveal lg:col-span-6"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <div
              id="contact-estimate"
              className="overflow-hidden rounded-[2rem] bg-surface shadow-lifted lg:sticky lg:top-32"
            >
              <div className="bg-brand-darkest px-7 py-8 text-on-brand sm:px-9">
                <h3 className="serif-display h-card">Get a free estimate</h3>
                <p className="mt-2.5 max-w-[38ch] text-[15.5px] leading-relaxed text-on-brand-muted">
                  Five fields. {site.ownerShort} visits, measures, and sends a
                  detailed price within {site.responseHours} hours.
                </p>
              </div>
              <EstimateForm
                variant="onLight"
                formName="Contact estimate"
                hideHeading
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
