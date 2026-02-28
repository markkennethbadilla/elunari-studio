"use client";

import { useState, useMemo } from "react";
import { templates, categories, sources, Template } from "@/lib/templates-data";
import {
  ExternalLink,
  Search,
  Eye,
  CheckCircle2,
  Filter,
  X,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import Link from "next/link";

function TemplateCard({ template, selected, onToggle }: {
  template: Template;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="card overflow-hidden cursor-pointer group"
      style={{
        borderColor: selected ? "var(--primary)" : undefined,
        background: selected ? "var(--primary-subtle)" : undefined,
        padding: 0,
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/600x375/1e293b/64748b?text=" +
              encodeURIComponent(template.name);
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2.5 !px-4 text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="w-4 h-4" />
            Live Preview
          </a>
        </div>
        {/* Source badge */}
        <div
          className="absolute top-2 left-2 px-2.5 py-1 rounded-lg text-xs font-medium"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        >
          {template.source}
        </div>
        {/* Select checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all"
          style={{
            background: selected
              ? "var(--primary)"
              : "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          {selected ? (
            <CheckCircle2 className="w-4 h-4 text-white" />
          ) : (
            <div
              className="w-4 h-4 rounded-full"
              style={{ border: "2px solid var(--text-muted)" }}
            />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-4" onClick={onToggle}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold">{template.name}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "var(--primary-subtle)",
                color: "var(--primary)",
              }}
            >
              {template.category}
            </span>
          </div>
          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg cursor-pointer flex-shrink-0"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-sm line-clamp-2 mb-3" style={{ color: "var(--text-secondary)" }}>
          {template.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [category, setCategory] = useState("All");
  const [source, setSource] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      if (category !== "All" && t.category !== category) return false;
      if (source !== "All" && t.source !== source) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.includes(q))
        );
      }
      return true;
    });
  }, [category, source, search]);

  const toggleSelect = (id: string) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="page-container py-8 md:py-12">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Template <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Browse our curated collection of free, high-quality templates. Pick one as a starting point
              and we&apos;ll customize it to your brand.
            </p>
          </div>
        </ScrollReveal>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              className="input !pl-10"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary sm:hidden cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Filter pills */}
        <div className={`mb-8 ${showFilters ? "block" : "hidden sm:block"}`}>
          {/* Categories */}
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider mr-3" style={{ color: "var(--text-muted)" }}>
              Category:
            </span>
            <div className="inline-flex flex-wrap gap-2 mt-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all"
                  style={{
                    background: category === c ? "var(--primary-subtle)" : "var(--bg-card)",
                    color: category === c ? "var(--primary)" : "var(--text-secondary)",
                    border: "1px solid " + (category === c ? "var(--primary)" : "var(--border)"),
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {/* Sources */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider mr-3" style={{ color: "var(--text-muted)" }}>
              Source:
            </span>
            <div className="inline-flex flex-wrap gap-2 mt-1">
              {sources.map((s) => (
                <button
                  key={s}
                  onClick={() => setSource(s)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all"
                  style={{
                    background: source === s ? "var(--accent-subtle)" : "var(--bg-card)",
                    color: source === s ? "var(--accent)" : "var(--text-secondary)",
                    border: "1px solid " + (source === s ? "var(--accent)" : "var(--border)"),
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {filtered.length} template{filtered.length !== 1 ? "s" : ""} found
          </p>
          {selected.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: "var(--primary)" }}>
                {selected.length} selected
              </span>
              <button
                onClick={() => setSelected([])}
                className="text-sm cursor-pointer"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="w-4 h-4 inline" /> Clear
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              selected={selected.includes(t.id)}
              onToggle={() => toggleSelect(t.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "var(--text-muted)" }}>
              No templates match your filters. Try broadening your search.
            </p>
          </div>
        )}

        {/* Selected CTA */}
        {selected.length > 0 && (
          <div
            className="fixed bottom-0 left-0 right-0 p-4 z-40"
            style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
          >
            <div className="page-container flex items-center justify-between">
              <p className="text-sm font-medium">
                <span className="gradient-text">{selected.length}</span> template{selected.length !== 1 ? "s" : ""} selected
              </p>
              <Link
                href="/start"
                className="btn-primary !py-2.5 !px-6"
              >
                Start with These
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
