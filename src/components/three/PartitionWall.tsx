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
  const length = Math.max(width, depth);
  const isDepthDominant = depth > width;
  const skirtingOffset = (isDepthDominant ? width : depth) / 2 + 0.011;

  return (
    <RigidBody type="fixed" position={position} rotation={rotation} colliders={false}>
      <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
      <group>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial
            color="#f2efe8"
            roughness={0.95}
            metalness={0}
            envMapIntensity={0.05}
          />
        </mesh>

        <mesh
          position={isDepthDominant ? [-skirtingOffset, -height / 2 + 0.05, 0] : [0, -height / 2 + 0.05, -skirtingOffset]}
          rotation={isDepthDominant ? [0, Math.PI / 2, 0] : [0, 0, 0]}
          receiveShadow
        >
          <boxGeometry args={[length, 0.1, 0.02]} />
          <meshStandardMaterial
            color="#d5d0c6"
            roughness={0.7}
            metalness={0}
            envMapIntensity={0.1}
          />
        </mesh>

        <mesh
          position={isDepthDominant ? [skirtingOffset, -height / 2 + 0.05, 0] : [0, -height / 2 + 0.05, skirtingOffset]}
          rotation={isDepthDominant ? [0, Math.PI / 2, 0] : [0, 0, 0]}
          receiveShadow
        >
          <boxGeometry args={[length, 0.1, 0.02]} />
          <meshStandardMaterial
            color="#d5d0c6"
            roughness={0.7}
            metalness={0}
            envMapIntensity={0.1}
          />
        </mesh>
      </group>
    </RigidBody>
  );
}
