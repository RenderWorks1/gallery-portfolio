"use client";

import { useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import { LinearFilter, SRGBColorSpace } from "three";
import { artworkMarkerLocalOffset } from "@/components/three/ArtworkData";
import InteractionPrompt from "@/components/three/InteractionPrompt";
import type { Project } from "@/data/projects";
import { useGalleryStore } from "@/stores/galleryStore";

interface ArtworkFrameProps {
  project: Project;
}

const ARTWORK_WIDTH = 2.92;
const ARTWORK_HEIGHT = 1.76;
const FRAME_WIDTH = 3.04;
const FRAME_HEIGHT = 1.88;
const DISPLAY_LIFT = 0.38;

export default function ArtworkFrame({ project }: ArtworkFrameProps) {
  const texture = useTexture(project.screenshotUrl);
  const nearbyProject = useGalleryStore((state) => state.nearbyProject);
  const activeProject = useGalleryStore((state) => state.activeProject);
  const setNearbyProject = useGalleryStore((state) => state.setNearbyProject);
  const setActiveProject = useGalleryStore((state) => state.setActiveProject);
  const [markerX, markerY, markerZ] = artworkMarkerLocalOffset;

  const isNearby = nearbyProject === project.id;
  const isOverlayOpen = activeProject !== null;

  const configuredTexture = useMemo(() => {
    const clonedTexture = texture.clone();
    clonedTexture.colorSpace = SRGBColorSpace;
    clonedTexture.generateMipmaps = false;
    clonedTexture.minFilter = LinearFilter;
    clonedTexture.magFilter = LinearFilter;
    clonedTexture.needsUpdate = true;
    return clonedTexture;
  }, [texture]);

  return (
    <group position={project.position} rotation={project.rotation}>
      <RigidBody type="fixed">
        <group>
          <group position={[0, DISPLAY_LIFT, 0]}>
            <mesh castShadow receiveShadow position={[0, 0, -0.04]}>
              <boxGeometry args={[FRAME_WIDTH, FRAME_HEIGHT, 0.08]} />
              <meshStandardMaterial
                color="#000000"
                roughness={0.4}
                metalness={0.05}
                envMapIntensity={0.4}
              />
            </mesh>

            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[ARTWORK_WIDTH, ARTWORK_HEIGHT]} />
              <meshStandardMaterial
                map={configuredTexture}
                roughness={0.72}
                metalness={0.02}
                envMapIntensity={0.35}
              />
            </mesh>
          </group>

          <group position={[markerX, markerY, markerZ]} scale={[0.68, 0.68, 0.68]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.66, 0.70, 64]} />
              <meshStandardMaterial
                color="#1a1511"
                roughness={0.5}
                metalness={0.2}
                envMapIntensity={0.35}
              />
            </mesh>
          </group>
        </group>
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          args={[2.35, 2.15, 2.05]}
          position={[0, 0.55, 1.5]}
          sensor
          onIntersectionEnter={(payload) => {
            if (payload.other.rigidBodyObject?.name === "player") {
              setNearbyProject(project.id);
            }
          }}
          onIntersectionExit={(payload) => {
            if (
              payload.other.rigidBodyObject?.name === "player" &&
              useGalleryStore.getState().nearbyProject === project.id
            ) {
              setNearbyProject(null);
            }
          }}
        />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          args={[0.82, 0.82, 0.82]}
          position={[markerX, markerY + 0.81, markerZ]}
          sensor
          onIntersectionEnter={(payload) => {
            if (payload.other.rigidBodyObject?.name === "player") {
              setNearbyProject(project.id);
              setActiveProject(project.id);
            }
          }}
        />
      </RigidBody>

      {isNearby && !isOverlayOpen ? (
        <InteractionPrompt />
      ) : null}
    </group>
  );
}
