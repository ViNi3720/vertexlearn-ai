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
    // NAYA Assessment ka data nikalo

    const assessmentResult = await pool.query(
      "SELECT * FROM assessments WHERE id = $1",
      [assessmentId],
    );
    const assessment = assessmentResult.rows[0];
    const correctQuestions = assessment.questions;

    //NAYA score calculate kro
    let correctCount = 0;
    for (let i = 0; i < answers.length; i++) {
      const studentAnswer = answers[i].answer.toLowerCase().trim();
      const correctAnswer = correctQuestions[i].answer.toLowerCase().trim();

      if (studentAnswer === correctAnswer) {
        correctCount++;
      }
    }

    const score =
      (correctCount / correctQuestions.length) * assessment.max_score;

    // datadase mai save kro(ab score bhi save kro)
    const result = await pool.query(
      "INSERT INTO submissions (assessment_id, student_id, answers, score, graded_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [assessmentId, user.id, JSON.stringify(answers), score, new Date()],
    );

    // responce ko return kro
    return NextResponse.json(
      { message: "Submitted successfully", submission: result.rows[0], score },
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
