import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Rewind } from "lucide-react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

// gemini se connection
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    // message user se
    const { message } = await request.json();

    // login check krna hai student ka data nikal kr
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    let context = " ";
    if (token) {
      //user ko variefy kro
      const user = jwt.verify(token.value, process.env.JWT_SECRET);

      // student k enrollement aur score nikal lo
      const enrollmentsResult = await pool.query(
        `SELECT courses.title, enrollments.progress_pct 
         FROM enrollments 
         JOIN courses ON enrollments.course_id = courses.id 
         WHERE enrollments.student_id = $1`,
        [user.id],
      );
      const enrolledCourses = enrollmentsResult.rows;

      // 3. Context banao (text format mein)
      if (enrolledCourses.length > 0) {
        context = `This student (${user.name}) is enrolled in: `;
        enrolledCourses.forEach((course) => {
          context += `${course.title} (${course.progress_pct}% complete), `;
        });
        context +=
          ". Keep this in mind when answering, and relate your answer to their courses if relevant.";
      }
    }
    // kaun sa model use hua gemini ka
    const model = genAI.getGenerativeModel({ model: "gemini-3.7-flash" });

    const fullPrompt = context
      ? `${context}\n\nStudent's question: ${message}`
      : message;

    const result = await model.generateContent(fullPrompt);
    const responce = result.response;
    const text = responce.text(); //shirph text aayega gemini se

    return NextResponse.json({ reply: text }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
