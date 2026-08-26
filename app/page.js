

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-white flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-sm uppercase tracking-widest text-indigo-200 mb-4">
          AI-Powered Learning
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Welcome to <span className="text-orange-400">VertexLearn AI</span>
        </h1>
        <p className="text-lg text-indigo-100 max-w-xl mb-8">
          Personalized learning, intelligent tutoring, and real-time support —
          all powered by AI, built for the way you actually learn.
        </p>
        <div className="flex gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>
          <button className="border border-white/40 hover:bg-white/10 transition px-6 py-3 rounded-lg font-semibold">
            Explore Courses
          </button>
        </div>
      </div>
    </main>
  );
}