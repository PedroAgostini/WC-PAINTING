# WC Painting & General Services — Website

Single-page marketing site for a painting contractor in Malden, MA. Next.js (App Router) + Tailwind CSS v4, statically prerendered.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## The one file you will edit most

**`lib/site.config.ts` owns every business fact on the site.** Phone, email, address, hours, services, service areas, projects, reviews and the licensing flag all live there and flow into the header, hero, both forms, the floating call bar, the footer and the LocalBusiness structured data.

Changing the phone number is a one-line edit. Never type a business fact directly into a component.

## Turning on the licence badge

The Massachusetts Home Improvement Contractor registration was applied for but has **not** been issued. Advertising HIC registration before holding it violates MGL c.142A, so every licensed badge is gated. Liability insurance is already in force, which is why the site says "Fully Insured" today.

When the registration arrives, edit `lib/site.config.ts`:

```ts
credentials: {
  insured: true,
  licensed: true,              // was false
  hicNumber: "123456",         // was null, put the real number here
},
```

That is the whole change. The hero proof rule, the trust band and the WhyUs card all update themselves.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the one key the site needs:

| Variable | What it does | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Delivers the estimate form to the company inbox | Free access key at [web3forms.com](https://web3forms.com) |

There are no other services. The form fails safely: without the key it opens the visitor's mail app with all five fields pre-filled and addressed to the company, so the request still arrives.

## Reviews

Reviews are entered by hand in `lib/site.config.ts`. There is no Google API — the client chose not to run one, and reading Google Maps programmatically is both blocked and against Google's terms.

Add each review exactly as it appears on the Google Business Profile, word for word, with the reviewer's real name:

```ts
export const reviews: Review[] = [
  {
    author: "Jane W.",
    rating: 5,
    text: "Cleib and his crew repainted our whole exterior...",
    date: "2 months ago",
  },
];
```

**Never write a review yourself.** A testimonial invented for a client is a fabricated endorsement, and it is the one claim on this page that falls apart the moment somebody opens the real profile.

**Copy from a browser set to English.** Google machine-translates reviews into the reader's own language without saying so, so a profile opened in a Portuguese browser hands you Portuguese text for reviews that were written in English. Take the original from the reviewer's own card if there is any doubt.

Set the headline figures alongside it:

```ts
export const reviewSummary = { rating: 4.6, total: null };
```

`rating` was read off the public profile on 3 September 2026. `total` is still unknown; fill it and it appears beside the stars. While `reviews` is empty the section renders an honest panel pointing at the Google profile instead of a carousel.

## Adding the project photos

The gallery is grouped by project, and the layout already reserves the exact boxes the photographs will occupy, so dropping them in changes no spacing anywhere.

1. Put the files in `public/projects/<project-id>/`.
2. Fill the `photos` array for that project in `lib/site.config.ts`:

```ts
{
  id: "newton-colonial-exterior",
  title: "Newton Colonial",
  town: "Newton, MA",
  category: "Exterior Painting",
  surface: "Clapboard siding, trim, porch and shutters",
  finish: "Washed, scraped, primed, two coats",
  duration: "2 weeks",
  photos: [
    { src: "/projects/newton-colonial-exterior/front.jpg", alt: "Repainted clapboard front elevation" },
    { src: "/projects/newton-colonial-exterior/trim.jpg",  alt: "Porch trim and rails after painting" },
    { src: "/projects/newton-colonial-exterior/side.jpg",  alt: "Side elevation and shutters" },
  ],
},
```

`projects` ships empty on purpose. Every field renders to a visitor as a statement of fact about a job the company completed, so nothing goes in until Cleib confirms it — the section heading tells the visitor these are real homes.

## Adding carpentry later

Carpentry is deliberately out of scope until the General Contractor licence and insurance are in place. When that happens, add the entry to the `services` array in `lib/site.config.ts` — the services section, the footer list and the estimate form's dropdown all read from it and will pick it up with no other edit.

## Sections that exist but are not on the page

`components/sections/ServiceAreas.tsx` is complete and working but deliberately not rendered — the client chose to leave it out. To bring it back, import it in `app/page.tsx` and place it between `Process` and `Contact`.

The `serviceAreas` data it reads is still doing work: `app/layout.tsx` feeds it into the LocalBusiness `areaServed` schema, which is what search engines read for local coverage. Do not delete that data.

## Structure

```
app/
  layout.tsx        metadata, fonts, LocalBusiness JSON-LD
  page.tsx          section order
  globals.css       design tokens, type scale, motion
components/
  layout/           Header, Footer, FloatingCall
  sections/         one file per section, reorderable in page.tsx
  ui/               Cta, EstimateForm, Marquee, PhotoFrame, OfficeMap, Icons
lib/
  site.config.ts    every business fact, plus services and reviews
  utils.ts          the cn() class helper
```

## Design system

Palette is taken from the logo and is binding: `#3A7B4B` primary green, `#61A047` accent, `#000000` black, on a warm architectural off-white. Tokens live in `app/globals.css` — change them there, never inline.

**Black is the action colour and nothing else uses it as a fill**, so every black thing on the page is something to click. It cannot sit on the deep green bands (1.7:1 against them), so the button inverts to near-white there rather than being restated in a new colour. Both modes live in `components/ui/Cta.tsx`; use that component rather than hand-rolling a button.

Type is two faces: **Archivo** variable for text and UI, and **Young Serif** for display headings. Heading sizes come from the `h-hero` / `h-section` / `h-section-narrow` / `h-card` classes in `globals.css`, which are fluid and capped so a heading lands in two lines at every width. Never pair one of those with a `max-w-[Nch]` clamp — the clamp is what forces a heading to stack into a column of single words.

Motion is one system: a single easing (`--ease-out-expo`), scroll reveals via one `IntersectionObserver`, and full `prefers-reduced-motion` support. Content is visible by default, so nothing is ever hidden by a failed observer or disabled JavaScript.

Two gotchas worth knowing before you edit layout:

- **`overflow-hidden` on a section kills `position: sticky` inside it.** That is why the WhyUs section has none.
- **`whitespace-nowrap` on a button sets the grid column's minimum width**, which can push the page wider than a phone screen. The `Cta` component deliberately allows its label to wrap.

## Accessibility

The audience is 40–70+. Body text never drops below 16px, every foreground/background pair clears WCAG AA, tap targets are comfortable, the phone number is one tap on mobile at every width, and there is a skip link to the estimate form.
