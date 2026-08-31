// @ts-nocheck
"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { Group, Mesh, MathUtils, CanvasTexture } from "three";
import {
  type HeroSubject,
  HERO_SUBJECTS,
  HERO_SUBJECT_DETAILS,
  LABEL_POSITIONS,
} from "../HeroSubjectsData";
import { MathematicsScene } from "./MathematicsScene";
import { ScienceScene } from "./ScienceScene";
import { EnglishScene } from "./EnglishScene";
import { ReasoningScene } from "./ReasoningScene";
import { AIScene } from "./AIScene";

function OrbitRing({ radius, rotationAngle, speed, color }: { radius: number; rotationAngle: [number, number, number]; speed: number; color: string }) {
  const ringRef = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={rotationAngle}>
      <torusGeometry args={[radius, 0.03, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

function KnowledgeUniverseScene({ activeSubject, motionPaused }: { activeSubject: HeroSubject; motionPaused: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 5.5], fov: 48 }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} />
      <pointLight position={[-5, -2, -2]} intensity={0.8} color="#a855f7" />

      <Sparkles count={100} scale={9} size={4} speed={0.5} color="#a855f7" />
      <OrbitRing radius={3.2} rotationAngle={[Math.PI / 4, 0.2, 0]} speed={0.3} color="#a855f7" />
      <OrbitRing radius={3.5} rotationAngle={[-Math.PI / 3, -0.4, 0]} speed={-0.2} color="#c084fc" />

      {!motionPaused && (
        <>
          {activeSubject === "MATHEMATICS" ? (
            <MathematicsScene />
          ) : activeSubject === "SCIENCE" ? (
            <ScienceScene />
          ) : activeSubject === "ENGLISH" ? (
            <EnglishScene />
          ) : activeSubject === "REASONING" ? (
            <ReasoningScene />
          ) : activeSubject === "AI" ? (
            <AIScene />
          ) : null}
        </>
      )}
    </Canvas>
  );
}

function SceneFallback() {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden">
      <div className="size-64 rounded-full border border-purple-200/70 animate-spin" style={{ animationDuration: "18s" }}>
        <span className="absolute -left-4 top-1/2 text-3xl">📚</span>
        <span className="absolute -right-4 top-1/3 text-3xl">🔬</span>
        <span className="absolute left-1/2 -top-4 text-3xl">🚀</span>
        <span className="absolute bottom-0 left-1/3 text-3xl">🏆</span>
      </div>
      <div className="relative z-10 grid size-40 place-items-center rounded-full bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-600 text-7xl shadow-xl">
        🧑‍💻
      </div>
    </div>
  );
}

