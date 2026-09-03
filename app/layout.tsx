import type { Metadata, Viewport } from "next";
import { Archivo, Young_Serif } from "next/font/google";
import { site, fullAddress, services, serviceAreas } from "@/lib/site.config";
import "./globals.css";

/**
 * One superfamily for the whole site. Archivo's width axis gives the display
 * voice real presence without pulling in a second face, and its heavy expanded
 * cut echoes the wordmark in the logo.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

/**
 * The display voice. Young Serif carries thick, wedge-cut strokes that hold
 * their colour at poster size — the register of a trade that builds things.
 * A high-contrast Renaissance serif goes thin and fashion-like at 5rem, which
 * is the opposite of what this company sells.
 */
const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-serif-display",
});

const siteUrl = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // 54 characters, so Google renders it whole instead of truncating. The
    // service and the place lead because that is the shape of the query; the
    // brand closes, where it costs nothing.
    default: "House Painters in Malden & Greater Boston | WC Painting",
    template: "%s | WC Painting",
  },
  // Around 150 characters. Opens with what was searched for, then the three
  // facts that separate this result from the one under it.
  description: `Interior and exterior painting across Greater Boston and Cape Cod. ${site.yearsExperience} years of experience, fully insured, and an itemized price within ${site.responseHours} hours.`,
  keywords: [
    "painting contractor Malden MA",
    "interior painting Boston",
    "exterior painting Greater Boston",
    "house painters Newton MA",
    "house painters Wellesley MA",
    "commercial painting Boston",
    "wallpaper removal Massachusetts",
    "Cape Cod painting contractor",
  ],
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.legalName,
    title: "Quality Interior and Exterior Painting in Greater Boston",
    description:
      `${site.yearsExperience} years of experience. Fully insured. The owner inspects the finished work with you. Detailed estimate within ${site.responseHours} hours.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Quality Interior and Exterior Painting in Greater Boston",
    description:
      `${site.yearsExperience} years of experience. Fully insured. Detailed estimate within ${site.responseHours} hours.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#3A7B4B",
  width: "device-width",
  initialScale: 1,
};

/**
 * LocalBusiness structured data, built entirely from site.config so it can
 * never drift from what the page says. Note there is no license property:
 * the HIC registration has not been issued yet.
 */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": `${siteUrl}/#business`,
    name: site.legalName,
    alternateName: site.name,
    description:
      "Interior, exterior, residential and commercial painting plus wallpaper removal for Greater Boston and Cape Cod.",
    url: siteUrl,
    telephone: site.phone.display,
    email: site.email,
    foundingDate: String(site.foundedYear),
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.lat,
      longitude: site.address.lng,
    },
    openingHours: site.hours.schema,
    areaServed: serviceAreas.flatMap((group) =>
      group.towns.map((town) => ({
        "@type": "City",
        name: `${town.name}, ${site.address.state}`,
      })),
    ),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: site.address.lat,
        longitude: site.address.lng,
      },
      geoRadius: `${site.serviceRadiusMiles} mi`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
        },
      })),
    },
    sameAs: [site.googleBusinessUrl],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${youngSerif.variable} js`}>
      <head>
        {/* Without scripting the reveal animation must never hide anything, so
            the `js` class is neutralised for those visitors. Rendered on the
            server so the markup matches on hydration. */}
        <noscript>
          <style>{`.js .reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData()),
          }}
        />
      </head>
      <body>
        <a
          href="#contact-estimate"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to the estimate form
        </a>
        {children}
        <span className="sr-only">{fullAddress}</span>
      </body>
    </html>
  );
}
