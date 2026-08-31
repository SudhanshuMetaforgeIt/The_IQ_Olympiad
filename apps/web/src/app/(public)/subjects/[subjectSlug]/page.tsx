/**
 * Subject Details Page
 *
 * Dynamic public route:
 * /subjects/[subjectSlug]
 *
 * Displays detailed information about a specific subject,
 * including syllabus, topics, supported classes,
 * and Olympiad availability.
 */
export default function SubjectDetailsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Subject Details</h1>
      <div className="space-y-4">
        {["Classes 1–4 (Primary Foundations)", "Classes 5–8 (Middle Intermediate)", "Classes 9–12 (Senior Advanced)"].map((tier, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">{tier}</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Covers core curriculum concepts with higher-order thinking skill (HOTS) questions and speed exercises.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}