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
import { siteUrl } from "@/lib/seo";

/**
 * The digital business card, for the QR code on the printed card and for the
 * single link a social profile allows in its bio. Not linked from anywhere on
 * the site.
 */
export const metadata: Metadata = {
  title: `Contact ${site.name} | Painters in ${site.address.city}, ${site.address.state}`,
  description: `Call ${site.phone.display} or email ${site.legalName}, painting contractors serving ${site.address.city} and Greater Boston. Free estimate within ${site.responseHours} hours.`,

  /**
   * Kept out of the index on purpose, and that is the SEO decision rather than
   * an omission of one.
   *
   * The page repeats the business name, phone and address with almost none of
   * the homepage's content. Indexing it would put two pages carrying the same
   * local signals in front of Google, which splits them instead of
   * concentrating them where they earn rankings. `follow` stays on, so the
   * link through to the homepage still passes its weight.
   *
   * To index it anyway, change this to `{ index: true, follow: true }`.
   */
  robots: { index: false, follow: true },

  // Points at the homepage: this is the same business entity, and the homepage
  // is the version that should rank for it.
  alternates: { canonical: "/" },

  // The social card matters here in a way the search listing does not, because
  // this URL exists to be pasted into a bio and scanned off a business card.
  openGraph: {
    type: "profile",
    url: `${siteUrl}/redirect/`,
    siteName: site.legalName,
    title: `${site.legalName}`,
    description: `Painting contractors in ${site.address.city}, ${site.address.stateFull}. Call, email, or get a free estimate.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName}`,
    description: `Painting contractors in ${site.address.city}, ${site.address.stateFull}. Call, email, or get a free estimate.`,
  },
};

type CardLink = {
  label: string;
  detail: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactElement;
  external?: boolean;
};

export default function RedirectPage() {
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
    <main className="relative flex h-svh flex-col overflow-hidden bg-brand-darkest px-5 py-6 text-on-brand sm:px-8 sm:py-10">
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

      <div className="relative z-10 mx-auto flex w-full max-w-[32rem] flex-1 flex-col justify-center">
        {/* The card itself: a panel lifted off the photograph, so the page
            reads as something handed to you rather than a page you landed on. */}
        <div className="rounded-[2rem] border border-white/[0.12] bg-brand-darkest/[0.82] px-5 py-8 shadow-lifted backdrop-blur-md sm:px-8 sm:py-10">
          <div className="text-center">
            {/* The mark carries the page. The heading stays for the document
                outline and for anyone arriving with a screen reader. */}
            <h1 className="sr-only">{site.legalName}</h1>
            <Image
              src="/logo-white.webp"
              alt={site.legalName}
              width={788}
              height={364}
              priority
              className="mx-auto h-20 w-auto sm:h-24"
            />
          </div>

          <ul className="mt-8 space-y-2.5">
            {links.map(({ label, detail, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-full bg-white/[0.07] px-5 py-3.5 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.14]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-brand-darkest transition-transform duration-300 group-hover:scale-105">
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
        </div>
      </div>
    </main>
  );
}
