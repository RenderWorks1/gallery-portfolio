"use client";

import { Environment } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { artworkData, getArtworkLightPosition } from "@/components/three/ArtworkData";
import { CEILING_HEIGHT } from "@/components/three/galleryConstants";
import type { Project } from "@/data/projects";

const artworkShadowIds = new Set<string>([
  "render-works",
  "wrightson-construction",
  "church-scroll",
  "common-estate",
  "rocks-holloway",
]);

function ArtworkSpotlight({
  artwork,
  castShadow,
}: {
  artwork: Project;
  castShadow: boolean;
}) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);
  const position = getArtworkLightPosition(artwork);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <group>
      <spotLight
        ref={lightRef}
        position={position}
        intensity={3.6}
        angle={Math.PI / 7}
        penumbra={0.6}
        distance={10}
        decay={1.8}
        color="#fff5eb"
        castShadow={castShadow}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.001}
      />
      <object3D ref={targetRef} position={artwork.position} />
      <TrackLight position={position} artwork={artwork} />
    </group>
  );
}

function TrackLight({
  position,
  artwork,
}: {
  position: [number, number, number];
  artwork: Project;
}) {
  const [x, , z] = position;
  const fixtureRotationY =
    artwork.wall === "left"
      ? Math.PI / 2
      : artwork.wall === "right"
        ? -Math.PI / 2
        : 0;

  return (
    <group position={[x, CEILING_HEIGHT - 0.08, z]} rotation={[0.32, fixtureRotationY, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.05, 0.6]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.15}
          metalness={0.92}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.12, 8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.15}
          metalness={0.92}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, -0.15, 0.04]}>
        <circleGeometry args={[0.03, 8]} />
        <meshBasicMaterial color="#fff5eb" />
      </mesh>
    </group>
  );
}

export default function GalleryLighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#e8dfd2" />
      <Environment preset="studio" environmentIntensity={0.4} />
      {artworkData.map((artwork) => (
        <ArtworkSpotlight
          key={artwork.id}
          artwork={artwork}
          castShadow={artworkShadowIds.has(artwork.id)}
        />
      ))}
    </>
  );
}
