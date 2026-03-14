"use client";

import { Text } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

interface WelcomeSignProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title?: string;
  subtitle?: string;
}

export default function WelcomeSign({
  position,
  rotation = [0, 0, 0],
  title = "Luke's Portfolio",
  subtitle = "Web Development & Design",
}: WelcomeSignProps) {
  return (
    <RigidBody type="fixed" position={position} rotation={rotation} colliders={false}>
      <CuboidCollider args={[0.62, 0.78, 0.16]} position={[0, 0.78, 0]} />
      <group>
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.8, 0.03]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.4}
            metalness={0.3}
            envMapIntensity={0.5}
          />
        </mesh>

        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial
            color="#1c1c1c"
            roughness={0.25}
            metalness={0.85}
            envMapIntensity={1}
          />
        </mesh>

        <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.04, 8]} />
          <meshStandardMaterial
            color="#1c1c1c"
            roughness={0.25}
            metalness={0.85}
            envMapIntensity={1}
          />
        </mesh>

        <Text
          position={[0, 1.3, 0.02]}
          fontSize={0.09}
          color="#f5f2ec"
          anchorX="center"
          anchorY="middle"
          maxWidth={1}
        >
          {title}
        </Text>

        <Text
          position={[0, 1.12, 0.02]}
          fontSize={0.05}
          color="#b7ab9b"
          anchorX="center"
          anchorY="middle"
          maxWidth={1}
        >
          {subtitle}
        </Text>
      </group>
    </RigidBody>
  );
}
