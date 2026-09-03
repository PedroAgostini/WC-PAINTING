import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/seo";

/**
 * Blocks every crawler until the deployment is the real one.
 *
 * The meta robots tag in the layout says the same thing, but this file is what
 * stops a crawler before it fetches a page at all, so the two are kept in
 * agreement deliberately rather than by accident.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The contact card repeats the homepage's business details with none
        // of its content. Crawling it splits the local signals.
        disallow: "/redirect/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
