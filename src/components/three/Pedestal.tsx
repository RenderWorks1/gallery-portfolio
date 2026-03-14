"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";

interface PedestalProps {
  position: [number, number, number];
  label?: string;
  objectType?: "icosahedron" | "torus" | "torusKnot" | "octahedron" | "dodecahedron";
  objectColor?: string;
}

export default function Pedestal({
  position,
  label = "",
  objectType = "icosahedron",
  objectColor = "#1d9e75",
}: PedestalProps) {
  const objectRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!objectRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    objectRef.current.rotation.y = elapsed * 0.4;
    objectRef.current.position.y = 1.15 + Math.sin(elapsed * 1.2) * 0.05;
  });

  const geometryMap = {
    icosahedron: <icosahedronGeometry args={[0.2, 0]} />,
    torus: <torusGeometry args={[0.18, 0.07, 8, 6]} />,
    torusKnot: <torusKnotGeometry args={[0.15, 0.05, 64, 8]} />,
    octahedron: <octahedronGeometry args={[0.22, 0]} />,
    dodecahedron: <dodecahedronGeometry args={[0.2, 0]} />,
  } as const;

  return (
    <RigidBody type="fixed" position={position} colliders={false}>
      <CuboidCollider args={[0.3, 0.52, 0.3]} position={[0, 0.52, 0]} />

      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial
          color="#f0ede6"
          roughness={0.85}
          metalness={0}
          envMapIntensity={0.1}
        />
      </mesh>

      <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.04, 0.55]} />
        <meshStandardMaterial
          color="#b08d6a"
          roughness={0.55}
          metalness={0}
          envMapIntensity={0.2}
        />
      </mesh>

      <mesh ref={objectRef} position={[0, 1.15, 0]} castShadow receiveShadow>
        {geometryMap[objectType]}
        <meshStandardMaterial
          color={objectColor}
          roughness={0.3}
          metalness={0.2}
          envMapIntensity={1}
        />
      </mesh>

      {label ? (
        <Text
          position={[0, 0.15, 0.275]}
          fontSize={0.06}
          color="#6f685c"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.38}
        >
          {label}
        </Text>
      ) : null}
    </RigidBody>
  );
}
