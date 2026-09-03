import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/seo";

/**
 * One page, because the site is one page. `/redirect` is left out: it is the
 * contact card, kept out of the index on purpose.
 *
 * Empty while the deployment is not the real one, so a staging build never
 * hands a crawler a list of URLs to fetch.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
