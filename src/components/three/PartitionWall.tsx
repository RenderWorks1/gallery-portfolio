"use client";

import { CuboidCollider, RigidBody } from "@react-three/rapier";

interface PartitionWallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
}

export default function PartitionWall({
  position,
  rotation = [0, 0, 0],
  width = 4,
  height = 3.2,
  depth = 0.15,
}: PartitionWallProps) {
  return (
    <RigidBody type="fixed" position={position} rotation={rotation} colliders={false}>
      <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#f5f2ed"
          roughness={0.92}
          metalness={0}
          envMapIntensity={0.1}
        />
      </mesh>
    </RigidBody>
  );
}
