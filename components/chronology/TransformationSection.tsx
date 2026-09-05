"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Download, Check, ArrowRight } from "lucide-react";
import { TRANSFORMATION_DATA } from "@/lib/transformation-data";
import { getGSAP } from "@/lib/gsap";

export const TransformationSection: React.FC = () => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const stage = TRANSFORMATION_DATA[currentStageIdx];

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".trans-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="w-full border-b border-[#998f83]/20 bg-[#161719] py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#998f83]/20 pb-8 trans-anim">
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest">
              SEÇÃO 05 // CRONOLOGIA FÍSICA
            </span>
            <h2 className="font-space text-3xl sm:text-4xl md:text-5xl text-[#e3e2e5] font-medium tracking-tight">
              Do Canteiro ao Marco Arquitetônico
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#8e9196] uppercase tracking-wider">
            <span>CANTEIRO</span>
            <span>→</span>
            <span>ENGENHARIA</span>
            <span>→</span>
            <span>CONSTRUÇÃO</span>
            <span>→</span>
            <span className="text-[#c5a880] font-semibold">CONCLUSÃO</span>
          </div>
        </div>

        {/* Main Stage Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch trans-anim">
          {/* Left Interactive Viewport */}
          <div className="lg:col-span-8 bg-[#0d0e10] border border-[#998f83]/30 relative overflow-hidden flex flex-col justify-between">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#1f2022]">
              <Image
                src={stage.image}
                alt={stage.title}
                fill
                className="object-cover transition-all duration-700 filter contrast-105"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
              <div className="absolute top-4 left-4 bg-[#0d0e10]/90 px-3 py-1.5 border border-[#998f83]/30 font-mono text-[10px] text-[#c5a880] uppercase tracking-wider">
                {stage.label}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-center bg-[#0d0e10]/85 backdrop-blur-md p-3 border border-[#998f83]/20 text-[#8e9196] font-mono text-[10px] gap-2">
                <span>COORD: {stage.coordinates}</span>
                <span>{stage.elevation}</span>
                <span className="text-[#e3e2e5]">{stage.massRemovedOrPoured}</span>
              </div>
            </div>

            {/* Bottom Phase Tab Navigators */}
            <div
              role="tablist"
              aria-label="Fases de construção"
              className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#998f83]/20 divide-x divide-[#998f83]/20 bg-[#0d0e10]"
            >
              {TRANSFORMATION_DATA.map((stg, i) => {
                const isActive = i === currentStageIdx;
                return (
                  <button
                    key={stg.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCurrentStageIdx(i)}
                    className={`p-4 text-left transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] ${
                      isActive
                        ? "bg-[#1f2022] border-[#c5a880]"
                        : "hover:bg-[#121417] border-transparent"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] uppercase block ${
                        isActive ? "text-[#c5a880] font-semibold" : "text-[#8e9196]"
                      }`}
                    >
                      {stg.tabTitle}
                    </span>
                    <span className="font-sans text-[11px] text-[#8e9196] truncate block">
                      {stg.tabSubtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Phase Engineering Telemetry Monograph */}
          <div className="lg:col-span-4 bg-[#0d0e10] border border-[#998f83]/30 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#998f83]/20 font-mono text-[10px]">
                <span className="text-[#8e9196] uppercase">DOSSIÊ DE EXECUÇÃO</span>
                <span className="text-[#c5a880] font-semibold">{stage.step}</span>
              </div>

              <h3 className="font-space text-xl sm:text-2xl text-[#e3e2e5] font-medium leading-tight">
                {stage.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#d1c5b8] leading-relaxed font-light">
                {stage.description}
              </p>
            </div>

            <div className="space-y-4 border-t border-[#998f83]/20 pt-6">
              <span className="font-mono text-[10px] text-[#8e9196] uppercase tracking-wider block">
                MÉTRICAS DE TELEMETRIA DA FASE
              </span>

              <div className="grid grid-cols-2 gap-3 font-mono">
                {stage.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="p-3 bg-[#161719] border border-[#1f2022]">
                    <span className="text-[9px] text-[#8e9196] uppercase block">{m.label}</span>
                    <span className="text-sm sm:text-base text-[#e3e2e5] font-medium block pt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#161719] border border-[#1f2022] font-mono">
                <span className="text-[9px] text-[#8e9196] uppercase block">
                  CRITÉRIOS DE EQUILÍBRIO FEA
                </span>
                <span className="text-xs text-[#c5a880] font-medium block pt-0.5">
                  {stage.feaEquilibrium}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleDownload}
                className="w-full py-3.5 bg-[#1f2022] hover:bg-[#38393b] text-[#e3e2e5] border border-[#998f83]/30 font-mono text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880]"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">DOSSIÊ GEOTÉCNICO GERADO</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#c5a880]" />
                    <span>BAIXAR RELATÓRIO GEOTÉCNICO</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
