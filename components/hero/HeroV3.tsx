"use client";

import React, { useState, useRef } from "react";
import { HeroVideo, HeroVideoHandle } from "./HeroVideo";
import { ArrowUpRight } from "lucide-react";

interface HUDParam {
  stage: string;
  index: string;
  name: string;
  param1Label: string;
  param1Val: string;
  param2Label: string;
  param2Val: string;
  param3Label: string;
  param3Val: string;
  param4Label: string;
  param4Val: string;
  timestamp: string;
  videoTime: number;
}

const HUD_STAGES: HUDParam[] = [
  {
    stage: "PHASE 01: GROUND ZERO",
    index: "[01/05]",
    name: "Excavation & Caissons",
    param1Label: "Excavation Depth",
    param1Val: "-18.40 M Bedrock Pier",
    param2Label: "Structural Mass",
    param2Val: "0 T Core In Situ",
    param3Label: "Hydrostatic Retention",
    param3Val: "Bentonite Slurry Diaphragm",
    param4Label: "FEA Load Equilibrium",
    param4Val: "Base Piezometric Balance",
    timestamp: "TIMESTAMP: T-00 MOS // 0% BUILD",
    videoTime: 0.2,
  },
  {
    stage: "PHASE 02: SUB-GRADE MAT",
    index: "[02/05]",
    name: "Mass Concrete Pour",
    param1Label: "Mat Thickness",
    param1Val: "3.80 M Monolithic Raft",
    param2Label: "Concrete Cured",
    param2Val: "12,800 MT Mass Concrete",
    param3Label: "Cryo Cooling Delta",
    param3Val: "ΔT < 18°C Curing Loop",
    param4Label: "Compressive Index",
    param4Val: "90 MPa Cylinder Benchmark",
    timestamp: "TIMESTAMP: T-06 MOS // 25% BUILD",
    videoTime: 1.4,
  },
  {
    stage: "PHASE 03: SHEAR CORE FRAMING",
    index: "[03/05]",
    name: "Hydraulic Slipform",
    param1Label: "Core Height",
    param1Val: "+160.00 M Dual-Cell",
    param2Label: "Steel Outriggers",
    param2Val: "18,500 MT High-Tensile",
    param3Label: "Hydraulic Speed",
    param3Val: "3.5 Vertical M / Day",
    param4Label: "Laser Alignment",
    param4Val: "±0.5 MM Dynamic Plumb",
    timestamp: "TIMESTAMP: T-18 MOS // 55% BUILD",
    videoTime: 2.8,
  },
  {
    stage: "PHASE 04: FACADE & ENVELOPE",
    index: "[04/05]",
    name: "Pressurized Curtain Wall",
    param1Label: "Glazing Height",
    param1Val: "+240.00 M Enclosed",
    param2Label: "Wind Vortex Shedding",
    param2Val: "-32% Aerodynamic Drag",
    param3Label: "Tuned Mass Damper",
    param3Val: "650-Ton Pendulum Rigged",
    param4Label: "Inter-Story Drift",
    param4Val: "H/600 Limit Enforced",
    timestamp: "TIMESTAMP: T-28 MOS // 85% BUILD",
    videoTime: 4.0,
  },
  {
    stage: "PHASE 05: COMMISSIONED",
    index: "[05/05]",
    name: "Completed Landmark",
    param1Label: "Final Pinnacle",
    param1Val: "+284.40 M Structural",
    param2Label: "Total Mass",
    param2Val: "142,800 MT Integrated",
    param3Label: "TMD Live Frequency",
    param3Val: "0.18 Hz Harmonic Balance",
    param4Label: "FEA Verification",
    param4Val: "100% Deterministic Compliance",
    timestamp: "TIMESTAMP: T-36 MOS // 100% COMMISSIONED",
    videoTime: 5.1,
  },
];

