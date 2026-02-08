// app/layout.tsx
import './globals.css';
import { Navbar }  from './components/ui/navbar'; // <--- NEW IMPORT
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
        
        {/* NEW RESPONSIVE NAVBAR (Handles Desktop & Mobile) */}
        <Navbar />

        {/* MAIN ENGINE CONTENT */}
        <main className="flex-1 pt-16 relative z-0">
          {children}
        </main>

      </body>
    </html>
  );
}