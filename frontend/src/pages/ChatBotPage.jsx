import { useState } from "react";

export default function ChatBotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askAI = async (question) => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "AI failed");
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to connect to AI",
        },
      ]);
      setError("AI service not available");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-4">
      <h1 className="text-center text-3xl font-bold text-teal-300 mb-6">
        EduMantra AI Tutor
      </h1>

      <div className="max-w-3xl mx-auto bg-slate-800/50 p-6 rounded-xl shadow-lg h-[60vh] overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-4 ${
              m.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-xl ${
                m.sender === "user"
                  ? "bg-teal-400 text-black"
                  : "bg-slate-700 text-white"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-teal-300 animate-pulse">
            AI is typing…
          </p>
        )}

        {error && (
          <p className="text-sm text-red-400 mt-3">{error}</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything…"
          className="flex-1 bg-slate-800 border border-slate-600 px-4 py-2 rounded-lg"
          onKeyDown={(e) =>
            e.key === "Enter" && askAI(input)
          }
        />
        <button
          onClick={() => askAI(input)}
          className="px-6 py-2 bg-teal-400 text-black rounded-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
