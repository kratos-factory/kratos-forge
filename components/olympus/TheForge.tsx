"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, X, Sword, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Mission {
  id: string;
  title: string;
  xp: number;
  completed: boolean;
  type: "daily" | "strategic" | "urgent";
}

interface ForgeProps {
  onHonorGain: (amount: number) => void;
  missions: Mission[];
  setMissions: (missions: Mission[]) => void;
}

export function TheForge({ onHonorGain, missions, setMissions }: ForgeProps) {
  const [newMission, setNewMission] = useState("");
  const [activeTab, setActiveTab] = useState("ACTIVE");

  const addMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMission.trim()) return;

    const mission: Mission = {
      id: Date.now().toString(),
      title: newMission,
      xp: 50, // Base XP for tasks
      completed: false,
      type: "daily",
    };

    setMissions([mission, ...missions]);
    setNewMission("");
    onHonorGain(5); // Initial XP for setting a goal
  };

  const completeMission = (id: string, xp: number) => {
    setMissions(
      missions.map((m) =>
        m.id === id ? { ...m, completed: true } : m
      )
    );
    onHonorGain(xp);
  };

  const deleteMission = (id: string) => {
    setMissions(missions.filter((m) => m.id !== id));
  };

  const filteredMissions = activeTab === "ACTIVE" 
    ? missions.filter(m => !m.completed)
    : missions.filter(m => m.completed);

  return (
    <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-6 relative overflow-hidden h-full flex flex-col group hover:border-red-900/40 transition-colors">
      <div className="flex justify-between items-center mb-6 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="bg-red-900/10 p-2 rounded-lg border border-red-900/30">
            <Sword className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-sm font-bold tracking-widest text-zinc-300 uppercase">THE FORGE</h2>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setActiveTab("ACTIVE")}
             className={cn("text-[10px] px-2 py-1 rounded transition-colors", activeTab === "ACTIVE" ? "bg-red-900 text-white" : "text-zinc-600 hover:text-red-400")}
           >ACTIVE</button>
           <button 
             onClick={() => setActiveTab("COMPLETED")}
             className={cn("text-[10px] px-2 py-1 rounded transition-colors", activeTab === "COMPLETED" ? "bg-green-900 text-white" : "text-zinc-600 hover:text-green-400")}
           >LOGS</button>
        </div>
      </div>

      <form onSubmit={addMission} className="relative z-10 mb-6 flex gap-2">
        <input
          type="text"
          value={newMission}
          onChange={(e) => setNewMission(e.target.value)}
          placeholder="ENTER MISSION PARAMETERS..."
          className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
        />
        <button
          type="submit"
          className="bg-red-900/20 border border-red-900/50 text-red-500 rounded-lg px-3 hover:bg-red-900 hover:text-white transition-all disabled:opacity-50"
          disabled={!newMission.trim()}
        >
          <Plus size={16} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2 relative z-10 pr-2 custom-scrollbar">
        <AnimatePresence>
          {filteredMissions.length === 0 && (
            <div className="text-center text-zinc-600 text-xs py-8 italic opacity-50">
              NO MISSIONS FOUND. THE FORGE IS COLD.
            </div>
          )}
          {filteredMissions.map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={cn(
                "group flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer select-none relative overflow-hidden",
                mission.completed 
                  ? "bg-zinc-900/30 border-green-900/20 text-zinc-500 opacity-60" 
                  : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-red-900/50 hover:bg-zinc-900"
              )}
            >
              <div className="flex items-center gap-3 relative z-10">
                <Target size={14} className={mission.completed ? "text-green-500" : "text-zinc-500 group-hover:text-red-500"} />
                <span className={cn("text-xs font-medium uppercase tracking-wide", mission.completed && "line-through decoration-zinc-700")}>
                  {mission.title}
                </span>
              </div>

              <div className="flex items-center gap-2 relative z-10">
                {!mission.completed && (
                  <button
                    onClick={() => completeMission(mission.id, mission.xp)}
                    className="p-1.5 rounded-md hover:bg-green-900/20 text-zinc-600 hover:text-green-500 transition-colors"
                    title="Complete Mission (+50 XP)"
                  >
                    <Check size={14} />
                  </button>
                )}
                <button
                  onClick={() => deleteMission(mission.id)}
                  className="p-1.5 rounded-md hover:bg-red-900/20 text-zinc-600 hover:text-red-500 transition-colors"
                  title="Abort Mission"
                >
                  <X size={14} />
                </button>
              </div>
              
              {/* Mission Progress Bar (Static for now) */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-zinc-800 w-full group-hover:bg-red-900/30 transition-colors" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none rotate-45">
        <Sword size={300} />
      </div>
    </div>
  );
}
