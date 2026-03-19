"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

const CHARACTER_URL = "/models/Alien_Helmet.glb";
const CHARACTER_SCALE = 0.35;
const FEET_TARGET_Y = 0;
const IDLE_ANIMATION = "AlienArmature|Alien_Idle";

export default function DeskAttendant() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(CHARACTER_URL);

  const { clonedScene, groundedYOffset } = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene);

    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      const applyWhiteMaterial = (material: THREE.Material) => {
        const nextMaterial = material.clone();

        if ("color" in nextMaterial && nextMaterial.color instanceof THREE.Color) {
          nextMaterial.color = new THREE.Color("#f5f5f0");
        }

        if ("emissive" in nextMaterial && nextMaterial.emissive instanceof THREE.Color) {
          nextMaterial.emissive = new THREE.Color("#e8e6e0");
        }

        if ("emissiveIntensity" in nextMaterial && typeof nextMaterial.emissiveIntensity === "number") {
          nextMaterial.emissiveIntensity = 0;
        }

        return nextMaterial;
      };

      child.material = Array.isArray(child.material)
        ? child.material.map(applyWhiteMaterial)
        : applyWhiteMaterial(child.material);
      child.castShadow = true;
      child.receiveShadow = true;
    });

    cloned.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(cloned);
    const nextGroundedYOffset = Number.isFinite(bounds.min.y)
      ? FEET_TARGET_Y - bounds.min.y * CHARACTER_SCALE
      : FEET_TARGET_Y;

    return {
      clonedScene: cloned,
      groundedYOffset: nextGroundedYOffset,
    };
  }, [scene]);

  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    const idleAction = actions[IDLE_ANIMATION];
    if (!idleAction) {
      return;
    }

    idleAction.reset().fadeIn(0.3).play();

    return () => {
      idleAction.fadeOut(0.2);
    };
  }, [actions]);

  return (
    <group ref={groupRef}>
      <primitive
        object={clonedScene}
        scale={CHARACTER_SCALE}
        position={[0, groundedYOffset, 0]}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload(CHARACTER_URL);
