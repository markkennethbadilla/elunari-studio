'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-[var(--text-muted)] mb-10">Last updated: February 28, 2026</p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">1. Agreement to Terms</h2>
              <p>By accessing or using Elunari Studio&apos;s services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">2. Services</h2>
              <p>Elunari Studio provides web development services including but not limited to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Custom website design and development</li>
                <li>Landing page creation</li>
                <li>E-commerce store development</li>
                <li>Web application development</li>
                <li>AI-powered project intake and consultation</li>
                <li>Template customization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">3. Project Process</h2>
              <p>All projects begin with a free consultation through our project wizard or AI chat. After reviewing your requirements, we provide a custom proposal with timeline and pricing. Work begins upon acceptance and payment of the agreed deposit.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">4. Pricing & Payment</h2>
              <p>Prices listed on our website are starting prices. Final pricing depends on project complexity and custom requirements. Payment terms will be outlined in your project proposal. We accept major payment methods.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">5. Intellectual Property</h2>
              <p>Upon full payment, you own all rights to the custom code and design created for your project. We retain the right to showcase the work in our portfolio unless otherwise agreed. Third-party assets (fonts, stock images, templates) are subject to their respective licenses.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">6. Revisions</h2>
              <p>Each project plan includes a specified number of revision rounds. Additional revisions beyond the included rounds may incur extra charges as outlined in your project agreement.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">7. Delivery & Timeline</h2>
              <p>We strive to deliver all projects within the agreed timeline, typically 2-4 weeks for standard projects. Delays caused by client feedback response times or scope changes may extend the delivery date.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">8. Refund Policy</h2>
              <p>If you are not satisfied with the initial design concepts, you may request a full refund within 7 days of receiving the first deliverable. Once development has progressed past the design approval stage, refunds are handled on a case-by-case basis.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">9. Limitation of Liability</h2>
              <p>Elunari Studio shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in question.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-3">10. Contact</h2>
              <p>For questions about these Terms of Service, please contact us at <a href="mailto:studio@elunari.uk" className="text-[var(--primary)] hover:underline cursor-pointer">studio@elunari.uk</a>.</p>
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
