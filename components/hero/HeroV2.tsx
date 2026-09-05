"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { HeroVideo } from "./HeroVideo";

export const HeroV2: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen h-[100svh] flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 lg:px-12 max-w-[1720px] mx-auto overflow-hidden bg-[#0d0e10]">
      {/* Cinematic Full-Bleed Video Background */}
      <HeroVideo />

      {/* Top Telemetry Ribbon (Swiss Precision Monograph Style) */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8e9196]">
        <div className="flex items-center gap-6">
          <span className="text-[#c5a880] font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c5a880]"></span>
            REF. MONOGRAPH 2025 // CH-CIVIL
          </span>
          <span className="hidden md:inline text-[#c4c6ce]/60">// 41°53&apos;11&quot;N 87°38&apos;15&quot;W</span>
        </div>

        <div className="flex items-center gap-8 text-[#c4c6ce]/80">
          <span className="hidden sm:inline">SEISMIC CLASS II-B [R=6.5]</span>
          <span>LATERAL DRIFT H/520</span>
          <span className="hidden lg:inline text-[#f5f4f0]">ZÜRICH · LONDON · SINGAPORE · NEW YORK</span>
        </div>
      </div>

      {/* Main Typographic Cover Block */}
      <div className="relative z-10 my-auto py-8 max-w-5xl">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-10 h-[1px] bg-[#c5a880]"></span>
          <span className="font-mono text-[11px] tracking-[0.24em] text-[#c5a880] uppercase">
            TECTONIC STRUCTURAL DISCIPLINE
          </span>
        </div>

        <h1 className="font-space font-semibold text-[#f5f4f0] tracking-[-0.04em] uppercase leading-[0.88] text-[52px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
          ENGINEERING<br />
          THAT TAKES<br />
          <span className="text-[#c5a880] font-light italic">FORM.</span>
        </h1>

        <div className="mt-8 max-w-xl">
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#c4c6ce]/90 font-light leading-relaxed">
            Primary structural engineering counsel to sovereign institutions, infrastructure authorities, and civic architects executing monumental, long-horizon verticality.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#featured-works"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#c5a880] text-[#281800] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#fedeb2] transition-colors"
          >
            <span>Examine Architectural Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#manifesto"
            className="inline-flex items-center gap-2 px-6 py-4 border border-[#998f83]/40 bg-[#121315]/60 hover:border-[#c5a880] text-[#e3e2e5] font-mono text-xs uppercase tracking-widest transition-colors"
          >
            <span>Read Manifesto 02</span>
          </a>
        </div>
      </div>

      {/* Bottom Baseline Bar: Asymmetric Editorial Anchoring */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between border-t border-white/10 pt-5 gap-4">
        <div className="flex items-center gap-8">
          <a
            href="#featured-works"
            className="flex items-center gap-3 text-[#8e9196] hover:text-[#c5a880] transition-colors group"
          >
            <span className="w-2 h-2 rounded-full border border-[#c5a880]/80 group-hover:scale-125 transition-transform"></span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c4c6ce] group-hover:text-[#c5a880]">
              INDEX 01 / SELECTED COMMISSIONS
            </span>
          </a>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#8e9196]/50 hidden md:inline">
            SIA-142 &amp; EN 1990 VALIDATED
          </span>
        </div>

        <div className="font-mono text-[10px] tracking-[0.2em] text-[#8e9196] uppercase flex items-center gap-6">
          <span>MASS: 142,800 MT</span>
          <span className="text-[#c5a880]">CORE ELEV: +284.4 M</span>
        </div>
      </div>
    </section>
  );
};
