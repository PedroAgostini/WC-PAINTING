import type { Metadata } from "next";
import Image from "next/image";
import {
  FacebookGlyph,
  GlobeIcon,
  InstagramGlyph,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { site } from "@/lib/site.config";

/**
 * The digital business card, for the QR code on the printed card and for the
 * single link a social profile allows in its bio.
 *
 * Deliberately not linked from the homepage. It is also kept out of the index:
 * it carries the same name, phone and address as the homepage with almost none
 * of the content, so letting it compete in search would split the local
 * signals between two thin pages instead of concentrating them on one.
 */
export const metadata: Metadata = {
  title: `${site.name} | Contact Card`,
  description: `Call, email or visit ${site.legalName}, painting contractors in ${site.address.city}, ${site.address.stateFull}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/card/" },
};

type CardLink = {
  label: string;
  detail: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactElement;
  external?: boolean;
};

export default function CardPage() {
  const links: CardLink[] = [
    {
      label: "Call us",
      detail: site.phone.display,
      href: site.phone.href,
      icon: PhoneIcon,
    },
    {
      label: "Email us",
      detail: site.email,
      href: `mailto:${site.email}`,
      icon: MailIcon,
    },
    {
      label: "Website",
      detail: "See our work and get a free estimate",
      href: "/",
      icon: GlobeIcon,
    },
    ...(site.social.facebook
      ? [
          {
            label: "Facebook",
            detail: "Follow our latest projects",
            href: site.social.facebook,
            icon: FacebookGlyph,
            external: true,
          } satisfies CardLink,
        ]
      : []),
    ...(site.social.instagram
      ? [
          {
            label: "Instagram",
            detail: "Before and after, job by job",
            href: site.social.instagram,
            icon: InstagramGlyph,
            external: true,
          } satisfies CardLink,
        ]
      : []),
  ];

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-brand-darkest px-5 py-14 text-on-brand sm:px-8 sm:py-20">
      <Image
        src="/hero-painting-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-darkest/[0.88]" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(0_0_0_/_0.25)_45%,rgb(0_0_0_/_0.6)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[34rem] flex-1 flex-col justify-center">
        <div className="text-center">
          <Image
            src="/logo-white.webp"
            alt={site.legalName}
            width={788}
            height={364}
            priority
            className="mx-auto h-24 w-auto sm:h-28"
          />
          <h1 className="serif-display h-card mt-8 capitalize">
            Painting done clean, across Greater Boston
          </h1>
          <p className="mx-auto mt-4 max-w-[30rem] text-[15.5px] leading-relaxed text-on-brand-muted">
            {site.yearsExperience} years on the brush, fully insured, and an
            itemized price within {site.responseHours} hours of the visit.
          </p>
        </div>

        <ul className="mt-10 space-y-3">
          {links.map(({ label, detail, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-full bg-white/[0.07] px-5 py-4 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.14]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-brand-darkest transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-extrabold uppercase tracking-[0.06em]">
                    {label}
                  </span>
                  <span className="block truncate text-[14px] text-on-brand-muted">
                    {detail}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[13px] leading-relaxed text-on-brand-muted">
          {site.address.city}, {site.address.stateFull}
          <br />
          {site.hours.label}
        </p>
      </div>
    </main>
  );
}
