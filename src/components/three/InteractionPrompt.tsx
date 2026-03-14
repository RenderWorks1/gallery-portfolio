"use client";

import { Html } from "@react-three/drei";

export default function InteractionPrompt() {
  return (
    <Html
      center
      distanceFactor={8}
      occlude
      zIndexRange={[100, 0]}
      position={[0, -1.25, 0.3]}
    >
      <div className="min-w-[220px] rounded-full border border-white/20 bg-[rgba(17,17,17,0.76)] px-6 py-4 text-center text-sm font-medium uppercase tracking-[0.26em] text-white shadow-xl backdrop-blur-md sm:text-base">
        Step onto the circle
        <br />
        to view
      </div>
    </Html>
  );
}
