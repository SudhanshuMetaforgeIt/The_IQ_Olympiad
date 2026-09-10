import { ExamSessionClient } from "../_components/ExamSessionClient";

interface ExamPageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default async function ExamDynamicPage({ params }: ExamPageProps) {
  const { examId } = await params;

  return <ExamSessionClient examId={examId} />;
}
