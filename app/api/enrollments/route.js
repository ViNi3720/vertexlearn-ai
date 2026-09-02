import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { courseId } = await request.json();

    //login check kro aur check kro ke kya oh student hai n
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse({ message: "Please Login First" }, { status: 401 });
    }

    const user = jwt.verify(token.value, process.env.JWT_SECRET);
    if (user.role !== "student") {
      return NextResponse.json(
        { message: "Only Student can enroll in courses" },
        { status: 403 },
      );
    }

    //data base mai save krte hai
    const result = await pool.query(
      "INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *",
      [user.id, courseId],
    );
    //responce return kr do
    return NextResponse.json(
      { message: "Enrolled successfully", enrollment: result.rows[0] },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something Went Wrong" },
      { status: 500 },
    );
  }
}
