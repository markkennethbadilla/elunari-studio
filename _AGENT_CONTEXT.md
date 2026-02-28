# Elunari Studio — Agent Context

## Overview
Freelance web development business landing site for Elunari Corp's web studio branch. AI-powered client intake with multi-modal input (text, voice, video, drawing, file upload), template gallery, and conversational AI assistant.

## Stack
- Next.js 15.5.12 + React 19 + TypeScript
- Tailwind CSS v4
- next-themes (dark/light)
- Gemini 2.0 Flash API (AI chatbot)
- Deployed on Vercel (free tier) — target: studio.elunari.uk

## Domain
- Target: studio.elunari.uk

## Pages
- `/` — Landing page: hero, how it works (4 steps), input methods showcase, services preview, AI section with chat mockup, social proof stats, testimonials, CTA. Mobile bottom CTA bar.
- `/start` — Multi-step project wizard: Step 1 project type, Step 2 describe (text/voice/video/draw/upload), Step 3 features checklist, Step 4 budget & timeline, Step 5 contact info + submit.
- `/templates` — Template gallery: 16 curated free templates from Vercel, HTML5 UP, Tailwind UI, Astro, Cruip, Creative Tim. Search, category filter, source filter, select & proceed.
- `/chat` — AI chat interface: Gemini-powered conversational requirement extraction. Suggestion chips, markdown rendering, auto-scroll.
- `/services` — Services & pricing: 4 tiers (Starter $499, Business $1,499, Commerce $2,999, Custom App $4,999+), process timeline, add-ons, why us section.
- `/api/chat` — POST API route proxying to Gemini 2.0 Flash with web consultant system prompt.

## Components
- `components/navbar.tsx` — Glassmorphism sticky navbar, mobile hamburger, theme toggle, Start CTA
- `components/footer.tsx` — Footer with product/company/legal links
- `components/scroll-reveal.tsx` — IntersectionObserver fade-in animation wrapper
- `components/intake/voice-recorder.tsx` — MediaRecorder voice capture with playback
- `components/intake/video-recorder.tsx` — Camera/screen recording with preview
- `components/intake/drawing-canvas.tsx` — HTML5 Canvas drawing with colors, brush sizes, undo
- `components/intake/file-upload.tsx` — Drag & drop file upload with preview

## Design System (globals.css)
- CSS custom properties for theming (dark/light)
- Mobile-first responsive design
- Key classes: .gradient-text, .glass, .btn-primary, .btn-secondary, .card, .input, .chat-bubble, .step-indicator, .reveal/.visible, .mobile-cta-bar, .recording-dot
- Animations: fadeInUp, fadeIn, float, pulse-glow, shimmer

## Architecture
- Static SSG for all pages except /api/chat (dynamic)
- Client components for interactive elements (wizard, chat, intake tools)
- Gemini API key in .env.local
- Mobile-first: bottom CTA bar, large touch targets, full-width buttons on small screens

## Template Sources (curated in lib/templates-data.ts)
- Vercel: Commerce, Portfolio, Blog, AI Chatbot, SaaS Starter
- HTML5 UP: Dimension, Massively, Phantom, Stellar, Hyperspace, Forty
- Tailwind UI: Spotlight, Syntax
- Other: AstroPaper, Open Pro, Material Kit

## Build
- `npx next build` — 9 static pages + 1 API route
- Bundle: ~102KB shared JS, pages 3-10KB each

## Last Updated
2026-02-28 — Initial build. All pages functional, build passing.
