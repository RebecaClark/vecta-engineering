"use client";

import React from "react";
import { ArrowRight, FileText } from "lucide-react";

interface MonumentalCTAProps {
  onOpenDossier?: () => void;
}

export const MonumentalCTA: React.FC<MonumentalCTAProps> = ({ onOpenDossier }) => {
  return (
    <section
      id="contact"
      className="relative w-full border-b border-[#998f83]/20 bg-[#0d0e10] py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      {/* Background Subtle Radial Dot Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#c5a88008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="border border-[#998f83]/30 bg-[#161719] p-8 md:p-16 lg:p-20 relative overflow-hidden">
          {/* Crosshair Accents on Corners */}
          <span aria-hidden="true" className="absolute top-2 left-2 font-mono text-[10px] text-[#8e9196]">+</span>
          <span aria-hidden="true" className="absolute top-2 right-2 font-mono text-[10px] text-[#8e9196]">+</span>
          <span aria-hidden="true" className="absolute bottom-2 left-2 font-mono text-[10px] text-[#8e9196]">+</span>
          <span aria-hidden="true" className="absolute bottom-2 right-2 font-mono text-[10px] text-[#8e9196]">+</span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#c5a880]"></span>
                <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest">
                  INICIAR CONSULTA DE VIABILIDADE
                </span>
              </div>

              <h2 className="font-space text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#e3e2e5] uppercase font-medium leading-[0.95] tracking-tight">
                VAMOS CONSTRUIR O QUE<br />
                <span className="text-[#c5a880]">VEM A SEGUIR.</span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#d1c5b8] max-w-2xl font-light leading-relaxed">
                Prestamos consultoria para infraestruturas soberanas, núcleos corporativos superaltos, reforços sísmicos e geometrias arquitetônicas experimentais em jurisdições globais.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-4 lg:items-end w-full">
              <button
                onClick={onOpenDossier}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-5 bg-[#c5a880] hover:bg-[#fedeb2] text-[#281800] font-mono text-xs uppercase tracking-widest font-semibold transition-all group shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e3e2e5]"
              >
                <span>INICIAR UM PROJETO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenDossier}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#998f83]/40 hover:border-[#c5a880] bg-[#121417] text-[#e3e2e5] font-mono text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880]"
              >
                <FileText className="w-4 h-4 text-[#c5a880]" />
                <span>SOLICITAR DOSSIÊ TÉCNICO</span>
              </button>

              <div className="pt-4 text-[#8e9196] font-mono text-[9px] sm:text-[10px] text-center lg:text-right tracking-wider">
                CONSULTAS CONFIDENCIAIS PROTEGIDAS POR PROTOCOLO BILATERAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
