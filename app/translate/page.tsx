// app/translate/page.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { Ledger } from '../../lib/ledger';

// ------------------------------------------------------------------
// CONFIG & MOCK DATA (For Visuals)
// ------------------------------------------------------------------
const SYSTEM_LOGS = [
  "INIT_NEURAL_LINK...",
  "PARSING_SEMANTIC_STRUCTURE...",
  "DETECTING_PASSIVE_AGGRESSION...",
  "CALCULATING_LEVERAGE_DELTA...",
  "GENERATING_COUNTER_PROTOCOLS...",
  "OPTIMIZING_TONAL_VECTORS...",
  "RENDERING_OUTPUT_STREAM..."
];

export default function UltraEngine() {
  const [status, setStatus] = useState('IDLE'); // IDLE, SCANNING, COMPLETE
  const [input, setInput] = useState('');
  const [out, setOut] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Ref for the scanner beam
  const scannerControls = useAnimation();

  async function run() {
    if (!input.trim()) return;

    setStatus('SCANNING');
    setLogs([]);
    setOut(null);

    // 1. ANIMATE SCANNER BEAM
    scannerControls.start({
      top: ["0%", "100%"],
      opacity: [0, 1, 0],
      transition: { duration: 1.5, repeat: 2, ease: "linear" }
    });

    // 2. SIMULATE SYSTEM LOGS (The "Hacker" Feel)
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < SYSTEM_LOGS.length) {
        setLogs(prev => [...prev, SYSTEM_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    // 3. EXECUTE API (With artificial delay for effect if too fast)
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      const data = await res.json();
      
      // Ensure logs finish before showing result
      setTimeout(() => {
        setOut(data);
        
        // SAVE TRANSACTION TO LEDGER
        Ledger.saveTranslation(input, data);
        
        setStatus('COMPLETE');
        scannerControls.stop();
      }, 3000); 

    } catch (error) {
      console.error("Neural alignment failed:", error);
      setStatus('IDLE');
    }
  }

  return (
    <div className="min-h-screen bg-system-black font-sans selection:bg-system-neon/20 pt-24 pb-20 px-6 overflow-hidden">
      
      {/* BACKGROUND FX */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* MOBILE OPTIMIZATION FIX:
         Changed grid-cols-12 to grid-cols-1 (mobile) -> lg:grid-cols-12 (desktop)
      */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 pb-12">
        
        {/* =========================================================
            LEFT COLUMN: INPUT & CONTROL
           ========================================================= */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* HEADER */}
          <header>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-2 h-2 bg-system-neon rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-system-neon">
                Translation_Engine_v4.0
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Input <span className="text-white/20">Stream</span>
            </h1>
          </header>

          {/* INPUT TERMINAL */}
          {/* MOBILE FIX: Adaptive min-height */}
          <div className="relative group flex-1 min-h-[350px] lg:min-h-[400px]">
            {/* The "Box" Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-system-neon/30 to-blue-600/30 opacity-20 blur-md group-hover:opacity-40 transition duration-1000" />
            
            <div className="relative h-full bg-black/80 backdrop-blur-xl border border-white/10 flex flex-col overflow-hidden">
              
              {/* Terminal Header */}
              <div className="flex justify-between items-center p-3 border-b border-white/5 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">
                  /usr/bin/translator
                </span>
              </div>

              {/* Text Area */}
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status === 'SCANNING'}
                className="flex-1 w-full bg-transparent p-6 text-white font-mono text-sm leading-relaxed outline-none resize-none placeholder:text-white/10 disabled:opacity-50 transition-opacity"
                placeholder="// Paste aggressive or ambiguous email here..."
                spellCheck={false}
              />

              {/* THE SCANNER BEAM (Visual Physics) */}
              <motion.div 
                animate={scannerControls}
                className="absolute left-0 right-0 h-[2px] bg-system-neon shadow-[0_0_20px_rgba(0,255,65,0.8)] z-20 pointer-events-none opacity-0"
              />
              
              {/* SYSTEM LOG OVERLAY */}
              <AnimatePresence>
                {status === 'SCANNING' && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 z-10 p-6 font-mono text-xs text-system-neon flex flex-col justify-end"
                  >
                    {logs.map((log, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-1"
                      >
                        <span className="opacity-50 mr-2">{`[${new Date().toLocaleTimeString()}]`}</span>
                        {`> ${log}`}
                      </motion.div>
                    ))}
                    <motion.div 
                      className="w-4 h-4 border-2 border-system-neon border-t-transparent rounded-full animate-spin mt-4" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* ACTION BUTTON */}
          <button 
            onClick={run}
            disabled={status === 'SCANNING' || !input}
            className="w-full neon-button group relative overflow-hidden h-16"
          >
            {/* CSS-Only Noise Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(transparent_0%,#000_100%)]" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '4px 4px' }} 
            />
            
            <span className="relative z-10 flex items-center justify-center gap-3">
              {status === 'SCANNING' ? 'DECRYPTING...' : 'EXECUTE PROTOCOL'}
            </span>
          </button>

        </section>


        {/* =========================================================
            RIGHT COLUMN: DATA VISUALIZATION & OUTPUT
           ========================================================= */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {status === 'COMPLETE' && out ? (
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="space-y-6"
              >
                
                {/* 1. THREAT HUD (The Chart) */}
                {/* MOBILE FIX: Adaptive height */}
                <div className="terminal-border p-6 relative overflow-hidden min-h-[300px] md:min-h-[350px] flex items-center justify-center">
                  <div className="absolute top-0 right-0 p-4 text-right z-10">
                    <span className="block text-[40px] leading-none font-black text-system-alert">
                      {out.scores?.aggression || 85}%
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Aggression_Index</span>
                  </div>

                  {/* Explicit Dimensions for Recharts Container */}
                  <div className="w-full h-[250px] md:h-[300px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                        { subject: 'Aggression', A: out.scores?.aggression || 0, fullMark: 100 },
                        { subject: 'Gaslighting', A: out.scores?.gaslighting || 0, fullMark: 100 },
                        { subject: 'Authority', A: out.scores?.authority || 0, fullMark: 100 },
                        { subject: 'Scope Creep', A: out.scores?.encroachment || 0, fullMark: 100 },
                      ]}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: 'monospace' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          name="Threat Profile"
                          dataKey="A"
                          stroke="var(--color-system-neon)"
                          strokeWidth={3}
                          fill="var(--color-system-neon)"
                          fillOpacity={0.2}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                          itemStyle={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. THE CARDS (Results) */}
                <div className="grid gap-4">
                  {[
                    { tier: 'soft', label: 'Diplomatic_Reset', color: 'border-white/20' },
                    { tier: 'firm', label: 'Boundary_Enforcement', color: 'border-system-neon/50' },
                    { tier: 'escalation', label: 'Nuclear_Option', color: 'border-system-alert/50' }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.tier}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`terminal-border p-6 group hover:bg-white/5 transition-colors border-l-4 ${
                        item.tier === 'firm' ? 'border-l-system-neon' : 
                        item.tier === 'escalation' ? 'border-l-system-alert' : 'border-l-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                        {/* Only render CopyButton if data exists to prevent undefined errors */}
                        {out[item.tier] && <CopyButton text={out[item.tier]} />}
                      </div>
                      <p className="text-white/90 font-sans text-lg font-light leading-relaxed">
                        {out[item.tier] || "Generating Protocol..."}
                      </p>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            ) : (
              // IDLE STATE (Placeholder)
              <div className="h-full border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center min-h-[350px] md:min-h-[600px] text-center p-12">
                <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-20" />
                  <div className="w-2 h-2 bg-white/20 rounded-full" />
                </div>
                <h3 className="text-xl text-white font-bold uppercase tracking-tight mb-2">System Awaiting Input</h3>
                <p className="text-white/30 font-mono text-xs max-w-xs mx-auto">
                  Paste communication data to initiate neural threat analysis and counter-protocol generation.
                </p>
              </div>
            )}
          </AnimatePresence>
        </section>

      </main>
    </div>
  );
}

// ------------------------------------------------------------------
// SUB-COMPONENT: MICRO-INTERACTION BUTTON
// ------------------------------------------------------------------
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="text-[9px] uppercase tracking-widest border border-white/10 px-3 py-1 hover:bg-white hover:text-black transition-all active:scale-95"
    >
      {copied ? 'COPIED_TO_BUFFER' : 'COPY'}
    </button>
  );
}