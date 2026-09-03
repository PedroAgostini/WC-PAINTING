"use client";

import { useId, useState } from "react";
import { services, site } from "@/lib/site.config";
import { ArrowRightIcon, CheckIcon, ClockIcon, MailIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error" | "tooFast" | "mailto";

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "address"
  | "zip"
  | "service"
  | "propertyType"
  | "timeline";

type Errors = Partial<Record<FieldName, string>>;

const PROPERTY_TYPES = [
  "Single-family home",
  "Condominium",
  "Apartment",
  "Multi-family",
  "Commercial property",
];

const TIMELINES = [
  "As soon as possible",
  "Within a month",
  "In two to three months",
  "Planning ahead, no date yet",
];

const SIZES = [
  "One or two rooms",
  "Three to five rooms",
  "Whole home",
  "Exterior only",
  "Not sure yet",
];

/**
 * The long estimate request, for visitors who arrive ready to describe the job
 * rather than just ask the price.
 *
 * Everything past the five fields the homepage asks for is optional, and says
 * so. A required field a homeowner cannot answer from the sofa is a field that
 * loses the lead: nobody knows their square footage, and asking for it as a
 * condition of being contacted just ends the conversation.
 */
export function FullEstimateForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [mountedAt] = useState(() => Date.now());

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (get("name").length < 2) next.name = "Enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(get("email")))
      next.email = "Enter an email we can send the estimate to.";
    if (get("phone").replace(/\D/g, "").length < 10)
      next.phone = "Enter a 10-digit phone number.";
    if (get("address").length < 5)
      next.address = "Enter the street address of the property.";
    if (!/^\d{5}$/.test(get("zip"))) next.zip = "Enter a 5-digit ZIP code.";
    if (!get("service")) next.service = "Choose the service you need.";
    if (!get("propertyType")) next.propertyType = "Choose the property type.";
    if (!get("timeline")) next.timeline = "Choose when you would like to start.";

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("botcheck") ?? "")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    if (Date.now() - mountedAt < 1500) {
      setStatus("tooFast");
      return;
    }

    if (!accessKey) {
      const body = [...data.entries()]
        .filter(([k, v]) => k !== "botcheck" && String(v).trim())
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Estimate request: ${data.get("service")}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("submitting");
    data.append("access_key", accessKey);
    data.append("subject", `Estimate request: ${data.get("service")}`);
    data.append("from_name", site.legalName);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-[1rem] border bg-surface px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-soft transition-colors duration-200";
  const ok = "border-rule-strong";
  const bad = "border-brand";
  const cls = (e?: string) => `${field} ${e ? bad : ok}`;
  const labelCls = "label mb-2 block text-ink-muted";
  const errCls = "mt-1.5 block text-[13px] text-brand-deep";

  const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5l5-5' fill='none' stroke='%235c615d' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;
  const selectCls = (e?: string) =>
    `${cls(e)} appearance-none bg-[length:0.7rem] bg-[right_1rem_center] bg-no-repeat pr-10`;

  if (status === "success" || status === "mailto") {
    const sent = status === "success";
    return (
      <div className="mx-auto max-w-[38rem] rounded-[2rem] bg-surface px-8 py-16 text-center shadow-lifted">
        <span className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-mint text-brand-darkest">
          {sent ? (
            <CheckIcon className="h-8 w-8" />
          ) : (
            <MailIcon className="h-8 w-8" />
          )}
        </span>
        <h2 className="serif-display h-card">
          {sent ? "Request received" : "Finish in your email app"}
        </h2>
        <p className="measure-tight mx-auto mt-5 text-[16px] leading-relaxed text-ink-muted">
          {sent ? (
            <>
              We will call to arrange the on-site visit, and your itemized
              estimate follows within {site.responseHours} hours. If it is
              urgent, call{" "}
              <a href={site.phone.href} className="tnum font-semibold underline">
                {site.phone.display}
              </a>
              .
            </>
          ) : (
            <>
              Your details are filled in and ready to send. If nothing opened,
              email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline">
                {site.email}
              </a>{" "}
              or call{" "}
              <a href={site.phone.href} className="tnum font-semibold underline">
                {site.phone.display}
              </a>
              .
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-[64rem] rounded-[2rem] bg-surface px-6 py-10 shadow-lifted sm:px-10 sm:py-12 lg:px-14"
    >
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-botcheck`}>Do not fill this in</label>
        <input id={`${id}-botcheck`} type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      {/* ---------- About you ---------- */}
      <fieldset>
        <legend className="serif-display h-card">About you</legend>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor={`${id}-name`}>Full name</label>
            <input id={`${id}-name`} name="name" type="text" autoComplete="name" required
              aria-invalid={Boolean(errors.name)} className={cls(errors.name)} placeholder="Jane Whitman" />
            {errors.name && <span role="alert" className={errCls}>{errors.name}</span>}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-email`}>Email</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" required
              aria-invalid={Boolean(errors.email)} className={cls(errors.email)} placeholder="jane@example.com" />
            {errors.email && <span role="alert" className={errCls}>{errors.email}</span>}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-phone`}>Phone</label>
            <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required
              aria-invalid={Boolean(errors.phone)} className={`${cls(errors.phone)} tnum`} placeholder="(617) 555-0134" />
            {errors.phone && <span role="alert" className={errCls}>{errors.phone}</span>}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-contact`}>Best way to reach you</label>
            <select id={`${id}-contact`} name="preferredContact" defaultValue="Email"
              className={selectCls()} style={{ backgroundImage: chevron }}>
              <option>Email</option>
              <option>Phone call</option>
              <option>Text message</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* ---------- The property ---------- */}
      <hr className="mt-12 border-0 border-t border-rule" />
      <fieldset className="mt-10">
        <legend className="serif-display h-card">The property</legend>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor={`${id}-address`}>Street address</label>
            <input id={`${id}-address`} name="address" type="text" autoComplete="street-address" required
              aria-invalid={Boolean(errors.address)} className={cls(errors.address)} placeholder="72 Warren Ave" />
            {errors.address && <span role="alert" className={errCls}>{errors.address}</span>}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-city`}>City or town</label>
            <input id={`${id}-city`} name="city" type="text" autoComplete="address-level2"
              className={cls()} placeholder="Malden" />
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-zip`}>ZIP code</label>
            <input id={`${id}-zip`} name="zip" type="text" inputMode="numeric" maxLength={5}
              autoComplete="postal-code" required aria-invalid={Boolean(errors.zip)}
              className={`${cls(errors.zip)} tnum`} placeholder={site.address.zip} />
            {errors.zip && <span role="alert" className={errCls}>{errors.zip}</span>}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-property`}>Property type</label>
            <select id={`${id}-property`} name="propertyType" defaultValue="" required
              aria-invalid={Boolean(errors.propertyType)} className={selectCls(errors.propertyType)}
              style={{ backgroundImage: chevron }}>
              <option value="" disabled>Choose one</option>
              {PROPERTY_TYPES.map((p) => <option key={p}>{p}</option>)}
            </select>
            {errors.propertyType && <span role="alert" className={errCls}>{errors.propertyType}</span>}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-stories`}>Number of floors</label>
            <select id={`${id}-stories`} name="floors" defaultValue="" className={selectCls()}
              style={{ backgroundImage: chevron }}>
              <option value="">Not sure</option>
              <option>One</option>
              <option>Two</option>
              <option>Three or more</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* ---------- The work ---------- */}
      <hr className="mt-12 border-0 border-t border-rule" />
      <fieldset className="mt-10">
        <legend className="serif-display h-card">The work</legend>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor={`${id}-service`}>Service needed</label>
            <select id={`${id}-service`} name="service" defaultValue="" required
              aria-invalid={Boolean(errors.service)} className={selectCls(errors.service)}
              style={{ backgroundImage: chevron }}>
              <option value="" disabled>Choose a service</option>
              {services.map((s) => <option key={s.id}>{s.name}</option>)}
              <option>More than one of these</option>
              <option>Not sure yet</option>
            </select>
            {errors.service && <span role="alert" className={errCls}>{errors.service}</span>}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-size`}>Roughly how much</label>
            <select id={`${id}-size`} name="scope" defaultValue="" className={selectCls()}
              style={{ backgroundImage: chevron }}>
              <option value="">Not sure</option>
              {SIZES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor={`${id}-timeline`}>When would you like to start</label>
            <select id={`${id}-timeline`} name="timeline" defaultValue="" required
              aria-invalid={Boolean(errors.timeline)} className={selectCls(errors.timeline)}
              style={{ backgroundImage: chevron }}>
              <option value="" disabled>Choose one</option>
              {TIMELINES.map((t) => <option key={t}>{t}</option>)}
            </select>
            {errors.timeline && <span role="alert" className={errCls}>{errors.timeline}</span>}
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor={`${id}-details`}>
              Anything else we should know <span className="normal-case tracking-normal text-ink-soft">(optional)</span>
            </label>
            <textarea id={`${id}-details`} name="details" rows={5} className={`${cls()} resize-y`}
              placeholder="Colours you have in mind, surfaces that need repair, access or parking, pets at home, anything that helps us price it properly." />
          </div>
        </div>
      </fieldset>

      <button type="submit" disabled={status === "submitting"}
        className="group mt-12 flex w-full items-center justify-center gap-4 rounded-full bg-action px-8 py-5 text-[15px] font-extrabold uppercase tracking-[0.06em] text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-darkest disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:self-start">
        {status === "submitting" ? "Sending…" : "Send my estimate request"}
        {status !== "submitting" && (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-action transition-transform duration-300 group-hover:rotate-[-45deg]">
            <ArrowRightIcon className="h-5 w-5" />
          </span>
        )}
      </button>

      {status === "tooFast" && (
        <p role="alert" className="mt-5 text-[14px] text-brand-deep">
          Give your details a quick check, then press send again.
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="mt-5 text-[14px] text-brand-deep">
          The request did not go through. Please try again, email{" "}
          <a href={`mailto:${site.email}`} className="underline">{site.email}</a>{" "}
          or call{" "}
          <a href={site.phone.href} className="tnum underline">{site.phone.display}</a>.
        </p>
      )}

      <p className="mt-8 flex items-center gap-2.5 border-t border-rule pt-6 text-[14px] text-ink-muted">
        <ClockIcon className="h-4 w-4 shrink-0 text-brand" />
        We reply within {site.responseHours} hours, and the itemized price
        follows within {site.responseHours} hours of the visit.
      </p>
    </form>
  );
}
