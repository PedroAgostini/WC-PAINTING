import { site } from "@/lib/site.config";

const benefits = [
  site.credentials.licensed ? "Licensed & Fully Insured" : "Fully Insured",
  "Owner Inspected",
  "Clean, Smoke-Free Crew",
  `${site.responseHours}-Hour Estimate`,
  "Daily Cleanup",
  "Greater Boston",
];

/**
 * The running band of what the company actually commits to. It reads, it does
 * not ask — the calls to action sit in the sections either side of it.
 */
export function TrustBand() {
  const loop = [...benefits, ...benefits, ...benefits, ...benefits];

  return (
    <section className="on-brand relative overflow-hidden bg-brand-darkest py-5 text-on-brand">
      <div className="w-full overflow-hidden">
        <div className="marquee-x flex w-max items-center gap-6">
          {loop.map((title, index) => (
            <span
              key={`${title}-${index}`}
              className="inline-flex items-center gap-6 text-[15px] font-extrabold uppercase tracking-[0.08em]"
            >
              {title}
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
