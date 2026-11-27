"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

const CANDLE_COUNT = 26;

function CinematicLights() {
  return (
    <>
      <color attach="background" args={["#02040A"]} />
      <fog attach="fog" args={["#02040A", 10, 24]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 7, 4]} intensity={1.15} color="#DCE7F5" />
      <spotLight
        position={[-2.5, 5.5, 3]}
        angle={0.55}
        penumbra={0.75}
        intensity={0.55}
        color="#E0C36A"
      />
      <pointLight position={[3.2, 0.8, -1.5]} intensity={0.45} color="#2EE6FF" />
      <pointLight position={[0, 2.2, 2]} intensity={0.18} color="#E0C36A" />
    </>
  );
}

type CandleSeed = {
  x: number;
  base: number;
  amp: number;
  phase: number;
  wickExtra: number;
};

function LivingCandles() {
  const group = useRef<Group>(null);
  const bodyRefs = useRef<(Mesh | null)[]>([]);
  const wickRefs = useRef<(Mesh | null)[]>([]);
  const matRefs = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);

  const seeds = useMemo<CandleSeed[]>(() => {
    const items: CandleSeed[] = [];
    for (let i = 0; i < CANDLE_COUNT; i += 1) {
      items.push({
        x: -3.9 + i * 0.3,
        base: 0.22 + (i % 5) * 0.05,
        amp: 0.12 + (i % 4) * 0.04,
        phase: i * 0.47,
        wickExtra: 0.14 + (i % 3) * 0.04,
      });
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.position.x = Math.sin(t * 0.07) * 0.12;
      group.current.position.y = -0.85 + Math.sin(t * 0.18) * 0.03;
    }

    for (let i = 0; i < seeds.length; i += 1) {
      const s = seeds[i]!;
      const wave =
        Math.sin(t * 0.55 + s.phase) * 0.55 +
        Math.sin(t * 0.23 + s.phase * 1.7) * 0.45;
      const body = Math.max(0.1, s.base + wave * s.amp);
      const up = wave >= -0.08;
      const wick = body + s.wickExtra;

      const bodyMesh = bodyRefs.current[i];
      const wickMesh = wickRefs.current[i];
      const mat = matRefs.current[i];
      if (bodyMesh) {
        bodyMesh.scale.y = body / 0.35;
        bodyMesh.position.y = up ? body * 0.12 : -body * 0.12;
      }
      if (wickMesh) {
        wickMesh.scale.y = wick / 0.5;
      }
      if (mat) {
        mat.color.set(up ? "#3DDC97" : "#F07178");
        mat.emissive.set(up ? "#1F8F5E" : "#8A3038");
        mat.emissiveIntensity = 0.22 + Math.abs(wave) * 0.12;
      }
    }
  });

  return (
    <group
      ref={group}
      position={[0.2, -1.15, -2.4]}
      rotation={[-0.38, 0.1, 0]}
    >
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[9.4, 3.4]} />
        <meshStandardMaterial
          color="#060B16"
          metalness={0.35}
          roughness={0.6}
          transparent
          opacity={0.78}
        />
      </mesh>
      <mesh position={[0, 0, -0.11]}>
        <planeGeometry args={[9.55, 3.55]} />
        <meshBasicMaterial
          color="#2EE6FF"
          transparent
          opacity={0.04}
          depthWrite={false}
        />
      </mesh>

      {seeds.map((s, i) => (
        <group key={i} position={[s.x, 0, 0]}>
          <mesh
            ref={(el) => {
              wickRefs.current[i] = el;
            }}
            position={[0, 0, 0.02]}
          >
            <boxGeometry args={[0.018, 0.5, 0.018]} />
            <meshStandardMaterial
              color="#8FA0B8"
              transparent
              opacity={0.55}
              roughness={0.5}
            />
          </mesh>
          <mesh
            ref={(el) => {
              bodyRefs.current[i] = el;
            }}
            position={[0, 0, 0.04]}
          >
            <boxGeometry args={[0.15, 0.35, 0.07]} />
            <meshPhysicalMaterial
              ref={(el) => {
                matRefs.current[i] = el;
              }}
              color="#3DDC97"
              emissive="#1F8F5E"
              emissiveIntensity={0.25}
              metalness={0.3}
              roughness={0.32}
              transparent
              opacity={0.82}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function BuildingZigzag() {
  const group = useRef<Group>(null);
  const pivotRefs = useRef<(Mesh | null)[]>([]);
  const corePositions = useMemo(() => new Float32Array(7 * 3), []);
  const glowPositions = useMemo(() => new Float32Array(7 * 3), []);
  // R3F bufferGeometry ref typing differs from three's BufferGeometry generics
  const coreGeo = useRef<{ getAttribute: (n: string) => THREE.BufferAttribute | undefined; computeBoundingSphere: () => void } | null>(null);
  const glowGeo = useRef<{ getAttribute: (n: string) => THREE.BufferAttribute | undefined } | null>(null);

  const basePivots = useMemo(
    () =>
      [
        [-2.9, -0.95, 0.25],
        [-1.85, 0.75, 0.38],
        [-0.7, -0.45, 0.18],
        [0.35, 1.0, 0.42],
        [1.4, -0.65, 0.2],
        [2.35, 0.55, 0.34],
        [3.15, -0.25, 0.22],
      ] as [number, number, number][],
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const reveal = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.22));

    for (let i = 0; i < basePivots.length; i += 1) {
      const [x, y, z] = basePivots[i]!;
      const breath = Math.sin(t * 0.35 + i * 0.9) * 0.08;
      const drift = Math.sin(t * 0.12 + i * 0.4) * 0.04;
      const gate = Math.min(1, Math.max(0, reveal * basePivots.length - i));
      const py = y * gate + breath * gate;
      const px = x + drift;

      const o = i * 3;
      corePositions[o] = px;
      corePositions[o + 1] = py;
      corePositions[o + 2] = z;
      glowPositions[o] = px;
      glowPositions[o + 1] = py;
      glowPositions[o + 2] = z;

      const mesh = pivotRefs.current[i];
      if (mesh) {
        mesh.position.set(px, py, z);
        mesh.visible = gate > 0.08;
        const pulse = 0.75 + Math.sin(t * 1.05 + i) * 0.2;
        mesh.scale.setScalar(pulse * Math.max(0.35, gate));
      }
    }

    const coreAttr = coreGeo.current?.getAttribute("position");
    const glowAttr = glowGeo.current?.getAttribute("position");
    if (coreAttr) {
      coreAttr.needsUpdate = true;
      coreGeo.current?.computeBoundingSphere();
    }
    if (glowAttr) {
      glowAttr.needsUpdate = true;
    }

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.08) * 0.03;
      group.current.position.y = 0.32 + Math.sin(t * 0.2) * 0.025;
    }
  });

  return (
    <group ref={group} position={[0, 0.32, 0.35]}>
      <line>
        <bufferGeometry
          ref={(g) => {
            glowGeo.current = g as typeof glowGeo.current;
            if (g) {
              g.setAttribute(
                "position",
                new THREE.BufferAttribute(glowPositions, 3),
              );
            }
          }}
        />
        <lineBasicMaterial
          color="#C9A84C"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </line>
      <line>
        <bufferGeometry
          ref={(g) => {
            coreGeo.current = g as typeof coreGeo.current;
            if (g) {
              g.setAttribute(
                "position",
                new THREE.BufferAttribute(corePositions, 3),
              );
            }
          }}
        />
        <lineBasicMaterial
          color="#E0C36A"
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </line>
      {basePivots.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pivotRefs.current[i] = el;
          }}
          position={p}
        >
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial
            color="#E0C36A"
            emissive="#C9A84C"
            emissiveIntensity={1.05}
            metalness={0.65}
            roughness={0.18}
          />
        </mesh>
      ))}
    </group>
  );
}

function SoftDepthPlate() {
  return (
    <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[5.5, 40]} />
      <meshStandardMaterial
        color="#02040A"
        transparent
        opacity={0.45}
        metalness={0.15}
        roughness={0.92}
      />
    </mesh>
  );
}

function CoverMarketScene() {
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.07) * 0.28;
    camera.position.y = 0.42 + Math.sin(t * 0.11) * 0.06;
    camera.lookAt(0, 0.08, 0);
  });

  return (
    <group>
      <CinematicLights />
      <LivingCandles />
      <BuildingZigzag />
      <SoftDepthPlate />
    </group>
  );
}

export default function CoverMarket3D() {
  return (
    <div className="h-full w-full" data-webgl-scene="cover-market">
      <Canvas
        dpr={[1, 1.35]}
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
