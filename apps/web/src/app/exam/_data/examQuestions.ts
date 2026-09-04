export interface ExamQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  answer: string;
  marks: number;
  explanation?: string;
}

export interface ExamDetails {
  id: string;
  title: string;
  category: string;
  grade: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  questions: ExamQuestion[];
}

export function getExamPartLabel(questionIdOrIndex: number): string {
  const num = questionIdOrIndex;
  if (num <= 10) return "PART A — THINK";
  if (num <= 20) return "PART B — ANALYSE";
  if (num <= 30) return "PART C — SOLVE";
  if (num <= 40) return "PART D — DECIDE";
  return "PART E — CREATE";
}

export const DEFAULT_OLYMPIAD_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // PART A — THINK (Questions 1 - 10)
  // ==========================================
  {
    id: 1,
    subject: "PART A — THINK",
    question: "What number comes next? 3, 7, 13, 21, 31, ___",
    options: ["39", "41", "43", "45"],
    answer: "43",
    marks: 2,
  },
  {
    id: 2,
    subject: "PART A — THINK",
    question: "Five cards are arranged from left to right. A is somewhere before C. B is immediately after A. D is after C. Which arrangement could be correct?",
    options: ["A B C D E", "B A C D E", "C A B D E", "A C B D E"],
    answer: "A B C D E",
    marks: 2,
  },
  {
    id: 3,
    subject: "PART A — THINK",
    question: "Book is to Reading as Map is to:",
    options: ["Drawing", "Travelling", "Measuring", "Folding"],
    answer: "Travelling",
    marks: 2,
  },
  {
    id: 4,
    subject: "PART A — THINK",
    question: "All glims are rops. Some rops are tars. Which statement must be true?",
    options: ["All glims are tars", "Some glims may be tars", "No glims are tars", "All tars are rops"],
    answer: "Some glims may be tars",
    marks: 2,
  },
  {
    id: 5,
    subject: "PART A — THINK",
    question: "A symbol turns 90° clockwise each step. After four steps, its orientation is:",
    options: ["90° clockwise from the start", "180° from the start", "Same as the start", "Upside down"],
    answer: "Same as the start",
    marks: 2,
  },
  {
    id: 6,
    subject: "PART A — THINK",
    question: "Which does not belong?",
    options: ["Triangle", "Square", "Circle", "Pentagon"],
    answer: "Circle",
    marks: 2,
  },
  {
    id: 7,
    subject: "PART A — THINK",
    question: "If it rains, the ground becomes wet. The ground is wet. What can be concluded?",
    options: ["It definitely rained", "It may have rained", "It definitely did not rain", "Rain is impossible"],
    answer: "It may have rained",
    marks: 2,
  },
  {
    id: 8,
    subject: "PART A — THINK",
    question: "AZ, BY, CX, DW, ___",
    options: ["EV", "EU", "FV", "EW"],
    answer: "EV",
    marks: 2,
  },
  {
    id: 9,
    subject: "PART A — THINK",
    question: "Mira is taller than Ravi. Ravi is taller than Neel. Who is definitely shortest?",
    options: ["Mira", "Ravi", "Neel", "Cannot determine"],
    answer: "Neel",
    marks: 2,
  },
  {
    id: 10,
    subject: "PART A — THINK",
    question: "A machine changes 4 into 18 and 6 into 38. Using the same rule, what does it change 8 into?",
    options: ["62", "64", "66", "68"],
    answer: "66",
    marks: 2,
  },

  // ==========================================
  // PART B — ANALYSE (Questions 11 - 20)
  // ==========================================
  {
    id: 11,
    subject: "PART B — ANALYSE",
    question: "A club has 40 members. 18 prefer chess, 15 prefer puzzles, and 7 prefer both. How many prefer at least one of the two activities?",
    options: ["26", "33", "40", "25"],
    answer: "26",
    marks: 2,
  },
  {
    id: 12,
    subject: "PART B — ANALYSE",
    question: "A survey of 200 students found that students who sleep more often report better concentration. Which conclusion is most justified?",
    options: [
      "Sleep certainly causes concentration",
      "There is an association worth investigating",
      "Concentration causes sleep",
      "All students need identical sleep",
    ],
    answer: "There is an association worth investigating",
    marks: 2,
  },
  {
    id: 13,
    subject: "PART B — ANALYSE",
    question: "A report contains 12 facts, but only 4 directly relate to the question being investigated. What is the best first step?",
    options: [
      "Memorize all facts equally",
      "Identify and prioritize the relevant evidence",
      "Ignore the report",
      "Choose the longest fact",
    ],
    answer: "Identify and prioritize the relevant evidence",
    marks: 2,
  },
  {
    id: 14,
    subject: "PART B — ANALYSE",
    question: "A shop reduces a $100 item by 20%, then increases the reduced price by 20%. What is the final price?",
    options: ["$100", "$96", "$104", "$80"],
    answer: "$96",
    marks: 2,
  },
  {
    id: 15,
    subject: "PART B — ANALYSE",
    question: "A value rises for three months, stays unchanged for one month, then falls for two months. Which statement is certainly true?",
    options: [
      "It ended higher than it began",
      "It ended lower than it began",
      "It had at least one period of no change",
      "It increased every month",
    ],
    answer: "It had at least one period of no change",
    marks: 2,
  },
  {
    id: 16,
    subject: "PART B — ANALYSE",
    question: "A company asks only its own employees whether the company's products are excellent. What is the main weakness?",
    options: [
      "Sample may be biased",
      "Too much mathematics",
      "Questions are too short",
      "Employees cannot have opinions",
    ],
    answer: "Sample may be biased",
    marks: 2,
  },
  {
    id: 17,
    subject: "PART B — ANALYSE",
    question: "Team X completed 48 tasks in 6 hours. Team Y completed 56 tasks in 8 hours. Which team had the higher average task rate?",
    options: ["Team X", "Team Y", "Same rate", "Cannot determine"],
    answer: "Team X",
    marks: 2,
  },
  {
    id: 18,
    subject: "PART B — ANALYSE",
    question: "A headline says, 'More parks will make every citizen healthier.' Which assumption is required?",
    options: [
      "Everyone will use parks",
      "Parks are always empty",
      "Citizens dislike exercise",
      "Health never changes",
    ],
    answer: "Everyone will use parks",
    marks: 2,
  },
  {
    id: 19,
    subject: "PART B — ANALYSE",
    question: "Which piece of information is most useful for deciding whether a bridge is safe to reopen?",
    options: [
      "Its colour",
      "Number of nearby shops",
      "Recent structural inspection results",
      "Age of the oldest visitor",
    ],
    answer: "Recent structural inspection results",
    marks: 2,
  },
  {
    id: 20,
    subject: "PART B — ANALYSE",
    question: "To determine who is older between A and B, which information is sufficient?",
    options: [
      "A is taller than B",
      "A was born before B",
      "A studies more than B",
      "A lives farther away",
    ],
    answer: "A was born before B",
    marks: 2,
  },

  // ==========================================
  // PART C — SOLVE (Questions 21 - 30)
  // ==========================================
  {
    id: 21,
    subject: "PART C — SOLVE",
    question: "You have 10 identical batteries. A device needs 2 batteries and each battery can be used in only one device. What is the maximum number of devices you can operate simultaneously?",
    options: ["2", "4", "5", "10"],
    answer: "5",
    marks: 2,
  },
  {
    id: 22,
    subject: "PART C — SOLVE",
    question: "You must visit P, Q and R. P is 5 minutes from Q, Q is 5 minutes from R, and P is 20 minutes from R directly. Which route is most efficient if starting at P and ending at R?",
    options: ["P→R", "P→Q→R", "P→Q→P→R", "All equal"],
    answer: "P→Q→R",
    marks: 2,
  },
  {
    id: 23,
    subject: "PART C — SOLVE",
    question: "Three tasks take 15, 20 and 25 minutes. You have 45 minutes and tasks cannot overlap. What is the maximum number of tasks you can complete?",
    options: ["1", "2", "3", "None"],
    answer: "2",
    marks: 2,
  },
  {
    id: 24,
    subject: "PART C — SOLVE",
    question: "Four people must share 30 tokens as equally as possible using whole tokens. What is the largest possible difference between any two shares?",
    options: ["0", "1", "2", "3"],
    answer: "1",
    marks: 2,
  },
  {
    id: 25,
    subject: "PART C — SOLVE",
    question: "A robot follows instructions: Forward 3, Right, Forward 2, Left, Forward 2. It should finish facing the same direction it started. What is the smallest change needed?",
    options: [
      "Remove a turn",
      "Replace one turn with the opposite turn",
      "Add another right turn",
      "Impossible",
    ],
    answer: "Replace one turn with the opposite turn",
    marks: 2,
  },
  {
    id: 26,
    subject: "PART C — SOLVE",
    question: "A classroom has 24 students. Teams must contain either 3 or 4 students. What is the smallest possible number of teams?",
    options: ["5", "6", "7", "8"],
    answer: "6",
    marks: 2,
  },
  {
    id: 27,
    subject: "PART C — SOLVE",
    question: "A water tank is half full. After adding 30 litres, it becomes three-quarters full. What is the tank's capacity?",
    options: ["60 L", "90 L", "120 L", "150 L"],
    answer: "120 L",
    marks: 2,
  },
  {
    id: 28,
    subject: "PART C — SOLVE",
    question: "You need to find one defective item among 9 identical-looking items using a balance scale. What is the best first strategy?",
    options: [
      "Compare 1 vs 1",
      "Divide into three groups of 3",
      "Weigh all at once",
      "Random guessing",
    ],
    answer: "Divide into three groups of 3",
    marks: 2,
  },
  {
    id: 29,
    subject: "PART C — SOLVE",
    question: "A meeting requires A before B, B before C, and D can occur anytime. Which sequence is valid?",
    options: ["B A C D", "A C B D", "D A B C", "C B A D"],
    answer: "D A B C",
    marks: 2,
  },
  {
    id: 30,
    subject: "PART C — SOLVE",
    question: "A complex problem has five independent smaller problems. What is generally the most efficient initial approach?",
    options: [
      "Solve all mentally at once",
      "Break and prioritize the smaller problems",
      "Ignore the easiest parts",
      "Wait for the problem to disappear",
    ],
    answer: "Break and prioritize the smaller problems",
    marks: 2,
  },

  // ==========================================
  // PART D — DECIDE (Questions 31 - 40)
  // ==========================================
  {
    id: 31,
    subject: "PART D — DECIDE",
    question: "You are selecting one student for a role. Two candidates have equal scores, but one is your close friend. What is the best decision process?",
    options: [
      "Select your friend automatically",
      "Use predefined objective criteria",
      "Cancel the selection",
      "Let your friend decide",
    ],
    answer: "Use predefined objective criteria",
    marks: 2,
  },
  {
    id: 32,
    subject: "PART D — DECIDE",
    question: "You discover a possible safety issue before an event, but are unsure how serious it is. What should you do first?",
    options: [
      "Ignore it",
      "Assess and report the risk using available evidence",
      "Announce panic",
      "Assume nothing can go wrong",
    ],
    answer: "Assess and report the risk using available evidence",
    marks: 2,
  },
  {
    id: 33,
    subject: "PART D — DECIDE",
    question: "You must make a decision today, but complete information will arrive tomorrow. The decision is reversible and low-risk. What is generally sensible?",
    options: [
      "Consider acting using the best available evidence",
      "Always refuse to decide",
      "Guess without evidence",
      "Pretend information does not matter",
    ],
    answer: "Consider acting using the best available evidence",
    marks: 2,
  },
  {
    id: 34,
    subject: "PART D — DECIDE",
    question: "Two team members strongly disagree about a plan. What is the best first step?",
    options: [
      "Choose randomly",
      "Understand both positions and evaluate evidence",
      "Remove both members",
      "Ignore the disagreement",
    ],
    answer: "Understand both positions and evaluate evidence",
    marks: 2,
  },
  {
    id: 35,
    subject: "PART D — DECIDE",
    question: "You find confidential information accidentally shared with you. What is the most appropriate response?",
    options: [
      "Share it widely",
      "Use it for personal advantage",
      "Protect it and inform the appropriate authority",
      "Post it anonymously",
    ],
    answer: "Protect it and inform the appropriate authority",
    marks: 2,
  },
  {
    id: 36,
    subject: "PART D — DECIDE",
    question: "You have four tasks: one urgent and important, one important but not urgent, one urgent but low impact, and one neither. Which should generally be addressed first?",
    options: [
      "Urgent and important",
      "Important but not urgent",
      "Urgent but low impact",
      "Neither",
    ],
    answer: "Urgent and important",
    marks: 2,
  },
  {
    id: 37,
    subject: "PART D — DECIDE",
    question: "Two solutions have similar benefits. One has a small chance of severe harm; the other has only moderate, reversible risks. What factor deserves particular attention?",
    options: [
      "Only popularity",
      "Severity and reversibility of potential outcomes",
      "Which option sounds more exciting",
      "Alphabetical order",
    ],
    answer: "Severity and reversibility of potential outcomes",
    marks: 2,
  },
  {
    id: 38,
    subject: "PART D — DECIDE",
    question: "A team is making a decision and one quiet member has relevant expertise. What improves decision quality?",
    options: [
      "Exclude them",
      "Invite relevant input before deciding",
      "Let the loudest person decide",
      "Vote before hearing evidence",
    ],
    answer: "Invite relevant input before deciding",
    marks: 2,
  },
  {
    id: 39,
    subject: "PART D — DECIDE",
    question: "A cheap solution solves today's problem but creates a much larger likely problem next month. What is the better decision principle?",
    options: [
      "Consider long-term consequences",
      "Always choose cheapest",
      "Ignore future effects",
      "Delay forever",
    ],
    answer: "Consider long-term consequences",
    marks: 2,
  },
  {
    id: 40,
    subject: "PART D — DECIDE",
    question: "You make a decision based on incorrect information and later discover the mistake. What is the best response?",
    options: [
      "Hide the mistake",
      "Blame someone without evidence",
      "Acknowledge, correct and learn from it",
      "Repeat it",
    ],
    answer: "Acknowledge, correct and learn from it",
    marks: 2,
  },

  // ==========================================
  // PART E — CREATE (Questions 41 - 50)
  // ==========================================
  {
    id: 41,
    subject: "PART E — CREATE",
    question: "A school needs a quiet waiting area for 30 students using limited space. Which proposal best balances the constraints?",
    options: [
      "One huge table in the centre",
      "Flexible seating zones with clear movement paths",
      "Remove all seating",
      "Block every entrance",
    ],
    answer: "Flexible seating zones with clear movement paths",
    marks: 2,
  },
  {
    id: 42,
    subject: "PART E — CREATE",
    question: "A broken cardboard box cannot hold heavy objects. Which is the most creative useful reuse?",
    options: [
      "Throw it away immediately",
      "Use it as a lightweight organizer or prototype material",
      "Fill it with water",
      "Use it as a chair for many people",
    ],
    answer: "Use it as a lightweight organizer or prototype material",
    marks: 2,
  },
  {
    id: 43,
    subject: "PART E — CREATE",
    question: "A designer must create a repeating pattern using only circle, square and triangle. Which rule would create the greatest predictable variety while remaining systematic?",
    options: [
      "Repeat one shape forever",
      "Use a consistent changing sequence",
      "Choose randomly with no rule",
      "Stop after two shapes",
    ],
    answer: "Use a consistent changing sequence",
    marks: 2,
  },
  {
    id: 44,
    subject: "PART E — CREATE",
    question: "You must design a school notice that is readable, brief and noticeable. Which approach best satisfies all three?",
    options: [
      "Very small text with many paragraphs",
      "Clear heading, concise points and organized layout",
      "No text at all",
      "One extremely long sentence",
    ],
    answer: "Clear heading, concise points and organized layout",
    marks: 2,
  },
  {
    id: 45,
    subject: "PART E — CREATE",
    question: "A queue system causes crowding because everyone arrives at the same time. Which is the most innovative practical improvement?",
    options: [
      "Add more people to the queue",
      "Create staggered time slots",
      "Remove all rules",
      "Close the service permanently",
    ],
    answer: "Create staggered time slots",
    marks: 2,
  },
  {
    id: 46,
    subject: "PART E — CREATE",
    question: "A new idea is unusual but solves the problem within all stated constraints. How should it be judged?",
    options: [
      "Reject it because it is unusual",
      "Evaluate it based on effectiveness and constraints",
      "Accept without checking",
      "Copy a familiar idea instead",
    ],
    answer: "Evaluate it based on effectiveness and constraints",
    marks: 2,
  },
  {
    id: 47,
    subject: "PART E — CREATE",
    question: "A team needs a low-cost way to reduce paper waste. Which solution combines existing resources creatively?",
    options: [
      "Print everything twice",
      "Create a shared digital workflow and reuse one-sided sheets for drafts",
      "Buy more bins only",
      "Ban all communication",
    ],
    answer: "Create a shared digital workflow and reuse one-sided sheets for drafts",
    marks: 2,
  },
  {
    id: 48,
    subject: "PART E — CREATE",
    question: "A product can be extremely durable but very difficult to use, or easy to use but moderately durable. What is the best design approach?",
    options: [
      "Ignore users",
      "Balance important constraints based on intended use",
      "Maximize only one feature always",
      "Choose randomly",
    ],
    answer: "Balance important constraints based on intended use",
    marks: 2,
  },
  {
    id: 49,
    subject: "PART E — CREATE",
    question: "A library wants students to discover books outside their usual interests. Which idea is most likely to encourage exploration?",
    options: [
      "Show only previously borrowed categories",
      "Create themed surprise selections with optional clues",
      "Hide all books",
      "Remove book descriptions",
    ],
    answer: "Create themed surprise selections with optional clues",
    marks: 2,
  },
  {
    id: 50,
    subject: "PART E — CREATE",
    question: "A community has an unused public space. Before proposing a solution, what is the strongest creative problem-solving first step?",
    options: [
      "Build immediately",
      "Understand users, constraints and possible needs",
      "Copy another city exactly",
      "Choose the most expensive option",
    ],
    answer: "Understand users, constraints and possible needs",
    marks: 2,
  },
];

