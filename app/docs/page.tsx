"use client"

import { useState } from "react"
import Link from "next/link"

type Section = { id: string; label: string }

const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "pages", label: "Pages & Routes" },
  { id: "wizard", label: "Project Wizard" },
  { id: "chat", label: "AI Chat" },
  { id: "templates", label: "Template Gallery" },
  { id: "services", label: "Services & Pricing" },
  { id: "stack", label: "Tech Stack" },
  { id: "deploy", label: "Hosting & Deploy" },
]

const C: Record<string, { title: string; html: string }> = {
  overview: { title: "Elunari Studio — Overview", html: `
<p><strong>Elunari Studio</strong> at <code>studio.elunari.uk</code> is a freelance web development business landing site with an AI-powered client intake system. It showcases services, templates, pricing, and lets clients describe their project through multiple input modes.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Multi-Modal Intake</strong> — Text, voice recording, video capture, drawing canvas, file upload</li>
  <li><strong>5-Step Project Wizard</strong> — Guided flow from project type to contact info</li>
  <li><strong>AI Chat</strong> — Gemini 2.0 Flash-powered conversational requirement extraction</li>
  <li><strong>Template Gallery</strong> — 16 curated free templates from Vercel, HTML5 UP, Tailwind UI, and more</li>
  <li><strong>4 Service Tiers</strong> — Starter ($499), Business ($1,499), Commerce ($2,999), Custom ($4,999+)</li>
  <li><strong>Dark/Light Theme</strong> — Glassmorphism design with smooth theme transitions</li>
  <li><strong>Mobile-First</strong> — Bottom CTA bar, large touch targets, responsive layouts</li>
</ul>
` },
  pages: { title: "Pages & Routes", html: `
<table>
  <tr><th>Path</th><th>Description</th></tr>
  <tr><td><code>/</code></td><td>Landing page — hero, 4-step process, input methods showcase, services preview, AI section, testimonials, CTA</td></tr>
  <tr><td><code>/start</code></td><td>5-step project wizard — type, describe (multi-modal), features, budget & timeline, contact</td></tr>
  <tr><td><code>/templates</code></td><td>16 curated template cards with search, category filter, and source filter</td></tr>
  <tr><td><code>/chat</code></td><td>AI chat interface with Gemini 2.0 Flash, suggestion chips, markdown rendering</td></tr>
  <tr><td><code>/services</code></td><td>4 pricing tiers, process timeline, add-ons, why-us section</td></tr>
  <tr><td><code>/privacy</code></td><td>Privacy policy</td></tr>
  <tr><td><code>/terms</code></td><td>Terms of service</td></tr>
  <tr><td><code>/docs</code></td><td>This documentation page</td></tr>
  <tr><td><code>/api/chat</code></td><td>POST — Gemini 2.0 Flash proxy with web consultant system prompt</td></tr>
</table>
` },
  wizard: { title: "Project Wizard", html: `
<p>The <code>/start</code> page guides clients through a 5-step project intake process.</p>

<h2>Steps</h2>
<ol>
  <li><strong>Project Type</strong> — Select: Landing Page, Business Website, E-Commerce, Web App, Portfolio, Blog, Other</li>
  <li><strong>Describe</strong> — Multi-modal input with 5 methods:
    <ul>
      <li><strong>Text</strong> — Free-form text description</li>
      <li><strong>Voice</strong> — MediaRecorder voice capture with playback</li>
      <li><strong>Video</strong> — Camera/screen recording with preview</li>
      <li><strong>Drawing</strong> — HTML5 Canvas with colors, brush sizes, undo</li>
      <li><strong>File Upload</strong> — Drag & drop files (PDFs, images, docs) with preview</li>
    </ul>
  </li>
  <li><strong>Features</strong> — Checklist of common features (responsive, SEO, CMS, etc.)</li>
  <li><strong>Budget & Timeline</strong> — Budget range and delivery timeline selection</li>
  <li><strong>Contact</strong> — Name, email, phone, submit</li>
</ol>
` },
  chat: { title: "AI Chat", html: `
<p>The <code>/chat</code> page provides a conversational AI assistant powered by Gemini 2.0 Flash via <code>/api/chat</code>.</p>

<h2>Features</h2>
<ul>
  <li><strong>Suggestion Chips</strong> — Quick-start prompts for common project types</li>
  <li><strong>Markdown Rendering</strong> — AI responses render as formatted HTML</li>
  <li><strong>Auto-Scroll</strong> — Chat scrolls to latest message automatically</li>
  <li><strong>System Prompt</strong> — AI acts as a web development consultant, extracting requirements</li>
</ul>

<h2>Backend</h2>
<p><code>/api/chat</code> → Proxies to Gemini 2.0 Flash API. API key stored in <code>.env.local</code> as <code>GEMINI_API_KEY</code>.</p>
` },
  templates: { title: "Template Gallery", html: `
<p>16 curated free templates from trusted sources, displayed at <code>/templates</code>.</p>

<h2>Template Sources</h2>
<table>
  <tr><th>Source</th><th>Templates</th></tr>
  <tr><td>Vercel</td><td>Commerce, Portfolio, Blog, AI Chatbot, SaaS Starter</td></tr>
  <tr><td>HTML5 UP</td><td>Dimension, Massively, Phantom, Stellar, Hyperspace, Forty</td></tr>
  <tr><td>Tailwind UI</td><td>Spotlight, Syntax</td></tr>
  <tr><td>Other</td><td>AstroPaper, Open Pro, Material Kit</td></tr>
</table>

<h2>Features</h2>
<ul>
  <li>Search by name or description</li>
  <li>Filter by category (Portfolio, Blog, E-Commerce, etc.)</li>
  <li>Filter by source (Vercel, HTML5 UP, etc.)</li>
  <li>Select template and proceed to project wizard</li>
</ul>
<p>Template data lives in <code>lib/templates-data.ts</code>.</p>
` },
  services: { title: "Services & Pricing", html: `
<h2>Tiers</h2>
<table>
  <tr><th>Plan</th><th>Price</th><th>Includes</th></tr>
  <tr><td>Starter</td><td>$499</td><td>Landing page, responsive, basic SEO, contact form</td></tr>
  <tr><td>Business</td><td>$1,499</td><td>Multi-page site, CMS, analytics, advanced SEO</td></tr>
  <tr><td>Commerce</td><td>$2,999</td><td>E-commerce, payment integration, inventory, shipping</td></tr>
  <tr><td>Custom App</td><td>$4,999+</td><td>Full web app, auth, database, API, custom features</td></tr>
</table>

<h2>Add-ons</h2>
<p>Extra services: SEO audit, performance optimization, maintenance plans, content writing, branding.</p>

<h2>Process Timeline</h2>
<ol>
  <li>Discovery & Planning (Week 1)</li>
  <li>Design & Prototype (Week 2-3)</li>
  <li>Development & Testing (Week 3-5)</li>
  <li>Launch & Support (Week 5-6)</li>
</ol>
` },
  stack: { title: "Tech Stack", html: `
<table>
  <tr><th>Technology</th><th>Purpose</th></tr>
  <tr><td>Next.js 15.5.12</td><td>App Router, SSG + 1 API route</td></tr>
  <tr><td>React 19</td><td>UI components</td></tr>
  <tr><td>TypeScript</td><td>Type safety</td></tr>
  <tr><td>Tailwind CSS v4</td><td>Glassmorphism design system</td></tr>
  <tr><td>next-themes</td><td>Dark/light mode</td></tr>
  <tr><td>Gemini 2.0 Flash</td><td>AI chat backend</td></tr>
  <tr><td>MediaRecorder API</td><td>Voice and video recording</td></tr>
  <tr><td>Canvas API</td><td>Drawing tool</td></tr>
</table>

<h2>Architecture</h2>
<ul>
  <li>Static SSG for all pages except <code>/api/chat</code></li>
  <li>Client components for interactive elements (wizard, chat, intake tools)</li>
  <li>Bundle: ~102KB shared JS, pages 3-10KB each</li>
</ul>
` },
  deploy: { title: "Hosting & Deploy", html: `
<h2>Infrastructure</h2>
<table>
  <tr><th>Service</th><th>Role</th></tr>
  <tr><td>Vercel</td><td>Hosting (free tier)</td></tr>
  <tr><td>Cloudflare</td><td>DNS (<code>studio</code> CNAME to Vercel)</td></tr>
  <tr><td>GitHub</td><td><code>markkennethbadilla/elunari-studio</code></td></tr>
</table>

<h2>Deploy</h2>
<pre><code>cd e:\\\\elunari-studio
npx vercel --prod --yes</code></pre>

<h2>Environment Variables</h2>
<ul>
  <li><code>GEMINI_API_KEY</code> — Google Gemini API key for chat</li>
</ul>
` },
}

export default function DocsPage() {
  const [active, setActive] = useState("overview")
  const section = C[active]

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="glass border-b border-[var(--border)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold gradient-text">
            Elunari Studio
          </Link>
          <Link href="/" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 flex gap-8 flex-col md:flex-row">
        <nav className="md:w-52 shrink-0">
          <h2 className="text-lg font-semibold mb-4">Documentation</h2>
          <ul className="space-y-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    active === s.id
                      ? "bg-[var(--accent)] text-white font-medium"
                      : "hover:bg-[var(--surface)] opacity-60 hover:opacity-100"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <article className="flex-1 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">{section.title}</h1>
          <div
            className="[&_table]:w-full [&_th]:text-left [&_th]:p-2 [&_td]:p-2 [&_tr]:border-b [&_tr]:border-[var(--border)] [&_code]:bg-[var(--surface)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_li]:mb-1.5 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ol]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:bg-[var(--surface)] [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:text-xs"
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
        </article>
      </div>
    </div>
  )
}
