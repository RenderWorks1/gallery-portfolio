"use client";

import Ecctrl, { type CustomEcctrlRigidBody } from "ecctrl";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import CharacterModel from "@/components/three/CharacterModel";
import { useGalleryStore } from "@/stores/galleryStore";

interface CharacterProps {
  controlsDisabled: boolean;
}

function CameraAssist({
  controllerRef,
  enabled,
}: {
  controllerRef: RefObject<CustomEcctrlRigidBody | null>;
  enabled: boolean;
}) {
  const { gl } = useThree();
  const yawOffset = useRef(0);
  const pitchOffset = useRef(0);
  const lastInputAt = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!enabled) {
      isDragging.current = false;
      return;
    }

    const handlePointerDown = () => {
      isDragging.current = true;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const hasPointerLock = document.pointerLockElement === gl.domElement;
      if (!isDragging.current && !hasPointerLock) {
        return;
      }

      const pitchDelta = event.movementY * 0.0016;
      const yawDelta = -event.movementX * 0.0019;

      controllerRef.current?.rotateCamera(pitchDelta, yawDelta);
      pitchOffset.current += pitchDelta;
      yawOffset.current += yawDelta;
      lastInputAt.current = performance.now();
    };

    gl.domElement.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      gl.domElement.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enabled, gl.domElement, controllerRef]);

  useFrame((_, delta) => {
    if (!enabled) {
      return;
    }

    const idleMs = performance.now() - lastInputAt.current;
    if (idleMs < 850) {
      return;
    }

    const yawStep = -yawOffset.current * Math.min(1, delta * 3.8);
    const pitchStep = -pitchOffset.current * Math.min(1, delta * 3.4);

    if (Math.abs(yawOffset.current) < 0.0008 && Math.abs(pitchOffset.current) < 0.0008) {
      yawOffset.current = 0;
      pitchOffset.current = 0;
      return;
    }

    controllerRef.current?.rotateCamera(pitchStep, yawStep);
    yawOffset.current += yawStep;
    pitchOffset.current += pitchStep;
  });

  return null;
}

export default function Character({ controlsDisabled }: CharacterProps) {
  const controllerRef = useRef<CustomEcctrlRigidBody | null>(null);
  const isOverlayOpen = useGalleryStore((state) => state.isOverlayOpen);

  useEffect(() => {
    const rigidBody = controllerRef.current?.group;

    if (!isOverlayOpen || !rigidBody) {
      return;
    }

    // Stop any carried momentum when the artwork overlay opens, but do not
    // force the character to snap to a marker position or rotate.
    rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }, [isOverlayOpen]);

  return (
    <Ecctrl
      ref={controllerRef}
      name="player"
      animated
      position={[0, 1.25, 8.6]}
      characterInitDir={Math.PI}
      mode="FixedCamera"
      capsuleHalfHeight={0.35}
      capsuleRadius={0.3}
      maxVelLimit={2.2}
      sprintMult={1.8}
      jumpVel={3}
      camInitDis={-4.6}
      camMaxDis={-6.6}
      camMinDis={-2.4}
      camTargetPos={{ x: 0, y: 0.25, z: 0 }}
      camInitDir={{ x: 0.32, y: Math.PI }}
      camUpLimit={1.15}
      camLowLimit={-0.15}
      camFollowMult={3}
      fixedCamRotMult={1.6}
      turnSpeed={10}
      disableControl={controlsDisabled}
    >
      <CameraAssist controllerRef={controllerRef} enabled={!controlsDisabled} />
      <CharacterModel />
    </Ecctrl>
  );
}
