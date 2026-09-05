"use client";

import React, { useState, useEffect, useRef } from "react";
import { CAPABILITIES_DATA } from "@/lib/capabilities-data";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { getGSAP } from "@/lib/gsap";

export const CapabilitiesSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".cap-row", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="w-full border-b border-[#998f83]/20 bg-[#0d0e10] py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky Meta Left Column */}
          <div className="lg:col-span-4 flex flex-col space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest">
                SEÇÃO 04 // COMPETÊNCIAS ESTRUTURAIS
              </span>
              <h2 className="font-space text-3xl sm:text-4xl text-[#e3e2e5] font-medium tracking-tight leading-tight">
                Ciência Estrutural Determinística
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#8e9196] pt-2 font-light leading-relaxed">
                Do acoplamento geotécnico subterrâneo à aerodinâmica computacional, atuamos com rigor absoluto em todas as fases da execução tectônica.
              </p>
            </div>

            <div className="p-6 border border-[#998f83]/20 bg-[#121417] hidden lg:flex flex-col space-y-4">
              <div className="flex items-center gap-2.5 text-[#c5a880] font-mono text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>CERTIFICAÇÃO EUROCÓDIGO &amp; ASCE</span>
              </div>
              <p className="font-sans text-xs text-[#d1c5b8] font-light leading-relaxed">
                Cada dossiê estrutural é verificado contra simulações não lineares de múltiplos riscos (FEA), ensaios dinâmicos sísmicos e modelos em túnel de vento de camada limite.
              </p>
            </div>
          </div>

          {/* Right 6-Row Interactive Spec Registry */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-[#998f83]/20 border-t border-b border-[#998f83]/20">
            {CAPABILITIES_DATA.map((cap) => {
              const isExpanded = activeItem === cap.id;
              return (
                <div
                  key={cap.id}
                  onClick={() => setActiveItem(isExpanded ? null : cap.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveItem(isExpanded ? null : cap.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  className="cap-row py-8 px-4 sm:px-6 hover:bg-[#121417] transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880]"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <span className="font-mono text-sm text-[#8e9196] group-hover:text-[#c5a880] transition-colors mt-0.5">
                        {cap.number}
                      </span>
                      <div className="space-y-2 max-w-lg">
                        <h3 className="font-space text-xl sm:text-2xl text-[#e3e2e5] font-medium group-hover:text-[#c5a880] transition-colors flex items-center gap-2">
                          <span>{cap.title}</span>
                          <ChevronRight
                            className={`w-4 h-4 text-[#8e9196] transition-transform ${
                              isExpanded ? "rotate-90 text-[#c5a880]" : "group-hover:translate-x-1"
                            }`}
                          />
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#8e9196] font-light leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end font-mono text-[10px] sm:text-xs text-[#d1c5b8] space-y-1 shrink-0">
                      <span className="text-[#c5a880] tracking-wider uppercase">{cap.specCode}</span>
                      <span className="text-[#8e9196]">{cap.metric}</span>
                    </div>
                  </div>

                  {/* Expanded Engineering Deliverables */}
                  {isExpanded && (
                    <div className="mt-6 pt-4 border-t border-[#1f2022] grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-[#d1c5b8]">
                      {cap.deliverables.map((del, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-[#0d0e10] border border-[#1f2022]">
                          <span className="text-[#c5a880] text-[10px]">✓</span>
                          <span className="text-[11px]">{del}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
