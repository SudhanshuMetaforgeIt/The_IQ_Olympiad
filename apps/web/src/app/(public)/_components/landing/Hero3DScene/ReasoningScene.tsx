import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { HERO_SUBJECT_DETAILS } from "../HeroSubjectsData";

export function ReasoningScene() {
  const gearRef = useRef<Group>(null);
  const cubeRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (gearRef.current) gearRef.current.rotation.z += delta * 1.2;
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.9;
      cubeRef.current.rotation.y += delta * 1.1;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* 1. Floating Spinning Logic Gear (Left) */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8} position={[-1.7, 0.9, 0.2]}>
        <group ref={gearRef}>
          <mesh>
            <torusGeometry args={[0.32, 0.08, 16, 32]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.9} />
          </mesh>
        </group>
      </Float>

      {/* 2. Floating Rotating Puzzle Cube (Right) */}
      <Float speed={2} rotationIntensity={1.8} floatIntensity={1.5} position={[1.75, 1.0, -0.2]}>
        <group ref={cubeRef}>
          <mesh>
            <boxGeometry args={[0.38, 0.38, 0.38]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </Float>

      {/* 3. Floating Golden Diamond (Top Center-Right) */}
      <Float speed={2.8} rotationIntensity={1.4} floatIntensity={2} position={[1.2, 1.4, 0.1]}>
        <mesh scale={0.4} rotation={[0, 0.5, 0]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.9} />
        </mesh>
      </Float>
    </group>
  );
}
