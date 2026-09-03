"use client";

import { useState } from "react";
import { projects, services, site } from "@/lib/site.config";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ArrowRightIcon, GoogleGlyph } from "@/components/ui/Icons";
import { LayoutGrid, type LayoutGridCard } from "@/components/ui/layout-grid";

export function Gallery() {
  const hasProjects = projects.length > 0;

  return (
    <section id="work" className="bg-ground py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="reveal mx-auto max-w-[64rem] text-center">
          <h2 className="serif-display h-section mx-auto max-w-[26ch]">
            Explore our recent painting transformations
          </h2>
          <p className="mx-auto mt-6 max-w-[46rem] text-[16.5px] leading-relaxed text-ink-muted">
            Real homes and buildings across Greater Boston and Cape Cod. No
            stock photography.
          </p>
        </div>

        {hasProjects ? <ProjectBrowser /> : <PortfolioPreviewGrid />}
      </div>
    </section>
  );
}

function ProjectBrowser() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  const leadPhoto = active.photos[0];
  const supporting = [active.photos[1], active.photos[2]];

  return (
    <>
      <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h3 className="label border-b border-rule pb-3 text-ink-soft">
            Projects
          </h3>
          <ul className="mt-1">
            {projects.map((project) => {
              const isActive = project.id === active.id;
              return (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(project.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex w-full items-baseline justify-between gap-4 border-b py-4 text-left transition-colors duration-200 ${
                      isActive
                        ? "border-brand text-brand"
                        : "border-rule text-ink hover:text-brand"
                    }`}
                  >
                    <span
                      className={`text-[16px] leading-snug ${
                        isActive ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {project.title}
                    </span>
                    <span className="shrink-0 text-[13px] text-ink-soft">
                      {project.town.replace(", MA", "")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <dl className="mt-10 space-y-5">
            {[
              ["Location", active.town],
              ["Service", active.category],
              ["Surface", active.surface],
              ["Finish", active.finish],
              ["On site", active.duration],
            ].map(([term, value]) => (
              <div
                key={term}
                className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-rule pb-4"
              >
                <dt className="label pt-1 text-ink-soft">{term}</dt>
                <dd className="text-[15px] leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-8">
          <PhotoFrame
            key={`${active.id}-lead`}
            src={leadPhoto?.src}
            alt={leadPhoto?.alt ?? ""}
            ratio="16 / 10"
            className="rounded-[1.8rem]"
            sizes="(min-width: 1024px) 62vw, 100vw"
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            {supporting.map((photo, index) => (
              <PhotoFrame
                key={`${active.id}-support-${index}`}
                src={photo?.src}
                alt={photo?.alt ?? ""}
                ratio="4 / 3"
                className="rounded-[1.5rem]"
                sizes="(min-width: 1024px) 31vw, 50vw"
              />
            ))}
          </div>
        </div>
      </div>

      <a
        href="#contact-estimate"
        className="group mt-12 inline-flex items-center gap-3 rounded-full bg-action px-7 py-4 text-[15px] font-extrabold uppercase text-white transition-colors duration-200 hover:bg-brand-darkest"
      >
        Get Results Like These
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </>
  );
}

function PortfolioPreviewGrid() {
  const cards: LayoutGridCard[] = services.map((service, index) => ({
    id: service.id,
    title: service.name,
    thumbnail: service.image.src,
    alt: service.image.alt,
    className:
      index === 0 || index === services.length - 1
        ? "md:col-span-2"
        : "md:col-span-1",
  }));

  return (
    <div className="reveal mt-14 lg:mt-16">
      <LayoutGrid cards={cards} />

      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <a
          href={site.googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-darkest px-7 py-4 text-[15px] font-extrabold uppercase text-on-brand transition-colors duration-200 hover:bg-brand"
        >
          <GoogleGlyph className="h-5 w-5 shrink-0" />
          See Google Photos
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <a
          href="#contact-estimate"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-action px-7 py-4 text-[15px] font-extrabold uppercase text-white transition-colors duration-200 hover:bg-brand-darkest"
        >
          Get Results Like These
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
