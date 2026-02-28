import Link from "next/link";
import { Sparkles, Github, Mail, ExternalLink } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Start a Project", href: "/start" },
      { label: "Templates", href: "/templates" },
      { label: "AI Chat", href: "/chat" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Elunari", href: "https://elunari.uk", external: true },
      { label: "Portfolio", href: "https://marks-portfolio.elunari.uk", external: true },
      { label: "Blog", href: "https://blog.elunari.uk", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-bold mb-3 cursor-pointer"
              style={{ color: "var(--text)" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: "var(--primary)" }} />
              Elunari Studio
            </Link>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Web development that converts. Tell us your vision — we&apos;ll build it.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/markkennethbadilla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg cursor-pointer transition-colors"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:studio@elunari.uk"
                className="p-2 rounded-lg cursor-pointer transition-colors"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm inline-flex items-center gap-1 cursor-pointer transition-colors hover:opacity-80"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm cursor-pointer transition-colors hover:opacity-80"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p>&copy; {new Date().getFullYear()} Elunari Studio. All rights reserved.</p>
          <p>
            A branch of{" "}
            <a
              href="https://elunari.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline cursor-pointer"
              style={{ color: "var(--primary)" }}
            >
              Elunari Corp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
