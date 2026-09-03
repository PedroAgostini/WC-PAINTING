import Image from "next/image";
import { nav, services, site } from "@/lib/site.config";
import {
  ArrowRightIcon,
  FacebookGlyph,
  GoogleGlyph,
  InstagramGlyph,
  MailIcon,
  PhoneIcon,
  PinIcon,
  YelpGlyph,
} from "@/components/ui/Icons";

/**
 * Only the profiles that actually exist. A null entry in the config drops out
 * here rather than rendering a button that goes nowhere.
 */
const socials = [
  { label: "Google", href: site.googleBusinessUrl, icon: GoogleGlyph },
  { label: "Facebook", href: site.social.facebook, icon: FacebookGlyph },
  { label: "Instagram", href: site.social.instagram, icon: InstagramGlyph },
  { label: "Yelp", href: site.social.yelp, icon: YelpGlyph },
].filter((s): s is { label: string; href: string; icon: typeof YelpGlyph } =>
  Boolean(s.href),
);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-brand relative overflow-hidden bg-brand-darkest pb-24 pt-12 text-on-brand sm:pb-10 lg:pb-12 lg:pt-16">
      {/* The mark, held right back and bled off the corner, the same way the
          company watermarks its own photographs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-10 w-[26rem] opacity-[0.035] sm:-bottom-16 sm:-right-14 sm:w-[38rem] lg:-bottom-20 lg:w-[48rem]"
      >
        <Image
          src="/logo-white.webp"
          alt=""
          width={788}
          height={364}
          className="h-auto w-full"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-accent to-brand"
      />

      <div className="relative z-10 mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid gap-10 pb-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Image
              src="/logo-white.webp"
              alt={site.legalName}
              width={788}
              height={364}
              className="h-20 w-auto lg:h-24"
            />
            <p className="measure-tight mt-6 text-[15px] leading-relaxed text-on-brand-muted">
              {site.tagline}. Interior and exterior painting across Greater
              Boston and Cape Cod since {site.foundedYear}.
            </p>

            {socials.length > 0 && (
              <ul className="mt-7 flex items-center gap-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${label}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-on-brand transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-brand-darkest"
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav className="lg:col-span-2" aria-label="Sections">
            <h2 className="label text-on-brand-muted">Site</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block text-[14.5px] text-on-brand transition-[color,transform] duration-200 hover:translate-x-1 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label text-on-brand-muted">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`/#${service.id}`}
                    className="inline-block text-[14.5px] text-on-brand transition-[color,transform] duration-200 hover:translate-x-1 hover:text-accent"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-on-brand-muted">Contact</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={site.phone.href}
                  className="group flex items-center gap-3 text-[14.5px] transition-colors duration-200 hover:text-accent"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] transition-colors duration-200 group-hover:bg-accent group-hover:text-brand-darkest">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <span className="tnum font-semibold">
                    {site.phone.display}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 text-[14.5px] transition-colors duration-200 hover:text-accent"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] transition-colors duration-200 group-hover:bg-accent group-hover:text-brand-darkest">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  <span className="font-semibold">{site.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-[14.5px]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08]">
                  <PinIcon className="h-4 w-4" />
                </span>
                {/* The full postal address stays in the LocalBusiness schema
                    in app/layout.tsx, which is what search engines read. */}
                <address className="not-italic font-semibold text-on-brand">
                  Greater Boston
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 border-t border-white/[0.12] pt-7 text-[13px] text-on-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="order-2 text-center sm:order-1 sm:text-left">
            © {year} {site.legalName} All rights reserved.
          </p>

          <p className="order-1 flex items-center gap-2 sm:order-2">
            <span>Developed by</span>
            <a
              href="http://eusouts.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 font-extrabold uppercase tracking-[0.08em] text-on-brand transition-colors duration-200 hover:bg-accent hover:text-brand-darkest"
            >
              Eu Sou TS
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
