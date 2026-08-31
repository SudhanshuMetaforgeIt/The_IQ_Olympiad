// @ts-nocheck
"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Group, MathUtils } from "three";

export function MathematicsScene() {
  const mainGroupRef = useRef<Group>(null);

  useFrame(({ pointer }, delta) => {
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = MathUtils.damp(mainGroupRef.current.rotation.y, pointer.x * 0.7, 5, delta);
      mainGroupRef.current.rotation.x = MathUtils.damp(mainGroupRef.current.rotation.x, -pointer.y * 0.3, 5, delta);
    }
  });

  return (
    <group ref={mainGroupRef} position={[0, -0.1, 0]}>


      {/* Floating Pencil (Top-Right) */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5} position={[1.75, 0.75, -0.2]}>
        <group scale={0.65} rotation={[0, 0, -0.45]}>
          <mesh position={[0, 0.55, 0]}>
            <coneGeometry args={[0.3, 0.6, 16]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.8, 16]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <torusGeometry args={[0.32, 0.05, 12, 24]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        </group>
      </Float>

      {/* Floating Books Stack (Bottom-Right) */}
      <Float speed={1.8} floatIntensity={1.2} position={[1.65, -0.35, 0.5]}>
        <group scale={0.88}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.72, 0.14, 0.5]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.66, 0.14, 0.48]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.6, 0.14, 0.45]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
        </group>
      </Float>

      {/* Floating Icosahedron (Top-Left) */}
      <Float speed={2.5} floatIntensity={2} position={[-1.15, 1.45, -0.4]}>
        <mesh>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      {/* Floating Pink Cube (Bottom-Left) */}
      <Float speed={3} floatIntensity={1.8} position={[-1.75, -0.2, 0.7]}>
        <mesh>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshStandardMaterial color="#ec4899" />
        </mesh>
      </Float>
    </group>
  );
}
