/**
 * Single source of truth for every business fact on the site.
 *
 * Editing a value here updates the header, hero, forms, footer, floating call
 * button, sitemap and the LocalBusiness structured data at once. No business
 * fact should ever be typed directly into a component.
 */

export type Service = {
  /** Stable id used as the form's <option> value and as a URL fragment. */
  id: string;
  name: string;
  image: { src: string; alt: string };
  /** One line, used in the services section and the estimate form. */
  summary: string;
  /** Full description. Sourced from the approved copy file. */
  description: string;
  /** What the crew actually does, shown as the scope of work. */
  scope: string[];
};

export type ServiceAreaGroup = {
  label: string;
  towns: { name: string; zips: string[] }[];
};

export type Review = {
  /** Exactly as the reviewer signed it on Google. */
  author: string;
  /** 1 to 5. */
  rating: number;
  /** The review, copied verbatim. Never paraphrased, never written for them. */
  text: string;
  /** Free text, as Google shows it: "2 months ago", "March 2026". */
  date: string;
};

export type Project = {
  id: string;
  title: string;
  town: string;
  /** Interior / Exterior / Commercial — matches a service name. */
  category: string;
  /** Shown as the project record. Keep every field filled for every project. */
  surface: string;
  finish: string;
  duration: string;
  /**
   * Photos for this project. Empty until the client delivers his folders.
   * Each entry is a path under /public. The layout reserves the box either
   * way, so adding photos never changes spacing.
   */
  photos: { src: string; alt: string }[];
};

export const site = {
  legalName: "WC Painting & General Services Inc.",
  name: "WC Painting",
  tagline: "High quality painting specialist",
  owner: "Cleib Verissimo da Silva",
  ownerShort: "Cleib",

  /** 2026 minus the 12 years of established business the owner reports. */
  foundedYear: 2014,
  yearsExperience: 24,
  yearsInBusiness: 12,

  phone: {
    display: "(857) 417-1256",
    href: "tel:+18574171256",
  },
  email: "wcpaintingboston@gmail.com",

  address: {
    street: "72 Warren Ave",
    city: "Malden",
    state: "MA",
    /** Spelled out where the address is read rather than scanned. */
    stateFull: "Massachusetts",
    zip: "02148",
    country: "US",
    /** Malden, MA — used by the LocalBusiness schema. */
    lat: 42.4251,
    lng: -71.0662,
  },

  hours: {
    label: "Monday to Saturday, 7:00am to 6:00pm",
    /** schema.org openingHours shorthand. */
    schema: ["Mo-Sa 07:00-18:00"],
  },

  /** Canonical production domain. Drives metadata, canonical URL and JSON-LD. */
  url: "https://wcpaintingboston.com",

  googleBusinessUrl: "https://share.google/75tBV7rxyMDYwhEpX",

  /**
   * Social profiles, used only by the /card page.
   *
   * Null until the real profile URL is confirmed. The card renders whatever is
   * filled in and silently drops the rest, so a placeholder link never ships
   * and a missing one never leaves a dead button on the page.
   */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
  },

  /** The radius the company advertises, in miles. */
  serviceRadiusMiles: 50,

  /**
   * LICENSING GATE — read before changing.
   *
   * The Massachusetts Home Improvement Contractor registration has been
   * applied for but has NOT been issued. Advertising HIC registration before
   * holding it violates MGL c.142A, so every licensed badge on the site is
   * gated behind this flag.
   *
   * When the registration arrives: set `licensed` to true and fill
   * `hicNumber`. Nothing else needs to change — the badges, the trust bar and
   * the structured data all read from here.
   *
   * Liability insurance is already in force, so `insured` is true today.
   */
  credentials: {
    insured: true,
    licensed: false,
    hicNumber: null as string | null,
  },

  /** Response promise made on the page. Keep the copy and the number in sync. */
  responseHours: 24,
} as const;

