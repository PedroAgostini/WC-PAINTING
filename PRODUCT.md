# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + Tailwind CSS. Chosen by the user over static HTML and Astro. Single-page marketing site as the primary surface; framework chosen so city/SEO pages and a future carpentry service section can be added without a rebuild.

Confirmed integrations:
- Quote form: **Web3Forms** with anti-spam (honeypot + validation). User overrode the Resend/API-route recommendation.
- Reviews: **Google Places API**, dynamic pull of rating and testimonials from the Google Business Profile.
- Declined for this scope: video in the gallery, per-city SEO landing pages.

## Users

Primary: **American homeowners, 40–70+**, upper-middle to high income, in Greater Boston and surrounding affluent towns (Malden, Boston, Newton, Wellesley, Cape Cod). Married, established families, typically with children and pets. Strong presence of home-office and hybrid workers, so crew punctuality, quietness and cleanliness are evaluated as much as the paint finish.

They own the home they are improving and have liquidity to approve a $10k–$25k project. Decisions are usually made jointly by a couple.

Secondary: commercial and condominium property decision-makers in Boston. The client notes roughly six people typically hold the decision on who paints a given building; high-rise apartment work is largely spray-finish.

Job to be done: hire a painting contractor they can trust alone inside their home, and get a credible, itemized price fast.

