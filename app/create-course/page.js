"use client";
import { useState } from "react";

{
  /* UI form bnana hai course add krne ke liy
    1.course Title
    2.Description
    3.price,etc abhi simple rkhte hai
*/
}
export default function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, description, category, price, level }),
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Create a New Course</h1>
        <p className="text-gray-500 mb-6">Add details about your course</p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course Title"
            className="border p-4 rounded-xl outline-none focus:border-black"
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-4 rounded-lg outline-none focus:border-black"
            rows="4"
          ></textarea>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-black rounded-lg p-4"
          >
            <option>Select Category</option>
            <option>Web Development</option>
            <option>Python Programming</option>
            <option>Data Science</option>
            <option>Data Structure & Algorithm</option>
          </select>

          {/*Course Image */}
          <input
            type="file"
            className="w-full border border-black rounded-lg p-4"
          />

          {/*Price */}
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border border-black rounded-lg p-4 outline-none focus:border-black"
          />

          {/* Level */}
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border border-black rounded-lg p-4"
          >
            <option>Select Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}
