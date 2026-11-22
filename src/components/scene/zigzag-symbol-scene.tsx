"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function ZigZagPolyline() {
  const group = useRef<Group>(null);
  const points = useMemo(
    () =>
      [
        [-2.4, -1.1, 0],
        [-1.2, 1.35, 0.15],
        [-0.15, -0.55, -0.1],
        [1.05, 1.55, 0.2],
        [2.4, -1.15, 0],
      ] as [number, number, number][],
    [],
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(Date.now() * 0.00035) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={group}>
        <Line
          points={points}
          color="#2EE6FF"
          lineWidth={2.5}
          transparent
          opacity={0.95}
        />
        {points.map((point, index) => (
          <mesh key={index} position={point}>
            <sphereGeometry args={[index % 2 === 0 ? 0.07 : 0.05, 16, 16]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#2EE6FF" : "#C9A84C"}
              emissive={index % 2 === 0 ? "#1AA8C4" : "#8A7030"}
              emissiveIntensity={0.65}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function ZigZagSymbolScene() {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <color attach="background" args={["#03050C"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} color="#9FDFFF" />
        <pointLight position={[-3, -2, 2]} intensity={0.55} color="#C9A84C" />
        <ZigZagPolyline />
      </Canvas>
    </div>
  );
}
