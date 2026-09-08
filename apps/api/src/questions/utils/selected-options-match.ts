/**
 * Same comparison rule used by ExamAttemptsService.scoreAnswer:
 * selected and correct must contain the same IDs (order-independent).
 */
export function selectedOptionsMatchCorrect(
  selectedOptionIds: string[],
  correctOptionIds: string[],
): boolean {
  const selected = selectedOptionIds ?? [];
  const correct = correctOptionIds ?? [];

  return (
    selected.length === correct.length &&
    selected.every((id) => correct.includes(id)) &&
    correct.every((id) => selected.includes(id))
  );
}
