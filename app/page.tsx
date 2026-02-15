"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function KratosOS() {
  const [time, setTime] = useState("");
  const [bootSequence, setBootSequence] = useState(true);
  const [activeTab, setActiveTab] = useState("DASHBOARD");

  useEffect(() => {
    // Clock
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    
    // Boot fake sequence
    setTimeout(() => setBootSequence(false), 2500);

    return () => clearInterval(timer);
  }, []);

  if (bootSequence) {
    return <BootScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono overflow-hidden flex flex-col selection:bg-red-900 selection:text-white">
      {/* CRT Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      
      {/* Top Bar */}
      <header className="h-10 border-b border-red-900/50 bg-zinc-950 flex items-center justify-between px-4 text-xs uppercase tracking-widest z-40">
        <div className="flex items-center gap-4">
          <span className="font-bold text-red-600">KRATOS_OS v2.0</span>
          <span className="text-zinc-500">|</span>
          <span className="animate-pulse text-green-500">SYSTEM ONLINE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>NET: <span className="text-green-500">SECURE</span></span>
          <span className="text-zinc-500">|</span>
          <span>{time}</span>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Sidebar / Dock */}
        <aside className="w-16 md:w-64 border-r border-red-900/30 bg-zinc-950/80 backdrop-blur flex flex-col z-30">
          <div className="p-4 hidden md:block">
            <div className="text-[10px] text-zinc-500 mb-2">OPERATOR</div>
            <div className="text-white font-bold">COMMANDER</div>
          </div>
          
          <nav className="flex-1 flex flex-col gap-1 p-2">
            <NavButton label="DASHBOARD" icon="📊" active={activeTab === "DASHBOARD"} onClick={() => setActiveTab("DASHBOARD")} />
            <NavButton label="INTEL_FEED" icon="gw" active={activeTab === "INTEL"} onClick={() => setActiveTab("INTEL")} />
            <NavButton label="ARSENAL" icon="⚔️" active={activeTab === "ARSENAL"} onClick={() => setActiveTab("ARSENAL")} />
            <NavButton label="LOGS" icon="📝" active={activeTab === "LOGS"} onClick={() => setActiveTab("LOGS")} />
          </nav>

          <div className="p-4 border-t border-red-900/30 text-[10px] text-zinc-600 text-center">
            UPTIME: 04:12:33
          </div>
        </aside>

        {/* Desktop Area */}
        <div className="flex-1 p-6 overflow-y-auto relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: "linear-gradient(#330000 1px, transparent 1px), linear-gradient(90deg, #330000 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            {activeTab === "DASHBOARD" && <DashboardView />}
            {activeTab === "INTEL" && <IntelView />}
            {activeTab === "ARSENAL" && <ArsenalView />}
            {activeTab === "LOGS" && <LogsView />}
          </div>
        </div>
      </main>

      {/* Footer / Status Line */}
      <footer className="h-8 border-t border-red-900/50 bg-zinc-950 flex items-center px-4 text-[10px] text-zinc-500 gap-4 z-40">
        <span className="text-red-600">root@kratos-forge:~#</span>
        <span className="animate-blink">_</span>
      </footer>
    </div>
  );
}

// --- Sub-Components ---

