import pool from "@/lib/db";
import EnrollButton from "@/components/EnrollButton";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function SingleCoursePage({ params }) {
  const { id } = await params; // params se id nikalo

  // course fetcu
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
  const course = result.rows[0];

  //assessment fetch
  const assessmentResult = await pool.query(
    "SELECT * FROM assessments WHERE course_id = $1",
    [id],
  );
  const assessments = assessmentResult.rows;

  // user ko cookies se nikalo
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  let user = null;
  if (token) {
    try {
      user = jwt.verify(token.value, process.env.JWT_SECRET);
    } catch (err) {
      user = null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>
      <EnrollButton courseId={course.id} />

      {user?.role === "instructor" && user?.id === course.instructor_id && (
        <Link href={`/courses/${course.id}/create-assessment`}>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-4 hover:bg-green-700">
            Create Assessment
          </button>
        </Link>
      )}

      {assessments.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">Assessments</h2>
          {assessments.map((assessment) => (
            <Link
              key={assessment.id}
              href={`/courses/${course.id}/assessment/${assessment.id}`}
            >
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold mr-2 hover:bg-green-700 transition">
                {assessment.title}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
