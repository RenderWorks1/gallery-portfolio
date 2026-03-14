"use client";

import { CuboidCollider, RigidBody } from "@react-three/rapier";

interface GalleryBenchProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function GalleryBench({
  position,
  rotation = [0, 0, 0],
}: GalleryBenchProps) {
  return (
    <RigidBody type="fixed" position={position} rotation={rotation} colliders={false}>
      <CuboidCollider args={[0.82, 0.24, 0.32]} position={[0, 0.24, 0]} />
      <group>
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.08, 0.55]} />
          <meshStandardMaterial color="#8a7a6b" roughness={0.72} metalness={0} />
        </mesh>

        <mesh position={[-0.6, 0.19, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 0.38, 0.45]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.34} metalness={0.58} />
        </mesh>

        <mesh position={[0.6, 0.19, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 0.38, 0.45]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.34} metalness={0.58} />
        </mesh>
      </group>
    </RigidBody>
  );
}
