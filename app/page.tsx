// app/page.tsx
'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [booting, setBooting] = useState(true);
  
  // FIX: track window scroll instead of a specific ref to prevent hydration errors during boot
  const { scrollYProgress } = useScroll();
  
  // Parallax physics for deep scrolling authority
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yOpac = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Simulate System Boot
  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-system-black min-h-screen font-sans selection:bg-system-neon/30 selection:text-black">
      <AnimatePresence mode='wait'>
        {booting ? (
          <BootSequence key="boot" />
        ) : (
          <motion.main 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            className="relative min-h-[200vh] overflow-hidden"
          >
            {/* GLOBAL OVERLAYS */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_50%,black_50%)] bg-[length:100%_4px] animate-[scanline_6s_linear_infinite]" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.03),transparent_70%)]" />

            {/* SECTION 1: HERO COMMAND CENTER */}
            <section className="h-screen flex flex-col items-center justify-center sticky top-0 z-10">
              <motion.div style={{ y: yHero, opacity: yOpac }} className="text-center space-y-12 max-w-4xl px-6 relative">
                
                {/* Status Badge */}
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: "auto" }} 
                  className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-black/50 backdrop-blur-md overflow-hidden"
                >
                  <span className="w-1.5 h-1.5 bg-system-neon rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase whitespace-nowrap">
                    System_Online // V1.0.4
                  </span>
                </motion.div>

                {/* Main Typography */}
                <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter uppercase leading-[0.85] text-system-chrome">
                  Surgical <br />
                  <span className="text-transparent relative" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                    Authority
                    <motion.span 
                      className="absolute inset-0 text-system-neon/10 blur-sm"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      Authority
                    </motion.span>
                  </span>
                </h1>

                {/* Mission Statement */}
                <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                  Industrial infrastructure for professionals. We turn the internal question 
                  <span className="text-white italic px-2">"Am I overreacting?"</span> 
                  into the external action 
                  <span className="text-system-neon font-mono px-2">"Here is the protocol."</span>
                </p>

                {/* Action Grid */}
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
                  <a href="/translate" className="neon-button group min-w-[200px] text-center no-underline">
                    <span className="relative z-10">Initialize Engine</span>
                  </a>
                  <a href="/ladder" className="px-10 py-5 border border-white/10 hover:bg-white/5 transition-all text-[10px] uppercase tracking-[0.3em] font-mono min-w-[200px] flex items-center justify-center gap-2 group">
                    <span>Protocol Ladder</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            </section>

            {/* SECTION 2: EROSION ANALYTICS (HEATMAP) */}
            <section className="relative z-20 bg-system-zinc border-t border-white/10 min-h-screen flex items-center justify-center py-24">
              <div className="max-w-7xl w-full px-6 grid lg:grid-cols-2 gap-20 items-center">
                
                {/* Data Context */}
                <div className="space-y-10">
                  <div className="space-y-4">
                    <span className="text-system-neon font-mono text-xs uppercase tracking-[0.4em]">
                      Module_02 // Sentiment_Erosion
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
                      The Authority <br /><span className="text-white/20">Gap</span>
                    </h2>
                  </div>
                  
                  <p className="text-lg text-white/40 leading-relaxed max-w-lg">
                    92% of boundary violations occur in the "Transition Phrase"—where professionals reflexively apologize for existing. Our OS visualizes these neural leaks in real-time using detecting algorithms.
                  </p>

                  <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-10">
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">0.4s</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Latency_Analysis</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-system-neon mb-2">+85%</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Retention_Rate</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Heatmap */}
                <div className="terminal-border aspect-square p-8 relative group">
                  <div className="absolute top-4 left-6 text-[10px] font-mono text-system-neon/50 uppercase tracking-widest">
                    Live_Feed // Analyzing_Inputs
                  </div>
                  
                  {/* The Grid */}
                  <div className="grid grid-cols-8 grid-rows-8 gap-2 w-full h-full opacity-60">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <HeatmapCell key={i} index={i} />
                    ))}
                  </div>

                  {/* Overlay UI */}
                  <div className="absolute inset-0 pointer-events-none border-[0.5px] border-white/5" />
                  <div className="absolute bottom-4 right-6 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    Sector_7G // Active
                  </div>
                </div>

              </div>
            </section>

            {/* SYSTEM FOOTER */}
            <footer className="relative z-20 bg-black border-t border-white/10 py-20 px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-left space-y-4">
                  <h3 className="text-2xl font-black tracking-tighter uppercase">Professional Boundaries™</h3>
                  <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
                    Decision-support tool for work communication
                  </p>
                </div>
                
                <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/40 font-mono">
                  <a href="#" className="hover:text-system-neon transition-colors">Documentation</a>
                  <a href="#" className="hover:text-system-neon transition-colors">API_Status</a>
                  <a href="#" className="hover:text-system-neon transition-colors">Legal_Core</a>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
                    <div className="w-1.5 h-1.5 bg-system-neon rounded-full" />
                    <span className="text-[10px] text-system-neon font-mono tracking-widest">ALL_SYSTEMS_OPERATIONAL</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-20 text-[10px] text-white/60 font-mono uppercase">
                © 2026 Professional Boundaries Inc. Proprietary Infrastructure.
              </div>
            </footer>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------------------------
// SUB-COMPONENTS
// ------------------------------------------------------------------

function BootSequence() {
  return (
    <motion.div 
      initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono cursor-none"
    >
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="flex justify-between items-end border-b border-white/20 pb-2 mb-8">
          <span className="text-xs text-system-neon tracking-widest">BIOS_CHECK</span>
          <span className="text-[10px] text-white/30">V.1.0.4</span>
        </div>
        
        <BootLine text="> INITIALIZING_CORE_INFRASTRUCTURE..." delay={0.2} />
        <BootLine text="> LOADING_BOUNDARY_VECTORS..." delay={0.8} />
        <BootLine text="> AUTHENTICATING_NEURAL_STREAM..." delay={1.4} />
        <BootLine text="> ESTABLISHING_SECURE_MOAT..." delay={1.9} />
        
        <motion.div 
          initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5, duration: 2, ease: "circOut" }}
          className="h-1 bg-system-neon mt-8"
        />
        <div className="flex justify-between text-[8px] text-system-neon/50 uppercase tracking-widest mt-2">
          <span>Memory: OK</span>
          <span>Crypto: OK</span>
        </div>
      </div>
    </motion.div>
  );
}

function BootLine({ text, delay }: { text: string, delay: number }) {
  return (
    <motion.p 
      initial={{ opacity: 0, x: -10 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ delay }}
      className="text-xs text-white/70 tracking-wider"
    >
      {text}
    </motion.p>
  );
}

function HeatmapCell({ index }: { index: number }) {
  // Randomize initial activity for visual texture
  const isHot = [12, 18, 19, 27, 35, 36, 42, 49, 50, 58].includes(index);
  
  return (
    <motion.div 
      className={`w-full h-full rounded-[1px] transition-all duration-300 ${
        isHot ? 'bg-system-neon/20' : 'bg-white/5'
      }`}
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: "var(--color-system-neon)",
        boxShadow: "0 0 10px var(--color-system-neon)"
      }}
      animate={isHot ? { opacity: [0.2, 0.5, 0.2] } : {}}
      transition={{ duration: 3, repeat: Infinity, delay: index * 0.05 }}
    />
  );
}