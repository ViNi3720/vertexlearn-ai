import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Welcome back,{user?.name}!</h1>

      {user?.role === "student" && (
        <div>
          <p className="text-gray-500 mt-2">
            Here's what's happening with your learning
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8 ">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Enrolled Courses</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <p className="text-3xl font-bold">1</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Avg Progress</p>
              <p className="text-3xl font-bold">63%</p>
            </div>
          </div>
          <h2 className="text-xl font-bold mt-10 mb-4">Your Courses</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-blue-100 h-20 rounded-lg mb-4"></div>
              <p className="font-semibold mb-2">Python Basics</p>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">70% complete</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-green-100 h-20 rounded-lg mb-4"></div>
              <p className="font-semibold mb-2">Data Analysis</p>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">40% complete</p>
            </div>
          </div>
        </div>
      )}

      {user?.role === "instructor" && (
        <div>
          <p className="text-gray-500 mt-2">
            Here's an overview of your courses
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8 ">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1"> Courses Created</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Student</p>
              <p className="text-3xl font-bold">120</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Pending Reviews</p>
              <p className="text-3xl font-bold">8</p>
            </div>
          </div>
          <h2 className="text-xl font-bold mt-10 mb-4">Your Created Courses</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-blue-100 h-20 rounded-lg mb-4"></div>
              <p className="font-semibold mb-2">Web Development 101</p>
              <p className="text-sm text-gray-500">45 students enrolled</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-green-100 h-20 rounded-lg mb-4"></div>
              <p className="font-semibold mb-2">Data Structure & Algorithm</p>
              <p className="text-sm text-gray-500">75 students enrolled</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
