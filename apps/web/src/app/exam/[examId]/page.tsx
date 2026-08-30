interface ExamPageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default async function ExamPage({
  params,
}: ExamPageProps) {
  const { examId } = await params;

  return (
    <main>
      <h1>Exam Environment</h1>
      <p>Exam ID: {examId}</p>
    </main>
  );
}