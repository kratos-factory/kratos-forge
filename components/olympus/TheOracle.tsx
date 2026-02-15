"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Loader2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "kratos";
  text: string;
  timestamp: Date;
}

export function TheOracle() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "kratos",
      text: "OLYMPUS ONLINE. Awaiting directive.",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate Kratos response (Random for now)
    setTimeout(() => {
      const responses = [
        "Affirmative. Executing protocol.",
        "Honor guides our path.",
        "The Forge is hot. Strike now.",
        "Analyzing parameters... Optimal.",
        "Access granted. Proceed with caution.",
        "Objective unclear. Rephrase, Commander.",
        "System integrity at 100%.",
        "Victory favors the prepared.",
        "I am listening.",
        "Spartan discipline required.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "kratos",
        text: randomResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-6 relative overflow-hidden h-full flex flex-col group hover:border-blue-900/40 transition-colors">
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900/10 p-2 rounded-lg border border-blue-900/30">
            <Bot className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-sm font-bold tracking-widest text-zinc-300 uppercase">THE ORACLE</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-zinc-500 font-mono">ONLINE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar relative z-10" ref={scrollRef}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-3 text-xs max-w-[85%]",
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
              msg.sender === "user" ? "bg-zinc-800 border-zinc-700" : "bg-red-900/20 border-red-900/50"
            )}>
              {msg.sender === "user" ? (
                <Terminal size={14} className="text-zinc-400" />
              ) : (
                <Bot size={14} className="text-red-500" />
              )}
            </div>
            <div className={cn(
              "p-3 rounded-lg border",
              msg.sender === "user" 
                ? "bg-zinc-900 border-zinc-800 text-zinc-300 rounded-tr-none" 
                : "bg-red-900/10 border-red-900/30 text-red-200 rounded-tl-none"
            )}>
              {msg.text}
              <div className="text-[9px] opacity-40 mt-1 text-right font-mono">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-3 text-xs mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-red-900/20 border border-red-900/50 flex items-center justify-center shrink-0">
               <Loader2 size={14} className="text-red-500 animate-spin" />
            </div>
            <div className="text-zinc-500 text-[10px] animate-pulse">
              KRATOS IS THINKING...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative z-10 flex gap-2 pt-4 border-t border-zinc-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER COMMAND..."
          className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-blue-600 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="bg-blue-900/20 border border-blue-900/50 text-blue-500 rounded-lg px-4 hover:bg-blue-900 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </form>

      {/* Background Decor */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none rotate-12">
        <Bot size={200} />
      </div>
    </div>
  );
}
