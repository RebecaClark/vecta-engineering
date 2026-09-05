"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onOpenDossier?: () => void;
  isVisible?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDossier, isVisible = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Disciplinas", href: "#capabilities" },
    { label: "Obras Principais", href: "#featured-works" },
    { label: "Ciência Estrutural", href: "#manifesto" },
    { label: "Cronologia", href: "#transformation" },
    { label: "Governança", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 bg-[#0d0e10]/90 backdrop-blur-xl border-b border-[#998f83]/20 transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-[1720px] mx-auto h-20 px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative w-8 h-8 shrink-0 p-0.5 border border-[#4d463c] bg-[#121417]">
            <Image
              src="/images/monogram.png"
              alt="Vecta Engenharia Estrutural S/A"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-space text-lg font-semibold tracking-tight text-[#e3e2e5] leading-none">
              VECTA
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#8e9196] mt-0.5">
              ENGENHARIA ESTRUTURAL &amp; CIVIL
            </span>
          </div>
        </a>

        {/* Desktop Monograph Navigation */}
        <nav
          aria-label="Navegação Principal"
          className="hidden lg:flex items-center gap-8 xl:gap-10 font-mono text-[11px] uppercase text-[#d1c5b8]"
        >
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#c5a880] transition-colors flex items-center gap-2 group py-2"
            >
              <span className="text-[#c5a880] text-[10px] font-semibold tracking-wider">0{idx + 1}</span>
              <span className="tracking-[0.14em] text-[#d1c5b8] group-hover:text-[#c5a880] transition-colors">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Header Actions / Telemetry Node */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden xl:flex items-center gap-2.5 font-mono text-[10px] text-[#8e9196] tracking-wider border-r border-[#4d463c]/50 pr-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[#e3e2e5]">NÓ DE BERNA [CHE-109]</span>
          </div>

          <button
            onClick={onOpenDossier}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#c5a880]/50 bg-[#121417] hover:bg-[#c5a880] hover:text-[#281800] hover:border-[#c5a880] transition-all duration-300 font-mono text-[10px] tracking-[0.18em] uppercase text-[#c5a880] focus-visible:ring-1 focus-visible:ring-[#c5a880]"
          >
            <span>Solicitar Dossiê</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#e3e2e5] hover:text-[#c5a880] border border-[#4d463c] bg-[#121417] focus-visible:ring-1 focus-visible:ring-[#c5a880]"
            aria-label="Alternar navegação"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#0d0e10] border-b border-[#998f83]/20 px-6 py-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4d463c]/50 text-[10px] font-mono uppercase tracking-widest text-[#8e9196]">
            <span>ÍNDICE DO SISTEMA</span>
            <span className="text-[#c5a880] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> SEGURANÇA NÍVEL IV
            </span>
          </div>
          <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-[#1f2022] hover:text-[#c5a880]"
              >
                <span>{link.label}</span>
                <span className="text-[#c5a880] text-[10px]">0{idx + 1}</span>
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDossier) onOpenDossier();
              }}
              className="w-full py-3 bg-[#c5a880] text-[#281800] font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
            >
              <span>Solicitar Dossiê Técnico</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
