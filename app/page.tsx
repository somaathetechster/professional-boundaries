// app/page.tsx
'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// ------------------------------------------------------------------
// CONFIG: LOGS & CHARS
// ------------------------------------------------------------------
const CHARS = "-_~=\\/[]{}!@#$%^&*+?";
const LOGS = [
  "> CHECKING_BIOS_INTEGRITY...",
  "> LOADING_KERNEL_V.1.0.5...",
  "> BYPASSING_SECURITY_MOAT...",
  "> ESTABLISHING_NEURAL_LINK...",
  "> DECRYPTING_AUTHORITY_VECTORS...",
  "> SYSTEM_READY."
];

export default function Home() {
  // Boot stages: 'loading' (bar) -> 'terminal' (text) -> 'complete' (site)
  const [bootStage, setBootStage] = useState<'loading' | 'terminal' | 'complete'>('loading');
  const { scrollYProgress } = useScroll();
  
  // Parallax physics
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yOpac = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Boot Sequence Timer Logic
  useEffect(() => {
    // Stage 1: Progress Bar (1.5s)
    const timer1 = setTimeout(() => setBootStage('terminal'), 1500);
    return () => clearTimeout(timer1);
  }, []);

  const handleTerminalComplete = () => {
    setBootStage('complete');
  };

  return (
    <div className="bg-system-black min-h-screen font-sans selection:bg-system-neon/30 selection:text-black overflow-x-hidden">
      <AnimatePresence mode='wait'>
        {bootStage !== 'complete' ? (
          <BootSequence stage={bootStage} onComplete={handleTerminalComplete} key="boot" />
        ) : (
          <motion.main 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="relative min-h-[200vh]"
          >
            {/* GLOBAL BACKGROUND NOISE */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] bg-[linear-gradient(to_bottom,transparent_50%,black_50%)] bg-[length:100%_4px] animate-[scanline_4s_linear_infinite]" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.02),transparent_60%)]" />

            {/* SECTION 1: HERO */}
            <section className="h-screen flex flex-col items-center justify-center sticky top-0 z-10">
              <motion.div style={{ y: yHero, opacity: yOpac }} className="text-center space-y-12 max-w-6xl px-4 relative w-full">
                
                {/* Status Badge - Fade In */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-black/50 backdrop-blur-md overflow-hidden"
                >
                  <span className="w-1.5 h-1.5 bg-system-neon rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                  <span className="text-[10px] font-mono tracking-[0.3em] text-white/60 uppercase whitespace-nowrap">
                    System_Online // Ready
                  </span>
                </motion.div>

                {/* --- HEADLINE ENGINE (ENTRY GLITCH) --- */}
                <div className="relative group cursor-default py-4">
                  <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] text-system-chrome break-words relative z-20">
                    <ScrambleText text="Surgical" speed={40} delay={0} />
                    <br />
                    <div className="relative inline-block mt-2 md:mt-4">
                      {/* This component handles the Load Glitch + Hover Glitch */}
                      <GlitchHeadline text="Authority" />
                    </div>
                  </h1>
                </div>

                {/* Mission Statement (Scroll Reveal) */}
                <Reveal>
                  <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-wide px-6">
                    Turn the internal question <span className="text-white italic">"Am I overreacting?"</span> into the external action <span className="text-system-neon font-mono">"Here is the protocol."</span>
                  </p>
                </Reveal>

                {/* Action Buttons (Scroll Reveal + Stagger) */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8 w-full px-6">
                  <Reveal delay={0.2}>
                    <a href="/translate" className="w-full md:w-auto neon-button group relative px-8 py-4 bg-system-neon text-black font-bold uppercase tracking-widest text-xs overflow-hidden block">
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">Initialize Engine</span>
                      <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </a>
                  </Reveal>
                  <Reveal delay={0.4}>
                    <a href="/ladder" className="w-full md:w-auto px-8 py-4 border border-white/10 text-white/60 font-mono text-xs uppercase tracking-widest hover:bg-white/5 transition-colors text-center block">
                      Protocol Ladder
                    </a>
                  </Reveal>
                </div>
              </motion.div>
            </section>

            {/* SECTION 2: ADVANCED HEATMAP (SCROLL ANIMATED) */}
            <section className="relative z-20 bg-system-zinc border-t border-white/10 min-h-screen flex items-center justify-center py-24">
              <div className="max-w-7xl w-full px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                <div className="space-y-10 order-2 lg:order-1">
                  <Reveal>
                    <div className="space-y-4">
                      <span className="text-system-neon font-mono text-xs uppercase tracking-[0.4em]">
                        Module_02 // Sentiment_Map
                      </span>
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                        The Authority <br /><span className="text-white/20">Gap</span>
                      </h2>
                    </div>
                  </Reveal>
                  
                  <Reveal delay={0.2}>
                    <p className="text-lg text-white/40 leading-relaxed max-w-lg">
                      Our OS visualizes neural leaks in real-time. Every hesitation, apology, and qualifier is mapped and flagged for removal.
                    </p>
                  </Reveal>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-10">
                    <Reveal delay={0.3}>
                      <div>
                        <div className="text-4xl font-bold text-white mb-2">0.4s</div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Latency_Analysis</div>
                      </div>
                    </Reveal>
                    <Reveal delay={0.4}>
                      <div>
                        <div className="text-4xl font-bold text-system-neon mb-2">+85%</div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Retention_Rate</div>
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* HEATMAP CONTAINER (Scales In) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="order-1 lg:order-2 terminal-border aspect-square p-1 relative group bg-black/50 overflow-hidden"
                >
                  <div className="absolute top-4 left-6 text-[10px] font-mono text-system-neon/70 uppercase tracking-widest z-10">
                    Live_Feed // Analyzing
                  </div>
                  
                  <div className="grid grid-cols-8 grid-rows-8 w-full h-full gap-px bg-black">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <AdvancedHeatmapCell key={i} index={i} />
                    ))}
                  </div>

                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-system-neon/10 to-transparent z-0 pointer-events-none"
                    animate={{ top: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none z-10" />
                  <div className="absolute bottom-4 right-6 text-[10px] font-mono text-white/30 uppercase tracking-widest z-20">
                    Sector_7G // Active
                  </div>
                </motion.div>

              </div>
            </section>

            {/* RESTORED FOOTER */}
            <footer className="relative z-20 bg-black border-t border-white/10 py-20 px-6">
              <Reveal>
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
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
                      <div className="w-1.5 h-1.5 bg-system-neon rounded-full" />
                      <span className="text-[10px] text-system-neon font-mono tracking-widest">SYSTEM_ONLINE</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-20 text-[10px] text-white/20 font-mono uppercase tracking-widest border-t border-white/5 pt-8">
                  © 2026 Professional Boundaries Inc. All Rights Reserved.
                </div>
              </Reveal>
            </footer>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------------------------
// COMPONENT: SCROLL REVEAL (New)
// ------------------------------------------------------------------
function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------------------
// COMPONENT: GLITCH HEADLINE (Entry & Hover)
// ------------------------------------------------------------------
function GlitchHeadline({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Trigger the initial scrambled entry
    setTimeout(() => setHasLoaded(true), 100);
  }, []);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Main Text (Clean after load) */}
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50" 
            style={{ 
              WebkitTextStroke: '1px rgba(0,255,65,0.4)', 
              filter: 'drop-shadow(0 0 5px rgba(0,255,65,0.2))' 
            }}>
        <ScrambleText text={text} speed={50} delay={600} />
      </span>

      {/* 2. RGB Layers - Trigger on Load (Entry) AND Hover */}
      <motion.span 
        className="absolute inset-0 text-[#00FFFF] mix-blend-screen z-0"
        initial={{ opacity: 0, x: 0 }}
        animate={{ 
          // If NOT loaded yet OR hovered, glitch out. Otherwise, stay hidden.
          opacity: (!hasLoaded || isHovered) ? [0, 1, 0, 1, 0] : 0, 
          x: (!hasLoaded || isHovered) ? [-5, 5, -2, 2, 0] : 0
        }}
        transition={{ duration: 0.5, delay: isHovered ? 0 : 0.6 }}
      >
        {text}
      </motion.span>

      <motion.span 
        className="absolute inset-0 text-[#FF00FF] mix-blend-screen z-0"
        initial={{ opacity: 0, x: 0 }}
        animate={{ 
          opacity: (!hasLoaded || isHovered) ? [0, 1, 0, 1, 0] : 0, 
          x: (!hasLoaded || isHovered) ? [5, -5, 2, -2, 0] : 0
        }}
        transition={{ duration: 0.5, delay: isHovered ? 0 : 0.6 }}
      >
        {text}
      </motion.span>
    </div>
  );
}

// ------------------------------------------------------------------
// UTILITY COMPONENTS
// ------------------------------------------------------------------

function ScrambleText({ text, speed = 50, delay = 0 }: { text: string, speed?: number, delay?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  return <span>{displayText}</span>;
}

function BootSequence({ stage, onComplete }: { stage: 'loading' | 'terminal' | 'complete', onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (stage === 'terminal') {
      let delay = 0;
      LOGS.forEach((log, i) => {
        delay += 400 + Math.random() * 300; // Random typing speed
        setTimeout(() => {
          setLogs(prev => [...prev, log]);
          if (i === LOGS.length - 1) {
            setTimeout(onComplete, 800);
          }
        }, delay);
      });
    }
  }, [stage, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center font-mono cursor-none"
    >
      {stage === 'loading' ? (
        // STAGE 1: PROGRESS BAR
        <div className="w-64">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "100%" }} 
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-system-neon shadow-[0_0_20px_#00FF41]" 
            />
          </div>
          <div className="text-[10px] text-system-neon tracking-[0.5em] animate-pulse text-center">
            INITIALIZING
          </div>
        </div>
      ) : (
        // STAGE 2: TERMINAL LOGS
        <div className="w-full max-w-md p-8 space-y-2">
          <div className="flex justify-between items-end border-b border-white/20 pb-2 mb-6">
            <span className="text-xs text-system-neon tracking-widest">BIOS_CHECK</span>
            <span className="text-[10px] text-white/30">V.1.0.5</span>
          </div>
          {logs.map((log, i) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="text-xs text-white/70 tracking-wider font-mono"
            >
              {log}
            </motion.p>
          ))}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="h-4 w-2 bg-system-neon animate-pulse mt-2" 
          />
        </div>
      )}
    </motion.div>
  );
}

function AdvancedHeatmapCell({ index }: { index: number }) {
  const isHot = [3, 4, 11, 12, 19, 20, 27, 35, 36, 42, 43, 44, 45, 50, 51, 58, 59, 60].includes(index);
  const isWarm = [2, 5, 10, 13, 18, 21, 26, 29].includes(index);

  return (
    <motion.div 
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0.1, backgroundColor: '#111' }}
      animate={{ 
        opacity: isHot ? [0.4, 0.8, 0.4] : isWarm ? [0.2, 0.4, 0.2] : 0.1,
        backgroundColor: isHot ? '#00FF41' : isWarm ? '#003311' : '#111',
      }}
      transition={{ 
        duration: isHot ? 2 : 4, 
        repeat: Infinity, 
        delay: index * 0.02,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 0.9, backgroundColor: '#FFFFFF', opacity: 1 }}
    >
      {isHot && (
        <motion.div 
          className="absolute inset-0 bg-white/20"
          animate={{ height: ['0%', '100%', '0%'] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
        />
      )}
    </motion.div>
  );
}