export const services: Service[] = [
  {
    id: "interior",
    name: "Interior Painting",
    image: {
      src: "/services/interior-painting.png",
      alt: "Protected home interior prepared for professional painting",
    },
    summary:
      "Complete interior updates with thorough floor and furniture protection.",
    description:
      "Complete interior updates with thorough floor and furniture protection. Clean edges, smooth wall repairs, and daily site cleanups.",
    scope: [
      "Floors and furniture fully covered before any lid comes off",
      "Wall repairs skimmed and sanded smooth",
      "Cut lines held straight at every ceiling, trim and corner",
      "The room left clean at the end of each day",
    ],
  },
  {
    id: "exterior",
    name: "Exterior Painting",
    image: {
      src: "/services/exterior-painting.png",
      alt: "New England home exterior protected and prepared for painting",
    },
    summary:
      "Weather-proof your siding, trim, and decks against harsh New England winters.",
    description:
      "Weather-proof your siding, trim, and decks against harsh New England winters. We wash, scrape, prime, and paint for maximum durability.",
    scope: [
      "Surfaces washed and left to dry before work begins",
      "Loose and failing paint scraped back to sound material",
      "Bare wood spot-primed, then coated for New England weather",
      "Landscaping and walkways protected throughout",
    ],
  },
  {
    id: "wallpaper-removal",
    name: "Wallpaper Removal",
    image: {
      src: "/services/wallpaper-removal.png",
      alt: "Wallpaper removal in progress with wall ready for primer",
    },
    summary:
      "Strip old wallpaper cleanly without gouging or damaging your drywall.",
    description:
      "Strip old wallpaper cleanly without gouging or damaging your drywall. We smooth the surface and apply primer so it is ready for paint.",
    scope: [
      "Paper and adhesive removed without tearing the drywall face",
      "Damaged areas patched and sanded flat",
      "Primer applied so the new color lays down evenly",
      "Debris bagged and carried out the same day",
    ],
  },
  {
    id: "commercial",
    name: "Commercial Painting",
    image: {
      src: "/services/commercial-painting.png",
      alt: "Commercial corridor protected for professional painting",
    },
    summary:
      "Professional interior and exterior updates tailored to your operating hours.",
    description:
      "Professional interior and exterior updates tailored to your operating hours. High-quality finishes delivered cleanly without disrupting daily business.",
    scope: [
      "Work staged around your opening hours",
      "Common areas kept passable and clean while the job runs",
      "Property managers given a clear schedule up front",
      "Finishes specified to hold up under daily traffic",
    ],
  },
];

/**
 * Reviews, entered by hand from the Google Business Profile linked above.
 * Transcribed verbatim on 3 September 2026, newest first.
 *
 * Spelling and punctuation are exactly as each reviewer wrote them, including
 * the typos and the one misspelling of Cleib's name. Do not tidy them: the
 * small imperfections are what make a review read as a real person rather
 * than as marketing copy.
 *
 * Only add reviews that actually exist on the profile, word for word, under
 * the reviewer's real name. A testimonial written for a client is a
 * fabricated endorsement, and it is the one claim on this page that falls
 * apart the moment someone opens the real profile.
 *
 * WATCH OUT WHEN COPYING: Google silently machine-translates reviews into the
 * language of whoever is looking. Copy from a browser set to English, or open
 * the reviewer's own card and take the original — otherwise a translation of
 * an English review ends up on an English site, in the wrong words and in the
 * wrong language.
 */
