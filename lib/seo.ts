import { site } from "./site.config";

/**
 * Whether this deployment is allowed into search results.
 *
 * Off by default, which is the safe way round. A Vercel production deployment
 * on a `.vercel.app` address is indexable like any other site, so a staging
 * build put in front of a client will be crawled unless something stops it.
 * Two versions of the same business then compete, and the demo URL can outrank
 * the real domain long after the real domain is live.
 *
 * Set `NEXT_PUBLIC_INDEXABLE=true` in the Vercel project only once the final
 * domain is the one being served. Everything else, previews and staging
 * included, stays out.
 */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

/**
 * The canonical origin. Falls back to the domain recorded in site.config so a
 * local build still produces absolute URLs.
 *
 * Checked for content rather than for null: a declared-but-empty variable in
 * `.env` is a string, so `??` would happily hand an empty origin to `new URL`
 * and fail the build.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || site.url
).replace(/\/$/, "");
