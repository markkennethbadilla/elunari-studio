"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  ArrowRight,
  MessageSquare,
  Mic,
  Video,
  Pencil,
  Upload,
  FileText,
  Layers,
  Palette,
  Code2,
  Zap,
  Globe,
  ShoppingCart,
  Layout,
  Briefcase,
  Bot,
  CheckCircle2,
  Star,
  Clock,
  Shield,
  Rocket,
} from "lucide-react";

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 pb-16 overflow-hidden">
      <div className="page-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in"
            style={{
              background: "var(--primary-subtle)",
              color: "var(--primary)",
              border: "1px solid var(--border)",
            }}
          >
            <Layers className="w-4 h-4" />
            AI-Powered Web Development
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            We Build Websites
            <br />
            That{" "}
            <span className="gradient-text">Convert</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 animate-fade-in-up"
            style={{
              color: "var(--text-secondary)",
              animationDelay: "0.2s",
            }}
          >
            Tell us your vision — text, voice, video, or even a sketch.
            <br className="hidden sm:block" />
            Our AI-powered process turns ideas into stunning websites.
          </p>

          {/* CTAs */}
          <div
            id="hero-cta"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/start" className="btn-primary text-lg w-full sm:w-auto !py-4 !px-8">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/chat" className="btn-secondary text-lg w-full sm:w-auto !py-4 !px-8">
              <Bot className="w-5 h-5" />
              Talk to AI
            </Link>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fade-in"
            style={{
              color: "var(--text-muted)",
              animationDelay: "0.5s",
            }}
          >
            <span className="inline-flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4" style={{ color: "#10b981" }} />
              Free Consultation
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4" style={{ color: "var(--accent)" }} />
              2-Week Delivery
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm">
              <Shield className="w-4 h-4" style={{ color: "var(--primary)" }} />
              Money-Back Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ── */
const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Describe Your Vision",
    desc: "Use text, voice, video, drawing, or file uploads. Express your idea however feels natural — we'll understand.",
  },
  {
    num: "02",
    icon: Palette,
    title: "Choose Your Style",
    desc: "Browse our curated gallery of free templates. Pick a look you love, or let us design from scratch.",
  },
  {
    num: "03",
    icon: Code2,
    title: "We Build It",
    desc: "Our team + AI tools turn your vision into a pixel-perfect, high-performance website.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Launch & Grow",
    desc: "Your site goes live with SEO, analytics, and everything you need to start converting visitors.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <div className="page-container">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            From idea to launch in four simple steps. No jargon. No confusion.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 100}>
              <div className="card text-center h-full flex flex-col items-center cursor-pointer">
                {/* Number badge */}
                <div
                  className="text-sm font-bold mb-4 px-3 py-1 rounded-full"
                  style={{
                    background: "var(--primary-subtle)",
                    color: "var(--primary)",
                  }}
                >
                  Step {step.num}
                </div>
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: "var(--primary-subtle)",
                    color: "var(--primary)",
                  }}
                >
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Input Methods ── */
const inputMethods = [
  { icon: FileText, label: "Text", desc: "Type or paste your ideas" },
  { icon: Mic, label: "Voice", desc: "Record a voice note" },
  { icon: Video, label: "Video", desc: "Record or upload video" },
  { icon: Pencil, label: "Draw", desc: "Sketch your layout" },
  { icon: Upload, label: "Upload", desc: "Share files & mockups" },
  { icon: Bot, label: "AI Chat", desc: "Talk to our AI" },
];

function InputMethodsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="page-container">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Explain It <span className="gradient-text">Your Way</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Don&apos;t worry about writing a perfect brief. Use any medium that&apos;s natural to you.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-4xl mx-auto">
          {inputMethods.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 80}>
              <Link
                href="/start"
                className="card flex flex-col items-center text-center py-6 px-3 cursor-pointer group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors"
                  style={{
                    background: "var(--primary-subtle)",
                    color: "var(--primary)",
                  }}
                >
                  <m.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{m.label}</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {m.desc}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services ── */