export const reviews: Review[] = [
  {
    author: "Caitlin Cutter",
    rating: 5,
    text: "Cleib and his team did a great job on my paint and ceiling job. I had a room where I wanted a professional as the walls were bumpy and the ceiling had some sagging and bad patching jobs from owners past. They installed new insulation and a brand new ceiling in addition to skimming down the walls so they were nice and smooth. At the end of each day he sent pictures and communicated well about what was next. He also came by for a touch up coat a couple weeks later as I needed a dehumidifier in the room for proper drying.",
    date: "10 months ago",
  },
  {
    author: "Angela Dwyer",
    rating: 5,
    text: "We had our house painted 2 years ago. They did a fantastic job, stripping down to cedar shingles, fair price, wonderful to work with. Also replaced 2 garage windows, a garage side door, moldings, and redo back porch stairs, and they did wonderful work. We liked their work so much, we had them come back and fix and repair our inside dining, living room, and hallway plastered walls which had aged over time. We had them add molding work for the dining room and living room. Excellent work. We would highly recommend them for top quality work, reasonable price and ease of working with to suit our needs.",
    date: "a year ago",
  },
  {
    author: "Daniel Cowan",
    rating: 5,
    text: "Cleib and his team do amazing work! They take time to fully prep a job before painting which really shows in the quality of their finished product. They also stand behind their work and are always willing to make the customer happy. We will definitely use them for every paint job in the future.",
    date: "3 years ago",
  },
  {
    author: "Adam Knoll",
    rating: 5,
    text: "WC Painting has now done two large jobs for our home. Each time the work is amazing. They always find ways to go beyond your expectations. Their dedication to quality work is great.",
    date: "5 years ago",
  },
  {
    author: "Ruby Faith",
    rating: 5,
    text: "I found WC on Thumbtack. They had the highest reviews and the best online presence. When I messaged 3 painters, their response was the fastest and the most professional/welcoming. They were able to come give me an estimate the next day! They gave it to me on the spot at our appointment. We thought it over and originally thought we couldn't afford it. We had another painter come out who quoted us at double the price and wasn't nearly as kind as Cleib was. He made it really easy for us, he recommended paint brands to choose from, we sent him the color code for the paint we picked out at Lowe's and he made it happen by the following day. The job was estimated to be 3 days, but the guys finished in 2! They covered and cleaned up everything. The painting looks absolutely amazing.",
    date: "6 years ago",
  },
  {
    author: "Ryan Coleman",
    rating: 5,
    text: "WC Painting & General Services Inc team always arrived on time and ready to work. They were very professional and the work they did is amazing.",
    date: "6 years ago",
  },
  {
    author: "Helen Hall",
    rating: 5,
    text: "The team is exceptional! Their main priority is customer satisfaction from painting to clean up. That i experienced. Highly recommended!",
    date: "6 years ago",
  },
  {
    author: "Juan Sanders",
    rating: 5,
    text: "They painted my living room, dining room, kitchen, and kitchen cabinets and they look amazing. Also, they are able to give an estimate right away and the prices were very reasonable. Just perfect!",
    date: "6 years ago",
  },
  {
    author: "Patricia Soares",
    rating: 5,
    text: "Amazing,they did a great painting service at my house,we are very happy with the quality they delivery and for sure we will use WC Painting again and again ..",
    date: "6 years ago",
  },
];

/**
 * The headline figures shown beside the reviews.
 *
 * `rating` was read off the public Google business panel on 3 September 2026.
 * `total` is still null because Google served a limited view that withheld the
 * review count; fill it from the profile and it appears beside the stars.
 *
 * Both drift over time. Check them whenever the reviews above are updated.
 */
export const reviewSummary: { rating: number | null; total: number | null } = {
  rating: 4.6,
  total: null,
};

/**
 * Towns inside the advertised radius, plus Cape Cod, which the company travels
 * to for Massachusetts clients. Grouped so a visitor can find their own town
 * quickly rather than scanning one long list.
 */
