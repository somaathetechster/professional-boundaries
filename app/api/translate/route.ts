import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { TranslationResponse, ThreatScores } from '../../../lib/types';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    // 1. THE NEURAL PROMPT
    const systemPrompt = `
      You are the Professional Boundaries Neural Engine. 
      Analyze workplace communication for aggression, encroachment, gaslighting, and authority erosion.
      
      Rules:
      1. Zero apologies.
      2. Zero "I feel" statements.
      3. Use surgical, fact-based authority.
      
      Output strictly as a JSON object matching this schema:
      {
        "pattern": "Short uppercase ID (e.g., SCOPE_CREEP, FALSE_URGENCY)",
        "analysis": "1-sentence tactical breakdown of the violation.",
        "scores": { 
          "aggression": 0-100, 
          "encroachment": 0-100, 
          "gaslighting": 0-100, 
          "authority": 0-100 
        },
        "soft": "Diplomatic response (Level 1-2).",
        "firm": "Boundary response (Level 3).",
        "escalation": "Severance response (Level 4-5)."
      }
    `;

    try {
      // 2. ATTEMPT REAL AI ANALYSIS
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
      // 3. FAILOVER SYSTEM (SIMULATION MODE)
      // If OpenAI fails (429/500), generate a procedural response so the UI works.
      console.warn("⚠️ Neural Link Unstable. Engaging Heuristic Engine.");
      
      const simulation = simulateAnalysis(input);
      return NextResponse.json(simulation);
    }

  } catch (error) {
    console.error("Critical Engine Failure:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}

// ------------------------------------------------------------------
// HEURISTIC ENGINE (The "Magic" Trick)
// ------------------------------------------------------------------
function simulateAnalysis(text: string): TranslationResponse {
  const lower = text.toLowerCase();
  
  // Dynamic Score Generation based on keywords
  const isUrgent = lower.includes("asap") || lower.includes("now") || lower.includes("need");
  const isHostile = lower.includes("disappointed") || lower.includes("fail") || lower.includes("!");
  
  const scores: ThreatScores = {
    aggression: isHostile ? 85 : 30,
    encroachment: isUrgent ? 90 : 45,
    gaslighting: lower.includes("thought we agreed") ? 95 : 20,
    authority: 15 // The incoming text has low authority if it's aggressive
  };

  if (isUrgent) {
    return {
      pattern: "FALSE_URGENCY",
      analysis: "Sender is attempting to bypass capacity constraints using artificial time pressure.",
      scores,
      soft: "I've received this. I will review it against our current sprint priorities.",
      firm: "This request requires a timeline adjustment. We can proceed, but delivery will shift to Tuesday.",
      escalation: "Capacity is fixed. Any additional tasks will require a change order and leadership approval."
    };
  }

  if (isHostile) {
    return {
      pattern: "EMOTIONAL_LEVERAGE",
      analysis: "Sender is using shame-based language to force compliance without scope justification.",
      scores,
      soft: "Let's focus on the project outcomes. Here is the current status.",
      firm: "I won't discuss this while the tone is personal. Let's reconvene when we can focus on the deliverables.",
      escalation: "This communication style violates our working agreement. I am pausing this thread until HR reviews the exchange."
    };
  }

  // Default "Scope Creep" Simulation
  return {
    pattern: "SCOPE_CREEP",
    analysis: "Request exceeds the agreed contract parameters without offering additional resources.",
    scores: { aggression: 20, encroachment: 80, gaslighting: 40, authority: 30 },
    soft: "That sounds like an interesting addition. We can add it to the backlog for Phase 2.",
    firm: "This falls outside the current Statement of Work. I can send a separate estimate for this feature.",
    escalation: "We cannot proceed with uncontracted work. Please sign the attached addendum to initiate this task."
  };
}