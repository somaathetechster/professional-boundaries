// app/components/ui/navbar.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { name: 'Translate', path: '/translate' },
  { name: 'Auditor', path: '/auditor' },
  { name: 'Ladder', path: '/ladder' },
  { name: 'History_Log', path: '/ledger' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/80 backdrop-blur-xl h-16">
      <div className="h-full px-6 flex justify-between items-center max-w-7xl mx-auto">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="w-2 h-2 bg-system-neon rounded-full z-10 relative" />
            <div className="absolute inset-0 bg-system-neon blur-[8px] opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-mono font-bold tracking-[0.1em] uppercase text-[10px] text-white/60 group-hover:text-white transition-colors">
            Boundary_OS <span className="text-system-neon">v1.0.4</span>
          </span>
        </Link>

        {/* DESKTOP NAV (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 items-center font-mono">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`text-[10px] uppercase tracking-widest transition-all hover:text-system-neon hover:tracking-[0.25em] duration-300 ${
                pathname === item.path ? 'text-system-neon' : 'text-white/40'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-system-neon rounded-full animate-pulse" />
            <span className="text-[9px] text-system-neon/60 tracking-wider uppercase">NET_ONLINE</span>
          </div>
        </div>

        {/* MOBILE HAMBURGER (Visible only on Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50 relative"
        >
          <motion.div 
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} 
            className="w-6 h-0.5 bg-white origin-center" 
          />
          <motion.div 
            animate={{ opacity: isOpen ? 0 : 1 }} 
            className="w-6 h-0.5 bg-white" 
          />
          <motion.div 
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} 
            className="w-6 h-0.5 bg-white origin-center" 
          />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-0 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden pt-20"
          >
            <div className="flex flex-col p-8 gap-8 font-mono">
              {NAV_ITEMS.map((item, i) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-white/80 hover:text-system-neon uppercase tracking-widest flex items-center justify-between group border-b border-white/5 pb-4"
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                  <span className="text-xs text-system-neon/50">0{i+1}</span>
                </Link>
              ))}
              
              <div className="mt-8 p-4 border border-white/10 rounded bg-white/5">
                <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest mb-2">
                  <span>System Status</span>
                  <span className="text-system-neon">Operational</span>
                </div>
                <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest">
                  <span>Region</span>
                  <span className="text-white">Global</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}