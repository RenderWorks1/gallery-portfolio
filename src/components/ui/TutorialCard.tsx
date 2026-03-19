"use client";

interface TutorialCardProps {
  enabled: boolean;
}

function Key({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex h-11 min-w-11 flex-shrink-0 items-center justify-center rounded-none border border-white bg-transparent px-2 text-base font-medium text-white ${className}`}
    >
      {children}
    </span>
  );
}

export default function TutorialCard({ enabled }: TutorialCardProps) {
  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute bottom-6 left-6 z-30">
      <div className="rounded-lg bg-transparent px-6 py-5">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          {/* Move — WASD */}
          <div className="flex items-center gap-4">
            <span className="text-base font-medium text-white">Move</span>
            <div className="grid grid-cols-3 grid-rows-2 gap-1" style={{ width: "fit-content" }}>
              <div className="col-start-1 row-start-1" />
              <Key className="col-start-2 row-start-1">W</Key>
              <div className="col-start-3 row-start-1" />
              <Key className="col-start-1 row-start-2">A</Key>
              <Key className="col-start-2 row-start-2">S</Key>
              <Key className="col-start-3 row-start-2">D</Key>
            </div>
          </div>

          {/* Open/Close Menu — ESC */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">Open/Close Menu</span>
            <Key>ESC</Key>
          </div>

          {/* See details — E */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">See details</span>
            <Key>E</Key>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">Enquiry desk</span>
            <span className="text-sm uppercase tracking-[0.18em] text-white/78">
              Step into circle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
