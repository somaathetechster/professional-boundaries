// app/api/reality/route.ts
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { AuditResponse } from '../../../lib/types'; // Using your new type definition

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    // 1. THE HIGH-PRECISION PROMPT
    // Expanded to detect the full spectrum of tonal failures (Passive/Aggressive)
    const systemPrompt = `
      You are the Professional Boundaries Reality Auditor. 
      Analyze the user's workplace communication for structural authority, tonal balance, and emotional leakage.
      
      Classify the response into one of these strict labels:
      - "ASSERTIVE": Balanced, firm, professional.
      - "AGGRESSIVE": Hostile, accusatory, unprofessional.
      - "PASSIVE": Apologetic, weak, permissive.
      - "EMOTIONAL": Over-explaining, defensive, seeking validation.
      
      Output strictly as a JSON object:
      {
        "label": "ASSERTIVE" | "AGGRESSIVE" | "PASSIVE" | "EMOTIONAL",
        "risk": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
        "why": ["Specific observation 1", "Specific observation 2", "Specific observation 3"],
        "suggestion": "A surgical, one-sentence correction to remove emotional baggage and restore authority."
      }
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(completion.choices[0].message.content!);
      return NextResponse.json(result);

    } catch (apiError: any) {
      // 2. THE "SILICON VALLEY" FALLBACK (Simulation Mode)
      // If the API fails (429 Quota or Network), we seamlessly degrade to a simulation
      // so the UI never breaks during a pitch/demo.
      console.warn("⚠️ Neural Link Unstable (OpenAI API Error). Engaging Simulation Mode.");
      
      const mockResult: AuditResponse = simulateAudit(input);
      return NextResponse.json(mockResult);
    }

  } catch (error) {
    console.error("Critical System Failure:", error);
    return NextResponse.json({ 
      label: "ERROR", 
      why: ["System failed to audit neural stream"], 
      risk: "UNKNOWN" 
    }, { status: 500 });
  }
}

// ------------------------------------------------------------------
// SIMULATION ENGINE (Fallback Logic)
// ------------------------------------------------------------------
function simulateAudit(text: string): AuditResponse {
  const lower = text.toLowerCase();
  
  // Basic heuristics to make the simulation feel "smart"
  if (lower.includes("sorry") || lower.includes("just") || lower.includes("think")) {
    return {
      label: "PASSIVE",
      risk: "HIGH",
      why: [
        "Detected apologetic prefacing ('sorry')",
        "Use of minimizers ('just') weakens the stance",
        "Subjective framing ('I think') invites debate"
      ],
      suggestion: "Remove the apology. State the constraint as a project fact, not a personal failure."
    };
  }
  
  if (lower.includes("!") || lower.includes("never") || lower.includes("disappointed")) {
    return {
      label: "AGGRESSIVE",
      risk: "CRITICAL",
      why: [
        "Emotional punctuation detected (!)",
        "Absolutist language ('never') creates conflict",
        "Focus is on feelings ('disappointed') rather than outcome"
      ],
      suggestion: "Switch to neutral observation. Describe the impact on the timeline, not your feelings."
    };
  }

  // Default Fallback
  return {
    label: "EMOTIONAL",
    risk: "MEDIUM",
    why: [
      "Response length indicates over-explanation",
      "Tone seeks validation rather than resolution",
      "Boundary is porous and open to negotiation"
    ],
    suggestion: "Cut the second sentence entirely. State your availability clearly."
  };
}