"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  CheckCircle2,
  ArrowRight,
  Layout,
  Globe,
  ShoppingCart,
  Briefcase,
  Star,
  Zap,
  Headphones,
  RefreshCw,
  Shield,
  Rocket,
  Code2,
  Palette,
  Search,
  BarChart3,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";

/* ── Pricing Tiers ── */
const tiers = [
  {
    name: "Starter",
    price: "$499",
    period: "one-time",
    desc: "Perfect for simple landing pages and personal sites.",
    icon: Layout,
    popular: false,
    features: [
      "Single-page design",
      "Mobile-responsive",
      "Contact form",
      "SEO basics",
      "SSL certificate",
      "1 round of revisions",
      "2-week delivery",
    ],
    cta: "Start Project",
  },
  {
    name: "Business",
    price: "$1,499",
    period: "one-time",
    desc: "Multi-page site with CMS for growing businesses.",
    icon: Globe,
    popular: true,
    features: [
      "Up to 10 pages",
      "Content management system",
      "Blog integration",
      "Contact forms & maps",
      "SEO optimization",
      "Analytics setup",
      "Social media integration",
      "3 rounds of revisions",
      "3-week delivery",
    ],
    cta: "Start Project",
  },
  {
    name: "Commerce",
    price: "$2,999",
    period: "one-time",
    desc: "Full-featured online store with payment processing.",
    icon: ShoppingCart,
    popular: false,
    features: [
      "Product catalog (unlimited)",
      "Shopping cart & checkout",
      "Payment processing (Stripe/PayPal)",
      "Inventory management",
      "Order tracking",
      "Customer accounts",
      "Discount & coupon system",
      "Email notifications",
      "4 rounds of revisions",
      "4-week delivery",
    ],
    cta: "Start Project",
  },
  {
    name: "Custom App",
    price: "$4,999",
    period: "starting at",
    desc: "Custom web applications with complex functionality.",
    icon: Briefcase,
    popular: false,
    features: [
      "Custom functionality",
      "User authentication",
      "Database design",
      "API integrations",
      "Admin dashboard",
      "Role-based access",
      "Automated workflows",
      "Performance optimization",
      "Unlimited revisions",
      "Timeline varies",
    ],
    cta: "Get Quote",
  },
];

/* ── Process Steps ── */
const process = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Discovery",
    desc: "Tell us your vision through text, voice, video, or chat with our AI. We'll understand your needs.",
    duration: "Day 1",
  },
  {
    num: "02",
    icon: Palette,
    title: "Design",
    desc: "We create mockups based on your chosen template and preferences. Review and approve before we build.",
    duration: "Days 2-5",
  },
  {
    num: "03",
    icon: Code2,
    title: "Development",
    desc: "Our team builds your site with clean code, responsive design, and modern best practices.",
    duration: "Days 5-12",
  },
  {
    num: "04",
    icon: Search,
    title: "Testing & QA",
    desc: "We test across all devices and browsers. Performance optimization and SEO setup included.",
    duration: "Days 12-13",
  },
  {
    num: "05",
    icon: Rocket,
    title: "Launch",
    desc: "Your site goes live! We handle deployment, DNS, SSL, and provide a launch checklist.",
    duration: "Day 14",
  },
];

/* ── Add-ons ── */
const addons = [
  { icon: BarChart3, name: "Analytics Dashboard", price: "+$199", desc: "Custom Google Analytics setup with conversion tracking" },
  { icon: Search, name: "Advanced SEO Package", price: "+$299", desc: "Keyword research, meta optimization, schema markup" },
  { icon: RefreshCw, name: "Monthly Maintenance", price: "$99/mo", desc: "Updates, backups, security monitoring, content changes" },
  { icon: Headphones, name: "Priority Support", price: "$49/mo", desc: "24-hour response time, priority bug fixes" },
  { icon: Users, name: "User Training", price: "+$149", desc: "Video walkthrough of your CMS and admin panel" },
  { icon: Shield, name: "Security Package", price: "+$199", desc: "WAF, DDoS protection, malware scanning" },
];

/* ── Why Us ── */
const reasons = [
  { icon: Zap, title: "Fast Delivery", desc: "Most projects launch in 2 weeks or less" },
  { icon: Star, title: "Quality Code", desc: "Clean, modern codebase built to last" },
  { icon: Clock, title: "24/7 Communication", desc: "We're always available via chat or email" },
  { icon: Shield, title: "Money-Back Guarantee", desc: "Not happy? Full refund within 14 days" },
  { icon: RefreshCw, title: "Free Revisions", desc: "Multiple revision rounds included in every plan" },
  { icon: Rocket, title: "Growth-Ready", desc: "Sites built to scale as your business grows" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-secondary)" }}>
        <div className="page-container text-center">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Services & <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
              Transparent pricing, no hidden fees. Every plan includes responsive design,
              SEO optimization, and a free consultation.
            </p>
            <Link href="/start" className="btn-primary text-lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 100}>
                <div
                  className="card h-full flex flex-col relative"
                  style={{
                    borderColor: tier.popular ? "var(--primary)" : undefined,
                  }}
                >
                  {tier.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: "var(--primary)",
                        color: "#fff",
                      }}
                    >
                      Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <tier.icon
                      className="w-8 h-8 mb-3"
                      style={{ color: "var(--primary)" }}
                    />
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                      {tier.desc}
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold gradient-text">{tier.price}</span>
                    <span className="text-sm ml-2" style={{ color: "var(--text-muted)" }}>
                      {tier.period}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: "#10b981" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/start"
                    className={tier.popular ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-secondary)" }}>
        <div className="page-container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              From idea to launch in 2 weeks. Here&apos;s how we work.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {process.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 100}>
                <div className="card flex gap-5">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--primary)",
                      }}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    {i < process.length - 1 && (
                      <div
                        className="w-0.5 flex-1 mt-3"
                        style={{ background: "var(--border)" }}
                      />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--accent-subtle)",
                          color: "var(--accent)",
                        }}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Optional <span className="gradient-text">Add-ons</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Enhance your project with these optional services.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {addons.map((addon, i) => (
              <ScrollReveal key={addon.name} delay={i * 80}>
                <div className="card h-full cursor-pointer">
                  <div className="flex items-start gap-3">
                    <addon.icon
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "var(--accent)" }}
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold">{addon.name}</h3>
                        <span className="text-sm font-bold gradient-text">{addon.price}</span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        {addon.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-secondary)" }}>
        <div className="page-container">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why <span className="gradient-text">Elunari Studio</span>?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {reasons.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 80}>
                <div className="card text-center h-full">
                  <r.icon
                    className="w-8 h-8 mx-auto mb-3"
                    style={{ color: "var(--primary)" }}
                  />
                  <h3 className="font-semibold mb-1">{r.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {r.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="page-container text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Start your project in 5 minutes. We&apos;ll get back to you within 24 hours
              with a custom proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start" className="btn-primary text-lg w-full sm:w-auto">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/chat" className="btn-secondary text-lg w-full sm:w-auto">
                Talk to AI First
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
