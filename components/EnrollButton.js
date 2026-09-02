"use client";
import { useState } from "react";

export default function EnrollButton({ courseId }) {
  const [message, setMessage] = useState("");

  async function handleEnroll() {
    const res = await fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Enrolled successfully!");
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleEnroll}
        className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
      >
        Enroll Now
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
