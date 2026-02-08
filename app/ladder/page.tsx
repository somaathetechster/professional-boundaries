// app/ladder/page.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ReferenceLine, Dot
} from 'recharts';

// ------------------------------------------------------------------
// DATA CORE: TACTICAL PROTOCOLS
// ------------------------------------------------------------------
const ladderData = [
  { 
    level: 1, 
    title: "Clarify", 
    phrase: "To clarify: this is what I'm committing to.",
    desc: "Remove ambiguity. Low risk, high clarity.",
    stats: { authority: 20, rapport: 90, energy: 10, risk: 5 },
    color: "#00FF41",
    simulation: {
      input: "Can you just quickly get this done by tonight?",
      weak: "I'll try my best, sorry if it's late.",
      strong: "To clarify: I can prioritize this, but it will push the Q3 report to tomorrow. Which do you prefer?"
    },
    psychology: "Forces the requester to own the trade-off. Removes the 'hero trap'."
  },
  { 
    level: 2, 
    title: "Reframe", 
    phrase: "This isn't about feelings. It's about process.",
    desc: "Shift from emotional to structural context.",
    stats: { authority: 45, rapport: 70, energy: 30, risk: 20 },
    color: "#3B82F6",
    simulation: {
      input: "I feel like you're not being a team player.",
      weak: "I'm sorry you feel that way, I really am trying.",
      strong: "This isn't about personal commitment. It's about the project scope we agreed to in the kick-off."
    },
    psychology: "Decouples personal worth from professional capacity. Moves debate to facts."
  },
  { 
    level: 3, 
    title: "Set Boundary", 
    phrase: "I won’t continue this conversation in that tone.",
    desc: "The hard rail. Immediate stop to violations.",
    stats: { authority: 70, rapport: 40, energy: 60, risk: 45 },
    color: "#F59E0B",
    simulation: {
      input: "This is ridiculous! You always do this!",
      weak: "Please calm down, let's talk.",
      strong: "I am willing to discuss the issue, but I won't continue this conversation while voices are raised."
    },
    psychology: "Establishes immediate consequences for behavioral violations."
  },
  { 
    level: 4, 
    title: "Limit Access", 
    phrase: "I need this in writing before proceeding.",
    desc: "Transition to documentation-only mode.",
    stats: { authority: 85, rapport: 20, energy: 80, risk: 70 },
    color: "#EF4444",
    simulation: {
      input: "Just do it, we'll sort the paperwork later.",
      weak: "Okay, but please send it soon.",
      strong: "Per protocol, I need this request in writing before I can allocate any engineering hours."
    },
    psychology: "Creates a friction layer that filters out impulsive or manipulative requests."
  },
  { 
    level: 5, 
    title: "Escalate / Exit", 
    phrase: "This requires leadership review.",
    desc: "Structural resolution. Total severance.",
    stats: { authority: 100, rapport: 0, energy: 95, risk: 90 },
    color: "#FF3131",
    simulation: {
      input: "If you don't do this, there will be consequences.",
      weak: "I don't want any trouble...",
      strong: "Given the impasse, this requires leadership review. I am cc'ing the Director to provide guidance."
    },
    psychology: "Removes you from the equation entirely. Elevates the risk profile for the aggressor."
  }
];

