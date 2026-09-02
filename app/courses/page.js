import pool from "@/lib/db";
import Link from "next/link";

export default async function CoursesPage() {
  const result = await pool.query(
    "SELECT * FROM courses ORDER BY created_at DESC",
  );
  const courses = result.rows;
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Page Heading  bnate hai*/}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Courses</h1>
        <p className="text-gray-600 mt-2">
          Learn new skills with VertexLearn AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow p-5">
            <div className="h-40 bg-gray-200 rounded-lg mb-5 flex items-center justify-center">
              Course Image
            </div>
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{course.status}</span>

              <Link href={`/courses/${course.id}`}>
                <button
                  type="button"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-800 transition cursor-pointer"
                >
                  View Course
                </button>
              </Link>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
}
