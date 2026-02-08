// app/auditor/page.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, PolarAngleAxis } from 'recharts';
import { AuditResponse } from '../../lib/types';
import { Ledger } from '../../lib/ledger'; // <--- NEW IMPORT

export default function Auditor() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('IDLE'); // IDLE, SCANNING, COMPLETE
  const [out, setOut] = useState<AuditResponse | null>(null);

  async function run() {
    if (!input.trim()) return;
    setStatus('SCANNING');
    setOut(null);
    
    try {
      const res = await fetch('/api/reality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      const data = await res.json();
      
      // Artificial delay for "System Processing" weight
      setTimeout(() => {
        setOut(data);
        
        // <--- NEW: SAVE TRANSACTION TO LEDGER --->
        Ledger.saveAudit(input, data);
        
        setStatus('COMPLETE');
      }, 1500);
      
    } catch (err) {
      setStatus('IDLE');
      alert("Neural Link Failed");
    }
  }

  // Safe Data Mapping for Recharts
  const chartData = out ? [
    { name: 'Aggression', value: out.label === 'AGGRESSIVE' ? 100 : 20, fill: '#FF3131' },
    { name: 'Passivity', value: out.label === 'PASSIVE' ? 100 : 15, fill: '#3B82F6' },
    { name: 'Authority', value: out.label === 'ASSERTIVE' ? 100 : 40, fill: '#00FF41' },
    { name: 'Emotion', value: out.label === 'EMOTIONAL' ? 100 : 30, fill: '#F59E0B' },
  ] : [];

  return (
    <main className="min-h-screen bg-system-black font-sans selection:bg-system-neon/20 pt-24 pb-20 px-6 overflow-hidden">
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 relative z-10">
        
        {/* LEFT PANEL: INPUT CONSOLE */}
        <div className="lg:col-span-5 space-y-8 h-full flex flex-col">
          <header>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-2 h-2 bg-system-neon rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-system-neon">
                Diagnostic_Module_v2.1
              </span>
            </motion.div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-2">
              Neural <span className="text-white/20">Auditor</span>
            </h1>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-md">
              Paste your draft. Our engine performs deep-layer sentiment forensics to detect emotional leaks before transmission.
            </p>
          </header>

          <div className="flex-1 min-h-[400px] relative group">
            {/* Holographic Border Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-system-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-sm pointer-events-none" />
            
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 flex flex-col">
              <div className="bg-white/5 p-3 border-b border-white/5 flex justify-between items-center">
                <span className="text-[8px] uppercase tracking-widest text-white/30 font-mono pl-2">Input_Stream // Write_Mode</span>
                <div className="flex gap-1.5 opacity-50">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
              </div>
              <textarea 
                value={input} 
                onChange={e => setInput(e.target.value)}
                disabled={status === 'SCANNING'}
                className="flex-1 w-full bg-transparent p-6 text-white font-mono text-sm outline-none resize-none placeholder:text-white/10 leading-relaxed disabled:opacity-50 transition-opacity"
                placeholder="// Awaiting neural input..." 
                spellCheck={false}
              />
              
              {/* Scanning Beam */}
              {status === 'SCANNING' && (
                <motion.div 
                  className="absolute left-0 right-0 h-[1px] bg-system-neon shadow-[0_0_15px_rgba(0,255,65,0.5)] z-20 pointer-events-none"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
          </div>

          <button 
            onClick={run}
            disabled={status === 'SCANNING' || !input}
            className="w-full neon-button group relative overflow-hidden h-16"
          >
             {/* CSS Noise Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(transparent_0%,#000_100%)]" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)' }} 
            />
            <span className="relative z-10 flex items-center justify-center gap-2 font-mono tracking-widest">
              {status === 'SCANNING' ? 'RUNNING HEURISTICS...' : 'INITIATE AUDIT SEQUENCE'}
            </span>
          </button>
        </div>

        {/* RIGHT PANEL: ANALYSIS HUD */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            
            {/* STATE 1: IDLE */}
            {status === 'IDLE' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] min-h-[600px] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
                <div className="w-32 h-32 border border-white/5 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" />
                </div>
                <h3 className="text-xl text-white font-bold uppercase tracking-tight mb-2">System Standby</h3>
                <p className="text-white/30 font-mono text-xs tracking-widest uppercase">Ready for Analysis</p>
              </motion.div>
            )}

            {/* STATE 2: SCANNING */}
            {status === 'SCANNING' && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center min-h-[600px] bg-black/40 border border-white/10"
              >
                <div className="space-y-4 font-mono text-xs text-system-neon w-64">
                  <p>{`> CONNECTING_TO_CORE... OK`}</p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{`> PARSING_SYNTAX... OK`}</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>{`> DETECTING_EMOTIONAL_LEAKS...`}</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>{`> CALCULATING_RISK_VECTOR...`}</motion.p>
                  <motion.div 
                     initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.2, duration: 2 }}
                     className="h-1 bg-system-neon mt-4"
                  />
                </div>
              </motion.div>
            )}

            {/* STATE 3: COMPLETE (RESULTS) */}
            {status === 'COMPLETE' && out && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* 1. TOP STATS ROW */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="terminal-border p-8 bg-black/40 group hover:bg-white/5 transition-colors">
                    <span className="block text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2">Detected Tone</span>
                    <h2 className={`text-4xl font-black uppercase tracking-tighter ${
                      out.label === 'ASSERTIVE' ? 'text-system-neon' : 
                      out.label === 'AGGRESSIVE' ? 'text-system-alert' : 'text-blue-400'
                    }`}>
                      {out.label}
                    </h2>
                  </div>
                  <div className="terminal-border p-8 bg-black/40 group hover:bg-white/5 transition-colors">
                    <span className="block text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2">Risk Profile</span>
                    <h2 className="text-4xl font-bold text-white tracking-tighter">{out.risk || 'N/A'}</h2>
                  </div>
                </div>

                {/* 2. VISUALIZER & DIAGNOSTICS */}
                <div className="grid md:grid-cols-2 gap-4">
                  
                  {/* Chart Container - CRASH PROOFED */}
                  <div className="terminal-border p-4 relative flex items-center justify-center min-h-[350px] bg-black/20">
                    <div className="absolute top-4 left-4 text-[9px] uppercase text-white/20 font-mono tracking-widest">Vector_Map</div>
                    
                    {/* Explicit Dimensions for Recharts */}
                    <div className="w-full h-[300px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart innerRadius="30%" outerRadius="100%" data={chartData} startAngle={180} endAngle={0} barSize={30}>
                          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                          <RadialBar background={{ fill: '#222' }} dataKey="value" cornerRadius={4} label={{ position: 'insideStart', fill: '#fff', fontSize: '10px', fontWeight: 'bold' }}/>
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '0px' }} 
                            itemStyle={{ color: '#fff', fontSize: '11px', fontFamily: 'monospace' }} 
                            cursor={false} 
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Diagnostic List */}
                  <div className="terminal-border p-8 space-y-6 overflow-y-auto h-[350px] bg-black/20">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                       <span className="text-[9px] text-white/20 uppercase tracking-widest font-mono">Forensic Analysis</span>
                       <div className="w-2 h-2 rounded-full bg-system-alert animate-pulse" />
                    </div>
                    
                    <ul className="space-y-4">
                      {out.why.map((w: string, i: number) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                          className="text-xs text-white/80 font-sans leading-relaxed flex gap-4 p-3 bg-white/5 border-l-2 border-white/20 hover:border-system-neon transition-colors"
                        >
                           <span className="text-system-neon font-bold font-mono">0{i+1}</span>
                           {w}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 3. SUGGESTION ENGINE */}
                {out.suggestion && (
                  <div className="terminal-border p-10 border-l-4 border-l-system-neon bg-[linear-gradient(90deg,rgba(0,255,65,0.05)_0%,transparent_100%)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <div className="text-[100px] leading-none font-black text-system-neon">“</div>
                    </div>
                    
                    <div className="flex justify-between items-end mb-6 relative z-10">
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-system-neon flex items-center gap-2">
                          <span className="w-1 h-1 bg-system-neon rounded-full" />
                          Recommended Refinement
                       </span>
                       <button 
                         className="text-[9px] uppercase tracking-widest border border-white/10 px-4 py-2 hover:bg-white hover:text-black transition-all active:scale-95"
                         onClick={() => {navigator.clipboard.writeText(out.suggestion!)}}
                       >
                         Copy_To_Buffer
                       </button>
                    </div>
                    <p className="text-xl text-white font-sans font-light leading-relaxed relative z-10">
                      "{out.suggestion}"
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}