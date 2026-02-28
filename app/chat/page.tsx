"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm Elunari Studio's AI assistant. I'm here to help you plan your perfect website.\n\nTo get started, could you tell me:\n1. **What's your business or project about?**\n2. **What type of website are you looking for?** (e.g., landing page, online store, portfolio, web app)\n\nFeel free to share as much or as little as you'd like — I'll guide you through the rest!",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Auto-resize textarea
  const adjustTextarea = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or [start a project directly](/start).",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  // Simple markdown-ish renderer
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Bold
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      );

      // Links
      const withLinks = rendered.map((part, j) => {
        if (typeof part !== "string") return part;
        const linkParts = part.split(/\[([^\]]+)\]\(([^)]+)\)/g);
        return linkParts.map((lp, k) => {
          if (k % 3 === 1) {
            const href = linkParts[k + 1];
            return (
              <Link
                key={j + "-" + k}
                href={href}
                className="underline cursor-pointer"
                style={{ color: "var(--primary)" }}
              >
                {lp}
              </Link>
            );
          }
          if (k % 3 === 2) return null; // consumed by link
          return lp;
        });
      });

      if (line.trim() === "") return <br key={i} />;
      return (
        <p key={i} className="mb-1">
          {withLinks}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Header */}
      <div
        className="sticky top-16 z-30"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
      >
        <div className="page-container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "var(--primary)",
              }}
            >
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">Elunari AI Consultant</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                <span
                  className="inline-block w-2 h-2 rounded-full mr-1"
                  style={{ background: "#10b981" }}
                />
                Online — Ask me anything about your project
              </p>
            </div>
          </div>
          <button
            onClick={resetChat}
            className="p-2 rounded-lg cursor-pointer"
            style={{
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6">
        <div className="page-container max-w-3xl flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{
                  background:
                    msg.role === "assistant"
                      ? "var(--primary)"
                      : "var(--accent-subtle)",
                }}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User
                    className="w-4 h-4"
                    style={{ color: "var(--accent)" }}
                  />
                )}
              </div>

              {/* Bubble */}
              <div className={"chat-bubble " + msg.role}>
                {renderContent(msg.content)}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{
                  background: "var(--primary)",
                }}
              >
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-bubble assistant flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Thinking...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions (when few messages) */}
      {messages.length <= 2 && !loading && (
        <div className="page-container max-w-3xl mb-4">
          <div className="flex flex-wrap gap-2">
            {[
              "I need a landing page for my startup",
              "I want an online store for my bakery",
              "I need a portfolio website",
              "Build me a booking website",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInput(suggestion);
                  setTimeout(() => sendMessage(), 0);
                }}
                className="px-3 py-2 rounded-xl text-sm cursor-pointer transition-all"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <ArrowRight
                  className="w-3 h-3 inline mr-1.5"
                  style={{ color: "var(--primary)" }}
                />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div
        className="sticky bottom-0 z-30"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
      >
        <div className="page-container max-w-3xl py-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustTextarea();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Describe your project idea..."
              className="input flex-1 !min-h-0 !py-3"
              rows={1}
              style={{ resize: "none" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="btn-primary !p-3 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Press Enter to send, Shift+Enter for new line
            </p>
            <Link
              href="/start"
              className="text-xs inline-flex items-center gap-1 cursor-pointer"
              style={{ color: "var(--primary)" }}
            >
              Or use our project wizard
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