// ------------------------------------------------------------------
// PAGE CONTROLLER
// ------------------------------------------------------------------
export default function Ladder() {
  const [activeStep, setActiveStep] = useState(ladderData[0]);
  const [selectedStep, setSelectedStep] = useState<typeof ladderData[0] | null>(null);

  // Custom Dot for Area Chart to show active position
  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.title === activeStep.title) {
      return (
        <circle cx={cx} cy={cy} r={6} stroke="#fff" strokeWidth={2} fill={activeStep.color} className="animate-pulse" />
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen bg-system-black font-sans selection:bg-system-neon/20">
      
      {/* 1. THE DATA VISUALIZATION CONSOLE (Sticky Top) */}
      <section className="sticky top-16 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 pb-8 pt-8 px-6 overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: THE CROSSOVER CHART (Authority vs Rapport) */}
          <div className="lg:col-span-8 h-[300px] w-full relative group">
            <div className="absolute top-0 left-0 text-[10px] text-white/30 font-mono tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1 h-1 bg-system-neon rounded-full animate-ping"/>
              Live_Telemetry // Authority_Crossover
            </div>
            
            <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ladderData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAuth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF41" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00FF41" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="title" tick={{fill: '#444', fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }} />
                  
                  {/* Active Step Indicator Line */}
                  <ReferenceLine x={activeStep.title} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />

                  <Area 
                    type="monotone" 
                    dataKey="stats.authority" 
                    stroke="#00FF41" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorAuth)" 
                    activeDot={renderCustomDot}
                    animationDuration={800}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="stats.rapport" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRap)" 
                    activeDot={renderCustomDot}
                    animationDuration={800}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: THE RADAR SCANNER (Current Step Analysis) */}
          <div className="lg:col-span-4 h-[300px] relative terminal-border p-4 flex flex-col justify-center items-center bg-black/40">
             <div className="absolute top-4 left-4 text-[10px] text-system-neon font-mono tracking-widest uppercase">
              Step_0{activeStep.level} // Vector_Analysis
            </div>
            
            <div style={{ width: '100%', height: '220px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                  { subject: 'Authority', A: activeStep.stats.authority, fullMark: 100 },
                  { subject: 'Rapport', A: activeStep.stats.rapport, fullMark: 100 },
                  { subject: 'Energy', A: activeStep.stats.energy, fullMark: 100 },
                  { subject: 'Risk', A: activeStep.stats.risk, fullMark: 100 },
                ]}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 9, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Metrics"
                    dataKey="A"
                    stroke={activeStep.color}
                    strokeWidth={3}
                    fill={activeStep.color}
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="absolute bottom-4 w-full px-8 flex justify-between items-end">
               <div className="text-left">
                  <div className="text-[8px] uppercase text-white/30 tracking-widest">Authority Delta</div>
                  <div className="text-2xl font-black" style={{ color: activeStep.color }}>+{activeStep.stats.authority}%</div>
               </div>
               <div className="text-right">
                   <div className="text-[8px] uppercase text-white/30 tracking-widest">Rapport Cost</div>
                   <div className="text-xl font-bold text-white/60">-{100 - activeStep.stats.rapport}%</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE INTERACTIVE PROTOCOL LIST */}
      <section className="max-w-7xl mx-auto px-6 py-20 pb-40">
        <header className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
            Escalation <span className="text-white/20">Matrix</span>
          </h1>
          <p className="text-white/40 font-mono text-xs tracking-widest uppercase">
            Click any level to initiate tactical simulation
          </p>
        </header>

        <div className="grid gap-6">
          {ladderData.map((step) => (
            <motion.div
              layoutId={`card-${step.level}`}
              key={step.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onMouseEnter={() => setActiveStep(step)}
              onClick={() => setSelectedStep(step)}
              className={`group relative p-8 md:p-10 border transition-all duration-300 cursor-pointer overflow-hidden ${
                activeStep.level === step.level 
                  ? 'border-white/20 bg-white/5 scale-[1.02] shadow-2xl z-10' 
                  : 'border-white/5 bg-transparent hover:border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              {/* Hover Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} 
              />
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                <div className="flex items-center gap-8">
                  <div 
                    className="text-5xl font-black italic text-transparent bg-clip-text stroke-white transition-colors"
                    style={{ WebkitTextStroke: activeStep.level === step.level ? `1px ${step.color}` : '1px rgba(255,255,255,0.1)' }}
                  >
                    0{step.level}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/50 font-mono">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">
                    Initialize Protocol
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. THE "DEEP DIVE" MODAL (Clicked State) */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div 
              layoutId={`card-${selectedStep.level}`}
              className="w-full max-w-4xl bg-system-zinc border border-white/10 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-black/50 p-8 border-b border-white/10 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <span className="text-4xl font-black italic" style={{ color: selectedStep.color }}>0{selectedStep.level}</span>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white">{selectedStep.title}</h2>
                 </div>
                 <button 
                   onClick={() => setSelectedStep(null)}
                   className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                 >
                   Close_Module [ESC]
                 </button>
              </div>

              {/* Modal Content Grid */}
              <div className="grid md:grid-cols-2">
                
                {/* Left: Simulation */}
                <div className="p-8 border-r border-white/10 bg-black/20">
                   <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">Tactical Simulation</div>
                   
                   <div className="space-y-6">
                      {/* Incoming */}
                      <div className="bg-white/5 p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-white/5">
                        <div className="text-[8px] uppercase text-red-400 mb-2 tracking-widest">Incoming Threat</div>
                        <p className="text-white/80 font-serif italic">"{selectedStep.simulation.input}"</p>
                      </div>

                      {/* Weak Response */}
                      <div className="bg-red-900/10 p-4 rounded-xl border border-red-500/20 opacity-50">
                        <div className="text-[8px] uppercase text-red-500 mb-2 tracking-widest">Failed Response (Weak)</div>
                        <p className="text-red-200/60 line-through">"{selectedStep.simulation.weak}"</p>
                      </div>

                      {/* Strong Response */}
                      <div className="bg-green-900/20 p-6 rounded-xl border border-system-neon/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-system-neon" />
                        <div className="text-[8px] uppercase text-system-neon mb-2 tracking-widest">Optimal Protocol</div>
                        <p className="text-white font-medium text-lg">"{selectedStep.simulation.strong}"</p>
                      </div>
                   </div>
                </div>

                {/* Right: Psychology & Data */}
                <div className="p-8 flex flex-col justify-between">
                   <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">Psychological Mechanics</div>
                      <p className="text-white/80 leading-relaxed font-light text-lg">
                        {selectedStep.psychology}
                      </p>
                   </div>
                   
                   <div className="mt-12">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Outcome Prediction</div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">{selectedStep.stats.authority}%</div>
                            <div className="text-[8px] uppercase text-white/30">Authority Retained</div>
                         </div>
                         <div className="bg-white/5 p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">{selectedStep.stats.risk}%</div>
                            <div className="text-[8px] uppercase text-white/30">Conflict Risk</div>
                         </div>
                      </div>
                   </div>
                </div>

              </div>
              
              {/* Footer */}
              <div className="p-4 bg-black border-t border-white/10 text-center">
                 <button 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedStep.simulation.strong);
                  }}
                  className="neon-button text-xs py-3 px-6 w-full max-w-sm"
                >
                   Copy Protocol to Clipboard
                 </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

// ------------------------------------------------------------------
// TOOLTIP COMPONENT
// ------------------------------------------------------------------
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/20 p-4 shadow-2xl backdrop-blur-md rounded-none">
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3 border-b border-white/10 pb-2">{label}</p>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between gap-8">
            <span style={{ color: '#00FF41' }}>AUTHORITY</span>
            <span className="font-bold text-white">{payload[0].value}%</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <span style={{ color: '#3B82F6' }}>RAPPORT</span>
            <span className="font-bold text-white">{payload[1].value}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};