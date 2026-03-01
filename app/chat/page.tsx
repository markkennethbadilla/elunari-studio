"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  ArrowRight,
  RotateCcw,
  Sparkles,
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
  const isInitialMount = useRef(true);

  // Auto-scroll on new messages (skip initial render)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
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

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const errorMsg =
          res.status === 429
            ? "I'm getting a lot of requests right now. Please wait a moment and try again."
            : res.status === 503
              ? "Our AI is temporarily busy. Please try again in about a minute, or [start a project directly](/start)."
              : "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or [start a project directly](/start).";
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: data.error || errorMsg },
        ]);
        return;
      }

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
    <div className="pt-16 h-dvh flex flex-col">
      {/* Header */}
      <div
        className="flex-shrink-0 z-30"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
      >
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                Elunari AI Consultant
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: "#10b981" }}
                />
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Online
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/start"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer"
              style={{
                color: "var(--primary)",
                background: "var(--primary-subtle)",
              }}
            >
              <Sparkles className="w-3 h-3" />
              Project Wizard
            </Link>
            <button
              onClick={resetChat}
              className="p-2 rounded-lg cursor-pointer transition-colors"
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
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
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
              <div
                className={
                  "max-w-[80%] rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed " +
                  (msg.role === "user"
                    ? "rounded-br-md ml-auto"
                    : "rounded-bl-md")
                }
                style={
                  msg.role === "user"
                    ? { background: "var(--primary)", color: "#fff" }
                    : {
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }
                }
              >
                {renderContent(msg.content)}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "var(--primary)" }}
              >
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div
                className="rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: "var(--primary)" }} />
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
        <div className="flex-shrink-0 max-w-3xl mx-auto w-full px-4 pb-3">
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
                className="px-3 py-2 rounded-xl text-sm cursor-pointer transition-colors"
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
        className="flex-shrink-0 z-30"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div
            className="flex items-end gap-2 rounded-xl px-3 py-2"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustTextarea();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Describe your project idea..."
              className="flex-1 bg-transparent border-none outline-none text-[0.9375rem] leading-relaxed resize-none"
              rows={1}
              style={{ color: "var(--text)", minHeight: "1.5rem", maxHeight: "120px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-1.5 px-1">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Enter to send · Shift+Enter for new line
            </p>
            <Link
              href="/start"
              className="text-xs inline-flex items-center gap-1 cursor-pointer sm:hidden"
              style={{ color: "var(--primary)" }}
            >
              Project wizard
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
