'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-[var(--text-muted)] mb-10">Last updated: February 28, 2026</p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">1. Information We Collect</h2>
              <p>When you use Elunari Studio, we may collect information you provide directly, including your name, email address, project descriptions, uploaded files (text, images, video, audio, drawings), and any other information you submit through our project wizard or AI chat.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide, maintain, and improve our web development services</li>
                <li>Communicate with you about your project</li>
                <li>Process your project requests and deliver custom proposals</li>
                <li>Send you technical notices and support messages</li>
                <li>Improve our AI-powered tools and service quality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">3. AI-Powered Features</h2>
              <p>Our AI chat and project analysis features use Google Gemini API to process your inputs. Your conversations and project descriptions may be sent to Google&apos;s servers for processing. We do not store AI conversation history beyond your active session unless you explicitly save it.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">4. Data Storage & Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information. Your data is stored securely and accessed only by authorized team members working on your project.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">5. Third-Party Services</h2>
              <p>We may use third-party services including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Vercel for hosting and deployment</li>
                <li>Google Gemini for AI-powered features</li>
                <li>Cloudflare for DNS and security</li>
                <li>GitHub for code hosting and version control</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information at any time. To exercise these rights, contact us at <a href="mailto:studio@elunari.uk" className="text-[var(--primary)] hover:underline cursor-pointer">studio@elunari.uk</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">7. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:studio@elunari.uk" className="text-[var(--primary)] hover:underline cursor-pointer">studio@elunari.uk</a>.</p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <Link href="/" className="text-[var(--primary)] hover:underline cursor-pointer">&larr; Back to Home</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
