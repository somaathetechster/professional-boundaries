// app/template.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  // Optional: Add a "glitch" state if we want complex multi-stage effects
  // For now, we rely on CSS/Framer transitions for speed.

  return (
    <motion.div
      // 1. THE SIGNAL LOCK ANIMATION
      // Starts blurry and slightly zoomed out (like a lens focusing)
      initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.98 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="relative min-h-screen"
    >
      {/* 2. THE STATIC FLASH OVERLAY 
          This is a pure CSS noise layer that flashes for 0.2s then disappears.
          It hides the "white flash" of the browser rendering.
      */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="fixed inset-0 pointer-events-none z-[99999] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />
      
      {/* The Page Content */}
      {children}
    </motion.div>
  );
}