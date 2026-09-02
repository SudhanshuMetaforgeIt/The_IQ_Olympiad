import type { PracticeQuestion } from "./types";

export const SAMPLE_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    text: "Which cell organelle is known as the powerhouse of the cell?",
    options: [
      { key: "A", text: "Mitochondria" },
      { key: "B", text: "Nucleus" },
      { key: "C", text: "Ribosome" },
      { key: "D", text: "Endoplasmic Reticulum" },
    ],
    correctKey: "A",
    explanation: "Mitochondria produce ATP through cellular respiration and are termed the powerhouses of the cell.",
  },
  {
    id: 2,
    text: "Which of the following gas is most essential for respiration in living organisms?",
    options: [
      { key: "A", text: "Oxygen" },
      { key: "B", text: "Carbon Dioxide" },
      { key: "C", text: "Nitrogen" },
      { key: "D", text: "Hydrogen" },
    ],
    correctKey: "A",
    explanation: "Oxygen is required by living organisms for the process of respiration.",
  },
  {
    id: 3,
    text: "What is the primary green pigment in plants that absorbs sunlight for photosynthesis?",
    options: [
      { key: "A", text: "Chlorophyll" },
      { key: "B", text: "Carotene" },
      { key: "C", text: "Anthocyanin" },
      { key: "D", text: "Xanthophyll" },
    ],
    correctKey: "A",
    explanation: "Chlorophyll is the green pigment in chloroplasts responsible for light absorption.",
  },
  {
    id: 4,
    text: "What is the chemical formula of water?",
    options: [
      { key: "A", text: "H2O" },
      { key: "B", text: "CO2" },
      { key: "C", text: "NaCl" },
      { key: "D", text: "O2" },
    ],
    correctKey: "A",
    explanation: "Water consists of two hydrogen atoms covalently bonded to one oxygen atom (H2O).",
  },
  {
    id: 5,
    text: "Which planet in our solar system is known as the Red Planet?",
    options: [
      { key: "A", text: "Mars" },
      { key: "B", text: "Venus" },
      { key: "C", text: "Jupiter" },
      { key: "D", text: "Saturn" },
    ],
    correctKey: "A",
    explanation: "Mars appears reddish due to the prevalence of iron oxide on its surface.",
  },
  // Generate remaining questions up to 50
  ...Array.from({ length: 45 }, (_, i) => ({
    id: i + 6,
    text: `Identify the scientific concept related to question ${i + 6} concerning physical and biological principles in natural sciences.`,
    options: [
      { key: "A", text: `Concept Option Alpha for Test Item ${i + 6}` },
      { key: "B", text: `Concept Option Beta for Test Item ${i + 6}` },
      { key: "C", text: `Concept Option Gamma for Test Item ${i + 6}` },
      { key: "D", text: `Concept Option Delta for Test Item ${i + 6}` },
    ],
    correctKey: "A",
    explanation: `Detailed explanation for question ${i + 6}: Option A correctly addresses fundamental principles of scientific experimentation.`,
  })),
];
