import { ExamSessionClient } from "../_components/ExamSessionClient";
import { getDefaultDemoExam } from "../_data/examQuestions";

interface ExamPageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default async function ExamDynamicPage({ params }: ExamPageProps) {
  const { examId } = await params;
  const exam = getDefaultDemoExam(examId);

  return <ExamSessionClient exam={exam} examId={examId} />;
}