Language: **English only.** The client base is exclusively American. (The company's crew is Brazilian; the site is not.)

Mix: ~90% residential, ~10% commercial.

## Product Purpose

WC Painting & General Services Inc is a painting contractor in Malden, MA, serving a 50-mile radius plus Cape Cod. It sells interior, exterior, residential, commercial painting and wallpaper removal.

The site exists to solve the company's single confirmed bottleneck: **it has effectively no inbound flow of new customers.** Today ~50% of work comes from repeat clients, ~50% from referrals, and 10–15% from subcontracting for three larger companies that are now passing along less work. Nobody who does not already know Cleib finds and calls this business.

Success is a qualified estimate request from a homeowner who had never heard of the company. Current volume is 2–4 jobs/month at ~$10,000 each ($45k–$52k monthly, ~$600k/year); the stated goal is $1M/year. The crew has confirmed capacity for more work today without hiring, up to about 7 jobs/month with one additional hire.

A prior agency ran Meta and Google ads for three months and produced one lead. The site must not repeat that: it is the conversion surface those channels will point at.

## Positioning

The differentiators are operational and verifiable, not stylistic. In order of confirmed conversion weight:

1. **Peace of mind about who is inside the house.** A strict no-smoking, no-drugs crew policy; uniformed workers; the site cleaned daily. The client states American homeowners pay a premium for this, and it is the strongest single trigger.
2. **The owner personally inspects the finished work with the customer** before the contract closes and payment is taken. Cleib deliberately delivers above what the customer specified rather than exactly to spec.
3. **A detailed estimate within 24 hours** of the on-site visit, and confirmed adherence to schedules and deadlines.
4. **24 years painting in the United States, 12 years as an established company.** Stability that high-ticket clients require.

A neighboring painter cannot truthfully copy items 1 and 2 as a stated policy backed by the owner's name.

## Operating Context

- **Office:** 72 Warren Ave, Malden, MA 02148 (a real office, not the owner's home).
- **Hours:** 7:00am–6:00pm, Monday through Saturday.
- **Phone:** +1 (857) 417-1256
- **Email:** wcpaintingboston@gmail.com — the client's *preferred* contact channel is email, with phone second.
- **Existing site being replaced:** https://wcpaintingboston.com/ — the client dislikes it and wants something clearly different. Treat it as anti-reference, not as a source of design authority.
- **Google Business Profile:** https://share.google/75tBV7rxyMDYwhEpX
- **Service radius:** 50 miles from Malden, MA, plus Cape Cod (clients from MA hire him to travel there).
- **Materials:** Sherwin-Williams. This is a supplier relationship, not a certified partnership — do not present it as a badge, seal, or accreditation.
- **Sales motion:** inbound call or email → schedule a day → Cleib drives to the property and estimates in person → detailed quote sent within 24h via QuickBooks → work → owner walkthrough with the customer → payment.
- **Crew:** 5 people including Cleib and his 25-year-old eldest son. Only Cleib and his son speak English, which centralizes every estimate and final inspection on Cleib and leaves him overloaded. Any flow the site creates must funnel into a single, low-friction intake he can process — not into ad-hoc phone tag.
- **Typical job duration:** ~2 weeks; two jobs can run concurrently.

## Capabilities and Constraints

Services to present **now** — painting only, following `Copy/ONE PAGE - WC PAINTING & GENERAL SERVICES INC.txt`:
- Interior Painting
- Exterior Painting
- Commercial Painting
- Wallpaper Removal

Confirmed price ranges (for internal calibration of how the offer is framed; publishing them is not required):
- Exterior: ~$4,500 small · ~$12,500 medium · ~$25,000 large, higher in affluent areas
- Interior: ~$15,000–$18,000 for a two-story home
- Commercial: ~$7,500–$9,000
- Wallpaper removal: ~$1,600 per room

**Carpentry / general contracting is explicitly out of scope for this build.** It is not yet covered by his insurance or license. He sits for the General Contractor exam in about a month. The site must be structured so a carpentry section can be added later without redesign.

**Licensing — binding constraint.** The Home Improvement Contractor registration has been applied for and is expected in roughly two weeks; it does **not** exist yet. Liability insurance **does** exist and is confirmed. Therefore:
- The site may state **"Fully Insured"** today.
- The site must **not** claim to be licensed or HIC-registered until the registration issues. Advertising HIC registration without holding it violates MGL c.142A.
- Ship a single config flag (with the registration number field) so the licensed badge activates site-wide the moment it is granted, with no redesign.

Insurance is liability coverage. SSN/ITIN and US driver's license/passport are on file (relevant to Google Local Services verification, not to site copy).

## Brand Commitments

- **Legal name:** WC Painting & General Services Inc.
- **Owner:** Cleib Verissimo da Silva. His name and personal accountability are a core asset — the owner walkthrough is sold under his name.
- **Visual identity is fixed and must be preserved as-is.** The client explicitly declined a rebrand. Assets in `Logos/`: `logo-principal.webp`, `logo-black.webp`, `logo-white.webp`.
- **Palette extracted from the logo (binding):** primary green `#3A7B4B`, accent green `#61A047`, black `#000000`.
- Logo mark contains a Massachusetts state outline and three rooflines; tagline "High quality painting specialist". The client notes the logo carries a lot of information — on photography it is used as a watermark rather than a solid lockup.
- **Voice:** no profanity. Plain, direct American English. No industry jargon requirements either way.
- Approved copy for the page exists at `Copy/ONE PAGE - WC PAINTING & GENERAL SERVICES INC.txt` and is the starting point for headline and section text.
- **Standing structural preference, chosen deliberately by the user:** the site follows the **category convention** for a service contractor — the arrangement a visitor already expects — executed at full craft rather than reinvented. The user was shown six foreign-form alternatives and took the category standard on purpose. Honor it without irony and without smuggling in quirk. Future surfaces inherit this preference.
- **Quality bar, set by the user:** the craft level of `Refs/` and especially https://www.to-top.ch/ — rounded header capsule, editorial service cards, CTA cards, scroll rhythm, negative space, typographic discipline and orchestrated motion.
- **First viewport, locked:** dark rounded capsule header over a full-bleed project photograph, centered headline and proof, compact CTA to the estimate form, no form inside the hero.

## Evidence on Hand

**Real and usable:**
- Google Business Profile with public reviews — to be pulled live via Places API. The rating and review text are real third-party validation and the only external proof currently available.
- 24 years of experience, 12 years of company operation — client-stated, safe to publish.
- Liability insurance — confirmed, safe to publish.
- Real project photography, **organized by project folders — the client is sending these but they have not arrived yet.** The gallery must be built project-by-project (not a flat grid) and must survive having photos dropped in later without layout changes. Boston, Malden, Newton, Wellesley and Cape Cod work; spray finishes and high-end projects are the priority to feature.

**Absent — must not be fabricated:**
- No HIC license number (see constraint above).
- No written testimonials beyond what the Google profile actually returns. Do not invent quotes, names, or star counts.
- No certifications, partnerships, awards, or accreditations of any kind. The client confirmed he has none. Sherwin-Williams is a supplier only.
- No employee count claims beyond 5, no crew photos yet.
- No published pricing has been approved for the site.
- Placeholder imagery must be visually neutral and clearly temporary, sized so the real photos drop in without reflowing the layout.

## Product Principles

1. **Trust is the product; paint is the deliverable.** Every section either reduces the fear of letting strangers into a home or proves the finish quality. Anything that does neither is cut.
2. **Cleib is the guarantee.** The owner's personal inspection is the company's strongest claim — the site is built around a named human being, not an anonymous "team".
3. **Speed is a promise the site must keep.** The 24-hour estimate is stated, and the intake is short enough that a homeowner completes it in under a minute: name, email, phone, ZIP, service.
4. **Claim nothing that is not yet true.** Licensing, certifications and testimonials are gated on real evidence. The company's real credentials are strong enough without invention.
5. **Built for the photos that are coming.** Structure, spacing and typography assume real high-end project photography is present, so it can be added later without touching the layout.

## Accessibility & Inclusion

The primary audience is 40–70+. Body copy must not fall below 16px, contrast must clear WCAG AA against the light background, tap targets must be comfortable on mobile, and the phone number must be actionable in one tap. No product-specific assistive-technology requirement was established beyond this.