export const HeroV3: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState(4);
  const videoHandleRef = useRef<HeroVideoHandle | null>(null);

  const currentHUD = HUD_STAGES[sliderIndex];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderIndex(val);
    if (videoHandleRef.current) {
      videoHandleRef.current.seekToTime(HUD_STAGES[val].videoTime);
    }
  };

  const handleStageSelect = (idx: number) => {
    setSliderIndex(idx);
    if (videoHandleRef.current) {
      videoHandleRef.current.seekToTime(HUD_STAGES[idx].videoTime);
      videoHandleRef.current.play();
    }
  };

  return (
    <section className="relative w-full min-h-screen h-[100svh] flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 lg:px-12 max-w-[1720px] mx-auto overflow-hidden bg-[#0d0e10]">
      {/* Universal Video Background */}
      <HeroVideo ref={videoHandleRef} />

      {/* Architectural HUD Coordinate Watermark */}
      <div className="relative z-10 w-full flex items-center justify-between font-mono text-[10px] uppercase text-[#8e9196] border-b border-[#998f83]/20 pb-3">
        <div className="flex items-center gap-2 bg-[#0d0e10]/80 backdrop-blur-md px-3 py-1 border border-[#4d463c]">
          <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-ping"></span>
          <span className="text-[#e3e2e5] tracking-widest font-semibold">
            VCT-FEA // LIVE SITE TELEMETRY RECORD
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[#8e9196]">
          <span>41°53&apos;11.2&quot;N 87°38&apos;05.4&quot;W</span>
          <span className="text-[#4d463c]">|</span>
          <span className="text-[#c5a880] font-semibold">{currentHUD.timestamp}</span>
        </div>
      </div>

      {/* Center Typographic & HUD Row */}
      <div className="relative z-10 my-auto py-4">
        {/* Metamorphosis Formula */}
        <div className="flex flex-wrap items-center gap-3 mb-3 font-mono text-[10px] uppercase tracking-widest text-[#8e9196]">
          <span className="text-[#c5a880]">Structural Metamorphosis Engine</span>
          <span className="text-[#4d463c]">/</span>
          <div className="flex items-center gap-1.5 text-[#d1c5b8]">
            <span>VISION</span>
            <span className="text-[#c5a880]">→</span>
            <span>ENGINEERING</span>
            <span className="text-[#c5a880]">→</span>
            <span>EXECUTION</span>
            <span className="text-[#c5a880]">→</span>
            <span className="text-[#c5a880] font-bold">RESULT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Headline */}
          <div className="lg:col-span-8">
            <h1 className="font-space text-[48px] sm:text-[68px] md:text-[88px] lg:text-[104px] uppercase tracking-[-0.04em] text-[#e3e2e5] font-medium leading-[0.92] select-none">
              FROM VOID TO<br />
              <span className="text-[#c5a880] font-light">MONUMENT.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#d1c5b8] max-w-xl font-light mt-4 leading-relaxed">
              Real-time forensic telemetry documenting the physical transformation of raw geology into permanent architectural infrastructure.
            </p>
          </div>

          {/* Dynamic Live Structural Parameter HUD Box */}
          <div className="lg:col-span-4 bg-[#0d0e10]/90 backdrop-blur-xl border border-[#998f83]/40 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none border-t border-r border-[#c5a880]"></div>

            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#998f83]/20">
              <span className="font-mono text-[11px] uppercase text-[#c5a880] font-semibold">
                {currentHUD.stage}
              </span>
              <span className="font-mono text-[10px] text-[#8e9196]">{currentHUD.index}</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b border-[#1f2022] pb-1">
                <span className="text-[#8e9196] text-[10px] uppercase">{currentHUD.param1Label}:</span>
                <span className="text-[#e3e2e5] font-medium">{currentHUD.param1Val}</span>
              </div>
              <div className="flex justify-between border-b border-[#1f2022] pb-1">
                <span className="text-[#8e9196] text-[10px] uppercase">{currentHUD.param2Label}:</span>
                <span className="text-[#e3e2e5] font-medium">{currentHUD.param2Val}</span>
              </div>
              <div className="flex justify-between border-b border-[#1f2022] pb-1">
                <span className="text-[#8e9196] text-[10px] uppercase">{currentHUD.param3Label}:</span>
                <span className="text-[#c5a880] font-medium">{currentHUD.param3Val}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e9196] text-[10px] uppercase">{currentHUD.param4Label}:</span>
                <span className="text-[#d1c5b8]">{currentHUD.param4Val}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Scrubber Slider Controller */}
      <div className="relative z-10 w-full border-t border-[#998f83]/20 pt-4 space-y-3">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#8e9196]">
          <span>TRANSFORMATION SCRUBBER</span>
          <div className="flex items-center gap-3">
            {HUD_STAGES.map((s, i) => (
              <button
                key={s.stage}
                onClick={() => handleStageSelect(i)}
                className={`transition-colors ${
                  i === sliderIndex ? "text-[#c5a880] font-bold" : "hover:text-[#e3e2e5]"
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider */}
        <div className="relative w-full">
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={sliderIndex}
            onChange={handleSliderChange}
            aria-label="Transformation phase progress scrubber"
            className="w-full h-2 bg-[#1f2022] appearance-none cursor-pointer accent-[#c5a880] border border-[#4d463c]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] font-mono text-[#8e9196] gap-2">
          <span>T-00 EXCAVATION (0%)</span>
          <span className="text-[#c5a880] font-semibold">{currentHUD.name.toUpperCase()}</span>
          <span>T-36 COMMISSIONED (100%)</span>
        </div>
      </div>
    </section>
  );
};
