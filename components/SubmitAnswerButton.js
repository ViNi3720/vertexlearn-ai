"use client";
import { useState } from "react";
export default function SubmitAnswerButton({ assessmentId }) {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState("null");

  async function handleSubmit() {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentId, answers: [{ answer }] }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Submitted successfully!");
      setScore(data.score);
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <input
        type="text"
        placeholder="Your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-3 rounded-lg outline-none focus:border-black w-full mb-4"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        Submit Answer
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      {score !== null && <p>Your score: {score}</p>}
    </div>
  );
}
