"use client";

import { useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { RepeatWrapping } from "three";

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
  const texture = useTexture("/textures/white_plaster.jpg");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(4, 2);

  return (
    <RigidBody type="fixed" position={position} rotation={rotation} colliders={false}>
      <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={0.95}
          metalness={0}
          envMapIntensity={0.05}
        />
      </mesh>
    </RigidBody>
  );
}
