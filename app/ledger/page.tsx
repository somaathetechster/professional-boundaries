// app/ledger/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ledger } from '../../lib/ledger'; // Import the new utility
import { LedgerEntry } from '../../lib/types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

export default function LedgerPage() {
  const [history, setHistory] = useState<LedgerEntry[]>([]);
  const [stats, setStats] = useState({ authority: 0, interactions: 0, threatLevel: 'LOW' });

  // Load Data on Mount
  useEffect(() => {
    const data = Ledger.getHistory();
    setHistory(data);
    
    // Calculate Stats
    const avgAuth = data.length > 0 
      ? Math.round(data.reduce((acc, curr) => acc + curr.metrics.authority, 0) / data.length)
      : 0;
      
    const avgAggro = data.length > 0
      ? Math.round(data.reduce((acc, curr) => acc + curr.metrics.aggression, 0) / data.length)
      : 0;

    setStats({
      authority: avgAuth,
      interactions: data.length,
      threatLevel: avgAggro > 70 ? 'CRITICAL' : avgAggro > 40 ? 'ELEVATED' : 'STABLE'
    });
  }, []);

  // Format Data for Chart (Reverse so it flows left to right in time)
  const chartData = [...history].reverse().map(entry => ({
    time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    Authority: entry.metrics.authority,
    Aggression: entry.metrics.aggression
  }));

  return (
    <main className="min-h-screen bg-system-black font-sans selection:bg-system-neon/20 pt-24 pb-20 px-6">
      
      {/* 1. HERO STATS (The "Bank Account" Header) */}
      <div className="max-w-7xl mx-auto mb-12">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-system-neon rounded-full animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-system-neon">
              System_Memory_v1
            </span>
          </div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter">
            Authority <span className="text-white/20">Ledger</span>
          </h1>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard 
            label="Net Authority Score" 
            value={`${stats.authority}%`} 
            sub="Global Average"
            color="text-system-neon"
          />
          <StatCard 
            label="Total Interactions" 
            value={stats.interactions.toString()} 
            sub="Logged Events"
            color="text-white"
          />
          <StatCard 
            label="Environment Threat" 
            value={stats.threatLevel} 
            sub="Based on Aggression Input"
            color={stats.threatLevel === 'CRITICAL' ? 'text-system-alert' : 'text-blue-400'}
          />
        </div>
      </div>

      {/* 2. THE THREAT VELOCITY GRAPH */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="terminal-border p-6 relative">
          <div className="absolute top-4 left-4 text-[10px] uppercase text-white/30 font-mono tracking-widest">
            Threat_Velocity_Graph // Last 50 Interactions
          </div>
          
          <div className="h-[350px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAuth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF41" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FF41" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAgg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3131" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF3131" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="time" tick={{fill: '#444', fontSize: 10}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#444', fontSize: 10}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                  itemStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="Authority" 
                  stroke="#00FF41" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorAuth)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="Aggression" 
                  stroke="#FF3131" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorAgg)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. THE TRANSACTION LOG (History List) */}
      <div className="max-w-7xl mx-auto">
        <div className="terminal-border overflow-hidden">
          <div className="bg-white/5 p-4 border-b border-white/5 grid grid-cols-12 text-[9px] uppercase tracking-widest text-white/40 font-mono">
            <div className="col-span-2">Timestamp</div>
            <div className="col-span-2">Module</div>
            <div className="col-span-5">Input Snippet</div>
            <div className="col-span-3 text-right">Result</div>
          </div>

          <div className="divide-y divide-white/5">
            {history.length === 0 ? (
              <div className="p-12 text-center text-white/20 font-mono text-xs uppercase tracking-widest">
                No Data Found // Initiate Translation to Generate Logs
              </div>
            ) : (
              history.map((entry) => (
                <motion.div 
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-12 p-4 text-xs font-mono hover:bg-white/5 transition-colors items-center group"
                >
                  <div className="col-span-2 text-white/50">
                    {new Date(entry.timestamp).toLocaleDateString()} <span className="text-white/20">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded text-[8px] border ${
                      entry.type === 'TRANSLATION' ? 'border-system-neon/30 text-system-neon' : 'border-blue-400/30 text-blue-400'
                    }`}>
                      {entry.type}
                    </span>
                  </div>
                  <div className="col-span-5 text-white/70 truncate pr-4 font-sans">
                    "{entry.inputSnippet}"
                  </div>
                  <div className="col-span-3 text-right">
                    <span className={`font-bold ${
                      entry.metrics.authority > 50 ? 'text-system-neon' : 'text-system-alert'
                    }`}>
                      {entry.label}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

    </main>
  );
}

// Sub-Component for Stats
function StatCard({ label, value, sub, color }: any) {
  return (
    <div className="terminal-border p-6 bg-black/40 group hover:bg-white/5 transition-colors">
      <span className="block text-[9px] text-white/30 uppercase tracking-[0.2em] mb-3">{label}</span>
      <div className={`text-4xl font-black tracking-tighter mb-1 ${color}`}>
        {value}
      </div>
      <div className="text-[10px] text-white/20 font-mono uppercase">{sub}</div>
    </div>
  );
}