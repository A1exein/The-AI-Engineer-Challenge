"use client";

import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "@/lib/api";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const { reply } = await sendChatMessage(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen max-w-3xl mx-auto px-4 py-6">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Mental Coach</h1>
        <p className="text-muted text-sm mt-1">A supportive AI coach — share what’s on your mind.</p>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <p className="text-muted text-center py-8">
            Say hello and start the conversation. Your messages stay between you and the coach.
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`message-bubble rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-highlight text-white rounded-br-md"
                  : "bg-card text-text border border-accent rounded-bl-md"
              }`}
            >
              <span className="whitespace-pre-wrap break-words">{msg.content}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="message-bubble rounded-2xl rounded-bl-md px-4 py-3 bg-card text-muted border border-accent">
              <span className="animate-pulse">Thinking…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="mb-3 px-4 py-2 rounded-lg bg-red-900/40 text-red-200 text-sm" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          disabled={loading}
          className="flex-1 min-w-0 rounded-xl bg-card border border-accent px-4 py-3 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent disabled:opacity-60"
          aria-label="Message"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-highlight text-white px-5 py-3 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-highlight disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
