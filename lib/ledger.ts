// lib/ledger.ts
import { LedgerEntry, TranslationResponse, AuditResponse } from './types';

const STORAGE_KEY = 'BOUNDARY_LEDGER_V1';

export const Ledger = {
  // GET ALL TRANSACTIONS
  getHistory: (): LedgerEntry[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data).sort((a: any, b: any) => b.timestamp - a.timestamp) : [];
  },

  // CALCULATE "NET WORTH" (Average Authority Score)
  getAuthorityScore: (): number => {
    const history = Ledger.getHistory();
    if (history.length === 0) return 0;
    const total = history.reduce((acc, curr) => acc + curr.metrics.authority, 0);
    return Math.round(total / history.length);
  },

  // SAVE A TRANSLATION (From Translator)
  saveTranslation: (input: string, result: TranslationResponse) => {
    const entry: LedgerEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: 'TRANSLATION',
      inputSnippet: input.substring(0, 60) + (input.length > 60 ? '...' : ''),
      label: result.pattern,
      metrics: {
        aggression: result.scores.aggression,
        authority: result.scores.authority
      }
    };
    Ledger.push(entry);
  },

  // SAVE AN AUDIT (From Auditor)
  saveAudit: (input: string, result: AuditResponse) => {
    const entry: LedgerEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: 'AUDIT',
      inputSnippet: input.substring(0, 60) + (input.length > 60 ? '...' : ''),
      label: result.label,
      metrics: {
        aggression: result.label === 'AGGRESSIVE' ? 85 : 20,
        authority: result.label === 'ASSERTIVE' ? 95 : 30
      }
    };
    Ledger.push(entry);
  },

  // INTERNAL HELPER
  push: (entry: LedgerEntry) => {
    const current = Ledger.getHistory();
    const updated = [entry, ...current].slice(0, 50); // Keep last 50 only
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};