export const MOCK_EXAMS_DATABASE: Record<string, ExamDetails> = {
  "68d123abc": {
    id: "68d123abc",
    title: "IMO Olympiad",
    category: "Sample Cognitive Abilities Assessment",
    grade: "Classes 7–12",
    durationMinutes: 50,
    totalMarks: 100,
    passingMarks: 50,
    questions: DEFAULT_OLYMPIAD_QUESTIONS,
  },
  "olympiad-exam-1": {
    id: "olympiad-exam-1",
    title: "IMO Olympiad",
    category: "Sample Cognitive Abilities Assessment",
    grade: "Classes 7–12",
    durationMinutes: 50,
    totalMarks: 100,
    passingMarks: 50,
    questions: DEFAULT_OLYMPIAD_QUESTIONS,
  },
};

export function getExamById(examId: string): ExamDetails {
  if (MOCK_EXAMS_DATABASE[examId]) {
    return MOCK_EXAMS_DATABASE[examId];
  }

  return {
    id: examId,
    title: "IMO Olympiad",
    category: "Sample Cognitive Abilities Assessment",
    grade: "Classes 7–12",
    durationMinutes: 50,
    totalMarks: 100,
    passingMarks: 50,
    questions: DEFAULT_OLYMPIAD_QUESTIONS,
  };
}
