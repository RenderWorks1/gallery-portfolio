"use client";

import { Text, useTexture } from "@react-three/drei";
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
const TITLE_PLAQUE_WIDTH = 2.56;
const TITLE_PLAQUE_HEIGHT = 0.34;
const TITLE_PLAQUE_Y = 1.28;
const TITLE_Y = 1.3;
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
                color={isNearby ? "#2f2a24" : "#1a1a1a"}
                roughness={0.82}
                metalness={0.08}
                emissive={isNearby ? "#6d5940" : "#1a1511"}
                emissiveIntensity={isNearby ? 0.18 : 0}
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

            <mesh position={[0, TITLE_PLAQUE_Y, 0.03]} receiveShadow>
              <boxGeometry args={[TITLE_PLAQUE_WIDTH, TITLE_PLAQUE_HEIGHT, 0.05]} />
              <meshStandardMaterial
                color={isNearby ? "#f2e5d2" : "#eadbc5"}
                emissive={isNearby ? "#806241" : "#1a1511"}
                emissiveIntensity={isNearby ? 0.18 : 0}
                roughness={0.62}
                metalness={0.04}
              />
            </mesh>

            <Text
              position={[0, TITLE_Y, 0.065]}
              color="#1f1710"
              fontSize={0.15}
              maxWidth={2.2}
              outlineWidth={0.005}
              outlineColor="#fff6ea"
              anchorX="center"
              anchorY="middle"
            >
              {project.title}
            </Text>
          </group>

          <group position={[markerX, markerY, markerZ]} scale={[0.68, 0.68, 0.68]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.66, 0.70, 64]} />
              <meshBasicMaterial color="#1a1511" />
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
