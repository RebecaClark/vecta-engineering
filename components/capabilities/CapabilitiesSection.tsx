"use client";

import React, { useState, useEffect, useRef } from "react";
import { CAPABILITIES_DATA } from "@/lib/capabilities-data";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { getGSAP } from "@/lib/gsap";

interface CapabilitiesSectionProps {
  onOpenDossier?: () => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onOpenDossier }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".cap-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="w-full border-b border-white/10 bg-[#0d0e10] py-16 md:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-[1440px] xl:max-w-[1680px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Sticky Meta Left Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#c5a880]" />
                <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold">
                  SEÇÃO 04 // COMPETÊNCIAS ESTRUTURAIS
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#e3e2e5] font-medium tracking-tight leading-tight">
                Ciência Estrutural Determinística
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#8e9196] pt-1 font-light leading-relaxed">
                Do acoplamento geotécnico subterrâneo à aerodinâmica computacional, atuamos com rigor absoluto em todas as fases da execução tectônica.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-[#121417]/80 backdrop-blur-sm flex flex-col space-y-4 shadow-xl blueprint-corner">
              <div className="flex items-center gap-2.5 text-[#c5a880] font-mono text-[11px] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <span>CERTIFICAÇÃO EUROCÓDIGO &amp; ASCE</span>
              </div>
              <p className="font-sans text-xs text-[#d1c5b8] font-light leading-relaxed">
                Cada dossiê estrutural é verificado contra simulações não lineares de múltiplos riscos (FEA), ensaios dinâmicos sísmicos e modelos em túnel de vento de camada limite.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#8e9196]">
                <span>NORMA TÉCNICA</span>
                <span className="text-[#c5a880]">EN 1990 — EN 1998</span>
              </div>
              <button
                type="button"
                onClick={onOpenDossier}
                className="w-full py-2 bg-[#c5a880]/15 hover:bg-[#c5a880] text-[#c5a880] hover:text-[#121417] border border-[#c5a880]/40 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                SOLICITAR PARECER TÉCNICO →
              </button>
            </div>
          </div>

          {/* Right 6-Card Interactive Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {CAPABILITIES_DATA.map((cap) => {
              const isExpanded = activeItem === cap.id;
              return (
                <div
                  key={cap.id}
                  className="cap-card bg-[#121417]/90 border border-white/10 hover:border-[#c5a880]/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group blueprint-corner shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#c5a880]/5"
                >
                  <div className="space-y-3">
                    {/* Card Top Header */}
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-xs font-bold text-[#c5a880] tracking-wider">
                        REF // {cap.number}
                      </span>
                      <span className="text-[9px] font-semibold text-[#c5a880] uppercase tracking-wider px-2 py-0.5 bg-[#c5a880]/10 border border-[#c5a880]/25">
                        {cap.specCode}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline text-lg sm:text-xl text-[#e3e2e5] font-medium group-hover:text-[#c5a880] transition-colors leading-snug">
                      {cap.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs text-[#8e9196] group-hover:text-[#d1c5b8] font-light leading-relaxed transition-colors">
                      {cap.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 space-y-3">
                    {/* Metric datum */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8e9196]">
                      <span>MÉTRICA CHAVE</span>
                      <span className="text-[#e3e2e5] font-medium">{cap.metric}</span>
                    </div>

                    {/* Expandable Deliverables Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setActiveItem(isExpanded ? null : cap.id)}
                      className="w-full flex items-center justify-between py-2 px-3 bg-[#16181b] hover:bg-[#1f2126] border border-white/5 hover:border-[#c5a880]/30 font-mono text-[10px] text-[#c5a880] uppercase tracking-wider transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? "Ocultar Entregáveis" : "Ver Entregáveis"}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? "rotate-90 text-[#c5a880]" : "text-[#8e9196]"
                        }`}
                      />
                    </button>

                    {/* Expanded Deliverables List */}
                    {isExpanded && (
                      <div className="pt-2 grid grid-cols-1 gap-1.5 font-mono text-[10px] text-[#d1c5b8] border-t border-white/5">
                        {cap.deliverables.map((del, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-1.5 bg-[#0d0e10] border border-white/5"
                          >
                            <span className="text-[#c5a880] font-bold">✓</span>
                            <span className="leading-snug">{del}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
