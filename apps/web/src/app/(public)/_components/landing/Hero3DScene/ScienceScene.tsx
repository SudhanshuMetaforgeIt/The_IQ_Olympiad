// @ts-nocheck
"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";

export function ScienceScene() {
  const atomGroupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (atomGroupRef.current) {
      atomGroupRef.current.rotation.y += delta * 1.5;
      atomGroupRef.current.rotation.z += delta * 0.9;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>


      {/* 1. Orbiting Atom Model (Top-Left) */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8} position={[-1.25, 1.35, 0]}>
        <group ref={atomGroupRef} scale={0.7}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[0.08, 0.08, 0.05]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.9} />
          </mesh>
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[0.55, 0.022, 16, 64]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 3, 0]}>
            <torusGeometry args={[0.55, 0.022, 16, 64]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
          </mesh>
          <mesh rotation={[-Math.PI / 3, Math.PI / 3, 0]}>
            <torusGeometry args={[0.55, 0.022, 16, 64]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
          </mesh>
        </group>
      </Float>

      {/* 2. Molecule Model (Middle-Left) */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5} position={[-1.85, 0.35, 0.4]}>
        <group scale={0.6} rotation={[0.4, 0.5, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[-0.38, 0.38, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0.38, -0.38, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[-0.38, -0.38, 0.2]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.7} />
          </mesh>
        </group>
      </Float>

      {/* 3. Glowing Lightbulb (Top-Right) */}
      <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.6} position={[1.4, 1.25, 0]}>
        <group scale={0.65} rotation={[0, 0, 0.2]}>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={1.2} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, -0.16, 0]}>
            <cylinderGeometry args={[0.13, 0.09, 0.18, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
        </group>
      </Float>

      {/* 4. Saturn Planet with Ring (Middle-Right) */}
      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.4} position={[1.65, 0.25, 0.3]}>
        <group scale={0.7} rotation={[0.4, 0, 0.3]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.045, 16, 64]} />
            <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={1} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
