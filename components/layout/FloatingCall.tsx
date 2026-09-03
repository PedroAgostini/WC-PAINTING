"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site.config";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icons";

/**
 * Persistent contact on mobile, where the hero's estimate card has long
 * scrolled away. Appears once past the hero and hides again over the footer's
 * own contact block so it never covers the thing it duplicates.
 */
export function FloatingCall() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 640;
      const contact = document.getElementById("contact");
      const inContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.85
        : false;
      setVisible(past && !inContact);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-ground/[0.95] backdrop-blur-sm transition-transform duration-500 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-3 px-4 py-3">
        <a
          href={site.phone.href}
          className="flex items-center justify-center gap-2 rounded-full border border-rule-strong bg-surface px-4 py-3.5 text-[15px] font-semibold text-ink"
        >
          <PhoneIcon className="h-4 w-4 text-brand" />
          Call
        </a>
        <a
          href="/#contact-estimate"
          className="flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3.5 text-[15px] font-semibold text-white"
        >
          Free estimate
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
