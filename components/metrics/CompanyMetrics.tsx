"use client";

import React, { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";
import { CounterReveal } from "@/components/ui/CounterReveal";

interface MetricData {
  number: string;
  tag: string;
  value: string;
  unit: string;
  title: string;
  description: string;
}

const METRICS: MetricData[] = [
  {
    number: "01",
    tag: "ESTABILIDADE",
    value: "25",
    unit: "+",
    title: "ANOS DE EXPERIÊNCIA",
    description: "Atuação ininterrupta na execução de arquitetura civil e vertical de altíssima permanência.",
  },
  {
    number: "02",
    tag: "EXECUÇÃO",
    value: "120",
    unit: "+",
    title: "PROJETOS ENTREGUES",
    description: "Zero falhas estruturais catastróficas. 100% de conformidade orçamentária e cronograma determinístico.",
  },
  {
    number: "03",
    tag: "ÁREA CONSTRUÍDA",
    value: "4,8M",
    unit: "+",
    title: "MILHÕES DE M² PROJETADOS",
    description: "Área bruta externa acumulada projetada em complexos superaltos e de grandes vãos estruturais.",
  },
  {
    number: "04",
    tag: "GLOBAL",
    value: "18",
    unit: "",
    title: "MERCADOS GLOBAIS",
    description: "Atuação de engenharia credenciada na América do Norte, Europa, Oriente Médio e Ásia-Pacífico.",
  },
];

interface CompanyMetricsProps {
  onOpenDossier?: () => void;
}

export const CompanyMetrics: React.FC<CompanyMetricsProps> = ({ onOpenDossier }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".metric-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full border-b border-white/10 bg-[#0f1012] py-16 md:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 relative overflow-hidden"
    >
      {/* Blueprint Grid Atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-architectural-grid-fine opacity-25 pointer-events-none"
      />

      <div className="max-w-[1440px] xl:max-w-[1680px] mx-auto relative z-10">
        {/* Subtle Section Technical Bar */}
        <div className="flex items-center justify-between pb-6 mb-2 border-b border-white/10 font-mono text-[10px] text-[#8e9196] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#c5a880]" />
            <span className="text-[#e3e2e5]">MÉTRICAS DE ESCALA CORPORATIVA // SÍNTESE DETERMINÍSTICA</span>
          </div>
          <span className="hidden sm:inline text-[#c5a880]">PRECISÃO ESTRUTURAL GLOBAL</span>
        </div>

        {/* Blueprint Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#121417]/80 backdrop-blur-sm">
          {METRICS.map((m) => (
            <div
              key={m.number}
              className="metric-card p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 hover:bg-[#18191d] transition-all duration-300 group blueprint-corner"
            >
              {/* Card Header Telemetry */}
              <div className="flex justify-between items-start font-mono">
                <span className="text-[10px] text-[#8e9196] uppercase tracking-widest group-hover:text-[#c5a880] transition-colors">
                  REF // {m.number}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#c5a880] uppercase tracking-wider px-2 py-0.5 bg-[#c5a880]/10 border border-[#c5a880]/20">
                  {m.tag}
                </span>
              </div>

              {/* Dramatic Impact Number */}
              <div className="flex flex-col space-y-3">
                <div className="font-space text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-none text-[#e3e2e5] tracking-tight group-hover:text-[#c5a880] transition-colors select-none flex items-baseline gap-1">
                  <CounterReveal value={m.value} suffix={m.unit} className="text-inherit" duration={2.5} />
                </div>

                <span className="font-mono text-[11px] sm:text-xs text-[#e3e2e5] tracking-wider uppercase pt-1 font-semibold block">
                  {m.title}
                </span>

                <p className="font-sans text-xs text-[#8e9196] pt-1 font-light leading-relaxed group-hover:text-[#d1c5b8] transition-colors">
                  {m.description}
                </p>
              </div>

              {/* Bottom Blueprint Micro-datum */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#8e9196]">
                <span>VALIDADO</span>
                <span className="text-[#c5a880] font-semibold">100% CONFORMIDADE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Proof CTA Bar (Jarvis Conversion Rule) */}
        <div className="mt-6 p-4 sm:p-5 border border-white/10 bg-[#121417] flex flex-col sm:flex-row items-center justify-between gap-4 blueprint-corner">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#c5a880]" />
            <p className="font-mono text-xs text-[#d1c5b8]">
              <span className="text-[#c5a880] font-semibold">AUDITORIA ESTRUTURAL DISPONÍVEL:</span>{" "}
              Submeta seu modelo preliminar para análise determinística de riscos e viabilidade construtiva.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenDossier}
            className="whitespace-nowrap px-4 py-2 bg-[#c5a880] hover:bg-[#d8bc94] text-[#121417] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer blueprint-corner"
          >
            SUBMETER MODELO PARA FEA →
          </button>
        </div>
      </div>
    </section>
  );
};
