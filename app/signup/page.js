"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage(){
    const[name, setName] = useState("");
    const [email, setEmail] = useState("");
    const[password, setPassword]=useState("");
    const[role, setRole] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();// page reloade ko rokne ke liye
        const res = await fetch("/api/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({name,email,password,role}),
        });

        const data = await res.json()
        console.log(data);
        
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-16 rounded-xl shadow-lg w-full max-w-lg">
                <p className="text-sm font-bold text-gray-500 mb-6">Please enter your details</p>
                <h1 className="text-3xl font-bold text-center mb-14">Create your account</h1>
                <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Type your name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="border p-3 rounded-lg outline-none focus:border-black"
                    />
                    <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3 rounded-lg outline-none focus:border-black"
                    />
                    <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 rounded-lg outline-none focus:border-black"
                    />
                    <div className="flex gap-4">
                        <button
                        type="button"
                        onClick={() => setRole("student")}
                        className="flex-1 border p-3 rounded-lg font-semibold hover:bg-gray-100"
                        >
                        Student
                        </button>
                        <button
                        type="button"
                        onClick={() => setRole("instructor")}
                        className="flex-1 border p-3 rounded-lg font-semibold hover:bg-gray-100"
                        >
                        Instructor
                        </button>
                    </div>
                    <button
                    type="submit"
                    className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition duration-300 cursor-pointer"
                    >Signup</button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Alredy have an account?{" "}
                    <Link href="/login" className="text-black font-semibold hover:underline">
                    Login
                    </Link>
                </p>

            </div>
        </div>
    )
}