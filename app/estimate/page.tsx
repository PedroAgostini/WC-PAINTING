import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site.config";
import { isIndexable } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/ui/Reveal";
import { FullEstimateForm } from "@/components/ui/FullEstimateForm";

export const metadata: Metadata = {
  title: "Free Painting Estimate in Greater Boston",
  description: `Tell us about the job and get an itemized price within ${site.responseHours} hours of the visit. Interior and exterior painting across Greater Boston and Cape Cod.`,
  alternates: { canonical: "/estimate/" },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: "Free Painting Estimate in Greater Boston",
    description: `Tell us about the job and get an itemized price within ${site.responseHours} hours of the visit.`,
  },
};

export default function EstimatePage() {
  return (
    <>
      <Header />

      <main>
        {/* Same first viewport as the homepage, with the offer swapped for the
            single thing this page is for. No buttons: the form is the action,
            and it starts one screen down. */}
        <section
          id="top"
          className="relative flex min-h-[62svh] items-center overflow-hidden bg-brand-darkest text-white lg:min-h-[70svh]"
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

          <div className="relative z-10 mx-auto w-full max-w-[92rem] px-5 pb-16 pt-[9rem] text-center sm:px-8 lg:pb-20 lg:pt-[11rem]">
            <div className="mx-auto max-w-[74rem]">
              <h1 className="display h-hero capitalize">
                Get your free
                <span className="block text-accent">painting estimate</span>
              </h1>
              <p className="mx-auto mt-7 max-w-[44rem] text-[17px] leading-relaxed text-white/[0.86] sm:text-[19px]">
                Tell us about the job below. The owner comes out, measures the
                work himself, and sends back an itemized price within{" "}
                {site.responseHours} hours.
              </p>

              <ul className="mx-auto mt-8 flex max-w-[46rem] flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white/85">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  No deposit
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  No obligation
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {site.credentials.licensed
                    ? "Licensed & fully insured"
                    : "Fully insured"}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* The form owns the section. Nothing beside it: a column of reassurance
            here would only compete with the fields for attention at the exact
            moment the visitor has already decided to fill them in. */}
        <section
          id="estimate-form"
          className="bg-surface-sunk py-16 sm:py-20 lg:py-24"
        >
          <div className="reveal mx-auto max-w-[92rem] px-5 sm:px-8">
            <FullEstimateForm />
          </div>
        </section>
      </main>

      <Footer />
      <RevealObserver />
    </>
  );
}
