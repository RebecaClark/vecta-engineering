"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Play, Pause, RotateCcw, Volume2, VolumeX, ChevronRight } from "lucide-react";
import { HeroVideo, HeroVideoHandle } from "./HeroVideo";

const HERO_STAGES = [
  { id: 0, label: "FASE 01 // ESCAVAÇÃO", time: 0.2, short: "ESCAVAÇÃO", depth: "-18.4M", status: "PAREDES DIAFRAGMA" },
  { id: 1, label: "FASE 02 // FUNDAÇÃO PROFUNDA", time: 4.5, short: "FUNDAÇÃO", depth: "-8.5M", status: "RADIER DE CONCRETO MACIÇO" },
  { id: 2, label: "FASE 03 // NÚCLEO ESTRUTURAL", time: 9.0, short: "FÔRMA DESLIZANTE", depth: "+160M", status: "ASCENSÃO HIDRÁULICA DO NÚCLEO" },
  { id: 3, label: "FASE 04 // ENVOLTÓRIA DO EDIFÍCIO", time: 14.0, short: "FACHADA", depth: "+240M", status: "ENVIDRAÇAMENTO PELE DE VIDRO" },
  { id: 4, label: "FASE 05 // MARCO ARQUITETÔNICO CONCLUÍDO", time: 21.0, short: "CONCLUÍDO", depth: "+284.4M", status: "AMORTECEDOR DE MASSA SINTONIZADA ATIVO" },
];

const CINEMATIC_PHRASES = [
  {
    id: 1,
    start: 0.0,
    end: 5.5,
    tag: "01 // ROCHA SUBTERRÂNEA",
    headline: "Antes da arquitetura ganhar forma,",
    subline: "a gravidade subterrânea extrema precisa ser calculada.",
    metric: "PROFUNDIDADE: -18,4M // SILTE ALUVIONAR"
  },
  {
    id: 2,
    start: 5.5,
    end: 10.5,
    tag: "02 // METAMORFOSE TECTÔNICA",
    headline: "Núcleo de cisalhamento de alta resistência erguido",
    subline: "através de métodos determinísticos de elementos finitos.",
    metric: "FÔRMA DESLIZANTE: 3,5 M/DIA // C90/105"
  },
  {
    id: 3,
    start: 10.5,
    end: 15.5,
    tag: "03 // INTEGRAÇÃO CÍVICA",
    headline: "Da geologia aluvionar bruta",
    subline: "à infraestrutura pública definitiva no nível da rua.",
    metric: "MARQUISE DE ENTRADA: 100% OPERACIONAL"
  },
  {
    id: 4,
    start: 15.5,
    end: 21.0,
    tag: "04 // PERMANÊNCIA NO HORIZONTE",
    headline: "Projetado para resistir sem concessões",
    subline: "aos próximos dois séculos de vórtices e ventos extremos.",
    metric: "DESLOCAMENTO LATERAL: H/520 // 284,4M"
  }
];

interface HeroV1Props {
  onHeroReveal?: (revealed: boolean) => void;
  isHeroRevealed?: boolean;
}

