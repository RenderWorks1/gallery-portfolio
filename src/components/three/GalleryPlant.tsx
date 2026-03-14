"use client";

import { CuboidCollider, RigidBody } from "@react-three/rapier";

interface GalleryPlantProps {
  position: [number, number, number];
  scale?: number;
}

export default function GalleryPlant({
  position,
  scale = 1,
}: GalleryPlantProps) {
  return (
    <RigidBody type="fixed" position={position} colliders={false}>
      <CuboidCollider
        args={[0.25 * scale, 0.6 * scale, 0.25 * scale]}
        position={[0, 0.6 * scale, 0]}
      />
      <group scale={scale}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.4, 6]} />
          <meshStandardMaterial
            color="#c4b8a8"
            roughness={0.85}
            metalness={0}
            envMapIntensity={0.1}
          />
        </mesh>

        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.02, 6]} />
          <meshStandardMaterial color="#4a3e34" roughness={1} metalness={0} />
        </mesh>

        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <icosahedronGeometry args={[0.22, 1]} />
          <meshStandardMaterial color="#4a7a3a" roughness={0.8} metalness={0} />
        </mesh>

        <mesh position={[0.12, 0.9, 0.08]} castShadow receiveShadow>
          <icosahedronGeometry args={[0.14, 1]} />
          <meshStandardMaterial color="#5a8a4a" roughness={0.8} metalness={0} />
        </mesh>

        <mesh position={[-0.1, 0.85, -0.06]} castShadow receiveShadow>
          <icosahedronGeometry args={[0.12, 1]} />
          <meshStandardMaterial color="#3a6a2a" roughness={0.8} metalness={0} />
        </mesh>

        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.9} metalness={0} />
        </mesh>
      </group>
    </RigidBody>
  );
}
