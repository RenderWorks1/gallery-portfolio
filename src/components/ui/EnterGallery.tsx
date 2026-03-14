"use client";

import Link from "next/link";

export default function EnterGallery() {
  return (
    <main className="grain-overlay relative flex min-h-screen overflow-hidden bg-[#f2eee5] text-[#171717]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_52%),linear-gradient(135deg,_rgba(255,255,255,0.65),_rgba(223,216,205,0.25))]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-[#6a655c]">
          <span>Luke Portfolio</span>
          <span>Interactive Exhibition</span>
        </header>

        <section className="grid flex-1 items-center gap-14 py-12 lg:grid-cols-[1.25fr_0.75fr] lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#8f8778]">
              3D art gallery portfolio
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[#171717] sm:text-6xl lg:text-7xl">
              Walk through a curated collection of digital work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b463e] sm:text-xl">
              Explore website projects as framed pieces inside a modern gallery
              space with third-person movement, ambient lighting, and interactive
              artwork details.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/gallery"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#171717] px-8 text-sm font-medium uppercase tracking-[0.22em] text-[#f7f4ee] transition hover:bg-[#2b2924]"
              >
                Enter gallery
              </Link>
              <a
                href="#featured"
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#171717]/15 bg-white/40 px-8 text-sm font-medium uppercase tracking-[0.22em] text-[#171717] backdrop-blur transition hover:border-[#171717]/35"
              >
                Preview projects
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/55 p-6 shadow-[0_30px_90px_rgba(72,61,44,0.10)] backdrop-blur">
            <div className="rounded-[1.5rem] border border-[#171717]/10 bg-[#efebe3] p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#7a7367]">
                <span>Gallery notes</span>
                <span>Edition 01</span>
              </div>
              <div className="mt-6 space-y-5 text-sm leading-7 text-[#423d35]">
                <p>
                  Built with Next.js, React Three Fiber, Rapier physics, and
                  ecctrl for a slow, contemplative museum-style walk-through.
                </p>
                <p>
                  Each framed piece opens a project detail panel with a larger
                  preview, stack tags, and an external link to the live site.
                </p>
                <p>
                  Controls: <span className="font-medium">WASD</span> to move,
                  <span className="font-medium"> mouse</span> to look,
                  <span className="font-medium"> E</span> to interact.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="featured"
          className="grid gap-4 border-t border-[#171717]/10 pt-6 text-sm text-[#5b564e] sm:grid-cols-3"
        >
          <div>
            <p className="uppercase tracking-[0.28em] text-[#908978]">
              Atmosphere
            </p>
            <p className="mt-2 leading-7">
              White walls, polished flooring, soft fog, and warm spotlights.
            </p>
          </div>
          <div>
            <p className="uppercase tracking-[0.28em] text-[#908978]">Focus</p>
            <p className="mt-2 leading-7">
              Premium web design, brand-led experiences, and product storytelling.
            </p>
          </div>
          <div>
            <p className="uppercase tracking-[0.28em] text-[#908978]">Format</p>
            <p className="mt-2 leading-7">
              A spatial portfolio that feels closer to a curated exhibition than
              a standard project grid.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
