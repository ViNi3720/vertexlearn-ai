import Link from "next/link";

export default function LoginPage(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-16 rounded-xl shadow-lg w-full max-w-md">
                <p className="text-sm font-bold text-gray-500 mb-6">Please enter your details</p>
                <h1 className="text-3xl font-bold text-center mb-14">Welcome back</h1>
                <form className="flex flex-col gap-10">
                    <input
                    type="email"
                    placeholder="Enter your email"
                    className="border p-3 rounded-lg outline-none focus:border-black"
                    />
                    <input
                    type="password"
                    placeholder="Enter your password"
                    className="border p-3 rounded-lg outline-none focus:border-black"
                    />
                    <button
                    type="submit"
                    className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300 cursor-pointer"
                    >Login</button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-black font-semibold hover:underline">
                    Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}