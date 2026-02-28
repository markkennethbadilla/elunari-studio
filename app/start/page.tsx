"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layout,
  Globe,
  ShoppingCart,
  Briefcase,
  User,
  Palette,
  FileText,
  Mic,
  Video,
  Pencil,
  Upload,
  Send,
  Layers,
  Clock,
  DollarSign,
  Zap,
} from "lucide-react";
import { VoiceRecorder } from "@/components/intake/voice-recorder";
import { VideoRecorder } from "@/components/intake/video-recorder";
import { DrawingCanvas } from "@/components/intake/drawing-canvas";
import { FileUpload } from "@/components/intake/file-upload";

/* ── Types ── */
interface ProjectData {
  projectType: string;
  description: string;
  voiceRecordings: Blob[];
  videoRecordings: Blob[];
  drawings: Blob[];
  files: File[];
  selectedTemplates: string[];
  features: string[];
  customFeatures: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  notes: string;
}

const INITIAL_DATA: ProjectData = {
  projectType: "",
  description: "",
  voiceRecordings: [],
  videoRecordings: [],
  drawings: [],
  files: [],
  selectedTemplates: [],
  features: [],
  customFeatures: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  phone: "",
  notes: "",
};

/* ── Step 1: Project Type ── */
const projectTypes = [
  { id: "landing", icon: Layout, title: "Landing Page", desc: "Single-page site to showcase or convert", price: "From $499" },
  { id: "business", icon: Globe, title: "Business Website", desc: "Multi-page site with CMS and blog", price: "From $1,499" },
  { id: "ecommerce", icon: ShoppingCart, title: "E-Commerce", desc: "Online store with payments and inventory", price: "From $2,999" },
  { id: "webapp", icon: Briefcase, title: "Web Application", desc: "Custom app with user accounts and features", price: "From $4,999" },
  { id: "portfolio", icon: User, title: "Portfolio", desc: "Showcase your work beautifully", price: "From $399" },
  { id: "custom", icon: Layers, title: "Something Else", desc: "Tell us what you need", price: "Custom quote" },
];

