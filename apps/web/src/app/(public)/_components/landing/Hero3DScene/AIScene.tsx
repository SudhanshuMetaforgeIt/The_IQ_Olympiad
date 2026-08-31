import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";

export function AIScene() {
  const ringRef = useRef<Group>(null);
  const coreRef = useRef<Group>(null);
  const neuronGroupRef = useRef<Group>(null);

  // Generate neural network nodes
  const nodes = useMemo(() => [
    [-1.8, 1.2, -0.4],
    [-1.1, 1.5, -0.2],
    [-0.5, 1.1, -0.6],
    [0.5, 1.3, -0.5],
    [1.2, 1.6, -0.3],
    [1.8, 1.1, -0.4],
    [-1.4, 0.4, -0.5],
    [1.5, 0.5, -0.4],
  ], []);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 1.4;
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.8;
      coreRef.current.rotation.y += delta * 1.2;
    }
    if (neuronGroupRef.current) {
      neuronGroupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* 3D AI Neural Network Nodes in Background */}
      <group ref={neuronGroupRef}>
        {nodes.map((pos, i) => (
          <Float key={i} speed={2 + (i % 3) * 0.5} floatIntensity={1.5} position={pos as [number, number, number]}>
            <mesh scale={0.12 + (i % 3) * 0.04}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
                emissive={i % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
                emissiveIntensity={1.2}
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Floating Cyan Cyber Ring (Top-Right) */}
      <Float speed={2.5} rotationIntensity={1.4} floatIntensity={1.7} position={[1.7, 1.25, 0]}>
        <group ref={ringRef}>
          <mesh scale={0.45} rotation={[0.4, 0.2, 0]}>
            <torusGeometry args={[0.5, 0.08, 16, 32]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.9} />
          </mesh>
        </group>
      </Float>

      {/* Floating Emerald AI Core Node (Top-Left) */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5} position={[-1.7, 1.2, -0.2]}>
        <group ref={coreRef}>
          <mesh scale={0.4}>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
