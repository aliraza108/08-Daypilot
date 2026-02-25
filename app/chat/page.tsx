"use client";

import { FormEvent, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { useDayPilotStore } from "@/lib/store";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const sendChatMessage = useDayPilotStore((s) => s.sendChatMessage);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "I am your AI coach. Tell me your priority for today." }
  ]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content }]);
    const reply = await sendChatMessage(content);
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  };

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-7rem)] flex-col rounded-2xl border border-borderSubtle bg-bgCard p-4 sm:p-6">
        <h1 className="font-heading text-3xl font-bold">AI Coach</h1>
        <div className="mt-4 flex-1 space-y-3 overflow-auto pr-1">
          {messages.map((msg, index) => (
            <div
              key={`${msg.role}-${index}`}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "assistant"
                  ? "bg-bgSecondary text-textSecondary"
                  : "ml-auto bg-accentGreen text-black"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for schedule optimization..."
            className="h-11 w-full rounded-full border border-borderSubtle bg-bgSecondary px-4 text-sm outline-none transition focus:border-accentGreen"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full bg-accentGreen px-5 text-sm font-semibold text-black transition hover:scale-[1.03]"
          >
            Send
          </button>
        </form>
      </div>
    </AppShell>
  );
}