export const serviceAreas: ServiceAreaGroup[] = [
  {
    label: "Malden & Nearby",
    towns: [
      { name: "Malden", zips: ["02148"] },
      { name: "Medford", zips: ["02155"] },
      { name: "Everett", zips: ["02149"] },
      { name: "Melrose", zips: ["02176"] },
      { name: "Stoneham", zips: ["02180"] },
      { name: "Revere", zips: ["02151"] },
      { name: "Chelsea", zips: ["02150"] },
      { name: "Saugus", zips: ["01906"] },
      { name: "Wakefield", zips: ["01880"] },
      { name: "Winchester", zips: ["01890"] },
    ],
  },
  {
    label: "Boston & Inner Suburbs",
    towns: [
      { name: "Boston", zips: ["02108", "02109", "02110", "02111", "02114", "02115", "02116", "02118", "02127", "02128"] },
      { name: "Charlestown", zips: ["02129"] },
      { name: "South Boston", zips: ["02127"] },
      { name: "Jamaica Plain", zips: ["02130"] },
      { name: "Dorchester", zips: ["02122", "02124", "02125"] },
      { name: "Somerville", zips: ["02143", "02144", "02145"] },
      { name: "Cambridge", zips: ["02138", "02139", "02140", "02141", "02142"] },
      { name: "Brookline", zips: ["02445", "02446", "02467"] },
      { name: "Arlington", zips: ["02474", "02476"] },
      { name: "Belmont", zips: ["02478"] },
      { name: "Watertown", zips: ["02472"] },
      { name: "Milton", zips: ["02186"] },
    ],
  },
  {
    label: "Metro West",
    towns: [
      { name: "Newton", zips: ["02458", "02459", "02460", "02461", "02462", "02464", "02465", "02466", "02467", "02468"] },
      { name: "Wellesley", zips: ["02481", "02482"] },
      { name: "Needham", zips: ["02492", "02494"] },
      { name: "Weston", zips: ["02493"] },
      { name: "Waltham", zips: ["02451", "02452", "02453"] },
      { name: "Lexington", zips: ["02420", "02421"] },
      { name: "Concord", zips: ["01742"] },
      { name: "Lincoln", zips: ["01773"] },
      { name: "Wayland", zips: ["01778"] },
      { name: "Sudbury", zips: ["01776"] },
      { name: "Natick", zips: ["01760"] },
      { name: "Framingham", zips: ["01701", "01702"] },
      { name: "Dover", zips: ["02030"] },
      { name: "Sherborn", zips: ["01770"] },
      { name: "Woburn", zips: ["01801"] },
      { name: "Reading", zips: ["01867"] },
    ],
  },
  {
    label: "North Shore",
    towns: [
      { name: "Lynn", zips: ["01901", "01902", "01904", "01905"] },
      { name: "Lynnfield", zips: ["01940"] },
      { name: "Swampscott", zips: ["01907"] },
      { name: "Marblehead", zips: ["01945"] },
      { name: "Salem", zips: ["01970"] },
      { name: "Peabody", zips: ["01960"] },
      { name: "Danvers", zips: ["01923"] },
      { name: "Beverly", zips: ["01915"] },
      { name: "Manchester-by-the-Sea", zips: ["01944"] },
      { name: "Gloucester", zips: ["01930"] },
      { name: "Ipswich", zips: ["01938"] },
      { name: "Andover", zips: ["01810"] },
      { name: "Lowell", zips: ["01852"] },
    ],
  },
  {
    label: "South Shore",
    towns: [
      { name: "Dedham", zips: ["02026"] },
      { name: "Westwood", zips: ["02090"] },
      { name: "Norwood", zips: ["02062"] },
      { name: "Canton", zips: ["02021"] },
      { name: "Sharon", zips: ["02067"] },
      { name: "Quincy", zips: ["02169", "02170", "02171"] },
      { name: "Braintree", zips: ["02184"] },
      { name: "Weymouth", zips: ["02188", "02189", "02190"] },
      { name: "Hingham", zips: ["02043"] },
      { name: "Cohasset", zips: ["02025"] },
      { name: "Scituate", zips: ["02066"] },
    ],
  },
  {
    label: "Cape Cod",
    towns: [
      { name: "Sandwich", zips: ["02563"] },
      { name: "Barnstable", zips: ["02630"] },
      { name: "Hyannis", zips: ["02601"] },
      { name: "Osterville", zips: ["02655"] },
      { name: "Cotuit", zips: ["02635"] },
      { name: "Mashpee", zips: ["02649"] },
      { name: "Falmouth", zips: ["02540"] },
      { name: "Yarmouth", zips: ["02675"] },
      { name: "Dennis", zips: ["02638"] },
      { name: "Chatham", zips: ["02633"] },
      { name: "Orleans", zips: ["02653"] },
    ],
  },
];

/**
 * The gallery is grouped by project, as the client asked. Photos arrive later
 * in folders; drop them into /public/projects/<id>/ and list them here.
 * Every project carries the same record fields so the section reads as a set
 * of records rather than a loose photo grid.
 */
/**
 * EMPTY ON PURPOSE — read before adding anything here.
 *
 * Every field below renders to a visitor as a statement of fact about a job
 * this company completed. Nothing goes in this array until Cleib has confirmed
 * it, because the gallery heading tells the visitor these are real homes.
 *
 * The client is sending photographs organised into per-project folders. When a
 * folder arrives, put the files in `public/projects/<id>/` and add one entry,
 * using only details he confirms. The gallery renders itself from this array,
 * and shows an honest empty state until the first entry lands.
 *
 * Template — replace every value with a confirmed one:
 *
 *   {
 *     id: "newton-colonial-exterior",
 *     title: "Newton Colonial",
 *     town: "Newton, MA",
 *     category: "Exterior Painting",
 *     surface: "Clapboard siding, trim, porch and shutters",
 *     finish: "Washed, scraped, primed, two coats",
 *     duration: "2 weeks",
 *     photos: [
 *       { src: "/projects/newton-colonial-exterior/front.jpg", alt: "..." },
 *       { src: "/projects/newton-colonial-exterior/trim.jpg", alt: "..." },
 *       { src: "/projects/newton-colonial-exterior/side.jpg", alt: "..." },
 *     ],
 *   },
 */
export const projects: Project[] = [];

/** Navigation. Anchors only — this is a single page. */
export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
] as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
