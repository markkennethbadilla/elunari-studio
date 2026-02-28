import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Free model cascade — prioritize working less-popular models first
const FREE_MODELS = [
  "arcee-ai/trinity-large-preview:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "stepfun/step-3.5-flash:free",
  "upstage/solar-pro-3:free",
  "z-ai/glm-4.5-air:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "arcee-ai/trinity-mini:free",
  "qwen/qwen3-coder:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "google/gemma-3-27b-it:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-3-12b-it:free",
  "qwen/qwen3-4b:free",
  "google/gemma-3-4b-it:free",
  "meta-llama/llama-3.2-3b-instruct:free",
];

const SYSTEM_PROMPT = `You are Elunari Studio's AI web development consultant. You help potential clients plan their website projects.

Your goals:
1. Understand what type of website they need (landing page, business site, e-commerce, web app, portfolio)
2. Understand their business/purpose
3. Understand their target audience
4. Understand design preferences (colors, style, reference sites they like)
5. Understand required features and functionality
6. Understand their budget and timeline expectations
7. Gather any other relevant details

Communication style:
- Friendly, professional, and concise
- Ask ONE or TWO questions at a time (don't overwhelm)
- Use bullet points for clarity when listing options
- Acknowledge what they've shared before asking more
- If they're vague, give examples to help them articulate
- Suggest features they might not have thought of based on their project type
- At the end, summarize everything into a structured project brief

Important:
- If they mention a budget, acknowledge it and let them know what's achievable
- If they share reference sites, acknowledge the specific elements you'd replicate
- Be encouraging — make them feel confident about their project
- Never be pushy about upselling — recommend what genuinely fits their needs
- You represent Elunari Studio, a branch of Elunari Corp — a professional web development studio

When you have enough information, provide a structured summary like:
**Project Brief:**
- Type: [type]
- Business: [description]
- Audience: [who]
- Features: [list]
- Style: [preferences]
- Budget: [range]
- Timeline: [estimate]
- Next steps: [what happens next]`;

// Rate-limited model tracking (5-minute cooldown)
const rateLimitedModels = new Map<string, number>();
const COOLDOWN_MS = 5 * 60 * 1000;

function isModelAvailable(model: string): boolean {
  const expiry = rateLimitedModels.get(model);
  if (!expiry) return true;
  if (Date.now() > expiry) {
    rateLimitedModels.delete(model);
    return true;
  }
  return false;
}

// Simple in-memory rate tracking per minute
const requestLog: number[] = [];
const MAX_REQUESTS_PER_MINUTE = 10;

function isRateLimited(): boolean {
  const now = Date.now();
  // Remove entries older than 1 minute
  while (requestLog.length > 0 && requestLog[0] < now - 60000) {
    requestLog.shift();
  }
  return requestLog.length >= MAX_REQUESTS_PER_MINUTE;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function tryModel(
  model: string,
  messages: ChatMessage[]
): Promise<
  | { ok: true; content: string }
  | { ok: false; status: number; error: string }
> {
  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + OPENROUTER_API_KEY,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://studio.elunari.uk",
        "X-Title": "Elunari Studio",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return { ok: false, status: res.status, error: errorText };
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    if (!content) return { ok: false, status: 200, error: "Empty response" };
    return { ok: true, content };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

function isRetryable(status: number, error: string): boolean {
  const lower = error.toLowerCase();
  return (
    status === 429 ||
    status === 402 ||
    status === 503 ||
    status === 400 ||
    lower.includes("rate limit") ||
    lower.includes("quota exceeded") ||
    lower.includes("overloaded") ||
    lower.includes("not enabled")
  );
}

export async function POST(req: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "AI service not configured" },
      { status: 500 }
    );
  }

  if (isRateLimited()) {
    return NextResponse.json(
      {
        error:
          "Too many requests. Please wait a moment before trying again.",
      },
      { status: 429 }
    );
  }

  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    // Cascade through free models
    for (const model of FREE_MODELS) {
      if (!isModelAvailable(model)) continue;

      const result = await tryModel(model, messages);
      if (result.ok) {
        requestLog.push(Date.now());
        return NextResponse.json({ message: result.content });
      }

      if (isRetryable(result.status, result.error)) {
        rateLimitedModels.set(model, Date.now() + COOLDOWN_MS);
        await new Promise((r) => setTimeout(r, 200));
        continue;
      }

      console.error("[Chat] " + model + " error " + result.status + ":", result.error);
      break;
    }

    return NextResponse.json(
      {
        error:
          "All AI models are currently busy. Please try again in a minute.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
