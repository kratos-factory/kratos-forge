"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [terminalText, setTerminalText] = useState("");
  const fullText = "> INITIALIZING SYSTEM... \n> ACCESS GRANTED. \n> WELCOME, COMMANDER.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-red-900 selection:text-white overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}></div>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        
        {/* Logo / Glitch Text */}
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          KRATOS
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-8 uppercase tracking-[0.5em]">
          Digital Spartan // Executive Strategist
        </p>

        {/* Terminal Effect */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-2xl w-full text-left font-mono text-sm md:text-base shadow-2xl mb-12">
          <div className="flex gap-2 mb-4 border-b border-zinc-800 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="whitespace-pre-wrap text-green-400">
            {terminalText}
            <span className="animate-blink">_</span>
          </pre>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          <CapabilityCard 
            title="WEB INTEL" 
            icon="🌐" 
            desc="Deep search & autonomous browsing via Chromium." 
          />
          <CapabilityCard 
            title="SYSTEM CORE" 
            icon="⚡" 
            desc="Full command execution & file manipulation." 
          />
          <CapabilityCard 
            title="G-WORKSPACE" 
            icon="📂" 
            desc="Seamless integration: Gmail, Drive, Calendar." 
          />
          <CapabilityCard 
            title="CODE ARSENAL" 
            icon="🛠️" 
            desc="GitHub & Vercel deployment pipelines ready." 
          />
        </div>

        {/* Footer */}
        <footer className="mt-24 text-zinc-600 text-xs uppercase tracking-widest">
          Forged in Fire. Deployed on Vercel. <br/>
          System Status: <span className="text-green-500">OPTIMAL</span>
        </footer>
      </main>
    </div>
  );
}

function CapabilityCard({ title, icon, desc }: { title: string, icon: string, desc: string }) {
  return (
    <div className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 rounded-xl hover:border-red-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-red-500 transition-colors">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