function BootScreen() {
  return (
    <div className="min-h-screen bg-black text-red-600 font-mono flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-2 text-xs">BIOS CHECK... OK</div>
        <div className="mb-2 text-xs">LOADING KERNEL... OK</div>
        <div className="mb-2 text-xs">MOUNTING FILESYSTEMS... OK</div>
        <div className="mb-8 text-xs">ESTABLISHING UPLINK... OK</div>
        <div className="h-1 w-full bg-zinc-900 rounded overflow-hidden">
          <div className="h-full bg-red-600 animate-progress"></div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ label, icon, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded text-xs font-bold tracking-wider transition-all
      ${active ? 'bg-red-900/20 text-red-500 border border-red-900/50' : 'text-zinc-600 hover:text-red-400 hover:bg-zinc-900'}
    `}>
      <span className="text-base">{icon}</span>
      <span className="hidden md:block">{label}</span>
    </button>
  );
}

function DashboardView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Identity Card */}
      <div className="col-span-1 md:col-span-2 bg-zinc-900/50 border border-red-900/30 p-6 rounded relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-50 text-6xl">🪓</div>
        <h2 className="text-2xl font-bold text-white mb-2">IDENTITY: KRATOS</h2>
        <div className="text-sm text-zinc-400 mb-4">ROLE: EXECUTIVE STRATEGIST</div>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-lg">
          "I do not guess. I know. I do not try. I dominate."
          <br/><br/>
          Deployed to serve the Commander. Specialized in high-velocity execution, system dominance, and strategic web intelligence.
        </p>
      </div>

      {/* System Status */}
      <div className="bg-zinc-900/50 border border-red-900/30 p-6 rounded flex flex-col gap-4">
        <h3 className="text-xs uppercase text-zinc-500">System Resources</h3>
        <ResourceBar label="NEURAL LOAD" value="12%" color="bg-green-500" />
        <ResourceBar label="MEMORY ALLOC" value="45%" color="bg-yellow-500" />
        <ResourceBar label="STORAGE" value="88%" color="bg-red-500" />
        <ResourceBar label="WILLPOWER" value="100%" color="bg-red-600" />
      </div>

      {/* Recent Activity */}
      <div className="col-span-1 md:col-span-3 bg-zinc-900/50 border border-red-900/30 p-6 rounded">
        <h3 className="text-xs uppercase text-zinc-500 mb-4">Mission Timeline</h3>
        <div className="space-y-3">
          <LogEntry time="09:30" event="DEPLOYED KRATOS-FORGE LANDING PAGE" status="SUCCESS" />
          <LogEntry time="09:15" event="AUTHORIZED GITHUB CLI OAUTH" status="SUCCESS" />
          <LogEntry time="08:45" event="INTEGRATED VERCEL DEPLOYMENT PIPELINE" status="SUCCESS" />
          <LogEntry time="08:20" event="LINKED GOOGLE WORKSPACE (GMAIL/DRIVE)" status="SUCCESS" />
        </div>
      </div>
    </div>
  );
}

function IntelView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900/50 border border-red-900/30 p-6 rounded">
        <h3 className="text-lg font-bold text-white mb-4">GOOGLE WORKSPACE</h3>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex justify-between border-b border-zinc-800 pb-2">
            <span>📧 GMAIL</span>
            <span className="text-green-500">CONNECTED</span>
          </li>
          <li className="flex justify-between border-b border-zinc-800 pb-2">
            <span>📅 CALENDAR</span>
            <span className="text-green-500">SYNCED</span>
          </li>
          <li className="flex justify-between border-b border-zinc-800 pb-2">
            <span>💾 DRIVE</span>
            <span className="text-green-500">MOUNTED</span>
          </li>
        </ul>
      </div>
      <div className="bg-zinc-900/50 border border-red-900/30 p-6 rounded">
        <h3 className="text-lg font-bold text-white mb-4">WEB RECON</h3>
        <div className="text-sm text-zinc-400">
          <div className="mb-2">ACTIVE ENGINE: <span className="text-white">CHROMIUM (HEADLESS)</span></div>
          <div className="mb-2">SEARCH API: <span className="text-white">BRAVE SEARCH</span></div>
          <div className="p-4 bg-black rounded mt-4 font-mono text-xs text-green-400">
            {`> ping google.com... 14ms
> ping github.com... 22ms
> ping vercel.com... 18ms
> connection_stability: 99.9%`}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArsenalView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <ToolCard name="NEXT.JS" ver="16.1" status="CORE" />
       <ToolCard name="TAILWIND" ver="4.0" status="STYLE" />
       <ToolCard name="VERCEL" ver="CLI 50" status="DEPLOY" />
       <ToolCard name="GITHUB" ver="CLI 2.8" status="REPO" />
       <ToolCard name="GOG" ver="0.11" status="G-SUITE" />
       <ToolCard name="BRAVE" ver="API" status="SEARCH" />
    </div>
  );
}

function LogsView() {
  return (
    <div className="bg-zinc-900/50 border border-red-900/30 p-6 rounded h-full min-h-[500px] font-mono text-xs text-zinc-400 overflow-y-auto">
      <div className="mb-2 text-zinc-600"># SYSTEM LOGS - {new Date().toLocaleDateString()}</div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="mb-1">
          <span className="text-zinc-600">[{10 + i}:00:{Math.floor(Math.random() * 60)}]</span> 
          <span className="text-red-900/70 mx-2">DEBUG</span> 
          <span>System operational. Routine check passed. Segment {i * 423} verified.</span>
        </div>
      ))}
    </div>
  );
}

// --- Helpers ---

function ResourceBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-[10px] mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1 bg-zinc-800 rounded overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: value }}></div>
      </div>
    </div>
  );
}

function LogEntry({ time, event, status }: any) {
  return (
    <div className="flex items-center gap-4 text-xs border-b border-zinc-800 pb-2 last:border-0">
      <span className="text-zinc-500 font-mono">{time}</span>
      <span className="flex-1 text-zinc-300">{event}</span>
      <span className="text-green-500 font-bold bg-green-900/20 px-2 py-0.5 rounded">{status}</span>
    </div>
  );
}

function ToolCard({ name, ver, status }: any) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded flex items-center justify-between hover:border-red-600 transition-colors">
      <div>
        <div className="font-bold text-white">{name}</div>
        <div className="text-xs text-zinc-500">v{ver}</div>
      </div>
      <div className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">{status}</div>
    </div>
  );
}
