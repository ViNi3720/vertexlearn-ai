"use client";
import { useState } from "react";

export default function TutorPage() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  //handlesend function
  async function handleSend() {
    const userMessage = message;

    //student ka message chatHisory mai add
    const newHisory = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(newHisory);
    setMessage("");

    //info backend ko bhejo
    const res = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    //Ai ka ans bhi chatHistory mai add kro
    setChatHistory([...newHisory, { role: "ai", text: data.reply }]);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col">
      <h1 className="text-2xl font-bold mb-4"> Welcome in AI-Tutor Page</h1>
      <div className="flex-1 bg-white rounded-lg p-6 mb-4 overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={
              chat.role === "user" ? "text-right mb-2" : "text-left mb-2"
            }
          >
            <span className="inline-block bg-gray-200 px-4 py-2 rounded-lg">
              {chat.text}
            </span>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Somethinf..."
          className="flex-1 border p-3 rounded-lg outline-none"
        />
        <button
          type="button"
          onClick={handleSend}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