export default function Hero3DScene() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [motionPaused, setMotionPaused] = useState(false);
  const [activeSubject, setActiveSubject] = useState<HeroSubject>("SCIENCE");
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 16,
        y: (e.clientY / innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const selectedDetails = useMemo(() => HERO_SUBJECT_DETAILS[activeSubject], [activeSubject]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative h-[400px] sm:h-[460px] lg:h-[480px] overflow-hidden rounded-[2.5rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFFFFF] via-[#F3EEFF] to-[#ECE6FF] shadow-[inset_0_0_80px_rgba(168,85,247,0.14)] transition-all duration-700 w-full"
    >
      {/* 3D WebGL Canvas Layer (Platform + Orbiters) */}
      <div className="absolute inset-0 z-10">
        {!isMounted ? (
          <SceneFallback />
        ) : (
          <KnowledgeUniverseScene activeSubject={activeSubject} motionPaused={motionPaused} />
        )}
      </div>

      {/* Background Animated Floating Overlay Elements */}
      {activeSubject === "ENGLISH" && (
        <motion.div
          animate={{
            x: motionPaused || prefersReducedMotion ? 0 : mousePos.x * -0.9,
            y: motionPaused || prefersReducedMotion ? 0 : mousePos.y * -0.9,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="absolute inset-0 z-15 pointer-events-none overflow-hidden rounded-[2.5rem]"
        >
          {/* Floating Letter A */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -14, 0], rotate: [0, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[14%] left-[15%] text-4xl sm:text-5xl font-black text-purple-600/90 drop-shadow-lg select-none"
          >
            A
          </motion.div>

          {/* Floating Letter B */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 14, 0], rotate: [0, 10, 0], scale: [1, 1.18, 1] }}
            transition={{ duration: 3.6, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] right-[18%] text-5xl sm:text-6xl font-black text-pink-600/90 drop-shadow-lg select-none"
          >
            B
          </motion.div>

          {/* Floating Letter C */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -10, 0], rotate: [0, -7, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 4.0, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[48%] right-[14%] text-4xl sm:text-5xl font-black text-indigo-600/90 drop-shadow-lg select-none"
          >
            C
          </motion.div>

          {/* Floating Letter D */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 10, 0], rotate: [0, 6, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3.4, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[44%] left-[12%] text-4xl sm:text-5xl font-black text-amber-500/90 drop-shadow-lg select-none"
          >
            D
          </motion.div>

          {/* Floating Word: Vocabulary */}
          <motion.span
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -8, 0], x: [0, 5, 0] }}
            transition={{ duration: 4.2, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[28%] left-[10%] text-xs sm:text-sm font-black text-purple-700/80 tracking-wide select-none"
          >
            Vocabulary ✨
          </motion.span>

          {/* Floating Word: Grammar */}
          <motion.span
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 8, 0], x: [0, -4, 0] }}
            transition={{ duration: 3.8, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[26%] right-[12%] text-xs sm:text-sm font-black text-purple-700/80 tracking-wide select-none"
          >
            Grammar 📝
          </motion.span>

          {/* Floating Word: Speaking */}
          <motion.span
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -7, 0], x: [0, 4, 0] }}
            transition={{ duration: 4.4, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] right-[16%] text-xs sm:text-sm font-black text-purple-700/80 tracking-wide select-none"
          >
            Speaking 💬
          </motion.span>

          {/* Floating Word: Writing */}
          <motion.span
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 7, 0], x: [0, -4, 0] }}
            transition={{ duration: 3.6, delay: 1.0, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[32%] left-[14%] text-xs sm:text-sm font-black text-purple-700/80 tracking-wide select-none"
          >
            Writing ✍️
          </motion.span>
        </motion.div>
      )}

      {activeSubject === "MATHEMATICS" && (
        <motion.div
          animate={{
            x: motionPaused || prefersReducedMotion ? 0 : mousePos.x * -0.9,
            y: motionPaused || prefersReducedMotion ? 0 : mousePos.y * -0.9,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="absolute inset-0 z-15 pointer-events-none overflow-hidden rounded-[2.5rem]"
        >
          {/* Formula: π ≈ 3.14159 */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 14, 0], rotate: [0, 6, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 3.8, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] right-[16%] rounded-2xl bg-indigo-900/90 border border-indigo-400/40 px-3.5 py-1.5 text-xs sm:text-sm font-black text-indigo-100 shadow-lg backdrop-blur-md select-none"
          >
            π ≈ 3.14159 📐
          </motion.div>

          {/* Formula: x² + y² = z² */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4.0, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[48%] left-[10%] rounded-2xl bg-purple-950/90 border border-fuchsia-400/40 px-3 py-1.5 text-xs sm:text-sm font-black text-fuchsia-200 shadow-lg backdrop-blur-md select-none"
          >
            x² + y² = z² 📐
          </motion.div>

          {/* Symbol: ∑ (n = 1) */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.6, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[44%] right-[12%] rounded-2xl bg-fuchsia-950/90 border border-purple-400/40 px-3 py-1.5 text-xs sm:text-sm font-black text-purple-200 shadow-lg backdrop-blur-md select-none"
          >
            ∑ (n = 1...∞) 🧮
          </motion.div>

          {/* Floating Number 7 */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -14, 0], rotate: [0, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3.2, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[28%] left-[18%] text-4xl sm:text-5xl font-black text-purple-600/90 drop-shadow-lg select-none"
          >
            7
          </motion.div>

          {/* Floating Number 9 */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 12, 0], rotate: [0, 8, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3.7, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[26%] right-[22%] text-4xl sm:text-5xl font-black text-fuchsia-600/90 drop-shadow-lg select-none"
          >
            9
          </motion.div>

          {/* Floating Symbol ∞ */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -8, 0], scale: [1, 1.25, 1] }}
            transition={{ duration: 4.2, delay: 1.0, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] left-[22%] text-4xl sm:text-5xl font-black text-indigo-600/90 drop-shadow-lg select-none"
          >
            ∞
          </motion.div>
        </motion.div>
      )}

      {activeSubject === "SCIENCE" && (
        <motion.div
          animate={{
            x: motionPaused || prefersReducedMotion ? 0 : mousePos.x * -0.9,
            y: motionPaused || prefersReducedMotion ? 0 : mousePos.y * -0.9,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="absolute inset-0 z-15 pointer-events-none overflow-hidden rounded-[2.5rem]"
        >
          {/* Physics Formula: E = mc² */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -12, 0], rotate: [0, -6, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[14%] left-[12%] rounded-2xl bg-cyan-900/90 border border-cyan-400/40 px-3.5 py-1.5 text-xs sm:text-sm font-black text-cyan-100 shadow-lg backdrop-blur-md select-none"
          >
            E = mc² ⚛️
          </motion.div>

          {/* Chemistry Formula: H₂O + CO₂ */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 14, 0], rotate: [0, 6, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 3.8, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] right-[16%] rounded-2xl bg-blue-900/90 border border-blue-400/40 px-3.5 py-1.5 text-xs sm:text-sm font-black text-blue-100 shadow-lg backdrop-blur-md select-none"
          >
            H₂O & CO₂ 🧪
          </motion.div>

          {/* Physics Law: F = m · a */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4.0, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[48%] left-[10%] rounded-2xl bg-indigo-950/90 border border-cyan-400/40 px-3 py-1.5 text-xs sm:text-sm font-black text-cyan-200 shadow-lg backdrop-blur-md select-none"
          >
            F = m · a 🚀
          </motion.div>

          {/* Biology: DNA & Genetics */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.6, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[44%] right-[12%] rounded-2xl bg-teal-950/90 border border-emerald-400/40 px-3 py-1.5 text-xs sm:text-sm font-black text-emerald-200 shadow-lg backdrop-blur-md select-none"
          >
            DNA & Genetics 🧬
          </motion.div>

          {/* Floating Icon Atom */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -14, 0], rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ y: { duration: 3.2, delay: 0.4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 12, repeat: Infinity, ease: "linear" } }}
            className="absolute top-[28%] left-[18%] text-3xl sm:text-4xl select-none"
          >
            ⚛️
          </motion.div>

          {/* Floating Icon Flask */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 12, 0], rotate: [0, 12, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3.7, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[26%] right-[22%] text-3xl sm:text-4xl select-none"
          >
            🧪
          </motion.div>

          {/* Floating Icon Lightning */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -8, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.8, delay: 1.0, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] left-[22%] text-3xl sm:text-4xl select-none"
          >
            ⚡
          </motion.div>
        </motion.div>
      )}

      {activeSubject === "REASONING" && (
        <motion.div
          animate={{
            x: motionPaused || prefersReducedMotion ? 0 : mousePos.x * -0.9,
            y: motionPaused || prefersReducedMotion ? 0 : mousePos.y * -0.9,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="absolute inset-0 z-15 pointer-events-none overflow-hidden rounded-[2.5rem]"
        >
          {/* Logic Rule: If P ➔ Q */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -12, 0], rotate: [0, -6, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[14%] left-[12%] rounded-2xl bg-amber-900/90 border border-amber-400/40 px-3.5 py-1.5 text-xs sm:text-sm font-black text-amber-100 shadow-lg backdrop-blur-md select-none"
          >
            If P ➔ Q 🧩
          </motion.div>

          {/* Logic Term: Patterns & Codes */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 14, 0], rotate: [0, 6, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 3.8, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] right-[16%] rounded-2xl bg-orange-900/90 border border-orange-400/40 px-3.5 py-1.5 text-xs sm:text-sm font-black text-orange-100 shadow-lg backdrop-blur-md select-none"
          >
            Patterns & Codes 🔍
          </motion.div>

          {/* Spatial Logic */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4.0, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[48%] left-[10%] rounded-2xl bg-yellow-950/90 border border-amber-400/40 px-3 py-1.5 text-xs sm:text-sm font-black text-amber-200 shadow-lg backdrop-blur-md select-none"
          >
            Spatial & Matrix 🎲
          </motion.div>

          {/* Deductive Logic */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.6, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[44%] right-[12%] rounded-2xl bg-amber-950/90 border border-yellow-400/40 px-3 py-1.5 text-xs sm:text-sm font-black text-yellow-200 shadow-lg backdrop-blur-md select-none"
          >
            Deductive Logic 💡
          </motion.div>

          {/* Floating Icon Puzzle Piece */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -14, 0], rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3.2, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[28%] left-[18%] text-3xl sm:text-4xl select-none"
          >
            🧩
          </motion.div>

          {/* Floating Icon Magnifier */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 12, 0], rotate: [0, 15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3.7, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[26%] right-[22%] text-3xl sm:text-4xl select-none"
          >
            🔍
          </motion.div>

          {/* Floating Icon Question Bulb */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -8, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.8, delay: 1.0, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] left-[22%] text-3xl sm:text-4xl select-none"
          >
            💡
          </motion.div>
        </motion.div>
      )}

      {activeSubject === "AI" && (
        <motion.div
          animate={{
            x: motionPaused || prefersReducedMotion ? 0 : mousePos.x * -0.9,
            y: motionPaused || prefersReducedMotion ? 0 : mousePos.y * -0.9,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="absolute inset-0 z-15 pointer-events-none overflow-hidden rounded-[2.5rem]"
        >
          {/* AI Concept: Neural Networks */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -12, 0], rotate: [0, -6, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[14%] left-[12%] rounded-2xl bg-cyan-950/90 border border-cyan-400/50 px-3.5 py-1.5 text-xs sm:text-sm font-black text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md select-none"
          >
            Neural Networks 🧠
          </motion.div>

          {/* AI Concept: Machine Learning */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 14, 0], rotate: [0, 6, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 3.8, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] right-[16%] rounded-2xl bg-purple-950/90 border border-purple-400/50 px-3.5 py-1.5 text-xs sm:text-sm font-black text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md select-none"
          >
            Machine Learning 🤖
          </motion.div>

          {/* AI Concept: Deep Learning */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4.0, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[48%] left-[10%] rounded-2xl bg-indigo-950/90 border border-cyan-400/50 px-3 py-1.5 text-xs sm:text-sm font-black text-cyan-100 shadow-lg backdrop-blur-md select-none"
          >
            Deep Learning 🌌
          </motion.div>

          {/* AI Concept: Generative AI & LLMs */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.6, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[44%] right-[12%] rounded-2xl bg-blue-950/90 border border-blue-400/50 px-3 py-1.5 text-xs sm:text-sm font-black text-blue-100 shadow-lg backdrop-blur-md select-none"
          >
            Generative AI & LLMs ⚡
          </motion.div>

          {/* Floating Icon Robot */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -14, 0], rotate: [0, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3.2, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[28%] left-[18%] text-3xl sm:text-4xl select-none"
          >
            🤖
          </motion.div>

          {/* Floating Icon Brain */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, 12, 0], rotate: [0, 12, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3.7, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[26%] right-[22%] text-3xl sm:text-4xl select-none"
          >
            🧠
          </motion.div>

          {/* Floating Icon Sparkle */}
          <motion.div
            animate={motionPaused || prefersReducedMotion ? {} : { y: [0, -8, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.8, delay: 1.0, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] left-[22%] text-3xl sm:text-4xl select-none"
          >
            ⚡
          </motion.div>
        </motion.div>
      )}

      {/* 3D Pixar Character / Scene Overlay */}
      {(activeSubject === "SCIENCE" || activeSubject === "MATHEMATICS" || activeSubject === "REASONING" || activeSubject === "ENGLISH" || activeSubject === "AI") ? (
        <motion.div
          key={`character-${activeSubject}`}
          className="absolute inset-x-0 bottom-0 z-20 pointer-events-none flex items-end justify-center"
          animate={{
            x: motionPaused || prefersReducedMotion ? 0 : mousePos.x * 1.5,
            y: motionPaused || prefersReducedMotion ? 0 : [mousePos.y * 0.8 - 4, mousePos.y * 0.8 + 4, mousePos.y * 0.8 - 4],
            rotate: motionPaused || prefersReducedMotion ? 0 : mousePos.x * 0.12,
          }}
          transition={{
            x: { type: "spring", stiffness: 110, damping: 16 },
            rotate: { type: "spring", stiffness: 110, damping: 16 },
            y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div
            className={`relative drop-shadow-2xl ${
              activeSubject === "ENGLISH" || activeSubject === "AI"
                ? "w-[640px] sm:w-[780px] lg:w-[880px] h-[360px] sm:h-[420px] lg:h-[460px]"
                : "w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px]"
            }`}
          >
            <Image
              src={
                activeSubject === "SCIENCE"
                  ? "/science-teacher-3d-clean.png"
                  : activeSubject === "MATHEMATICS"
                  ? "/math-teacher-3d-clean.png"
                  : activeSubject === "ENGLISH"
                  ? "/english-teacher-3d-transparent.png"
                  : activeSubject === "AI"
                  ? "/ai-teacher-3d-transparent.png"
                  : "/reasoning-teacher-3d-clean.png"
              }
              alt={`${activeSubject} 3D Teacher Character`}
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </motion.div>
      ) : null}

      {/* Pause Button */}
      <button
        type="button"
        onClick={() => setMotionPaused((paused) => !paused)}
        aria-pressed={motionPaused}
        aria-label={motionPaused ? "Play 3D motion" : "Pause 3D motion"}
        className="absolute right-4 top-4 z-40 grid size-9 place-items-center rounded-full border border-white/80 bg-white/90 text-purple-900 shadow-md backdrop-blur transition hover:scale-105 cursor-pointer"
      >
        {motionPaused ? (
          <svg className="w-4 h-4 fill-purple-900" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        ) : (
          <svg className="w-4 h-4 fill-purple-900" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        )}
      </button>

      {/* Subject Pill Buttons */}
      {HERO_SUBJECTS.map((subject, index) => {
        const active = activeSubject === subject.id;
        const posClassMap: Record<string, string> = {
          MATHEMATICS: "top-8 left-6 sm:top-10 sm:left-8",
          AI: "top-5 left-1/2 -translate-x-1/2",
          SCIENCE: "top-14 right-6 sm:top-16 sm:right-8",
          ENGLISH: "bottom-16 left-6 sm:bottom-20 sm:left-8",
          REASONING: "bottom-16 right-6 sm:bottom-20 sm:right-8",
        };
        const posClass = posClassMap[subject.id] || "top-6 left-6";

        return (
          <motion.button
            key={subject.id}
            type="button"
            aria-pressed={active}
            aria-label={`Explore ${subject.label}`}
            onClick={() => setActiveSubject(subject.id)}
            onFocus={() => setActiveSubject(subject.id)}
            className={`absolute z-30 rounded-full border px-4 py-2 text-xs font-black shadow-md backdrop-blur sm:px-5 sm:text-xs cursor-pointer ${posClass} ${active
              ? "border-white bg-white text-slate-900 ring-2 ring-white/80 shadow-lg scale-110"
              : "border-white/80 bg-white/85 text-indigo-950 hover:scale-105"
              }`}
            style={active ? { color: subject.color } : {}}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: active ? 1.1 : 1,
              y: motionPaused || prefersReducedMotion ? 0 : [0, -5, 0],
            }}
            transition={{
              opacity: { delay: 0.2 + index * 0.08, duration: 0.4 },
              scale: { type: "spring", stiffness: 240 },
              y: {
                delay: index * 0.35,
                duration: 3.2 + index * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {subject.id}
          </motion.button>
        );
      })}



      {/* Bottom Tag Pill */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <motion.div
          key={`tag-${activeSubject}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center rounded-full border border-white/90 bg-white/95 px-6 py-2.5 text-xs font-black shadow-md backdrop-blur-md whitespace-nowrap"
        >
          <span className={selectedDetails.tagPillColor}>
            {selectedDetails.tagPill}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
