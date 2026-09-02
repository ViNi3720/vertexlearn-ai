import pool from "@/lib/db";
import EnrollButton from "@/components/EnrollButton";

export default async function SingleCoursePage({ params }) {
  const { id } = await params; // params se id nikalo

  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
  const course = result.rows[0];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>
      <EnrollButton courseId={course.id} />
    </div>
  );
}
