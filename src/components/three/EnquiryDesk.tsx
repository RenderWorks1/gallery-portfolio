"use client";

import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useState } from "react";
import DeskAttendant from "@/components/three/DeskAttendant";
import InteractionPrompt from "@/components/three/InteractionPrompt";
import { useGalleryStore } from "@/stores/galleryStore";

const DESK_POSITION: [number, number, number] = [6.1, 0, 8.9];
const DESK_ROTATION: [number, number, number] = [0, 0, 0];

export default function EnquiryDesk() {
  const isEnquiryOpen = useGalleryStore((state) => state.isEnquiryOpen);
  const setIsEnquiryOpen = useGalleryStore((state) => state.setIsEnquiryOpen);
  const [isNearby, setIsNearby] = useState(false);

  return (
    <group position={DESK_POSITION} rotation={DESK_ROTATION}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[1.9, 0.7, 0.75]} position={[0, 0.72, 0]} />
        <CuboidCollider args={[0.07, 0.4, 0.65]} position={[-1.76, 0.4, 0]} />
        <CuboidCollider args={[0.07, 0.4, 0.65]} position={[1.76, 0.4, 0]} />

        <group>
          <mesh castShadow receiveShadow position={[0, 0.72, 0]}>
            <boxGeometry args={[3.8, 0.12, 1.5]} />
            <meshStandardMaterial color="#171412" roughness={0.5} metalness={0.22} envMapIntensity={0.55} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.36, 0.67]}>
            <boxGeometry args={[3.64, 0.72, 0.12]} />
            <meshStandardMaterial color="#1d1916" roughness={0.58} metalness={0.14} envMapIntensity={0.45} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.34, -0.67]}>
            <boxGeometry args={[3.64, 0.68, 0.12]} />
            <meshStandardMaterial color="#1d1916" roughness={0.58} metalness={0.14} envMapIntensity={0.45} />
          </mesh>

          <mesh castShadow receiveShadow position={[-1.72, 0.34, 0]}>
            <boxGeometry args={[0.12, 0.68, 1.24]} />
            <meshStandardMaterial color="#1d1916" roughness={0.58} metalness={0.14} envMapIntensity={0.45} />
          </mesh>

          <mesh castShadow receiveShadow position={[1.72, 0.34, 0]}>
            <boxGeometry args={[0.12, 0.68, 1.24]} />
            <meshStandardMaterial color="#1d1916" roughness={0.58} metalness={0.14} envMapIntensity={0.45} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 1.02, -0.42]}>
            <boxGeometry args={[0.82, 0.04, 0.52]} />
            <meshStandardMaterial color="#efe7d8" roughness={0.96} metalness={0.02} envMapIntensity={0.12} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 1.19, -0.42]}>
            <boxGeometry args={[0.92, 0.28, 0.08]} />
            <meshStandardMaterial color="#111111" roughness={0.34} metalness={0.72} envMapIntensity={0.9} />
          </mesh>
        </group>
      </RigidBody>

      <group position={[0, 0.015, -2.1]} scale={[0.78, 0.78, 0.78]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.82, 0.88, 64]} />
          <meshStandardMaterial
            color="#1a1511"
            roughness={0.46}
            metalness={0.18}
            emissive="#0f0d0b"
            emissiveIntensity={0.18}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      </group>

      <group position={[0, 0.72, 0.06]} rotation={[0, Math.PI, 0]}>
        <DeskAttendant />
      </group>

      <mesh castShadow receiveShadow position={[1.02, 1.03, -0.38]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.56, 0.03, 0.34]} />
        <meshStandardMaterial color="#d6cfbf" roughness={0.96} metalness={0.02} envMapIntensity={0.08} />
      </mesh>

      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          args={[2.25, 1.2, 2.2]}
          position={[0, 1.1, -1.2]}
          sensor
          onIntersectionEnter={(payload) => {
            if (payload.other.rigidBodyObject?.name === "player") {
              setIsNearby(true);
            }
          }}
          onIntersectionExit={(payload) => {
            if (payload.other.rigidBodyObject?.name === "player") {
              setIsNearby(false);
            }
          }}
        />
        <CuboidCollider
          args={[0.92, 0.82, 0.92]}
          position={[0, 0.82, -2.1]}
          sensor
          onIntersectionEnter={(payload) => {
            if (payload.other.rigidBodyObject?.name === "player") {
              setIsNearby(false);
              setIsEnquiryOpen(true);
            }
          }}
        />
      </RigidBody>

      {isNearby && !isEnquiryOpen ? (
        <InteractionPrompt title="Step into the circle" subtitle="to enquire" />
      ) : null}
    </group>
  );
}
