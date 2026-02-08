// app/layout.tsx
import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans', 
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono', 
});

export const metadata = {
  title: 'Professional Boundaries | OS',
  description: 'Surgical Authority for Workplace Communication',
  icons: {
    icon: '/favicon.ico', 
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-system-black text-system-chrome antialiased font-sans min-h-screen flex flex-col selection:bg-system-neon/20 selection:text-system-neon">
        
        {/* PERSISTENT HUD NAVIGATION // Z-INDEX 100 TO STAY ABOVE ALL ANIMATIONS */}
        <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/80 backdrop-blur-xl p-4 px-8 flex justify-between items-center h-16">
          
          {/* LEFT: SYSTEM IDENTITY */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="w-2 h-2 bg-system-neon rounded-full z-10 relative" />
              <div className="absolute inset-0 bg-system-neon blur-[8px] opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <a href="/" className="font-mono font-bold tracking-[0.2em] uppercase text-[10px] text-white/60 group-hover:text-white transition-colors">
              Boundary_OS <span className="text-system-neon">v1.0.4</span>
            </a>
          </div>
          
          {/* RIGHT: TOOLING LINKS */}
          <div className="flex gap-8 items-center font-mono">
            <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-widest text-white/40">
              {/* Standard Tools */}
              {['Translate', 'Ladder', 'Auditor'].map((item) => (
                <a 
                  key={item} 
                  href={`/${item.toLowerCase().replace(' ', '-')}`} 
                  className="hover:text-system-neon transition-all hover:tracking-[0.25em] duration-300"
                >
                  {item}
                </a>
              ))}
              
              {/* Personal Data Vault (Distinct Style) */}
              <a 
                href="/ledger" 
                className="text-system-neon/70 hover:text-system-neon transition-all hover:tracking-[0.25em] duration-300 border-b border-transparent hover:border-system-neon/50"
              >
                History_Log
              </a>
            </div>
            
            {/* SEPARATOR */}
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            
            {/* STATUS INDICATOR */}
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-system-neon rounded-full animate-pulse" />
              <span className="text-[9px] text-system-neon/60 tracking-wider uppercase">
                NET_ONLINE
              </span>
            </div>
          </div>
        </nav>

        {/* MAIN ENGINE CONTENT */}
        <main className="flex-1 pt-16 relative z-0">
          {children}
        </main>

      </body>
    </html>
  );
}