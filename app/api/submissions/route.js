import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    // front se data niklo
    const { assessmentId, answers } = await request.json();
    // login check kro coookies se
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Please login first" },
        { status: 401 },
      );
    }
    const user = jwt.verify(token.value, process.env.JWT_SECRET);

    if (user.role !== "student") {
      return NextResponse.json(
        { message: "Only students can submit assessments" },
        { status: 403 },
      );
    }
    // datadase mai save kro
    const result = await pool.query(
      "INSERT INTO submissions (assessment_id, student_id, answers) VALUES ($1, $2, $3) RETURNING *",
      [assessmentId, user.id, JSON.stringify(answers)],
    );

    // responce ko return kro
    return NextResponse.json(
      { message: "Submitted successfully", submission: result.rows[0] },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
