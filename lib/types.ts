// lib/types.ts

// ------------------------------------------------------------------
// CORE DOMAINS
// ------------------------------------------------------------------

// Aligns with the keys used in your frontend components ('soft', 'firm', 'escalation')
export type BoundaryLevel = 'soft' | 'firm' | 'escalation';

export type ThreatLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ToneLabel = 'ASSERTIVE' | 'AGGRESSIVE' | 'PASSIVE' | 'EMOTIONAL';

// ------------------------------------------------------------------
// ANALYTICS & VISUALIZATION
// ------------------------------------------------------------------

export interface ThreatScores {
  aggression: number;   // 0-100
  encroachment: number; // 0-100
  gaslighting: number;  // 0-100
  authority: number;    // 0-100
}

// ------------------------------------------------------------------
// API RESPONSE INTERFACES
// ------------------------------------------------------------------

// Response from /api/translate
export interface TranslationResponse {
  pattern: string;        // e.g., "SCOPE_CREEP", "FALSE_URGENCY"
  analysis: string;       // One-line tactical summary
  scores: ThreatScores;   // For the Radar Chart
  
  // The actual scripts (Flat structure to match API)
  soft: string;
  firm: string;
  escalation: string;
  
  suggestedLevel?: number; // 1-5 (Ladder reference)
}

// Response from /api/reality (The Auditor)
export interface AuditResponse {
  label: ToneLabel;
  risk: ThreatLevel;
  why: string[];          // Array of diagnostic flags
  suggestion?: string;    // The refined "One-Liner"
}

// ------------------------------------------------------------------
// STATIC DATA STRUCTURES
// ------------------------------------------------------------------

// For app/ladder/page.tsx data
export interface LadderStep {
  level: number;
  title: string;
  phrase: string;
  desc: string;
  color: string;
  stats: {
    authority: number;
    rapport: number;
    energy: number;
    risk: number;
  };
}