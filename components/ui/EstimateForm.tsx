"use client";

import { useId, useState } from "react";
import { services, site } from "@/lib/site.config";
import { ArrowRightIcon, CheckIcon, ClockIcon, MailIcon } from "./Icons";

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  /** Tripped the anti-spam timing check. Never fails silently. */
  | "tooFast"
  /** No Web3Forms key configured, so the request left by email instead. */
  | "mailto";

type Errors = Partial<Record<"name" | "email" | "phone" | "zip" | "service", string>>;

/**
 * The five-field estimate request. This is the page's primary action and it
 * appears twice: in the hero's right column and in the closing contact
 * section. Both instances post to Web3Forms.
 *
 * Anti-spam is two layers: a honeypot field bots fill and humans never see,
 * and a minimum time-on-form check, plus Web3Forms' own filtering.
 */
export function EstimateForm({
  variant = "onBrand",
  formName = "Estimate request",
  hideHeading = false,
}: {
  variant?: "onBrand" | "onLight";
  formName?: string;
  /** Set when the wrapping card already shows the title and intro. */
  hideHeading?: boolean;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [mountedAt] = useState(() => Date.now());

  const onBrand = variant === "onBrand";

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const zip = String(data.get("zip") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();

    if (name.length < 2) next.name = "Enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email))
      next.email = "Enter an email we can send the estimate to.";
    if (phone.replace(/\D/g, "").length < 10)
      next.phone = "Enter a 10-digit phone number.";
    if (!/^\d{5}$/.test(zip)) next.zip = "Enter your 5-digit ZIP code.";
    if (!service) next.service = "Choose the service you need.";

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: only a bot fills a field it cannot see.
    if (String(data.get("botcheck") ?? "")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    // Nothing fills five valid fields in under a second and a half except a
    // script. This says so out loud rather than swallowing the click — an
    // autofilled form submitted fast is a real person, and silence reads as a
    // broken site.
    if (Date.now() - mountedAt < 1500) {
      setStatus("tooFast");
      return;
    }

    // Without a Web3Forms key the request still leaves, by the channel this
    // client prefers anyway. The form is never a dead end.
    if (!accessKey) {
      const body = [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        `ZIP code: ${data.get("zip")}`,
        `Service needed: ${data.get("service")}`,
      ].join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Estimate request: ${data.get("service")}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("submitting");
    data.append("access_key", accessKey);
    data.append("subject", `New estimate request: ${data.get("service")}`);
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

  const fieldBase = onBrand
    ? "w-full rounded-[1rem] border bg-brand-darkest/[0.4] px-4 py-3 text-[16px] text-on-brand placeholder:text-on-brand-muted transition-colors duration-200 focus:bg-brand-darkest/[0.7]"
    : "w-full rounded-[1rem] border bg-surface px-4 py-3 text-[16px] text-ink placeholder:text-ink-soft transition-colors duration-200";

  const borderIdle = onBrand ? "border-rule-on-brand" : "border-rule-strong";
  const borderError = onBrand ? "border-on-brand-alert" : "border-brand";

  const labelClass = onBrand
    ? "label mb-2 block text-on-brand-muted"
    : "label mb-2 block text-ink-muted";

  const errorClass = onBrand
    ? "mt-1.5 block text-[13px] text-on-brand-alert"
    : "mt-1.5 block text-[13px] text-brand-deep";

  function fieldClass(hasError: boolean) {
    return `${fieldBase} ${hasError ? borderError : borderIdle}`;
  }

  if (status === "mailto") {
    return (
      <div
        className={`flex min-h-[26rem] flex-col justify-center px-6 py-12 text-center sm:px-10 ${
          onBrand ? "on-brand text-on-brand" : "text-ink"
        }`}
      >
        <span
        className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border ${
            onBrand ? "border-rule-on-brand" : "border-rule-strong"
          }`}
        >
          <MailIcon className="h-7 w-7" />
        </span>
        <h3 className="display-sm text-[1.75rem]">Finish in your email app</h3>
        <p
          className={`measure-tight mx-auto mt-4 text-[15px] ${
            onBrand ? "text-on-brand-muted" : "text-ink-muted"
          }`}
        >
          Your details are filled in and ready to send. If nothing opened, email{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>{" "}
          or call{" "}
          <a href={site.phone.href} className="tnum underline">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        className={`flex min-h-[26rem] flex-col justify-center px-6 py-12 text-center sm:px-10 ${
          onBrand ? "on-brand text-on-brand" : "text-ink"
        }`}
      >
        <span
        className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border ${
            onBrand ? "border-rule-on-brand" : "border-rule-strong"
          }`}
        >
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="display-sm text-[1.75rem]">Request received</h3>
        <p
          className={`measure-tight mx-auto mt-4 text-[15px] ${
            onBrand ? "text-on-brand-muted" : "text-ink-muted"
          }`}
        >
          {site.ownerShort} will call to arrange the on-site visit, and your
          detailed estimate follows within {site.responseHours} hours. If it is
          urgent, call {site.phone.display}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`px-6 py-8 sm:px-8 sm:py-9 ${onBrand ? "on-brand" : ""}`}
      aria-labelledby={`${id}-heading`}
    >
      <input type="hidden" name="form_name" value={formName} />
      {/* Honeypot — hidden from people and from assistive technology. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-botcheck`}>Do not fill this in</label>
        <input
          id={`${id}-botcheck`}
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {hideHeading ? (
        // The surrounding card already carries the title; the form keeps an
        // accessible name for the same element it would have rendered.
        <h2 id={`${id}-heading`} className="sr-only">
          Get a free estimate
        </h2>
      ) : (
        <>
          <h2
            id={`${id}-heading`}
            className={`display-sm text-[1.6rem] sm:text-[1.75rem] ${
              onBrand ? "text-on-brand" : "text-ink"
            }`}
          >
            Get a free estimate
          </h2>
          <p
            className={`mt-2 text-[15px] ${
              onBrand ? "text-on-brand-muted" : "text-ink-muted"
            }`}
          >
            Five fields. {site.ownerShort} visits, measures, and sends a
            detailed price.
          </p>
        </>
      )}

      <div className={hideHeading ? "space-y-4" : "mt-7 space-y-4"}>
        <div>
          <label className={labelClass} htmlFor={`${id}-name`}>
            Full name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={fieldClass(Boolean(errors.name))}
            placeholder="Jane Whitman"
          />
          {errors.name && (
            <span id={`${id}-name-error`} role="alert" className={errorClass}>
              {errors.name}
            </span>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${id}-email`}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={fieldClass(Boolean(errors.email))}
            placeholder="jane@example.com"
          />
          {errors.email && (
            <span id={`${id}-email-error`} role="alert" className={errorClass}>
              {errors.email}
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
          <div>
            <label className={labelClass} htmlFor={`${id}-phone`}>
              Phone
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
              className={`${fieldClass(Boolean(errors.phone))} tnum`}
              placeholder="(617) 555-0134"
            />
            {errors.phone && (
              <span
                id={`${id}-phone-error`}
                role="alert"
                className={errorClass}
              >
                {errors.phone}
              </span>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor={`${id}-zip`}>
              ZIP code
            </label>
            <input
              id={`${id}-zip`}
              name="zip"
              type="text"
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
              required
              aria-invalid={Boolean(errors.zip)}
              aria-describedby={errors.zip ? `${id}-zip-error` : undefined}
              className={`${fieldClass(Boolean(errors.zip))} tnum`}
              placeholder={site.address.zip}
            />
            {errors.zip && (
              <span id={`${id}-zip-error`} role="alert" className={errorClass}>
                {errors.zip}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor={`${id}-service`}>
            Service needed
          </label>
          <select
            id={`${id}-service`}
            name="service"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? `${id}-service-error` : undefined
            }
            className={`${fieldClass(Boolean(errors.service))} appearance-none bg-[length:0.7rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5l5-5' fill='none' stroke='${
                onBrand ? "%23bed4c3" : "%235c615d"
              }' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            }}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
          {errors.service && (
            <span
              id={`${id}-service-error`}
              role="alert"
              className={errorClass}
            >
              {errors.service}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`group mt-7 flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-[15px] font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
          onBrand
            ? "bg-on-brand text-brand-darkest hover:bg-white"
            : "bg-brand text-white hover:bg-brand-deep"
        }`}
      >
        {status === "submitting" ? "Sending…" : "Request my estimate"}
        {status !== "submitting" && (
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>

      {status === "tooFast" && (
        <p
          role="alert"
          className={`mt-4 text-[14px] ${
            onBrand ? "text-on-brand-alert" : "text-brand-deep"
          }`}
        >
          Give your details a quick check, then press send again.
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className={`mt-4 text-[14px] ${
            onBrand ? "text-on-brand-alert" : "text-brand-deep"
          }`}
        >
          The request did not go through. Please try again, email{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>{" "}
          or call{" "}
          <a href={site.phone.href} className="tnum underline">
            {site.phone.display}
          </a>
          .
        </p>
      )}

      <p
        className={`mt-5 flex items-center gap-2.5 border-t pt-5 text-[13.5px] ${
          onBrand
            ? "border-rule-on-brand text-on-brand-muted"
            : "border-rule text-ink-muted"
        }`}
      >
        <ClockIcon className="h-4 w-4 shrink-0" />
        Detailed estimate within {site.responseHours} hours of the visit.
      </p>
    </form>
  );
}
