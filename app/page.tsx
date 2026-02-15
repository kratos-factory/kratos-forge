"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HonorMeter } from "@/components/olympus/HonorMeter";
import { TheForge } from "@/components/olympus/TheForge";
import { TheOracle } from "@/components/olympus/TheOracle";
import { Activity, ShieldCheck, Wifi, Cpu, HardDrive, Battery } from "lucide-react";

export default function OlympusOS() {
  const [loading, setLoading] = useState(true);
  const [honor, setHonor] = useState(500);
  const [missions, setMissions] = useState<any[]>([]);

  // Load state from local storage on mount
  useEffect(() => {
    const storedHonor = localStorage.getItem("kratos_honor");
    const storedMissions = localStorage.getItem("kratos_missions");
    if (storedHonor) setHonor(parseInt(storedHonor));
    if (storedMissions) setMissions(JSON.parse(storedMissions));
    
    // Simulate cinematic boot
    setTimeout(() => setLoading(false), 3000);
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem("kratos_honor", honor.toString());
  }, [honor]);

  useEffect(() => {
    localStorage.setItem("kratos_missions", JSON.stringify(missions));
  }, [missions]);

  const handleHonorGain = (amount: number) => {
    setHonor((prev) => prev + amount);
  };

  if (loading) return <BootSequence />;

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-red-900 selection:text-white overflow-hidden flex flex-col relative">
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: "linear-gradient(#4a0404 1px, transparent 1px), linear-gradient(90deg, #4a0404 1px, transparent 1px)", backgroundSize: "50px 50px" }}>
        </div>
        {/* Animated Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
      </div>

      {/* Top Bar */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 z-50 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]" />
          <h1 className="text-xl font-bold tracking-[0.2em] text-white">
            OLYMPUS <span className="text-red-600">OS</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono text-zinc-500 uppercase">
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-green-500" />
            <span>Net: Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-yellow-500" />
            <span>Def: Active</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span>Cycle: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-6 z-10 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-12 gap-6 grid-rows-[auto_1fr_auto]">
          
          {/* Row 1: Honor & Status */}
          <div className="md:col-span-8">
            <HonorMeter current={honor} max={5000} />
          </div>
          <div className="md:col-span-4 bg-zinc-950/90 border border-zinc-800 rounded-xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">System Vitals</h3>
            <div className="space-y-3">
              <ResourceRow label="CPU LOAD" value={12} icon={<Cpu size={14} />} color="bg-blue-500" />
              <ResourceRow label="MEMORY" value={45} icon={<HardDrive size={14} />} color="bg-purple-500" />
              <ResourceRow label="POWER" value={98} icon={<Battery size={14} />} color="bg-green-500" />
            </div>
            {/* Background Decor */}
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <Activity size={100} />
            </div>
          </div>

          {/* Row 2: The Core (Forge + Oracle) */}
          <div className="md:col-span-7 h-[600px]">
            <TheForge onHonorGain={handleHonorGain} missions={missions} setMissions={setMissions} />
          </div>
          <div className="md:col-span-5 h-[600px]">
            <TheOracle />
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="h-8 border-t border-zinc-900 bg-black flex items-center justify-center text-[10px] text-zinc-700 uppercase tracking-widest z-50">
        Forged by Kratos // v3.0.1 // Spartan Protocol Active
      </footer>
    </div>
  );
}

function ResourceRow({ label, value, icon, color }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-zinc-600">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between text-[10px] mb-1 text-zinc-400 font-mono">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
        <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full ${color}`} 
          />
        </div>
      </div>
    </div>
  );
}

function BootSequence() {
  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-xs">
      <div className="w-64 space-y-2">
        <BootLine text="INITIALIZING BIOS..." delay={0.2} />
        <BootLine text="LOADING KERNEL MODULES..." delay={0.8} />
        <BootLine text="MOUNTING OLYMPUS FILESYSTEM..." delay={1.5} />
        <BootLine text="VERIFYING SPARTAN IDENTITY..." delay={2.2} />
        <BootLine text="ACCESS GRANTED." delay={2.8} color="text-green-500" />
      </div>
      <div className="mt-8 w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-full bg-red-600"
        />
      </div>
    </div>
  );
}

function BootLine({ text, delay, color = "text-zinc-500" }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={color}
    >
      {">"} {text}
    </motion.div>
  );
}
