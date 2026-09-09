import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Rewind } from "lucide-react";

// gemini se connection
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    // message user se
    const { message } = await request.json();
    // kaun sa model use hua gemini ka
    const model = genAI.getGenerativeModel({ model: "gemini-3.7-flash" });

    const result = await model.generateContent(message);
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