function StepProjectType({ data, onChange }: { data: ProjectData; onChange: (d: Partial<ProjectData>) => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">What are you building?</h2>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Choose the type that best fits your project. Don&apos;t worry — we&apos;ll customize everything.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange({ projectType: t.id })}
            className="card text-left cursor-pointer transition-all"
            style={{
              borderColor: data.projectType === t.id ? "var(--primary)" : undefined,
              background: data.projectType === t.id ? "var(--primary-subtle)" : undefined,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: data.projectType === t.id
                    ? "var(--primary)"
                    : "var(--bg-card)",
                  color: data.projectType === t.id ? "#fff" : "var(--text-muted)",
                  border: data.projectType === t.id ? "none" : "1px solid var(--border)",
                }}
              >
                <t.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t.title}</h3>
                <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>{t.desc}</p>
                <span className="text-sm font-medium gradient-text">{t.price}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2: Describe ── */
const describeTabs = [
  { id: "text", icon: FileText, label: "Text" },
  { id: "voice", icon: Mic, label: "Voice" },
  { id: "video", icon: Video, label: "Video" },
  { id: "draw", icon: Pencil, label: "Draw" },
  { id: "upload", icon: Upload, label: "Upload" },
];

function StepDescribe({ data, onChange }: { data: ProjectData; onChange: (d: Partial<ProjectData>) => void }) {
  const [tab, setTab] = useState("text");

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Describe your vision</h2>
      <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
        Use any method to explain what you want. The more detail, the better — but don&apos;t stress.
      </p>

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {describeTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
            style={{
              background: tab === t.id ? "var(--primary-subtle)" : "var(--bg-card)",
              color: tab === t.id ? "var(--primary)" : "var(--text-secondary)",
              border: "1px solid " + (tab === t.id ? "var(--primary)" : "var(--border)"),
            }}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in" key={tab}>
        {tab === "text" && (
          <div>
            <textarea
              className="input"
              rows={8}
              placeholder="Describe your project... What's the purpose? Who's the audience? What features do you need? Any specific design preferences? Reference sites you like?"
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
            />
            <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
              Tip: Mention reference websites you like, colors or vibes you prefer, and must-have features.
            </p>
          </div>
        )}

        {tab === "voice" && (
          <VoiceRecorder
            recordings={data.voiceRecordings}
            onRecordingComplete={(blob) =>
              onChange({ voiceRecordings: [...data.voiceRecordings, blob] })
            }
            onRemove={(i) =>
              onChange({
                voiceRecordings: data.voiceRecordings.filter((_, j) => j !== i),
              })
            }
          />
        )}

        {tab === "video" && (
          <VideoRecorder
            recordings={data.videoRecordings}
            onRecordingComplete={(blob) =>
              onChange({ videoRecordings: [...data.videoRecordings, blob] })
            }
            onRemove={(i) =>
              onChange({
                videoRecordings: data.videoRecordings.filter((_, j) => j !== i),
              })
            }
          />
        )}

        {tab === "draw" && (
          <DrawingCanvas
            drawings={data.drawings}
            onDrawingComplete={(blob) =>
              onChange({ drawings: [...data.drawings, blob] })
            }
            onRemove={(i) =>
              onChange({
                drawings: data.drawings.filter((_, j) => j !== i),
              })
            }
          />
        )}

        {tab === "upload" && (
          <FileUpload
            files={data.files}
            onFilesAdded={(newFiles) =>
              onChange({ files: [...data.files, ...newFiles] })
            }
            onRemove={(i) =>
              onChange({
                files: data.files.filter((_, j) => j !== i),
              })
            }
          />
        )}
      </div>

      {/* Collected items summary */}
      <div className="mt-6 flex flex-wrap gap-3">
        {data.description && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "var(--primary-subtle)", color: "var(--primary)" }}>
            <FileText className="w-3 h-3" /> Text added
          </span>
        )}
        {data.voiceRecordings.length > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
            <Mic className="w-3 h-3" /> {data.voiceRecordings.length} recording(s)
          </span>
        )}
        {data.videoRecordings.length > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
            <Video className="w-3 h-3" /> {data.videoRecordings.length} video(s)
          </span>
        )}
        {data.drawings.length > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
            <Pencil className="w-3 h-3" /> {data.drawings.length} drawing(s)
          </span>
        )}
        {data.files.length > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
            <Upload className="w-3 h-3" /> {data.files.length} file(s)
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Step 3: Features ── */
const featureCategories = [
  {
    name: "Core",
    items: [
      "Contact form",
      "Blog/News section",
      "Photo/Video gallery",
      "Testimonials",
      "FAQ section",
      "Newsletter signup",
    ],
  },
  {
    name: "E-Commerce",
    items: [
      "Product catalog",
      "Shopping cart",
      "Payment processing",
      "Inventory management",
      "Order tracking",
      "Discount codes",
    ],
  },
  {
    name: "Functionality",
    items: [
      "User accounts/login",
      "Search functionality",
      "Booking/scheduling",
      "Live chat widget",
      "Maps/Location",
      "Multi-language",
    ],
  },
  {
    name: "Technical",
    items: [
      "SEO optimization",
      "Analytics dashboard",
      "Social media integration",
      "API integrations",
      "Admin panel/CMS",
      "Performance optimization",
    ],
  },
];

function StepFeatures({ data, onChange }: { data: ProjectData; onChange: (d: Partial<ProjectData>) => void }) {
  const toggleFeature = (feature: string) => {
    const next = data.features.includes(feature)
      ? data.features.filter((f) => f !== feature)
      : [...data.features, feature];
    onChange({ features: next });
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">What features do you need?</h2>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Select everything that applies. We&apos;ll sort out the details later.
      </p>

      <div className="flex flex-col gap-8">
        {featureCategories.map((cat) => (
          <div key={cat.name}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
              {cat.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {cat.items.map((item) => {
                const selected = data.features.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleFeature(item)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left cursor-pointer transition-all"
                    style={{
                      background: selected ? "var(--primary-subtle)" : "var(--bg-card)",
                      border: "1px solid " + (selected ? "var(--primary)" : "var(--border)"),
                      color: selected ? "var(--primary)" : "var(--text-secondary)",
                    }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0"
                      style={{
                        color: selected ? "var(--primary)" : "var(--text-muted)",
                        opacity: selected ? 1 : 0.3,
                      }}
                    />
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>
          Anything else?
        </label>
        <textarea
          className="input"
          rows={3}
          placeholder="Any custom features or specific requirements..."
          value={data.customFeatures}
          onChange={(e) => onChange({ customFeatures: e.target.value })}
        />
      </div>
    </div>
  );
}

/* ── Step 4: Budget & Timeline ── */
const budgetOptions = [
  { id: "starter", label: "Starter", range: "$399 – $999", desc: "Simple site, essential features" },
  { id: "standard", label: "Standard", range: "$1,000 – $2,999", desc: "Multi-page with CMS, more features" },
  { id: "premium", label: "Premium", range: "$3,000 – $9,999", desc: "E-commerce or custom web app" },
  { id: "enterprise", label: "Enterprise", range: "$10,000+", desc: "Complex application, full-custom" },
];

const timelineOptions = [
  { id: "rush", label: "Rush", desc: "1-2 weeks", icon: Zap },
  { id: "standard", label: "Standard", desc: "2-4 weeks", icon: Clock },
  { id: "flexible", label: "Flexible", desc: "4-8 weeks", icon: DollarSign },
];

function StepBudget({ data, onChange }: { data: ProjectData; onChange: (d: Partial<ProjectData>) => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Budget & Timeline</h2>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Help us understand your expectations. These are flexible — we&apos;ll find the right fit.
      </p>

      {/* Budget */}
      <h3 className="text-lg font-semibold mb-4">Budget Range</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {budgetOptions.map((b) => (
          <button
            key={b.id}
            onClick={() => onChange({ budget: b.id })}
            className="card text-left cursor-pointer"
            style={{
              borderColor: data.budget === b.id ? "var(--primary)" : undefined,
              background: data.budget === b.id ? "var(--primary-subtle)" : undefined,
            }}
          >
            <p className="font-semibold">{b.label}</p>
            <p className="text-lg font-bold gradient-text">{b.range}</p>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{b.desc}</p>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <h3 className="text-lg font-semibold mb-4">Timeline</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {timelineOptions.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange({ timeline: t.id })}
            className="card text-center cursor-pointer"
            style={{
              borderColor: data.timeline === t.id ? "var(--primary)" : undefined,
              background: data.timeline === t.id ? "var(--primary-subtle)" : undefined,
            }}
          >
            <t.icon
              className="w-6 h-6 mx-auto mb-2"
              style={{ color: data.timeline === t.id ? "var(--primary)" : "var(--text-muted)" }}
            />
            <p className="font-semibold">{t.label}</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 5: Contact ── */
function StepContact({ data, onChange }: { data: ProjectData; onChange: (d: Partial<ProjectData>) => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Almost there!</h2>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Tell us how to reach you and we&apos;ll get back to you within 24 hours with a custom proposal.
      </p>

      <div className="flex flex-col gap-4 max-w-lg">
        <div>
          <label className="text-sm font-medium block mb-1.5">Name *</label>
          <input
            type="text"
            className="input"
            placeholder="John Doe"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Email *</label>
          <input
            type="email"
            className="input"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Company (optional)</label>
          <input
            type="text"
            className="input"
            placeholder="Acme Inc."
            value={data.company}
            onChange={(e) => onChange({ company: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Phone (optional)</label>
          <input
            type="tel"
            className="input"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Additional notes</label>
          <textarea
            className="input"
            rows={3}
            placeholder="Anything else we should know..."
            value={data.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Success ── */
function StepSuccess() {
  return (
    <div className="text-center py-12">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
        }}
      >
        <CheckCircle2 className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold mb-4">
        Project Submitted!
      </h2>
      <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
        We&apos;ve received your project details. Our team will review everything and send you
        a custom proposal within 24 hours.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/chat" className="btn-secondary">
          Chat with AI
        </Link>
      </div>
    </div>
  );
}

/* ── Main Wizard ── */
const STEPS = [
  { label: "Type", icon: Layout },
  { label: "Describe", icon: FileText },
  { label: "Features", icon: CheckCircle2 },
  { label: "Budget", icon: DollarSign },
  { label: "Contact", icon: User },
];

export default function StartPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ProjectData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);

  const onChange = useCallback((partial: Partial<ProjectData>) => {
    setData((d) => ({ ...d, ...partial }));
  }, []);

  const canNext = () => {
    switch (step) {
      case 0: return !!data.projectType;
      case 1: return data.description || data.voiceRecordings.length > 0 || data.videoRecordings.length > 0 || data.drawings.length > 0 || data.files.length > 0;
      case 2: return true; // features optional
      case 3: return !!data.budget;
      case 4: return !!data.name && !!data.email;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    // In production: send data to API
    console.log("Project submitted:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20">
        <div className="page-container py-16 md:py-20">
          <StepSuccess />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="page-container py-16 md:py-20">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={
                    i < step
                      ? "step-indicator completed"
                      : i === step
                      ? "step-indicator active"
                      : "step-indicator upcoming"
                  }
                >
                  {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span
                  className="text-sm font-medium hidden sm:block"
                  style={{ color: i <= step ? "var(--text)" : "var(--text-muted)" }}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className="w-8 md:w-16 lg:w-24 h-0.5 mx-2"
                    style={{
                      background: i < step
                        ? "var(--primary)"
                        : "var(--border)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="animate-fade-in" key={step}>
          {step === 0 && <StepProjectType data={data} onChange={onChange} />}
          {step === 1 && <StepDescribe data={data} onChange={onChange} />}
          {step === 2 && <StepFeatures data={data} onChange={onChange} />}
          {step === 3 && <StepBudget data={data} onChange={onChange} />}
          {step === 4 && <StepContact data={data} onChange={onChange} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-secondary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="btn-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canNext()}
              className="btn-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Submit Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
