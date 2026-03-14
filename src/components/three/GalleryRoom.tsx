"use client";

import { CuboidCollider, RigidBody } from "@react-three/rapier";
import PartitionWall from "@/components/three/PartitionWall";

type WallSpec = {
  key: string;
  position: [number, number, number];
  size: [number, number, number];
};

type RailSpec = {
  key: string;
  position: [number, number, number];
  length: number;
  rotation?: [number, number, number];
};

type SkirtingSpec = {
  key: string;
  position: [number, number, number];
  width: number;
  rotation?: [number, number, number];
};

const perimeterWalls: WallSpec[] = [
  { key: "left-wall", position: [-15, 2, 0], size: [0.3, 4, 50] },
  { key: "right-wall", position: [15, 2, 0], size: [0.3, 4, 50] },
  { key: "back-wall", position: [0, 2, -25], size: [30, 4, 0.3] },
  { key: "front-left-wing", position: [-10.5, 2, 25], size: [9, 4, 0.3] },
  { key: "front-right-wing", position: [10.5, 2, 25], size: [9, 4, 0.3] },
];

const partitions: WallSpec[] = [
  { key: "center-partition", position: [0, 1.75, -2], size: [0.2, 3.5, 12] },
  { key: "short-partition", position: [7, 1.75, -11], size: [8, 3.5, 0.2] },
];

const railSegments: RailSpec[] = [
  // Side rails shortened to meet rail-back (z=-23.7) and rail-front (z=23.7) without overlapping
  { key: "rail-left", position: [-13.7, 0, 0], length: 47.4, rotation: [0, Math.PI / 2, 0] },
  { key: "rail-right", position: [13.7, 0, 0], length: 47.4, rotation: [0, Math.PI / 2, 0] },
  { key: "rail-back", position: [0, 0, -23.7], length: 27.4 },
  // Front rails shortened to meet side rails at x=±13.7 without overlapping
  { key: "rail-front-left", position: [-10, 0, 23.7], length: 7.4 },
  { key: "rail-front-right", position: [10, 0, 23.7], length: 7.4 },
  { key: "rail-center-partition-left", position: [-1.05, 0, -2], length: 11, rotation: [0, Math.PI / 2, 0] },
  { key: "rail-center-partition-right", position: [1.05, 0, -2], length: 11, rotation: [0, Math.PI / 2, 0] },
  { key: "rail-short-partition-front", position: [7, 0, -9.95], length: 7 },
  { key: "rail-short-partition-back", position: [7, 0, -12.05], length: 7 },
];

const RAIL_POST_SPACING = 2.2;
const RAIL_POST_HEIGHT = 0.7;
const RAIL_POST_Y = 0.35;
const RAIL_BAR_Y = 0.66;
const RAIL_COLLIDER_Y = 0.42;
const RAIL_COLLIDER_DEPTH = 0.08;
const ENTRANCE_Z = 24.82;

const wallMaterial = {
  color: "#f2efe8",
  roughness: 0.95,
  metalness: 0,
  envMapIntensity: 0.05,
};

const accentWallMaterial = {
  color: "#2a2825",
  roughness: 0.88,
  metalness: 0,
  envMapIntensity: 0.15,
};

const skirtingSpecs: SkirtingSpec[] = [
  { key: "skirting-left-wall", position: [-14.84, 0.05, 0], width: 50, rotation: [0, Math.PI / 2, 0] },
  { key: "skirting-right-wall", position: [14.84, 0.05, 0], width: 50, rotation: [0, Math.PI / 2, 0] },
  { key: "skirting-back-wall", position: [0, 0.05, -24.84], width: 30 },
  { key: "skirting-front-left-wing", position: [-10.5, 0.05, 24.84], width: 9 },
  { key: "skirting-front-right-wing", position: [10.5, 0.05, 24.84], width: 9 },
];

function Skirting({ position, width, rotation = [0, 0, 0] }: Omit<SkirtingSpec, "key">) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <boxGeometry args={[width, 0.1, 0.02]} />
      <meshStandardMaterial
        color="#d5d0c6"
        roughness={0.7}
        metalness={0}
        envMapIntensity={0.1}
      />
    </mesh>
  );
}

