"use client";

import React from "react";
import { Cpu, Award } from "lucide-react";

const COMPUTATIONAL_STACK = [
  { name: "AUTODESK REVIT 2026", category: "BIM NÍVEL 3", spec: "LOD 500" },
  { name: "SAP2000 ADVANCED", category: "FEM ESTRUTURAL", spec: "P-DELTA // SÍSMICO" },
  { name: "ETABS ULTIMATE", category: "SUPERTALLS", spec: "DINÂMICA NÃO-LINEAR" },
  { name: "RHINO + GRASSHOPPER", category: "PARAMÉTRICO", spec: "TOPOLOGIA GENERATIVA" },
  { name: "SOFiSTiK AG", category: "PONTES & TÚNEIS", spec: "PROTENSÃO NÃO-LINEAR" },
  { name: "TEKLA STRUCTURES", category: "AÇO & DETALHAMENTO", spec: "FABRICAÇÃO CNC" },
  { name: "ANSYS MECHANICAL", category: "CFD // TÚNEL DE VENTO", spec: "AERODINÂMICA" },
  { name: "DIANA FEA", category: "GEOTECNIA AVANÇADA", spec: "INTERAÇÃO SOLO-ESTRUTURA" },
  { name: "IDEA STATICA", category: "CONEXÕES TECTÔNICAS", spec: "EN 1993 CBFEM" },
];

const STANDARDS_STACK = [
  { name: "EUROCODE EN 1990—1998", org: "CEN COMITÊ EUROPEU", spec: "BASES DE PROJETO & SÍSMICA" },
  { name: "ASCE 7-22 MULTI-HAZARD", org: "AMERICAN SOCIETY OF CIVIL ENG.", spec: "VENTO EXTREMO & TERREMOTOS" },
  { name: "ACI 318-19", org: "AMERICAN CONCRETE INSTITUTE", spec: "CONCRETO ESTRUTURAL ULTRA ALTO DESEMPENHO" },
  { name: "BSI KITEMARK CERTIFIED", org: "BRITISH STANDARDS INST.", spec: "ISO 9001 / ISO 14001" },
  { name: "ISO 19650 BIM STAGE 3", org: "INTERN. ORG. FOR STAND.", spec: "GESTÃO DA INFORMAÇÃO 5D" },
  { name: "CTBUH PREMIER MEMBER", org: "COUNCIL ON TALL BUILDINGS", spec: "MARCOS GLOBAIS DE ENGENHARIA" },
  { name: "AISC 360-22", org: "AMERICAN INST. OF STEEL CONST.", spec: "ESTRUTURAS METÁLICAS PESADAS" },
  { name: "FIB MODEL CODE 2020", org: "FED. INTERN. DU BÉTON", spec: "CICLO DE VIDA DE 100 ANOS" },
];

export const StandardsMarquee: React.FC = () => {
  return (
    <section className="w-full bg-[#090a0c] border-b border-white/10 py-10 md:py-14 relative overflow-hidden">
      {/* Edge Gradient Fades for Infinite Horizon Look */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#090a0c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#090a0c] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1440px] xl:max-w-[1680px] mx-auto px-4 sm:px-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#c5a880]" />
          <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold">
            TELEMETRIA // INFRAESTRUTURA COMPUTACIONAL &amp; CONFORMIDADE INTERNACIONAL
          </span>
        </div>
        <div className="font-mono text-[10px] text-[#8e9196]">
          <span>VERIFICAÇÃO DETERMINÍSTICA EM CICLO CONTÍNUO</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Row 1: Computational Stack (Left Moving) */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-left flex items-center gap-4">
            {/* Duplicated items to create infinite loop without glitch */}
            {[...COMPUTATIONAL_STACK, ...COMPUTATIONAL_STACK, ...COMPUTATIONAL_STACK].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-2 bg-[#121417]/80 border border-white/10 hover:border-[#c5a880]/50 transition-colors group cursor-default blueprint-corner"
              >
                <Cpu className="w-3.5 h-3.5 text-[#c5a880] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs text-[#e3e2e5] font-semibold tracking-wider whitespace-nowrap">
                  {item.name}
                </span>
                <span className="font-mono text-[9px] text-[#8e9196] uppercase bg-white/5 px-1.5 py-0.5 border border-white/5">
                  {item.category}
                </span>
                <span className="font-mono text-[9px] text-[#c5a880] font-medium">
                  [{item.spec}]
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Regulatory Standards Stack (Right Moving) */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-right flex items-center gap-4">
            {[...STANDARDS_STACK, ...STANDARDS_STACK, ...STANDARDS_STACK].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-2 bg-[#121417]/80 border border-white/10 hover:border-[#c5a880]/50 transition-colors group cursor-default blueprint-corner"
              >
                <Award className="w-3.5 h-3.5 text-[#c5a880] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs text-[#e3e2e5] font-semibold tracking-wider whitespace-nowrap">
                  {item.name}
                </span>
                <span className="font-mono text-[9px] text-[#8e9196] uppercase bg-white/5 px-1.5 py-0.5 border border-white/5">
                  {item.org}
                </span>
                <span className="font-mono text-[9px] text-[#c5a880] font-medium">
                  ✓ {item.spec}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
