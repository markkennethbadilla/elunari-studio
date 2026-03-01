"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/templates", label: "Templates" },
  { href: "/chat", label: "AI Chat" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="page-container">
        <nav className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold cursor-pointer"
            style={{ color: "var(--text)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="Elunari Studio" width={32} height={32} className="w-8 h-8" />
            <span>
              Elunari{" "}
              <span style={{ color: "var(--primary)" }}>Studio</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium cursor-pointer transition-colors hover:opacity-80"
                style={{ color: "var(--text-secondary)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/start" className="btn-primary text-sm !py-2.5 !px-5">
              Start a Project
            </Link>
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-lg cursor-pointer transition-colors"
                style={{
                  color: "var(--text-muted)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-lg cursor-pointer"
                style={{
                  color: "var(--text-muted)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            )}
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg cursor-pointer"
              style={{ color: "var(--text)" }}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden glass animate-fade-in"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="page-container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium py-2 cursor-pointer"
                style={{ color: "var(--text-secondary)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/start"
              onClick={() => setOpen(false)}
              className="btn-primary text-center mt-2"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
