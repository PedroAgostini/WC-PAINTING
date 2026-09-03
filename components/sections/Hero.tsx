import Image from "next/image";
import { site } from "@/lib/site.config";
import { Cta, CtaGhost } from "@/components/ui/Cta";
import { PhoneIcon } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92svh] overflow-hidden bg-brand-darkest text-white"
    >
      <Image
        src="/hero-painting-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/[0.45]" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(0_0_0_/_0.16)_42%,rgb(0_0_0_/_0.62)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[92rem] flex-col px-5 pb-12 pt-[6.5rem] sm:px-8 lg:pb-14 lg:pt-[7.5rem]">
        <div className="flex flex-1 items-center justify-center py-14 text-center">
          <div className="max-w-[68rem]">
            <h1 className="display h-hero capitalize">
              Quality painting
              <span className="block text-accent">for Greater Boston</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[44rem] text-[17px] leading-relaxed text-white/[0.86] sm:text-[19px]">
              Interior and exterior painting with a uniformed, smoke-free crew,
              daily cleanup, and the owner inspecting the finished work with
              you.
            </p>

            {/* Proof the visitor can check, before they are asked to act. */}
            <ul className="mx-auto mt-8 flex max-w-[46rem] flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white/85">
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {site.yearsExperience} years experience
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {site.credentials.licensed
                  ? "Licensed & fully insured"
                  : "Fully insured"}
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {site.responseHours}-hour estimate
              </li>
            </ul>

            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Cta href="#contact-estimate" variant="light" size="lg">
                Get a free estimate
              </Cta>
              <CtaGhost href={site.phone.href} tone="onDark">
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
