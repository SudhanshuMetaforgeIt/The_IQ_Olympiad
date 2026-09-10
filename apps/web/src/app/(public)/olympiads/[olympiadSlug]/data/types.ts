export interface DetailSubjectCategory {
  title: string;
  color: "blue" | "purple" | "green" | "amber";
  iconType: "atom" | "flask" | "leaf" | "math" | "book" | "code" | "ai";
  topics: string[];
}

export interface DetailedOlympiadInfo {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  iconBgColor: string;
  badgeText: string;
  examDate: string;
  duration: string;
  classes: string;
  participants: string;
  difficulty: string;
  aboutText: string;
  whyParticipate: string[];
  eligibility: string[];
  examPattern: {
    questions: number;
    duration: string;
    questionType: string;
    negativeMarking: string;
  };
  syllabus: DetailSubjectCategory[];
  importantDates: {
    label: string;
    date: string;
    dotColor: "green" | "amber" | "purple";
  }[];
}
