"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Line, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import type { SceneKind } from "./scene-kinds";

function SceneAtmosphere() {
  return (
    <>
      <color attach="background" args={["#03050C"]} />
      <fog attach="fog" args={["#03050C", 6.5, 14]} />
      <ambientLight intensity={0.32} />
      <directionalLight
        position={[4.5, 6.2, 3.2]}
        intensity={1.55}
        color="#C8F2FF"
        castShadow={false}
      />
      <spotLight
        position={[0, 5, 2]}
        angle={0.55}
        penumbra={0.6}
        intensity={0.55}
        color="#7AF0FF"
      />
      <pointLight position={[-3.2, -0.5, 2.4]} intensity={0.85} color="#C9A84C" />
      <pointLight position={[2.5, 2.2, -2]} intensity={0.42} color="#2EE6FF" />
      <Stars
        radius={40}
        depth={28}
        count={900}
        factor={2.2}
        saturation={0}
        fade
        speed={0.35}
      />
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.45}
        scale={12}
        blur={2.6}
        far={4}
        color="#000000"
      />
    </>
  );
}

function ZigzagMesh() {
  const group = useRef<Group>(null);
  const points = useMemo(
    () =>
      [
        [-2.3, -1.0, 0],
        [-1.15, 1.15, 0.18],
        [-0.05, -0.45, -0.08],
        [1.15, 1.25, 0.16],
        [2.3, -0.95, 0],
      ] as [number, number, number][],
    [],
  );
  /** Ghost straight path — what chasing looks like vs zigzag market motion */
  const chaseLine = useMemo(
    () =>
      [
        [-2.3, 0.05, -0.35],
        [2.3, 0.05, -0.35],
      ] as [number, number, number][],
    [],
  );
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.08;
  });
  return (
    <Float speed={1} floatIntensity={0.28} rotationIntensity={0.08}>
      <group ref={group} position={[0, 0.1, 0]}>
        <Line
          points={chaseLine}
          color="#8FA0B8"
          lineWidth={1.2}
          transparent
          opacity={0.28}
          dashed
          dashSize={0.12}
          gapSize={0.1}
        />
        <Line
          points={points}
          color="#2EE6FF"
          lineWidth={2.8}
          transparent
          opacity={0.95}
        />
        {points.map((point, index) => (
          <mesh key={index} position={point}>
            <sphereGeometry args={[index % 2 === 0 ? 0.09 : 0.065, 20, 20]} />
            <meshStandardMaterial
              color={index % 2 ? "#C9A84C" : "#2EE6FF"}
              emissive={index % 2 ? "#8A7030" : "#1AA8C4"}
              emissiveIntensity={0.75}
              metalness={0.55}
              roughness={0.25}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function TrafficLightMesh() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.3;
  });
  const lamps: { y: number; color: string; intensity: number }[] = [
    { y: 0.72, color: "#3DDC97", intensity: 1.1 },
    { y: 0, color: "#F5C542", intensity: 0.95 },
    { y: -0.72, color: "#F07178", intensity: 0.9 },
  ];
  return (
    <group ref={ref} position={[0, 0.05, 0]}>
      <mesh>
        <boxGeometry args={[0.85, 2.45, 0.48]} />
        <meshStandardMaterial
          color="#0B1528"
          metalness={0.72}
          roughness={0.22}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh position={[0, 0, -0.28]}>
        <boxGeometry args={[0.2, 2.8, 0.2]} />
        <meshStandardMaterial color="#070B16" metalness={0.5} roughness={0.4} />
      </mesh>
      {lamps.map((lamp) => (
        <group key={lamp.color} position={[0, lamp.y, 0.28]}>
          <mesh>
            <sphereGeometry args={[0.24, 24, 24]} />
            <meshStandardMaterial
              color={lamp.color}
              emissive={lamp.color}
              emissiveIntensity={lamp.intensity}
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>
          <pointLight
            color={lamp.color}
            intensity={0.55}
            distance={3.5}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}

function ImprovementStack() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.14;
  });
  /** Layered reinforcement — base exposure → developed position → refined core */
  const layers = [
    { y: -0.7, w: 2.1, d: 1.15, color: "#0E6F86", emissive: "#1AA8C4" },
    { y: -0.15, w: 1.55, d: 1.0, color: "#2EE6FF", emissive: "#1AA8C4" },
    { y: 0.4, w: 1.05, d: 0.85, color: "#C9A84C", emissive: "#8A7030" },
  ];
  return (
    <group ref={ref}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.55, 12]} />
        <meshStandardMaterial
          color="#2EE6FF"
          emissive="#1AA8C4"
          emissiveIntensity={0.35}
          transparent
          opacity={0.55}
        />
      </mesh>
      {layers.map((layer) => (
        <mesh key={layer.color} position={[0, layer.y, 0]} castShadow={false}>
          <boxGeometry args={[layer.w, 0.42, layer.d]} />
          <meshPhysicalMaterial
            color={layer.color}
            emissive={layer.emissive}
            emissiveIntensity={0.28}
            metalness={0.45}
            roughness={0.28}
            transmission={0.08}
            thickness={0.4}
            transparent
            opacity={0.92}
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
    big.current.scale.y = 0.92 + Math.sin(clock.elapsedTime * 0.9) * 0.05;
  });
  /** 75% closed (cyan mass) vs 25% remaining (gold) — clear quantity split */
  return (
    <group position={[0, -0.1, 0]}>
      <mesh ref={big} position={[-0.55, 0.2, 0]}>
        <boxGeometry args={[2.25, 1.6, 0.55]} />
        <meshPhysicalMaterial
          color="#2EE6FF"
          emissive="#1AA8C4"
          emissiveIntensity={0.35}
          metalness={0.4}
          roughness={0.2}
          transparent
          opacity={0.72}
          transmission={0.12}
        />
      </mesh>
      <mesh position={[1.25, -0.35, 0]}>
        <boxGeometry args={[0.72, 0.72, 0.55]} />
        <meshPhysicalMaterial
          color="#C9A84C"
          emissive="#8A7030"
          emissiveIntensity={0.45}
          metalness={0.5}
          roughness={0.25}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh position={[0.7, 0.05, 0.32]}>
        <boxGeometry args={[0.04, 1.35, 0.04]} />
        <meshStandardMaterial
          color="#E8EEF8"
          emissive="#E8EEF8"
          emissiveIntensity={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}

function ReturnBalanceMesh() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.75) * 0.1;
    ref.current.rotation.z = -0.35 + Math.sin(clock.elapsedTime * 0.4) * 0.05;
  });
  /** Arc home to ×1 — quiet single-unit scale at the center */
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.045, 12, 96, Math.PI * 1.35]} />
        <meshStandardMaterial
          color="#2EE6FF"
          emissive="#1AA8C4"
          emissiveIntensity={0.65}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshPhysicalMaterial
          color="#2EE6FF"
          emissive="#1AA8C4"
          emissiveIntensity={0.4}
          metalness={0.45}
          roughness={0.22}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[1.15, -0.55, 0.15]}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.85}
          metalness={0.45}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function CoverMark() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.22;
    ref.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.12;
  });
  return (
    <Float speed={0.85} floatIntensity={0.3} rotationIntensity={0.12}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[1.25, 0]} />
          <meshStandardMaterial
            color="#0B1528"
            metalness={0.75}
            roughness={0.18}
            emissive="#1AA8C4"
            emissiveIntensity={0.22}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshPhysicalMaterial
            color="#C9A84C"
            emissive="#C9A84C"
            emissiveIntensity={0.4}
            metalness={0.55}
            roughness={0.2}
            transmission={0.15}
            thickness={0.5}
          />
        </mesh>
        <mesh rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[1.55, 0.015, 8, 80]} />
          <meshStandardMaterial
            color="#2EE6FF"
            emissive="#2EE6FF"
            emissiveIntensity={0.45}
            transparent
            opacity={0.7}
          />
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
    <div className="h-full w-full" data-webgl-scene={kind}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.35, 5.0], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <SceneAtmosphere />
        <SceneBody kind={kind} />
      </Canvas>
    </div>
  );
}
