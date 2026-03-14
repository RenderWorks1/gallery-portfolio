"use client";

interface LoadingScreenProps {
  progress?: number;
  canEnter?: boolean;
  onEnter?: () => void;
}

export default function LoadingScreen({
  progress = 0,
  canEnter = false,
  onEnter,
}: LoadingScreenProps) {
  const clampedProgress = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[rgba(242,238,229,0.9)] px-6 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/60 p-8 text-[#171717] shadow-[0_30px_120px_rgba(60,54,46,0.12)]">
        <p className="text-xs uppercase tracking-[0.32em] text-[#7f7769]">
          Luke Gallery Portfolio
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          {canEnter ? "Click to enter the gallery" : "Preparing the exhibition"}
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#534d43] sm:text-base">
          {canEnter
            ? "Pointer lock requires a gesture. Step inside, then click the scene to start looking around."
            : "Loading artwork previews, lighting, physics, and the character controller."}
        </p>

        <div className="mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-[#d7d0c4]">
            <div
              className="h-full rounded-full bg-[#171717] transition-[width] duration-500"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#7f7769]">
            <span>{clampedProgress}%</span>
            <span>{canEnter ? "Ready" : "Loading"}</span>
          </div>
        </div>

        {canEnter ? (
          <button
            type="button"
            onClick={onEnter}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#171717] px-7 text-sm font-medium uppercase tracking-[0.22em] text-[#f6f2ea] transition hover:bg-[#2b2924]"
          >
            Enter experience
          </button>
        ) : null}
      </div>
    </div>
  );
}
