"use client";

import { useState } from "react";

interface EnquiryDetailProps {
  onClose: () => void;
}

export default function EnquiryDetail({ onClose }: EnquiryDetailProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[rgba(10,10,10,0.62)] p-6 backdrop-blur-md">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#111111] text-white shadow-[0_40px_120px_rgba(0,0,0,0.45)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between border-b border-white/10 bg-[#181818] p-8 sm:p-10 lg:border-b-0 lg:border-r">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-white/45">
              Enquiry desk
            </p>
            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Start a conversation about your next project.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-[1.8] text-white/72 sm:text-base">
              Step up to the desk and leave a few details about what you are building. This
              keeps the gallery interaction immersive while giving visitors a clear path to
              enquire.
            </p>
          </div>

          <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Best for
              </p>
              <p className="mt-2 text-sm leading-7 text-white/75">
                New websites, redesigns, campaign pages, product launches, and digital
                experiences that need a more considered presentation.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium uppercase tracking-[0.2em] text-white/75 transition hover:border-white/35 hover:text-white"
            >
              Press ESC to close
            </button>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.32em] text-white/45">
              Leave an enquiry
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 transition hover:border-white/30 hover:text-white"
            >
              Close
            </button>
          </div>

          {isSubmitted ? (
            <div className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Received</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                Thanks, your enquiry is ready to route.
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-[1.8] text-white/72">
                The form interaction is now wired into the gallery experience. If you want, I
                can connect this panel to an email service, CRM, or API next.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium uppercase tracking-[0.2em] !text-black transition hover:bg-[#e8e4dc]"
              >
                Return to gallery
              </button>
            </div>
          ) : (
            <form
              className="mt-8 grid gap-5"
              onSubmit={(event) => {
                event.preventDefault();
                setIsSubmitted(true);
              }}
            >
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.24em] text-white/52">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/30"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.24em] text-white/52">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/30"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.24em] text-white/52">
                    Project type
                  </span>
                  <input
                    type="text"
                    name="projectType"
                    placeholder="Portfolio, property, campaign..."
                    className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/30"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.24em] text-white/52">
                    Timeline
                  </span>
                  <input
                    type="text"
                    name="timeline"
                    placeholder="e.g. 6-8 weeks"
                    className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-white/30"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.24em] text-white/52">
                  What do you need help with?
                </span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us a little about the site, audience, or experience you want to create."
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/28 focus:border-white/30"
                />
              </label>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium uppercase tracking-[0.2em] !text-black transition hover:bg-[#e8e4dc]"
                >
                  Send enquiry
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium uppercase tracking-[0.2em] text-white/75 transition hover:border-white/35 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
