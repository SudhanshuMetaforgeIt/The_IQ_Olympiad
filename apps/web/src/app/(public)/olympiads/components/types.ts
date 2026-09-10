export type SubjectCategory =
  | "All Subjects"
  | "Mathematics"
  | "Science"
  | "English"
  | "Reasoning"
  | "AI";

export type OlympiadStatus = "Upcoming" | "Live" | "Completed";

export interface OlympiadItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  iconType: "brain" | "sigma" | "flask" | "book" | "cyber" | "ai";
  isFlagship?: boolean;
  subjects: string[];
  primarySubject: SubjectCategory;
  eligibility: string;
  examDate: string;
  duration: string;
  difficulty: string;
  description: string;
  status: OlympiadStatus;
  hasPrizes?: boolean;
  registrationDeadline?: string;
  customIconBg?: string;
}

export interface BenefitFeature {
  title: string;
  description: string;
  iconName: "target" | "certificate" | "ranking" | "scholarship" | "skill";
}
