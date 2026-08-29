"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      const data = await res.json();
      setUser(data.user);
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  }
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white/10 backdrop-blur-md">
      <div className="flex gap-3 text-2xl font-bold">
        <BrainCircuit className="w-8 h-8 text-orange-400" />
        <span>VertexLearn-AI</span>
      </div>

      <div className="flex gap-8  font-semibold">
        <Link href="/">Home</Link>
        <Link href="/course">Course</Link>
        <Link href="/mentor">Mentor</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
      </div>
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-black hover:bg-gray-600 transition text-white px-6 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-black hover:bg-gray-600 transition text-white px-6 py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
