"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site.config";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icons";

export function Header() {
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHiddenOnScroll(current > 180 && current > lastScrollY.current);
      lastScrollY.current = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isHeaderHidden = hiddenOnScroll && !menuOpen;

  return (
    <>
      <header
        className={`fixed left-4 right-4 top-4 z-50 transition-[transform,opacity] duration-500 sm:left-8 sm:right-8 lg:top-6 ${
          isHeaderHidden
            ? "pointer-events-none -translate-y-[7rem] opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[96rem] items-center gap-5 rounded-full border border-white/[0.1] bg-brand-darkest/[0.96] px-5 text-on-brand shadow-lifted backdrop-blur-md sm:px-7 lg:h-[5rem] lg:px-8">
          <a
            href="#top"
            className="flex shrink-0 items-center"
            aria-label={`${site.name} home`}
          >
            <Image
              src="/logo-white.webp"
              alt={site.legalName}
              width={788}
              height={364}
              priority
              className="h-10 w-auto lg:h-12"
            />
          </a>

          <nav
            className="mx-auto hidden items-center gap-1 lg:flex"
            aria-label="Sections"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-7 text-[13px] font-extrabold uppercase transition-colors duration-200 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 text-[13px] font-extrabold uppercase text-on-brand transition-colors duration-200 hover:text-accent xl:flex"
            >
              <PhoneIcon className="h-4 w-4 text-accent" />
              <span className="tnum">{site.phone.display}</span>
            </a>

            <a
              href="#contact-estimate"
              className="group hidden items-center gap-2 rounded-full bg-on-brand px-6 py-3.5 text-[13px] font-extrabold uppercase text-action transition-colors duration-200 hover:bg-white lg:flex"
            >
              Contact
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            <a
              href={site.phone.href}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.08] text-accent lg:hidden"
              aria-label={`Call ${site.phone.display}`}
            >
              <PhoneIcon className="h-5 w-5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.08] lg:hidden"
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              <span aria-hidden="true" className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 block h-[1.5px] w-5 bg-white transition-transform duration-300 ${
                    menuOpen ? "top-1/2 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-[1.5px] w-5 bg-white transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-5 bg-white transition-transform duration-300 ${
                    menuOpen ? "top-1/2 -rotate-45" : "bottom-0.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-0 z-40 bg-brand-darkest px-5 pt-[6.25rem] text-on-brand lg:hidden"
      >
        <nav className="flex h-full flex-col pb-8 pt-6" aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="serif-display border-b border-white/[0.12] py-5 text-[2.4rem]"
            >
              {item.label}
            </a>
          ))}

          <div className="mt-auto space-y-3 pt-8">
            <a
              href="#contact-estimate"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-on-brand px-6 py-4 text-[15px] font-extrabold uppercase text-action"
            >
              Contact
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href={site.phone.href}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] px-6 py-4 text-[15px] font-semibold"
            >
              <PhoneIcon className="h-4 w-4 text-accent" />
              <span className="tnum">{site.phone.display}</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
