"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Download, Check, Layers, Activity } from "lucide-react";
import { TRANSFORMATION_DATA } from "@/lib/transformation-data";
import { getGSAP } from "@/lib/gsap";

export const TransformationSection: React.FC = () => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWireframeActive, setIsWireframeActive] = useState(true);
  const [downloaded, setDownloaded] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<any>(null);

  const stage = TRANSFORMATION_DATA[currentStageIdx];

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleSelectStage = (index: number) => {
    if (triggerRef.current) {
      const st = triggerRef.current;
      const targetProgress = index / (TRANSFORMATION_DATA.length - 1);
      const targetY = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else {
      setCurrentStageIdx(index);
    }
  };

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          const numStages = TRANSFORMATION_DATA.length;
          const stageIndex = Math.min(
            Math.floor(progress * numStages),
            numStages - 1
          );

          setCurrentStageIdx((prev) => (prev !== stageIndex ? stageIndex : prev));
        },
      });

      gsap.from(".trans-header-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative w-full h-screen max-h-screen bg-[#0e0f11] border-b border-white/10 flex flex-col justify-between pt-24 pb-6 sm:pt-24 sm:pb-8 lg:pt-24 lg:pb-10 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden scroll-mt-20 md:scroll-mt-24 z-20"
    >
      <div className="max-w-[1440px] xl:max-w-[1680px] w-full mx-auto flex-1 flex flex-col justify-between gap-4 sm:gap-6">
          {/* Section Header & Scrollytelling Telemetry Status Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 trans-header-anim shrink-0">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold">
                  SEÇÃO 05 // CRONOLOGIA TECTÔNICA
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#c5a880]/15 border border-[#c5a880]/30 font-mono text-[9px] text-[#c5a880]">
                  <Activity className="w-3 h-3 animate-pulse text-emerald-400" />
                  <span>SCROLLYTELLING ATIVO ({(scrollProgress * 100).toFixed(0)}%)</span>
                </span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-[#e3e2e5] font-medium tracking-tight">
                Evolução Tectônica: Do Canteiro ao Marco
              </h2>
            </div>

            {/* Stage Stepper Breadcrumb */}
            <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] text-[#8e9196] uppercase tracking-wider overflow-x-auto pb-1 sm:pb-0">
              {TRANSFORMATION_DATA.map((stg, i) => (
                <button
                  key={stg.id}
                  onClick={() => handleSelectStage(i)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 border transition-all ${
                    i === currentStageIdx
                      ? "border-[#c5a880] text-[#c5a880] bg-[#c5a880]/10 font-bold"
                      : "border-white/10 hover:border-white/25 text-[#8e9196]"
                  }`}
                  title={`Saltar para ${stg.tabTitle}`}
                >
                  <span className="text-[9px]">0{i + 1}</span>
                  <span>{stg.tabTitle.split(". ")[1] || stg.tabTitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Continuous Scrollytelling Scrub Progress Track */}
          <div className="w-full bg-white/5 h-1 relative overflow-hidden shrink-0">
            <div
              className="h-full bg-gradient-to-r from-[#c5a880] via-[#e0c298] to-[#c5a880] transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(scrollProgress * 100, 3)}%` }}
            />
          </div>

          {/* Main Stage Interactive Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch flex-1 min-h-0">
            {/* Left Interactive Viewport with Wireframe/X-Ray HUD */}
            <div className="lg:col-span-8 bg-[#090a0c] border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
              {/* Building Model Viewport */}
              <div className="relative w-full flex-1 min-h-[260px] sm:min-h-[340px] overflow-hidden bg-[#090a0c]">
                {/* Stacked Images for Ultra-smooth Phase Crossfade */}
                {TRANSFORMATION_DATA.map((stg, idx) => (
                  <div
                    key={stg.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      idx === currentStageIdx ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={stg.image}
                      alt={stg.title}
                      fill
                      priority={idx === 0}
                      className="object-cover filter contrast-105"
                      sizes="(max-width: 1024px) 100vw, 65vw"
                    />
                  </div>
                ))}

                {/* Technical Blueprint Wireframe / X-Ray Overlay */}
                {isWireframeActive && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-screen bg-architectural-grid-fine opacity-60"
                  >
                    {/* Pulsing Vertical Laser Scanline */}
                    <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#c5a880]/35 to-transparent animate-scanline border-b border-[#c5a880]/60 pointer-events-none" />

                    {/* SVG Vector Blueprint Wireframe Grid Lines */}
                    <svg className="absolute inset-0 w-full h-full stroke-[#c5a880]/20 stroke-dasharray-[4_4]">
                      <line x1="25%" y1="0" x2="25%" y2="100%" />
                      <line x1="50%" y1="0" x2="50%" y2="100%" />
                      <line x1="75%" y1="0" x2="75%" y2="100%" />
                      <line x1="0" y1="33%" x2="100%" y2="33%" />
                      <line x1="0" y1="66%" x2="100%" y2="66%" />
                    </svg>

                    {/* Laser Target Reticle at Core Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-[#c5a880]/40 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-ping" />
                      <span className="absolute -bottom-5 font-mono text-[8px] text-[#c5a880] tracking-widest whitespace-nowrap">
                        PRUMO A LASER ±0,5MM
                      </span>
                    </div>
                  </div>
                )}

                {/* Top Left Stage Tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <div className="bg-[#0d0e10]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#c5a880]/40 font-mono text-[10px] text-[#c5a880] uppercase tracking-wider shadow-lg">
                    {stage.label}
                  </div>
                  <button
                    onClick={() => setIsWireframeActive(!isWireframeActive)}
                    className="bg-[#0d0e10]/90 backdrop-blur-md px-2.5 py-1.5 border border-white/20 hover:border-[#c5a880] font-mono text-[9px] text-[#e3e2e5] hover:text-[#c5a880] transition-colors flex items-center gap-1.5 shadow-lg"
                    title="Alternar overlay de raio-X e wireframe"
                  >
                    <Layers className="w-3 h-3 text-[#c5a880]" />
                    <span className="hidden sm:inline">RAIO-X: {isWireframeActive ? "ATIVO" : "INATIVO"}</span>
                  </button>
                </div>

                {/* Bottom HUD Telemetry Strip */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap justify-between items-center bg-[#0d0e10]/90 backdrop-blur-md p-2.5 sm:p-3 border border-white/10 text-[#8e9196] font-mono text-[9px] sm:text-[10px] gap-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>COORD: {stage.coordinates}</span>
                  </div>
                  <span className="text-[#c5a880] font-semibold">{stage.elevation}</span>
                  <span className="text-[#e3e2e5]">{stage.massRemovedOrPoured}</span>
                </div>
              </div>

              {/* Bottom Interactive Phase Selector Tabs */}
              <div
                role="tablist"
                aria-label="Fases de construção"
                className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10 divide-x divide-white/10 bg-[#0d0e10] shrink-0"
              >
                {TRANSFORMATION_DATA.map((stg, i) => {
                  const isActive = i === currentStageIdx;
                  return (
                    <button
                      key={stg.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectStage(i)}
                      className={`p-3 sm:p-4 text-left transition-all border-b-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] ${
                        isActive
                          ? "bg-[#16171a] border-[#c5a880]"
                          : "hover:bg-[#121315] border-transparent"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] sm:text-[11px] uppercase block ${
                          isActive ? "text-[#c5a880] font-bold" : "text-[#8e9196]"
                        }`}
                      >
                        {stg.tabTitle}
                      </span>
                      <span className="font-sans text-[10px] sm:text-[11px] text-[#8e9196] truncate block pt-0.5">
                        {stg.tabSubtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Phase Engineering Telemetry Monograph */}
            <div className="lg:col-span-4 bg-[#0d0e10] border border-white/10 p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4 shadow-2xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10 font-mono text-[10px]">
                  <span className="text-[#8e9196] uppercase tracking-wider">DOSSIÊ DE EXECUÇÃO</span>
                  <span className="text-[#c5a880] font-semibold bg-[#c5a880]/10 px-2 py-0.5 border border-[#c5a880]/20">
                    {stage.step}
                  </span>
                </div>

                <h3 className="font-headline text-lg sm:text-xl xl:text-2xl text-[#e3e2e5] font-medium leading-tight">
                  {stage.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#d1c5b8] leading-relaxed font-light">
                  {stage.description}
                </p>
              </div>

              {/* Dynamic Live Telemetry Metrics */}
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#8e9196] uppercase tracking-wider">
                    TELEMETRIA DA FASE
                  </span>
                  <span className="text-emerald-400 text-[9px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> EM TEMPO REAL
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 font-mono">
                  {stage.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2.5 sm:p-3 bg-[#131417] border border-white/5">
                      <span className="text-[9px] text-[#8e9196] uppercase block">{m.label}</span>
                      <span className="text-xs sm:text-sm text-[#e3e2e5] font-semibold block pt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#131417] border border-white/5 font-mono">
                  <span className="text-[9px] text-[#8e9196] uppercase block">
                    CRITÉRIOS DE EQUILÍBRIO FEA
                  </span>
                  <span className="text-xs text-[#c5a880] font-semibold block pt-0.5">
                    {stage.feaEquilibrium}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleDownload}
                  className="w-full py-3 bg-[#161719] hover:bg-[#c5a880] hover:text-[#281800] text-[#e3e2e5] border border-[#c5a880]/40 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-1 focus-visible:ring-[#c5a880] shadow-md group"
                >
                  {downloaded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 group-hover:text-[#281800]" />
                      <span className="font-semibold">DOSSIÊ GEOTÉCNICO GERADO</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#c5a880] group-hover:text-[#281800] transition-colors" />
                      <span className="group-hover:font-semibold">BAIXAR RELATÓRIO GEOTÉCNICO</span>
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