export const HeroV1: React.FC<HeroV1Props> = ({ onHeroReveal, isHeroRevealed: externalRevealed }) => {
  const [internalRevealed, setInternalRevealed] = useState(false);
  const isHeroRevealed = externalRevealed ?? internalRevealed;

  const [activeStage, setActiveStage] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoHandleRef = useRef<HeroVideoHandle | null>(null);

  const revealHero = () => {
    if (!isHeroRevealed) {
      setInternalRevealed(true);
      onHeroReveal?.(true);
    }
  };

  const handleTogglePlay = () => {
    videoHandleRef.current?.togglePlay();
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleToggleMute = () => {
    videoHandleRef.current?.toggleMute();
    setIsVideoMuted(!isVideoMuted);
  };

  const handleRestart = () => {
    videoHandleRef.current?.restart();
    setIsVideoPlaying(true);
  };

  const handleTimeUpdate = (curTime: number) => {
    setCurrentTime(curTime);

    // Automatic reveal trigger at 21 seconds (1 second before video completion)
    if (curTime >= 21.0 && !isHeroRevealed) {
      revealHero();
    }

    // Map stages for the telemetry HUD
    if (curTime < 4.0) {
      setActiveStage(0);
    } else if (curTime < 9.0) {
      setActiveStage(1);
    } else if (curTime < 14.0) {
      setActiveStage(2);
    } else if (curTime < 19.0) {
      setActiveStage(3);
    } else {
      setActiveStage(4);
    }
  };

  const handleSelectStage = (index: number) => {
    setActiveStage(index);
    if (videoHandleRef.current) {
      videoHandleRef.current.seekToTime(HERO_STAGES[index].time);
      videoHandleRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleSkipIntro = () => {
    revealHero();
    if (videoHandleRef.current) {
      videoHandleRef.current.seekToTime(21.0);
      videoHandleRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  // Find active phrase during intro
  const currentPhrase = CINEMATIC_PHRASES.find(
    (p) => currentTime >= p.start && currentTime < p.end
  ) || CINEMATIC_PHRASES[0];

  return (
    <section className="relative w-full min-h-[100svh] lg:h-[100svh] h-auto flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-8 lg:px-12 border-b border-[#998f83]/20 bg-[#0d0e10] overflow-hidden">
      {/* Background Universal Video with Live Synchronization */}
      <HeroVideo
        ref={videoHandleRef}
        onTimeUpdate={handleTimeUpdate}
        isHeroRevealed={isHeroRevealed}
        showControls={true}
      />

      {/* ========================================================================= */}
      {/* CINEMATIC INTRO MODE: LATERAL EDITORIAL PHRASES (0s to 21s)              */}
      {/* ========================================================================= */}
      <div
        className={`relative z-20 w-full max-w-[1440px] mx-auto my-auto transition-all duration-1000 ${
          !isHeroRevealed ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-8 absolute"
        }`}
      >
        <div className="max-w-2xl px-6 sm:px-8 py-8 sm:py-10 bg-[#0d0e10]/80 backdrop-blur-md border-l-2 border-[#c5a880] border-y border-r border-[#4d463c]/30 shadow-2xl">
          {/* Phase Tag */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-6 h-[1.5px] bg-[#c5a880]" />
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a880] uppercase font-bold">
              {currentPhrase.tag}
            </span>
          </div>

          {/* Dynamic Editorial Headline */}
          <h2 className="font-space text-2xl sm:text-4xl md:text-5xl text-[#e3e2e5] font-light uppercase tracking-tight leading-[1.1] transition-all duration-500 [text-shadow:_0_2px_12px_rgb(0_0_0_/_60%)]">
            {currentPhrase.headline}
          </h2>

          {/* Dynamic Narrative Subline */}
          <p className="font-sans text-base sm:text-xl text-[#d1c5b8] font-light pt-3 max-w-xl leading-relaxed transition-all duration-500 [text-shadow:_0_1px_8px_rgb(0_0_0_/_60%)]">
            {currentPhrase.subline}
          </p>

          {/* Live Engineering Metric Pill */}
          <div className="mt-6 inline-flex items-center gap-3 bg-[#121417]/90 border border-[#c5a880]/50 px-3.5 py-2 font-mono text-[11px] text-[#e3e2e5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
            <span className="text-[#c5a880] font-semibold">{currentPhrase.metric}</span>
          </div>
        </div>
      </div>

      {/* Discreet Skip Action during Intro */}
      {!isHeroRevealed && (
        <div className="relative z-20 w-full max-w-[1440px] mx-auto pb-4 flex items-center justify-between font-mono text-[10px] text-[#8e9196] uppercase tracking-widest">
          <div className="flex items-center gap-3 bg-[#0d0e10]/60 backdrop-blur-md px-3 py-1.5 border border-[#4d463c]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SEQUÊNCIA CINEMATOGRÁFICA EM CURSO ({currentTime.toFixed(0)}s / 21s)</span>
          </div>

          <button
            onClick={handleSkipIntro}
            className="group flex items-center gap-2 px-4 py-2 border border-[#c5a880]/40 bg-[#0d0e10]/80 hover:bg-[#c5a880] hover:text-[#281800] text-[#c5a880] transition-all"
            title="Pular introdução e exibir Hero completo"
          >
            <span>PULAR INTRODUÇÃO</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REVEALED HERO MODE: GLIDES IN AT 21s                                      */}
      {/* ========================================================================= */}
      {/* 1. Top Telemetry Row */}
      <div
        className={`relative z-10 w-full max-w-[1440px] mx-auto pt-2 flex flex-wrap items-center justify-between gap-4 border-b border-[#998f83]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8e9196] transition-all duration-1000 ease-out ${
          isHeroRevealed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="inline-block w-2 h-2 bg-[#c5a880]"></span>
          <span className="text-[#e3e2e5] font-semibold">PROJ REF: 41°53&apos;11&quot;N 87°38&apos;15&quot;W</span>
          <span className="hidden md:inline text-[#8e9196]">// TORRE MONOLÍTICA RIVERFRONT</span>
        </div>
        <div className="flex items-center gap-6 text-[#d1c5b8]">
          <span className="hidden sm:inline">ZONA SÍSMICA: II-B [R=6,5]</span>
          <span className="text-[#c5a880]">ELEVAÇÃO DO NÚCLEO: {HERO_STAGES[activeStage].depth}</span>
          <span className="hidden lg:inline">DESLOCAMENTO LATERAL: H/520</span>
        </div>
      </div>

      {/* 2. Center/Main Hero Monolith Header */}
      <div
        className={`relative z-10 w-full max-w-[1440px] mx-auto my-auto py-4 sm:py-6 transition-all duration-1000 ease-out ${
          isHeroRevealed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none hidden"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          {/* Left Column: Monolithic Typographic Masthead */}
          <div className="lg:col-span-8 flex flex-col space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#c5a880]"></span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-[#c5a880] uppercase font-semibold">
                DISCIPLINA ESTRUTURAL TECTÔNICA
              </span>
            </div>

            <h1 className="font-space text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] text-[#e3e2e5] uppercase tracking-[-0.03em] font-medium leading-[0.95] select-none">
              A ENGENHARIA<br />
              QUE GANHA<br />
              <span className="text-[#c5a880]">FORMA.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#d1c5b8] max-w-xl font-light pt-1 md:pt-2 leading-relaxed">
              Engenharia estrutural, construção civil e execução determinística de projetos em ambientes de alta complexidade.
            </p>
          </div>

          {/* Right Column: Tectonic Evolution Controller & CTAs */}
          <div className="lg:col-span-4 flex flex-col space-y-4 sm:space-y-6 lg:items-end">
{/* Progression Mini-Selector */}
            <div className="hidden lg:block w-full max-w-sm bg-[#0d0e10]/85 backdrop-blur-md p-3.5 sm:p-4 border border-[#998f83]/30">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#998f83]/20">
                <span className="font-mono text-[10px] text-[#8e9196] uppercase tracking-wider">
                  EVOLUÇÃO TECTÔNICA
                </span>
                <span className="font-mono text-[10px] text-[#c5a880] uppercase font-semibold">
                  {HERO_STAGES[activeStage].label}
                </span>
              </div>

              {/* 5-Phase Buttons */}
              <div className="grid grid-cols-5 gap-1.5" role="tablist" aria-label="Fases da construção">
                {HERO_STAGES.map((stg, i) => (
                  <button
                    key={stg.id}
                    role="tab"
                    aria-selected={i === activeStage}
                    onClick={() => handleSelectStage(i)}
                    className={`h-1.5 transition-all focus-visible:ring-1 focus-visible:ring-[#c5a880] ${
                      i === activeStage
                        ? "bg-[#c5a880]"
                        : "bg-[#4d463c]/70 hover:bg-[#c5a880]/60"
                    }`}
                    title={stg.label}
                    aria-label={stg.label}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 text-[9px] font-mono text-[#8e9196]">
                <span>ESCAVAÇÃO</span>
                <span>FÔRMA</span>
                <span>CONCLUÍDO</span>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#998f83]/20 flex justify-between items-center text-[10px] font-mono text-[#d1c5b8]">
                <span>STATUS:</span>
                <span className="text-[#c5a880] font-semibold">{HERO_STAGES[activeStage].status}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 sm:gap-4 w-full max-w-sm">
              <a
                href="#featured-works"
                className="flex-1 inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#c5a880] text-[#281800] font-mono text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold hover:bg-[#fedeb2] transition-colors group focus-visible:ring-1 focus-visible:ring-[#c5a880]"
              >
                <span>EXPLORAR PROJETOS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#transformation"
                className="px-3.5 sm:px-4 py-3.5 sm:py-4 border border-[#4d463c] hover:border-[#c5a880] text-[#e3e2e5] hover:text-[#c5a880] transition-colors flex items-center justify-center bg-[#121417]/60 focus-visible:ring-1 focus-visible:ring-[#c5a880]"
                title="Ver cronologia física"
                aria-label="Ver cronologia física"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Datum Bar with Scroll Indicator & Integrated Video Controller */}
      <div
        className={`relative z-10 w-full max-w-[1440px] mx-auto pb-2 flex flex-col sm:flex-row items-start sm:items-end justify-between border-t border-[#998f83]/20 pt-3 sm:pt-4 gap-3 sm:gap-4 transition-all duration-1000 ease-out ${
          isHeroRevealed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none hidden"
        }`}
      >
        <a
          href="#manifesto"
          className="flex items-center gap-2.5 text-[#8e9196] hover:text-[#c5a880] transition-colors group"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">ROLE PARA EXPLORAR</span>
          <div className="w-4 h-6 border border-[#4d463c] rounded-full flex justify-center pt-1 group-hover:border-[#c5a880]">
            <div className="w-1 h-1.5 bg-[#c5a880] rounded-full animate-bounce"></div>
          </div>
        </a>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 font-mono text-[10px] text-[#8e9196] uppercase tracking-wider">
          <span className="hidden md:inline">ACREDITAÇÃO SUÍÇA: SIA-142</span>
          <span className="hidden md:inline">//</span>
          <span className="hidden lg:inline">VALIDADO AISC 360-16</span>
          <span className="hidden lg:inline">//</span>
          <span className="text-[#e3e2e5]">MASSA: 142.800 T</span>

          {/* Integrated Video Playback Controls in Bottom Datum Bar */}
          <div className="flex items-center gap-1.5 border-l border-[#4d463c]/60 pl-3 sm:pl-4">
            <button
              onClick={handleTogglePlay}
              className="p-1 hover:text-[#c5a880] transition-colors focus-visible:ring-1 focus-visible:ring-[#c5a880]"
              title={isVideoPlaying ? "Pausar vídeo de fundo" : "Reproduzir vídeo"}
              aria-label={isVideoPlaying ? "Pausar vídeo de fundo" : "Reproduzir vídeo"}
            >
              {isVideoPlaying ? <Pause className="w-3.5 h-3.5 text-[#c5a880]" /> : <Play className="w-3.5 h-3.5 text-white" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-1 hover:text-[#c5a880] transition-colors focus-visible:ring-1 focus-visible:ring-[#c5a880]"
              title="Reiniciar vídeo"
              aria-label="Reiniciar vídeo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#8e9196] hover:text-[#c5a880]" />
            </button>
            <button
              onClick={handleToggleMute}
              className="p-1 hover:text-[#c5a880] transition-colors focus-visible:ring-1 focus-visible:ring-[#c5a880]"
              title={isVideoMuted ? "Ativar som do vídeo" : "Silenciar"}
              aria-label={isVideoMuted ? "Ativar som do vídeo" : "Silenciar"}
            >
              {isVideoMuted ? <VolumeX className="w-3.5 h-3.5 text-[#8e9196]" /> : <Volume2 className="w-3.5 h-3.5 text-[#c5a880]" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
