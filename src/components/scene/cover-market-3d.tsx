"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function CinematicLights() {
  return (
    <>
      <color attach="background" args={["#02040A"]} />
      <fog attach="fog" args={["#02040A", 8, 22]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 7, 4]} intensity={1.35} color="#DCE7F5" />
      <spotLight
        position={[-2, 6, 3]}
        angle={0.5}
        penumbra={0.7}
        intensity={0.7}
        color="#E0C36A"
      />
      <pointLight position={[3, 1, -2]} intensity={0.55} color="#2EE6FF" />
      <pointLight position={[-4, -1, 1]} intensity={0.35} color="#3DDC97" />
      <Stars radius={50} depth={36} count={700} factor={2} saturation={0} fade speed={0.2} />
    </>
  );
}

function CandlestickPlane() {
  const group = useRef<Group>(null);
  const candles = useMemo(() => {
    const items: {
      x: number;
      body: number;
      wick: number;
      up: boolean;
    }[] = [];
    let price = 0;
    for (let i = 0; i < 28; i += 1) {
      const delta = Math.sin(i * 0.55) * 0.35 + (i % 5 === 0 ? -0.55 : 0.18);
      const body = Math.max(0.12, Math.abs(delta));
      items.push({
        x: -4.2 + i * 0.3,
        body,
        wick: body + 0.18 + (i % 3) * 0.05,
        up: delta >= 0,
      });
      price += delta;
    }
    void price;
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.25) * 0.04;
  });

  return (
    <group ref={group} position={[0.4, -0.9, -2.2]} rotation={[-0.35, 0.15, 0]}>
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[9.2, 3.2]} />
        <meshStandardMaterial
          color="#070B16"
          metalness={0.4}
          roughness={0.55}
          transparent
          opacity={0.72}
        />
      </mesh>
      {candles.map((c, i) => (
        <group key={i} position={[c.x, 0, 0]}>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.02, c.wick, 0.02]} />
            <meshStandardMaterial
              color={c.up ? "#3DDC97" : "#F07178"}
              emissive={c.up ? "#1A8A5C" : "#8A3038"}
              emissiveIntensity={0.35}
            />
          </mesh>
          <mesh position={[0, c.up ? c.body * 0.15 : -c.body * 0.15, 0.04]}>
            <boxGeometry args={[0.16, c.body, 0.08]} />
            <meshPhysicalMaterial
              color={c.up ? "#3DDC97" : "#F07178"}
              emissive={c.up ? "#3DDC97" : "#F07178"}
              emissiveIntensity={0.25}
              metalness={0.35}
              roughness={0.3}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function GoldZigzag() {
  const ref = useRef<Group>(null);
  const points = useMemo(
    () =>
      [
        [-2.8, -0.9, 0.2],
        [-1.6, 0.85, 0.35],
        [-0.5, -0.35, 0.1],
        [0.7, 1.05, 0.4],
        [1.9, -0.55, 0.15],
        [3.0, 0.7, 0.3],
      ] as [number, number, number][],
    [],
  );
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
  });
  return (
    <group ref={ref} position={[0, 0.35, 0.4]}>
      <Line
        points={points}
        color="#E0C36A"
        lineWidth={3.2}
        transparent
        opacity={0.95}
      />
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#E0C36A"
            emissive="#C9A84C"
            emissiveIntensity={0.9}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function DollarNote({
  position,
  rotation,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.4 * speed + position[0]) * 0.12;
    ref.current.rotation.z =
      rotation[2] + Math.sin(clock.elapsedTime * 0.25 * speed) * 0.08;
  });
  return (
    <Float speed={0.6 * speed} floatIntensity={0.15} rotationIntensity={0.05}>
      <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[0.85, 0.42]} />
        <meshPhysicalMaterial
          color="#1A6B45"
          emissive="#0D3D28"
          emissiveIntensity={0.25}
          metalness={0.55}
          roughness={0.35}
          transparent
          opacity={0.78}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[position[0], position[1], position[2] + 0.01]} rotation={rotation} scale={scale * 0.35}>
        <circleGeometry args={[0.12, 24]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#8A7030"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function DollarField() {
  return (
    <group>
      <DollarNote position={[-2.4, 1.1, 1.2]} rotation={[-0.2, 0.4, 0.3]} scale={0.9} speed={0.85} />
      <DollarNote position={[2.2, 0.6, 1.5]} rotation={[0.15, -0.35, -0.25]} scale={1.05} speed={1.1} />
      <DollarNote position={[0.3, 1.6, 0.8]} rotation={[-0.1, 0.2, 0.15]} scale={0.7} speed={0.7} />
      <DollarNote position={[-1.2, -0.2, 1.8]} rotation={[0.25, 0.5, -0.1]} scale={0.55} speed={1.25} />
    </group>
  );
}

function CoverMarketScene() {
  const camPivot = useRef<Group>(null);
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.08) * 0.35;
    camera.position.y = 0.4 + Math.sin(t * 0.12) * 0.08;
    camera.lookAt(0, 0.1, 0);
    if (camPivot.current) {
      camPivot.current.rotation.y = Math.sin(t * 0.06) * 0.04;
    }
  });
  return (
    <group ref={camPivot}>
      <CinematicLights />
      <CandlestickPlane />
      <GoldZigzag />
      <DollarField />
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 48]} />
        <meshStandardMaterial
          color="#02040A"
          transparent
          opacity={0.5}
          metalness={0.2}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

export default function CoverMarket3D() {
  return (
    <div className="h-full w-full" data-webgl-scene="cover-market">
      <Canvas
        dpr={[1, 1.4]}
        camera={{ position: [0, 0.45, 6.2], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <CoverMarketScene />
      </Canvas>
    </div>
  );
}
