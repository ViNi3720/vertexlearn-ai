import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    // frontend se data
    const { courseId, title, questions } = await request.json();

    //login check kro cookies se
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Please login first" },
        { status: 401 },
      );
    }
    const user = jwt.verify(token.value, process.env.JWT_SECRET);

    //Role check
    if (user.role !== "instructor") {
      return NextResponse.json(
        { message: "Only instructors can create assessments" },
        { status: 403 },
      );
    }

    //database mai insurt kro
    const result = await pool.query(
      "INSERT INTO assessments (course_id, title, type, questions) VALUES ($1, $2, $3, $4) RETURNING *",
      [courseId, title, "quiz", JSON.stringify(questions)],
    );

    //responsce return kr de success ka
    return NextResponse.json(
      { message: "Assessment created", assessment: result.rows[0] },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
