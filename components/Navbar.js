import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Navbar(){
    return(
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
            <Link href="/login" className="bg-black hover:bg-red-600 transition text-white px-6 py-2 rounded-lg font-semibold mt-8">
              Login
            </Link>
        </div>
       </nav>
    )
}