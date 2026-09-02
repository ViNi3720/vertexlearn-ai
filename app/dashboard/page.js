import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export default async function dashboardPage() {
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
  console.log(user);
  // student ke liye
  const enrollmentsResult = await pool.query(
    `SELECT courses.id, courses.title, enrollments.progress_pct, enrollments.status
   FROM enrollments 
   JOIN courses ON enrollments.course_id = courses.id 
   WHERE enrollments.student_id = $1`,
    [user?.id],
  );
  const enrolledCourses = enrollmentsResult.rows;
  const completedCount = enrolledCourses.filter(
    (course) => course.status === "completed",
  ).length;

  const avgProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce(
            (sum, course) => sum + Number(course.progress_pct),
            0,
          ) / enrolledCourses.length,
        )
      : 0;
  // instructor ke liye
  const createdCoursesResult = await pool.query(
    "SELECT * FROM courses WHERE instructor_id = $1",
    [user?.id],
  );
  const createdCourses = createdCoursesResult.rows;

  const totalStudentsResult = await pool.query(
    `SELECT COUNT(*) FROM enrollments 
   JOIN courses ON enrollments.course_id = courses.id 
   WHERE courses.instructor_id = $1`,
    [user?.id],
  );
  const totalStudents = totalStudentsResult.rows[0].count;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Welcome back,{user?.name}!</h1>

      {user?.role === "student" && (
        <div>
          <p className="text-gray-500 mt-2">
            Here's what's happening with your learning
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Enrolled Courses</p>
              <p className="text-3xl font-bold">{enrolledCourses.length}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <p className="text-3xl font-bold">{completedCount}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Avg Progress</p>
              <p className="text-3xl font-bold">{avgProgress}%</p>
            </div>
          </div>
          <h2 className="text-xl font-bold mt-10 mb-4">Your Courses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="bg-blue-100 h-20 rounded-lg mb-4"></div>
                <p className="font-semibold mb-2">{course.title}</p>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${course.progress_pct}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">
                  {course.progress_pct}% complete
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {user?.role === "instructor" && (
        <div>
          <p className="text-gray-500 mt-2">
            Here's an overview of your courses
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1"> Courses Created</p>
              <p className="text-3xl font-bold">{createdCourses.length}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Student</p>
              <p className="text-3xl font-bold">{totalStudents}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Pending Reviews</p>
              <p className="text-3xl font-bold">8</p>
            </div>
          </div>
          <h2 className="text-xl font-bold mt-10 mb-4">Your Created Courses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {createdCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="bg-blue-100 h-20 rounded-lg mb-4"></div>
                <p className="font-semibold mb-2">{course.title}</p>
                <p className="text-sm text-gray-500">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
