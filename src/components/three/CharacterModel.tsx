"use client";

import { useGLTF } from "@react-three/drei";
import { EcctrlAnimation } from "ecctrl";
import { useMemo } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

const CHARACTER_URL = "/models/Alien_Helmet.glb";
const CHARACTER_SCALE = 0.35;
const CAPSULE_HALF_HEIGHT = 0.35;
const CAPSULE_RADIUS = 0.3;
const FEET_TARGET_Y = -(CAPSULE_HALF_HEIGHT + CAPSULE_RADIUS);

const animationSet = {
  idle: "AlienArmature|Alien_Idle",
  walk: "AlienArmature|Alien_Walk",
  run: "AlienArmature|Alien_Run",
  jump: "AlienArmature|Alien_Jump",
  jumpIdle: "AlienArmature|Alien_RunningJump",
  jumpLand: "AlienArmature|Alien_IdleHold",
  fall: "AlienArmature|Alien_Death",
  action1: "AlienArmature|Alien_Punch",
  action2: "AlienArmature|Alien_SwordSlash",
  action3: "AlienArmature|Alien_Clapping",
  action4: "AlienArmature|Alien_Standing",
} as const;

export default function CharacterModel() {
  const { scene } = useGLTF(CHARACTER_URL);
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
    const groundedOffset = Number.isFinite(bounds.min.y)
      ? FEET_TARGET_Y - bounds.min.y * CHARACTER_SCALE
      : FEET_TARGET_Y;

    return {
      clonedScene: cloned,
      groundedYOffset: groundedOffset,
    };
  }, [scene]);

  return (
    <EcctrlAnimation characterURL={CHARACTER_URL} animationSet={animationSet}>
      <primitive
        object={clonedScene}
        scale={CHARACTER_SCALE}
        position={[0, groundedYOffset, 0]}
        castShadow
        receiveShadow
      />
    </EcctrlAnimation>
  );
}

useGLTF.preload(CHARACTER_URL);
