"use client";

import { useState } from "react";
import { fullAddress } from "@/lib/site.config";
import { PinIcon } from "./Icons";

/**
 * The office map.
 *
 * The embed is only revealed once it has actually loaded. Until then — and
 * permanently, if the frame is blocked by a network, an extension or a
 * consent setting — the address and a working link stay on screen. An iframe
 * stacked over a fallback would hide it the moment it loaded blank.
 */
export function OfficeMap() {
  const [loaded, setLoaded] = useState(false);
  const query = encodeURIComponent(fullAddress);

  return (
    <div className="relative mt-10 h-[20rem] overflow-hidden rounded-[1.8rem] border border-rule bg-surface-sunk">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <PinIcon className="h-6 w-6 text-brand" />
        <p className="text-[15px] text-ink">{fullAddress}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-semibold text-brand underline"
        >
          Open in Google Maps
        </a>
      </div>

      <iframe
        title={`Map showing ${fullAddress}`}
        src={`https://www.google.com/maps?q=${query}&z=11&hl=en&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        aria-hidden={!loaded}
        className={`absolute inset-0 block h-full w-full grayscale-[35%] contrast-[1.05] transition-opacity duration-500 ${
          loaded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </div>
  );
}