export default function GalleryRoom() {
  return (
    <group>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[15, 0.1, 25]} position={[0, -0.1, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 50]} />
          <meshStandardMaterial
            color="#c8c2b8"
            roughness={0.12}
            metalness={0.02}
            envMapIntensity={1}
          />
        </mesh>
      </RigidBody>

      <mesh position={[0, 4.03, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 50]} />
        <meshStandardMaterial
          color="#f5f2ec"
          roughness={0.98}
          metalness={0}
          envMapIntensity={0}
        />
      </mesh>

      {[
        { key: "ceiling-channel-1", x: -3.6 },
        { key: "ceiling-channel-2", x: 0 },
        { key: "ceiling-channel-3", x: 3.6 },
      ].map((channel) => (
        <mesh
          key={channel.key}
          position={[channel.x, 3.985, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.08, 0.03, 44]} />
          <meshStandardMaterial
            color="#e8e5df"
            roughness={0.95}
            metalness={0}
            envMapIntensity={0}
          />
        </mesh>
      ))}

      {perimeterWalls.map((wall) => (
        <RigidBody key={wall.key} type="fixed">
          <mesh position={wall.position} castShadow receiveShadow>
            <boxGeometry args={wall.size} />
            <meshStandardMaterial {...(wall.key === "back-wall" ? accentWallMaterial : wallMaterial)} />
          </mesh>
        </RigidBody>
      ))}

      {skirtingSpecs.map((skirting) => (
        <Skirting
          key={skirting.key}
          position={skirting.position}
          width={skirting.width}
          rotation={skirting.rotation}
        />
      ))}

      {partitions.map((wall) => (
        <PartitionWall
          key={wall.key}
          position={wall.position}
          width={wall.size[0]}
          height={wall.size[1]}
          depth={wall.size[2]}
        />
      ))}

      {railSegments.map((segment) => {
        const postCount = Math.max(2, Math.floor(segment.length / RAIL_POST_SPACING) + 1);
        const spacing = segment.length / (postCount - 1);

        return (
          <group
            key={segment.key}
            position={segment.position}
            rotation={segment.rotation ?? [0, 0, 0]}
          >
            <RigidBody type="fixed" colliders={false}>
              <CuboidCollider
                args={[segment.length / 2, 0.38, RAIL_COLLIDER_DEPTH]}
                position={[0, RAIL_COLLIDER_Y, 0]}
              />
            </RigidBody>

            <mesh
              castShadow
              receiveShadow
              position={[0, RAIL_BAR_Y, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.028, 0.028, segment.length, 20]} />
              <meshStandardMaterial
                color="#1c1c1c"
                roughness={0.25}
                metalness={0.85}
                envMapIntensity={1.2}
              />
            </mesh>

            {Array.from({ length: postCount }, (_, index) => {
              const x = -segment.length / 2 + spacing * index;

              return (
                <mesh
                  key={`${segment.key}-post-${index}`}
                  castShadow
                  receiveShadow
                  position={[x, RAIL_POST_Y, 0]}
                >
                  <cylinderGeometry args={[0.04, 0.05, RAIL_POST_HEIGHT, 18]} />
                  <meshStandardMaterial
                    color="#1c1c1c"
                    roughness={0.25}
                    metalness={0.85}
                    envMapIntensity={1.2}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}

      <group position={[0, 0, ENTRANCE_Z]}>
        <mesh castShadow receiveShadow position={[0, 2.05, -0.12]}>
          <boxGeometry args={[4.8, 4.1, 0.16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.38} metalness={0.82} envMapIntensity={0.9} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, 2.05, -0.06]}>
          <boxGeometry args={[4.2, 3.7, 0.08]} />
          <meshStandardMaterial color="#151515" roughness={0.28} metalness={0.84} envMapIntensity={1} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, 2.05, 0]}>
          <boxGeometry args={[3.36, 3.42, 0.08]} />
          <meshStandardMaterial color="#141413" roughness={0.22} metalness={0.9} envMapIntensity={1.1} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, 2.05, 0.045]}>
          <boxGeometry args={[3.08, 3.14, 0.04]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.18} metalness={0.94} envMapIntensity={1.1} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, 3.67, 0.05]}>
          <boxGeometry args={[3.44, 0.2, 0.08]} />
          <meshStandardMaterial color="#171717" roughness={0.2} metalness={0.92} envMapIntensity={1.1} />
        </mesh>

        <mesh castShadow receiveShadow position={[-1.65, 2.05, 0.05]}>
          <boxGeometry args={[0.18, 3.46, 0.08]} />
          <meshStandardMaterial color="#171717" roughness={0.2} metalness={0.92} envMapIntensity={1.1} />
        </mesh>

        <mesh castShadow receiveShadow position={[1.65, 2.05, 0.05]}>
          <boxGeometry args={[0.18, 3.46, 0.08]} />
          <meshStandardMaterial color="#171717" roughness={0.2} metalness={0.92} envMapIntensity={1.1} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, 2.05, 0.075]}>
          <boxGeometry args={[0.08, 3.24, 0.03]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.18} metalness={0.96} envMapIntensity={1.2} />
        </mesh>

        <mesh castShadow receiveShadow position={[-0.78, 2.05, 0.07]}>
          <boxGeometry args={[1.26, 3.02, 0.02]} />
          <meshStandardMaterial color="#2a2a27" roughness={0.12} metalness={0.08} envMapIntensity={0.35} />
        </mesh>

        <mesh castShadow receiveShadow position={[0.78, 2.05, 0.07]}>
          <boxGeometry args={[1.26, 3.02, 0.02]} />
          <meshStandardMaterial color="#2a2a27" roughness={0.12} metalness={0.08} envMapIntensity={0.35} />
        </mesh>

        <mesh castShadow receiveShadow position={[1.42, 2.05, 0.12]}>
          <cylinderGeometry args={[0.045, 0.045, 0.82, 20]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.2} metalness={0.92} envMapIntensity={1.2} />
        </mesh>
      </group>

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.4, 2, 64]} />
        <meshStandardMaterial color="#8a6d4e" roughness={0.6} metalness={0} envMapIntensity={0.2} />
      </mesh>
    </group>
  );
}
