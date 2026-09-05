"use client";

import React, { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

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

export const CompanyMetrics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".metric-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full border-b border-[#998f83]/20 bg-[#1b1c1e]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#998f83]/20">
          {METRICS.map((m) => (
            <div
              key={m.number}
              className="metric-card p-8 md:p-12 flex flex-col justify-between space-y-8 bg-[#1b1c1e] hover:bg-[#1f2022] transition-colors group"
            >
              <div className="flex justify-between items-start font-mono">
                <span className="text-[10px] text-[#8e9196] uppercase tracking-widest">
                  MÉTRICA // {m.number}
                </span>
                <span className="text-[10px] text-[#c5a880] uppercase tracking-wider">
                  {m.tag}
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="font-space text-[56px] md:text-[68px] leading-none text-[#e3e2e5] font-light tracking-tight group-hover:text-[#c5a880] transition-colors select-none">
                  {m.value}
                  {m.unit && <span className="text-[#c5a880] font-normal">{m.unit}</span>}
                </div>

                <span className="font-mono text-[11px] text-[#e3e2e5] tracking-wider uppercase pt-2 font-medium">
                  {m.title}
                </span>

                <p className="font-sans text-xs text-[#8e9196] pt-1 font-light leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
