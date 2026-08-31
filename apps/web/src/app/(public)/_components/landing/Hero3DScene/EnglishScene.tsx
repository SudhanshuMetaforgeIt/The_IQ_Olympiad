import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { HERO_SUBJECT_DETAILS } from "../HeroSubjectsData";

export function EnglishScene() {
  const starRef = useRef<Group>(null);
  const quillRef = useRef<Group>(null);
  const letterRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (starRef.current) starRef.current.rotation.y += delta * 1.6;
    if (quillRef.current) quillRef.current.rotation.z += delta * 0.9;
    if (letterRef.current) {
      letterRef.current.rotation.x += delta * 0.8;
      letterRef.current.rotation.y += delta * 1.1;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* 1. Floating Book Stack (Top-Left) */}
      <Float speed={2.4} rotationIntensity={1.4} floatIntensity={1.8} position={[-1.75, 1.15, 0.2]}>
        <group scale={0.7} rotation={[0.3, 0.4, -0.2]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.7, 0.14, 0.5]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.65, 0.14, 0.48]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </Float>

      {/* 2. Floating Letter B 3D Mesh (Top-Right) */}
      <Float speed={2.8} rotationIntensity={1.6} floatIntensity={2.0} position={[1.45, 1.3, 0.3]}>
        <group ref={letterRef}>
          <mesh scale={0.4} rotation={[0, 0, 0.3]}>
            <torusGeometry args={[0.4, 0.12, 16, 32]} />
            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.9} />
          </mesh>
        </group>
      </Float>

      {/* 3. Floating Golden Star / Sparkle (Top-Center Right) */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8} position={[1.7, 0.7, 0.1]}>
        <group ref={starRef}>
          <mesh scale={0.4} rotation={[0, 0, 0.4]}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.9} />
          </mesh>
        </group>
      </Float>

      {/* 4. Floating Feather Quill (Middle-Right) */}
      <Float speed={1.9} rotationIntensity={1.2} floatIntensity={1.5} position={[1.8, -0.1, 0.4]}>
        <group ref={quillRef} scale={0.65} rotation={[0, 0, -0.5]}>
          <mesh position={[0, 0.4, 0]}>
            <coneGeometry args={[0.16, 0.95, 16]} />
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
