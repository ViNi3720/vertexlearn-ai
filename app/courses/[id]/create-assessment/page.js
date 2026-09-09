"use client";
import { defaultConfig } from "next/dist/server/config-shared";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CreateAssessmentPage() {
  //URL se course id nikal
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // handle function bnao
  async function handleSubmit(e) {
    e.preventDefault(); // bina mtlb ke reload ko rokne ke liye
    const res = await fetch("/api/assessments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: id,
        title,
        questions: [{ question, answer }],
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Assessment created successfully!");
      setTitle("");
      setQuestion("");
      setAnswer("");
    } else {
      alert(data.message);
    }
  }
  return (
    <div className="min-h-screen bg-grey-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-8">Create Assessment</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assessment Title"
            className="border p-3 rounded-lg outline-none focus:border-black"
          />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            className="border p-3 rounded-lg outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Correct Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-black"
          />
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Create Assessment
          </button>
        </form>
      </div>
    </div>
  );
}
