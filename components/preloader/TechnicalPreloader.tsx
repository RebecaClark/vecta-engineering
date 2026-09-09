"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Shield, ArrowRight } from "lucide-react";

interface TechnicalPreloaderProps {
  onComplete?: () => void;
}

const BOOT_LOGS = [
  "INICIALIZANDO KERNEL TECTÔNICO VECTA v4.8...",
  "ACOPLANDO TELEMETRIA DE SATÉLITE [41°53'11\"N 87°38'15\"W]... CONECTADO",
  "CARREGANDO MATRIZES FEA NÃO-LINEARES (14.820 NÓS SÍSMICOS)... OK",
  "VERIFICANDO PARÂMETROS EUROCODE EN 1990—1998 & ASCE 7-22... VALIDADO",
  "SINTETIZANDO MODELO COMPUTACIONAL E WIREFRAME TECTÔNICO...",
  "ESTADO DE EQUILÍBRIO ESTÁTICO DETERMINADO // PRONTO PARA TRANSMISSÃO",
];

export const TechnicalPreloader: React.FC<TechnicalPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const finishEarly = () => {
    setProgress(100);
    setIsExiting(true);
    setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 600);
  };

  useEffect(() => {
    // Check ESC key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishEarly();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds authentic boot

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawPct);

      // Add log lines dynamically
      const logIdx = Math.floor((rawPct / 100) * BOOT_LOGS.length);
      setLogs(BOOT_LOGS.slice(0, Math.min(logIdx + 1, BOOT_LOGS.length)));

      if (rawPct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 700);
        }, 300);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] bg-[#07080a] text-[#e3e2e5] flex flex-col justify-between p-6 sm:p-10 md:p-16 transition-all duration-700 ease-in-out select-none ${
        isExiting ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#c5a880] animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#c5a880] uppercase">
            VECTA ENGINEERING // BOOT TECTÔNICO v4.8
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#8e9196]">
            <Shield className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>CRIPTO-CHECKSUM: SHA-256 VALID</span>
          </div>

          <button
            type="button"
            onClick={finishEarly}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#121417] hover:bg-[#1a1d22] border border-white/10 hover:border-[#c5a880]/50 font-mono text-[10px] text-[#c5a880] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>PULAR</span>
            <span className="text-[9px] text-[#8e9196]">(ESC)</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Middle Center: Progress and Terminal Stream */}
      <div className="relative z-10 max-w-4xl w-full mx-auto space-y-8 py-8">
        {/* Massive Percentage */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#8e9196] uppercase tracking-widest block mb-1">
              STATUS DE INICIALIZAÇÃO DE SISTEMA
            </span>
            <div className="flex items-baseline gap-2 font-mono font-bold tracking-tighter">
              <span className="text-7xl sm:text-8xl md:text-9xl text-[#c5a880]">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="text-3xl sm:text-4xl text-[#8e9196] font-normal">%</span>
            </div>
          </div>

          <div className="text-right hidden md:block font-mono text-xs text-[#8e9196] space-y-1">
            <p>REF GEO: 41°53&apos;11&quot;N 87°38&apos;15&quot;W</p>
            <p className="text-[#c5a880]">BERNE NODE: CALIBRATED</p>
            <p>FEA SOLVER: ACTIVE (0.002s)</p>
          </div>
        </div>

        {/* Technical Progress Bar with Blueprint Ticks */}
        <div className="space-y-2">
          <div className="relative w-full h-3 bg-[#121417] border border-white/15 p-0.5 blueprint-corner">
            <div
              className="h-full bg-gradient-to-r from-[#806443] via-[#c5a880] to-[#e6cfb3] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[9px] text-[#8e9196]">
            <span>00 // STACK INIT</span>
            <span>25 // MESH PARSE</span>
            <span>50 // FEA MATRIX</span>
            <span>75 // SHADER RENDER</span>
            <span>100 // READY</span>
          </div>
        </div>

        {/* Live Terminal Diagnostic Feed */}
        <div className="bg-[#0b0c0e] border border-white/10 p-4 font-mono text-xs text-[#8e9196] space-y-1.5 shadow-2xl blueprint-corner max-h-40 overflow-hidden">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5 text-[10px] text-[#c5a880] uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>CONSOLE DE DIAGNÓSTICO // TEMPO REAL</span>
          </div>
          <div className="space-y-1 pt-1">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 text-[11px] ${
                  index === logs.length - 1 ? "text-[#e3e2e5] font-semibold" : "text-[#73767c]"
                }`}
              >
                <span className="text-[#c5a880] select-none">&gt;</span>
                <span className="leading-relaxed">{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] text-[#8e9196] gap-2">
        <div className="flex items-center gap-4">
          <span>PADRÃO: EN 1990—1998</span>
          <span className="hidden sm:inline">•</span>
          <span>TOLERÂNCIA: ±0,001 MM</span>
        </div>
        <div className="text-center sm:text-right">
          <span>VECTA STRUCTURAL SYSTEMS © 2026 // ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </div>
  );
};