const services = [
  {
    icon: Layout,
    title: "Landing Pages",
    price: "From $499",
    features: ["Single-page design", "Mobile-responsive", "SEO optimized", "Contact forms"],
  },
  {
    icon: Globe,
    title: "Business Websites",
    price: "From $1,499",
    features: ["Multi-page site", "CMS integration", "Blog setup", "Analytics dashboard"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    price: "From $2,999",
    features: ["Product catalog", "Payment processing", "Inventory management", "Order tracking"],
  },
  {
    icon: Briefcase,
    title: "Web Applications",
    price: "From $4,999",
    features: ["Custom functionality", "User authentication", "API integrations", "Admin panel"],
  },
];

function ServicesPreview() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <div className="page-container">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            From simple landing pages to complex web applications. Choose what fits your needs.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 100}>
              <div className="card h-full flex flex-col cursor-pointer">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "var(--accent-subtle)",
                    color: "var(--accent)",
                  }}
                >
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                <p className="text-2xl font-bold gradient-text mb-4">{s.price}</p>
                <ul className="flex flex-col gap-2 mt-auto">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#10b981" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link href="/services" className="btn-secondary">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── AI Section ── */
function AISection() {
  return (
    <section className="py-20 md:py-28">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                background: "var(--accent-subtle)",
                color: "var(--accent)",
              }}
            >
              <Bot className="w-4 h-4" />
              AI-Powered
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Let Our AI Help You{" "}
              <span className="gradient-text">Clarify Your Vision</span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Not sure what you need? Our AI assistant asks the right questions,
              understands your goals, and creates a detailed project brief —
              so there are zero surprises.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Understands your business goals",
                "Suggests features you might need",
                "Creates a structured project brief",
                "Estimates timeline and budget",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Zap className="w-5 h-5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/chat" className="btn-primary">
              <Bot className="w-5 h-5" />
              Try AI Chat
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          {/* Chat mockup */}
          <ScrollReveal delay={200}>
            <div
              className="card !p-0 overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--primary)",
                  }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Elunari AI</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Online
                  </p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-5 flex flex-col gap-3">
                <div className="chat-bubble assistant">
                  Hi! I&apos;m here to help you plan your perfect website. What type of
                  business are you building this for?
                </div>
                <div className="chat-bubble user">
                  I run a small bakery and need an online ordering system
                </div>
                <div className="chat-bubble assistant">
                  Great choice! For a bakery with online ordering, I&apos;d recommend
                  an e-commerce site with a menu catalog, cart, and local delivery
                  options. Want to pick a template style to get started?
                </div>
              </div>

              {/* Input mockup */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  Type your message...
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                  style={{
                    background: "var(--primary)",
                  }}
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials (placeholder) ── */
function SocialProof() {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "2 wks", label: "Average Delivery" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80}>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                  {s.value}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="card max-w-2xl mx-auto text-center !py-8">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl italic mb-4 leading-relaxed">
              &ldquo;The intake process was incredible — I just recorded a voice
              memo explaining what I wanted, picked a template, and they
              delivered exactly what I envisioned.&rdquo;
            </blockquote>
            <p className="font-semibold">Sarah Chen</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Founder, Sweet Treats Bakery
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Final CTA ── */
function FinalCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="page-container relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something{" "}
            <span className="gradient-text">Amazing</span>?
          </h2>
          <p
            className="text-lg mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Start your project in 5 minutes. No commitment, no jargon —
            just tell us what you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/start" className="btn-primary text-lg w-full sm:w-auto !py-4 !px-10">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/templates" className="btn-secondary text-lg w-full sm:w-auto !py-4 !px-8">
              <Palette className="w-5 h-5" />
              Browse Templates
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Mobile Bottom CTA ── */
function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    if (!heroCta) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bottom bar when hero CTA is NOT visible
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="mobile-cta-bar"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <Link href="/start" className="btn-primary w-full text-center">
        Start Your Project
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <InputMethodsSection />
      <ServicesPreview />
      <AISection />
      <SocialProof />
      <FinalCTA />
      <MobileBottomCTA />
      {/* Extra bottom padding for mobile CTA bar */}
      <div className="h-20 md:hidden" />
    </>
  );
}
