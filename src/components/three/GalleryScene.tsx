"use client";

import {
  AdaptiveDpr,
  AdaptiveEvents,
  ContactShadows,
  KeyboardControls,
  Preload,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import ArtworkDetail from "@/components/three/ArtworkDetail";
import ArtworkFrame from "@/components/three/ArtworkFrame";
import Character from "@/components/three/Character";
import GalleryBench from "@/components/three/GalleryBench";
import GalleryLighting from "@/components/three/GalleryLighting";
import GalleryPlant from "@/components/three/GalleryPlant";
import GalleryRoom from "@/components/three/GalleryRoom";
import Pedestal from "@/components/three/Pedestal";
import WelcomeSign from "@/components/three/WelcomeSign";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ControlsHint from "@/components/ui/ControlsHint";
import TutorialCard from "@/components/ui/TutorialCard";
import { projects } from "@/data/projects";
import { useGalleryStore } from "@/stores/galleryStore";

const benchPlacements: Array<{
  position: [number, number, number];
  rotation: [number, number, number];
}> = [
  { position: [-8.8, 0, 13], rotation: [0, Math.PI / 2, 0] },
  { position: [8.9, 0, -16], rotation: [0, -Math.PI / 2, 0] },
];

const pedestalPlacements: Array<{
  position: [number, number, number];
  objectType: "icosahedron" | "torus" | "torusKnot" | "octahedron" | "dodecahedron";
  objectColor: string;
  label: string;
}> = [
  {
    position: [-5.8, 0, 2.5],
    objectType: "torusKnot",
    objectColor: "#1d9e75",
    label: "Three.js",
  },
  {
    position: [6.8, 0, -15.5],
    objectType: "dodecahedron",
    objectColor: "#534ab7",
    label: "Next.js",
  },
];

const plantPlacements: Array<{
  position: [number, number, number];
  scale: number;
}> = [
  { position: [-5.6, 0, 20.6], scale: 1 },
  { position: [5.6, 0, 20.6], scale: 0.92 },
  { position: [-12.6, 0, -20.4], scale: 1.12 },
  { position: [12.3, 0, 12.5], scale: 0.88 },
];

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
  { name: "action4", keys: ["KeyE"] },
];

projects.forEach((project) => useTexture.preload(project.screenshotUrl));

export default function GalleryScene() {
  const activeProjectId = useGalleryStore((state) => state.activeProject);
  const nearbyProject = useGalleryStore((state) => state.nearbyProject);
  const isOverlayOpen = useGalleryStore((state) => state.isOverlayOpen);
  const setActiveProject = useGalleryStore((state) => state.setActiveProject);
  const setIsLoaded = useGalleryStore((state) => state.setIsLoaded);

  const [hasEntered, setHasEntered] = useState(false);
  const { progress, active } = useProgress();

  const canEnter = progress >= 100 && !active;
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId],
  );

  useEffect(() => {
    setIsLoaded(canEnter);
  }, [canEnter, setIsLoaded]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setActiveProject(null);
        return;
      }

      if (
        hasEntered &&
        !isOverlayOpen &&
        nearbyProject &&
        event.code === "KeyE"
      ) {
        setActiveProject(nearbyProject);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasEntered, isOverlayOpen, nearbyProject, setActiveProject]);

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden bg-[#ece7dc] ${
        hasEntered && !isOverlayOpen ? "cursor-none" : "cursor-default"
      }`}
    >
      {!hasEntered || !canEnter ? (
        <LoadingScreen
          progress={progress}
          canEnter={canEnter}
          onEnter={() => setHasEntered(true)}
        />
      ) : null}

      <ControlsHint enabled={hasEntered && !isOverlayOpen} />
      <TutorialCard enabled={hasEntered && !isOverlayOpen} />

      {hasEntered && !isOverlayOpen ? (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full border border-white/70 bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
        </div>
      ) : null}

      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 2.8, 12], fov: 45, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          style={{ background: "#f0ede8" }}
        >
          <color attach="background" args={["#f0ede8"]} />
          <fog attach="fog" args={["#f0ede8", 12, 55]} />

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]} colliders={false}>
              <GalleryRoom />
              {benchPlacements.map((bench, index) => (
                <GalleryBench
                  key={`bench-${index}`}
                  position={bench.position}
                  rotation={bench.rotation}
                />
              ))}
              {pedestalPlacements.map((pedestal) => (
                <Pedestal
                  key={pedestal.label}
                  position={pedestal.position}
                  objectType={pedestal.objectType}
                  objectColor={pedestal.objectColor}
                  label={pedestal.label}
                />
              ))}
              {plantPlacements.map((plant, index) => (
                <GalleryPlant key={`plant-${index}`} position={plant.position} scale={plant.scale} />
              ))}
              <WelcomeSign
                position={[-4.8, 0, 18.4]}
                rotation={[0, 0.28, 0]}
                title="Luke's Portfolio"
                subtitle="Web Development & Design"
              />
              <Character controlsDisabled={isOverlayOpen || !hasEntered} />
              {projects.map((project) => (
                <ArtworkFrame key={project.id} project={project} />
              ))}
            </Physics>

            <GalleryLighting />
            <ContactShadows
              position={[0, 0.01, 0]}
              opacity={0.35}
              scale={30}
              blur={2.5}
              far={4}
              resolution={256}
              color="#1a1511"
            />
            <Preload all />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {activeProject ? (
        <ArtworkDetail
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      ) : null}
    </div>
  );
}
