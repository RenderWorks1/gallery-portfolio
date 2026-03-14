"use client";

interface ControlsHintProps {
  enabled: boolean;
}

export default function ControlsHint({ enabled }: ControlsHintProps) {
  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center px-4">
      <div
        className="rounded-full border border-white/20 bg-[rgba(23,23,23,0.74)] px-5 py-3 text-center text-xs uppercase tracking-[0.22em] text-white shadow-lg backdrop-blur-md sm:text-sm"
        style={{ animation: "galleryHintFade 0.8s ease 4.2s forwards" }}
      >
        WASD to move · Mouse to adjust camera · View recenters automatically · E to interact
      </div>
    </div>
  );
}
