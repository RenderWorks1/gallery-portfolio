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
          <meshStandardMaterial
            color="#9c7e5e"
            roughness={0.65}
            metalness={0}
            envMapIntensity={0.3}
          />
        </mesh>

        <mesh position={[-0.6, 0.19, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 0.38, 0.45]} />
          <meshStandardMaterial
            color="#1c1c1c"
            roughness={0.2}
            metalness={0.9}
            envMapIntensity={1}
          />
        </mesh>

        <mesh position={[0.6, 0.19, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 0.38, 0.45]} />
          <meshStandardMaterial
            color="#1c1c1c"
            roughness={0.2}
            metalness={0.9}
            envMapIntensity={1}
          />
        </mesh>
      </group>
    </RigidBody>
  );
}
