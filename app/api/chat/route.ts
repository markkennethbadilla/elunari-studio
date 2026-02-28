import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

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

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "AI service not configured" },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    // Build Gemini request
    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood. I'm Elunari Studio's AI consultant, ready to help plan web projects. I'll ask focused questions, be encouraging, and create structured briefs.",
          },
        ],
      },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    ];

    const response = await fetch(GEMINI_URL + "?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json(
        { error: "AI service error" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, I'm having trouble responding right now. Please try again.";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
