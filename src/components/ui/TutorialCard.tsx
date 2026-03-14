"use client";

interface TutorialCardProps {
  enabled: boolean;
}

function Key({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none border border-black bg-transparent text-sm font-medium text-black ${className}`}
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
      <div className="rounded-lg bg-transparent px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {/* Move — WASD */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-black">Move</span>
            <div className="grid grid-cols-3 grid-rows-2 gap-0.5" style={{ width: "fit-content" }}>
              <div className="col-start-1 row-start-1" />
              <Key className="col-start-2 row-start-1">W</Key>
              <div className="col-start-3 row-start-1" />
              <Key className="col-start-1 row-start-2">A</Key>
              <Key className="col-start-2 row-start-2">S</Key>
              <Key className="col-start-3 row-start-2">D</Key>
            </div>
          </div>

          {/* Open/Close Menu — ESC */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-black">Open/Close Menu</span>
            <Key>ESC</Key>
          </div>

          {/* See details — E */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-black">See details</span>
            <Key>E</Key>
          </div>
        </div>
      </div>
    </div>
  );
}
