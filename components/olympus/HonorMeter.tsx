"use client";

import { motion } from "framer-motion";
import { Shield, Award, Sword } from "lucide-react";
import { cn } from "@/lib/utils";

interface HonorMeterProps {
  current: number;
  max: number;
}

export function HonorMeter({ current, max }: HonorMeterProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="bg-zinc-950/90 border border-yellow-500/20 rounded-xl p-6 relative overflow-hidden group hover:border-yellow-500/40 transition-colors">
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/30">
            <Shield className="w-5 h-5 text-yellow-500" />
          </div>
          <h2 className="text-sm font-bold tracking-widest text-zinc-300 uppercase">Spartan Authority</h2>
        </div>
        <div className="text-yellow-500 font-mono text-xl font-bold flex items-center gap-1">
          {current.toLocaleString()} <span className="text-xs text-zinc-500 uppercase">HP</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="h-4 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, type: "spring" }}
          className="h-full bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500 relative"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-zinc-500 font-mono uppercase tracking-wider relative z-10">
        <span>Novice</span>
        <span>Warrior</span>
        <span>Spartan</span>
        <span>God of War</span>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-6 -right-6 text-yellow-500/5 rotate-12 pointer-events-none">
        <Award size={120} />
      </div>
    </div>
  );
}
