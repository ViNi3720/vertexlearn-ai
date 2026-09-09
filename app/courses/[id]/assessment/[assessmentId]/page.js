import pool from "@/lib/db";
import SubmitAnswerButton from "@/components/SubmitAnswerButton";

export default async function AssessmentPage({ params }) {
  // extract id
  const { id, assessmentId } = await params;

  const result = await pool.query("SELECT * FROM assessments WHERE id = $1", [
    assessmentId,
  ]);
  const assessment = result.rows[0];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">{assessment.title}</h1>

      {assessment.questions.map((q, index) => (
        <div key={index} className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <p className="font-semibold mb-3">{q.question}</p>
        </div>
      ))}

      <SubmitAnswerButton
        assessmentId={assessment.id}
        questions={assessment.questions}
      />
    </div>
  );
}
