import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    // frontend se data nikalo //
    const { title, description, category, price, level } = await request.json();
    // feild check kro
    if (!title || !description) {
      return NextResponse.json(
        { message: "All feilds are required" },
        { status: 400 },
      );
    }
    //cockeis nikalo
    const cockeiStore = await cookies();
    const token = cockeiStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }
    const user = jwt.verify(token.value, process.env.JWT_SECRET);

    //database mai inset kro
    const result = await pool.query(
      "INSERT INTO courses (title, description, instructor_id, metadata) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, user.id, JSON.stringify({ category, price, level })],
    );

    // responce return kr do
    return NextResponse.json(
      { message: "Course Created", course: result.rows[0] },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wront" },
      { status: 500 },
    );
  }
}
