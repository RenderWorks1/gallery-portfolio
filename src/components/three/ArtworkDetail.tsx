"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";

interface ArtworkDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ArtworkDetail({
  project,
  onClose,
}: ArtworkDetailProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[rgba(10,10,10,0.62)] p-6 backdrop-blur-md">
      <div className="grid w-full max-w-7xl gap-8 overflow-hidden rounded-[2rem] border border-white/12 bg-[#111111] text-white shadow-[0_40px_120px_rgba(0,0,0,0.45)] lg:grid-cols-[1.2fr_1fr]">
        <div className="border-b border-white/10 bg-[#181818] p-6 lg:border-b-0 lg:border-r">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0f0f0f]">
            <Image
              src={project.screenshotUrl}
              alt={`${project.title} preview`}
              width={1200}
              height={750}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between p-8 sm:p-10">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.32em] text-white/45">
                Exhibition label
              </p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Close
              </button>
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {project.title}
            </h2>
            <p className="mt-6 min-w-0 text-sm leading-[1.75] text-white/72 sm:text-base">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/72"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <div className="border-t border-white/10 pt-8">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Year
              </p>
              <p className="mt-2 text-lg text-white">{project.year}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium uppercase tracking-[0.2em] text-black transition hover:bg-[#e8e4dc]"
              >
                Visit site →
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium uppercase tracking-[0.2em] text-white/75 transition hover:border-white/35 hover:text-white"
              >
                Press ESC to close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
