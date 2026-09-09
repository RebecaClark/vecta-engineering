"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, Activity, Wind, Leaf, Sliders, ShieldAlert, Sparkles } from "lucide-react";
import { getGSAP } from "@/lib/gsap";

export const VectaLabsBento: React.FC = () => {
  const [massReduction, setMassReduction] = useState(24);
  const [oscillationStep, setOscillationStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Oscilloscope wave animation
  useEffect(() => {
    const timer = setInterval(() => {
      setOscillationStep((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // GSAP enter animation
  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate concrete volume & CO2 savings dynamically
  const volumeSaved = Math.round(massReduction * 420);
  const co2Avoided = Math.round(volumeSaved * 0.35);

  return (
    <section
      id="labs"
      ref={sectionRef}
      className="w-full border-b border-white/10 bg-[#0b0c0e] py-16 md:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 relative overflow-hidden"
    >
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-architectural-grid-fine opacity-20 pointer-events-none" />

      <div className="max-w-[1440px] xl:max-w-[1680px] mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c5a880]" />
              <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold">
                SEÇÃO 05 // P&amp;D COMPUTACIONAL E INOVAÇÃO TECTÔNICA
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-[#e3e2e5] font-medium tracking-tight">
              Vecta Labs: Otimização Generativa &amp; Monitoramento Vivo
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8e9196] font-light leading-relaxed">
              Desenvolvemos algoritmos proprietários de topologia, túnel de vento digital e sensores de saúde estrutural para antecipar décadas de solicitações mecânicas.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#c5a880] px-3 py-1.5 bg-[#121417] border border-white/10 blueprint-corner self-start md:self-end">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALGORITMOS FEA DE 4ª GERAÇÃO</span>
          </div>
        </div>

        {/* Bento Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Card 1: Generative Topology Optimization (Span 7 cols) */}
          <div className="bento-item md:col-span-7 bg-[#121417]/90 border border-white/10 hover:border-[#c5a880]/50 p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 blueprint-corner group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>OTIMIZAÇÃO TOPOLÓGICA GENERATIVA</span>
                </div>
                <span className="text-[10px] text-[#8e9196] bg-white/5 px-2 py-0.5 border border-white/5">
                  SIMULAÇÃO FEA ITERATIVA
                </span>
              </div>

              <h3 className="font-headline text-xl sm:text-2xl text-[#e3e2e5] font-medium group-hover:text-[#c5a880] transition-colors">
                Redistribuição Paramétrica de Tensão &amp; Redução de Concreto
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#8e9196] font-light leading-relaxed">
                Algoritmos iterativos eliminam volumes ociosos onde o tensor de tensão principal é nulo, gerando exoesqueletos biomiméticos de máxima rigidez e menor pegada de carbono.
              </p>

              {/* Interactive Mass Reduction Slider */}
              <div className="p-4 bg-[#090a0c] border border-white/10 space-y-3 blueprint-corner">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="flex items-center gap-1.5 text-[#8e9196]">
                    <Sliders className="w-3.5 h-3.5 text-[#c5a880]" />
                    SIMULAÇÃO DE ALÍVIO DE MASSA
                  </span>
                  <span className="text-[#c5a880] font-bold">-{massReduction}% CONCRETO</span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="35"
                  value={massReduction}
                  onChange={(e) => setMassReduction(Number(e.target.value))}
                  aria-label="Simulador de redução de massa de concreto"
                  className="w-full accent-[#c5a880] bg-[#1b1c1e] h-1.5 cursor-pointer"
                />

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 font-mono text-[10px]">
                  <div>
                    <span className="text-[#8e9196] block">VOLUME POUPADO</span>
                    <span suppressHydrationWarning className="text-[#e3e2e5] font-semibold">{volumeSaved.toLocaleString()} m³</span>
                  </div>
                  <div>
                    <span className="text-[#8e9196] block">CO₂ EVITADO</span>
                    <span suppressHydrationWarning className="text-[#c5a880] font-semibold">{co2Avoided.toLocaleString()} ton</span>
                  </div>
                  <div>
                    <span className="text-[#8e9196] block">RIGIDEZ AXIAL</span>
                    <span className="text-emerald-400 font-semibold">99.4% PRESERVADA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-[#8e9196] pt-3 border-t border-white/5">
              <span>ALGORITMO // SIMP (SOLID ISOTROPIC MATERIAL WITH PENALISATION)</span>
              <span className="text-[#c5a880]">CONFORMIDADE EUROCODE 2</span>
            </div>
          </div>

          {/* Card 2: IoT Structural Health Monitoring (Span 5 cols) */}
          <div className="bento-item md:col-span-5 bg-[#121417]/90 border border-white/10 hover:border-[#c5a880]/50 p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 blueprint-corner group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>SHM // SAÚDE ESTRUTURAL IoT</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  128 SENSORES ATIVOS
                </span>
              </div>

              <h3 className="font-headline text-xl sm:text-2xl text-[#e3e2e5] font-medium group-hover:text-[#c5a880] transition-colors">
                Gêmeos Digitais Conectados em Tempo Real
              </h3>

              <p className="font-sans text-xs text-[#8e9196] font-light leading-relaxed">
                Acelerômetros triaxiais de fibra óptica de Bragg medem frequências naturais, recalques diferenciais e amortecimento crítico com precisão submilimétrica.
              </p>

              {/* Dynamic Oscilloscope SVG Waveform */}
              <div className="p-3 bg-[#090a0c] border border-white/10 space-y-2 blueprint-corner">
                <div className="flex justify-between font-mono text-[9px] text-[#8e9196]">
                  <span>RESPOSTA ESPECTRAL DINÂMICA</span>
                  <span className="text-[#c5a880]">f₁ = 0.184 Hz</span>
                </div>
                <div className="w-full h-16 relative overflow-hidden flex items-center">
                  <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
                    <line x1="0" y1="30" x2="400" y2="30" stroke="#ffffff10" strokeDasharray="4 4" />
                    <path
                      d={`M 0 30 ${Array.from({ length: 40 })
                        .map((_, i) => {
                          const x = i * 10;
                          const wave1 = Math.sin((i + oscillationStep * 0.4) * 0.4) * 16;
                          const wave2 = Math.cos((i + oscillationStep * 0.2) * 0.8) * 8;
                          const y = 30 + wave1 + wave2;
                          return `L ${x} ${y.toFixed(1)}`;
                        })
                        .join(" ")}`}
                      fill="none"
                      stroke="#c5a880"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-[#8e9196] pt-3 border-t border-white/5">
              <span>AMORTECIMENTO CRÍTICO</span>
              <span className="text-[#e3e2e5] font-semibold">ξ = 4.2%</span>
            </div>
          </div>

          {/* Card 3: CFD Virtual Wind Tunnel (Span 6 cols) */}
          <div className="bento-item md:col-span-6 bg-[#121417]/90 border border-white/10 hover:border-[#c5a880]/50 p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 blueprint-corner group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
                  <Wind className="w-4 h-4" />
                  <span>TÚNEL DE VENTO VIRTUAL (CFD)</span>
                </div>
                <span className="text-[10px] text-[#8e9196] bg-white/5 px-2 py-0.5 border border-white/5">
                  AERODINÂMICA 240 KM/H
                </span>
              </div>

              <h3 className="font-headline text-xl text-[#e3e2e5] font-medium group-hover:text-[#c5a880] transition-colors">
                Dissipação de Vórtices de Von Kármán
              </h3>

              <p className="font-sans text-xs text-[#8e9196] font-light leading-relaxed">
                Otimização da geometria de cantos chanfrados e aberturas aerodinâmicas para anular desprendimentos periódicos de vórtices que provocam oscilação lateral em torres esbeltas.
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#090a0c] border border-white/10 font-mono text-xs">
                <div>
                  <span className="text-[9px] text-[#8e9196] block">COEFICIENTE DE ARRASTO (Cd)</span>
                  <span className="text-[#e3e2e5] font-bold text-lg">0.82 → 0.47</span>
                  <span className="text-[9px] text-emerald-400 block pt-0.5">(-42.6% pressão)</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#8e9196] block">ACELERAÇÃO DE TOPO</span>
                  <span className="text-[#c5a880] font-bold text-lg">6.8 mg</span>
                  <span className="text-[9px] text-[#8e9196] block pt-0.5">(Conforto ISO 10137)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-[#8e9196] pt-3 border-t border-white/5">
              <span>MODELAGEM COMPUTACIONAL</span>
              <span className="text-[#c5a880]">LES (LARGE EDDY SIMULATION)</span>
            </div>
          </div>

          {/* Card 4: Decarbonization & Ultra High-Performance Concrete (Span 6 cols) */}
          <div className="bento-item md:col-span-6 bg-[#121417]/90 border border-white/10 hover:border-[#c5a880]/50 p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 blueprint-corner group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
                  <Leaf className="w-4 h-4" />
                  <span>CONCRETO DESCARBONIZADO &amp; UHPC</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                  LEED PLATINUM COMPLIANT
                </span>
              </div>

              <h3 className="font-headline text-xl text-[#e3e2e5] font-medium group-hover:text-[#c5a880] transition-colors">
                Matrizes de Concreto C90/105 com Baixo CO₂
              </h3>

              <p className="font-sans text-xs text-[#8e9196] font-light leading-relaxed">
                Utilização de ligantes geopoliméricos ativados por álcalis e escória siderúrgica de alto-forno, atingindo resistências superiores a 105 MPa com redução de 42% na pegada de carbono.
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#090a0c] border border-white/10 font-mono text-xs">
                <div>
                  <span className="text-[9px] text-[#8e9196] block">RESISTÊNCIA CARACTERÍSTICA</span>
                  <span className="text-[#e3e2e5] font-bold text-lg">fck ≥ 105 MPa</span>
                  <span className="text-[9px] text-[#8e9196] block pt-0.5">Módulo E: 44 GPa</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#8e9196] block">CICLO DE VIDA PROJETADO</span>
                  <span className="text-[#c5a880] font-bold text-lg">100+ ANOS</span>
                  <span className="text-[9px] text-emerald-400 block pt-0.5">Zero carbonatação precoce</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-[#8e9196] pt-3 border-t border-white/5">
              <span>NORMA DE DURABILIDADE</span>
              <span className="text-[#c5a880]">fib MODEL CODE 2020</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
