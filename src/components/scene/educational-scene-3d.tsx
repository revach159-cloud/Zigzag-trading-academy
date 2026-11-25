"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import type { SceneKind } from "./scene-kinds";

function ZigzagMesh() {
  const group = useRef<Group>(null);
  const points = useMemo(
    () =>
      [
        [-2.2, -0.9, 0],
        [-1.1, 1.1, 0.1],
        [0, -0.4, -0.05],
        [1.1, 1.2, 0.12],
        [2.2, -0.85, 0],
      ] as [number, number, number][],
    [],
  );
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.2;
  });
  return (
    <Float speed={1.1} floatIntensity={0.3}>
      <group ref={group}>
        {points.map((point, index) => {
          const next = points[index + 1];
          return (
            <mesh key={index} position={point}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial
                color={index % 2 ? "#C9A84C" : "#2EE6FF"}
                emissive={index % 2 ? "#8A7030" : "#1AA8C4"}
                emissiveIntensity={0.55}
              />
              {next ? (
                <mesh
                  position={[
                    (next[0] - point[0]) / 2,
                    (next[1] - point[1]) / 2,
                    (next[2] - point[2]) / 2,
                  ]}
                >
                  <boxGeometry
                    args={[
                      Math.hypot(next[0] - point[0], next[1] - point[1]) || 0.2,
                      0.03,
                      0.03,
                    ]}
                  />
                  <meshStandardMaterial color="#2EE6FF" transparent opacity={0.7} />
                </mesh>
              ) : null}
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

function TrafficLightMesh() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.25;
  });
  const lamps: [number, string][] = [
    [0.7, "#3DDC97"],
    [0, "#F5C542"],
    [-0.7, "#F07178"],
  ];
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.7, 2.2, 0.4]} />
        <meshStandardMaterial color="#101A2E" metalness={0.4} roughness={0.35} />
      </mesh>
      {lamps.map(([y, color]) => (
        <mesh key={color} position={[0, y, 0.28]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function ImprovementStack() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.15;
  });
  const layers = [
    { y: -0.6, w: 1.8, color: "#1AA8C4" },
    { y: 0, w: 1.3, color: "#2EE6FF" },
    { y: 0.55, w: 0.85, color: "#C9A84C" },
  ];
  return (
    <group ref={ref}>
      {layers.map((layer) => (
        <mesh key={layer.color} position={[0, layer.y, 0]}>
          <boxGeometry args={[layer.w, 0.35, 0.9]} />
          <meshStandardMaterial
            color={layer.color}
            transparent
            opacity={0.85}
            emissive={layer.color}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function Realize75Mesh() {
  const big = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!big.current) return;
    big.current.scale.y = 0.85 + Math.sin(clock.elapsedTime) * 0.05;
  });
  return (
    <group>
      <mesh ref={big} position={[-0.35, 0, 0]}>
        <boxGeometry args={[1.8, 1.4, 0.5]} />
        <meshStandardMaterial color="#2EE6FF" transparent opacity={0.55} />
      </mesh>
      <mesh position={[1.1, -0.35, 0]}>
        <boxGeometry args={[0.6, 0.7, 0.5]} />
        <meshStandardMaterial color="#C9A84C" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function ReturnBalanceMesh() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08;
  });
  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, -0.4]}>
        <torusGeometry args={[1.2, 0.05, 8, 64, Math.PI * 1.2]} />
        <meshStandardMaterial color="#2EE6FF" emissive="#1AA8C4" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.05, -0.35, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#C9A84C" emissive="#8A7030" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function CoverMark() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.25;
  });
  return (
    <Float speed={0.9} floatIntensity={0.25}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#0B1528"
            metalness={0.6}
            roughness={0.25}
            emissive="#1AA8C4"
            emissiveIntensity={0.2}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

function SceneBody({ kind }: { kind: Exclude<SceneKind, "none"> }) {
  switch (kind) {
    case "cover":
      return <CoverMark />;
    case "traffic-light":
      return <TrafficLightMesh />;
    case "improvement":
      return <ImprovementStack />;
    case "realize-75":
      return <Realize75Mesh />;
    case "return-balance":
      return <ReturnBalanceMesh />;
    case "zigzag":
    default:
      return <ZigzagMesh />;
  }
}

export default function EducationalScene3D({
  kind,
}: {
  kind: Exclude<SceneKind, "none">;
}) {
  return (
    <div className="h-full w-full">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0.15, 4.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <color attach="background" args={["#03050C"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 5, 3]} intensity={1} color="#9FDFFF" />
        <pointLight position={[-3, -1, 2]} intensity={0.45} color="#C9A84C" />
        <SceneBody kind={kind} />
      </Canvas>
    </div>
  );
}
