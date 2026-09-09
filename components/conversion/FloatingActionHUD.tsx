"use client";

import React, { useState, useEffect } from "react";
import { Send, Activity, ChevronUp } from "lucide-react";

interface FloatingActionHUDProps {
  onOpenDossier: () => void;
}

export const FloatingActionHUD: React.FC<FloatingActionHUDProps> = ({ onOpenDossier }) => {
  const [altitude, setAltitude] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show HUD after scrolling 300px
      setIsVisible(scrollY > 300);

      // Convert scroll progress into simulated architectural elevation (-14m to +284m)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      const simulatedAlt = Math.round(-14 + progress * 298);
      setAltitude(simulatedAlt);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Telemetria e Ação Rápida"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-6"
    >
      {/* Dynamic Telemetry Pill */}
      <div className="hidden sm:flex items-center gap-2.5 px-3 py-2.5 bg-[#090a0c]/90 backdrop-blur-md border border-white/10 font-mono text-[11px] shadow-2xl blueprint-corner">
        <div className="flex items-center gap-1.5 text-[#c5a880]">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-semibold">ALT //</span>
        </div>
        <span className="text-[#e3e2e5] font-medium min-w-[54px]">
          {altitude >= 0 ? `+${altitude},0M` : `${altitude},0M`}
        </span>
        <span className="text-white/20">|</span>
        <span className="text-[#8e9196] text-[10px]">FEA LIVE</span>
      </div>

      {/* Standout Primary Action Button (Jarvis Rule) */}
      <button
        type="button"
        onClick={onOpenDossier}
        className="group flex items-center gap-2.5 px-5 py-2.5 bg-[#c5a880] hover:bg-[#d8bc94] text-[#121417] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl shadow-[#c5a880]/20 hover:shadow-[#c5a880]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer blueprint-corner border border-[#ecd5b8]"
      >
        <span className="w-2 h-2 bg-[#121417] group-hover:scale-125 transition-transform" />
        <span>ESTUDO DE VIABILIDADE // FEA</span>
        <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Quick Scroll To Top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="hidden md:flex items-center justify-center w-9 h-9 bg-[#121417]/90 hover:bg-[#1a1d22] border border-white/10 hover:border-[#c5a880]/50 text-[#8e9196] hover:text-[#c5a880] transition-colors shadow-xl cursor-pointer"
        title="Retornar ao Topo"
        aria-label="Retornar ao Topo"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
    </aside>
  );
};
