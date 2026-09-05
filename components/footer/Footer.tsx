"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  const [timeUtc, setTimeUtc] = useState("UTC 12:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc("UTC " + now.toTimeString().split(" ")[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#0d0e10] text-[#e3e2e5] pt-16 pb-16 md:pb-24 px-4 sm:px-8 lg:px-12 border-t border-[#998f83]/20">
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-12">
        {/* Top Monogram & Accreditation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#998f83]/20 pb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-8 h-8 shrink-0 p-0.5 border border-[#4d463c] bg-[#121417]">
              <Image
                src="/images/monogram.png"
                alt="Vecta Monogram"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-space text-lg font-semibold tracking-tight text-[#e3e2e5]">
                VECTA
              </span>
              <span className="font-mono text-[9px] text-[#8e9196] tracking-widest uppercase">
                ENGENHARIA ESTRUTURAL &amp; CIVIL S/A
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[10px] text-[#8e9196]">
            <span className="text-[#c5a880] font-semibold">TELEMETRIA AO VIVO: {timeUtc}</span>
            <span>//</span>
            <span>NÓ DE BERNA: OTIMIZADO</span>
            <span>//</span>
            <span>SEGURANÇA NÍVEL IV</span>
          </div>
        </div>

        {/* 6-Column Architectural Index */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-4 font-mono text-xs">
          {/* Col 1 */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-[#c5a880] uppercase tracking-wider font-semibold text-[10px]">
              Empresa
            </span>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Visão Geral</a>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Conselho Executivo</a>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Membros Titulares</a>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Consultoria Acadêmica</a>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Carreiras &amp; Bolsas</a>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-[#c5a880] uppercase tracking-wider font-semibold text-[10px]">
              Projetos
            </span>
            <a href="#featured-works" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Núcleos Superaltos</a>
            <a href="#featured-works" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Balanços Cinéticos</a>
            <a href="#featured-works" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Viadutos Marítimos</a>
            <a href="#featured-works" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Cívicos &amp; Culturais</a>
            <a href="#featured-works" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Retrofit Histórico</a>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-[#c5a880] uppercase tracking-wider font-semibold text-[10px]">
              Competências
            </span>
            <a href="#capabilities" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Modelagem FEA</a>
            <a href="#capabilities" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Montagem Pesada</a>
            <a href="#capabilities" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Mecânica dos Solos</a>
            <a href="#capabilities" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Gêmeos Digitais</a>
            <a href="#capabilities" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Túneis de Vento</a>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-[#c5a880] uppercase tracking-wider font-semibold text-[10px]">
              Governança
            </span>
            <a href="#about" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Sede em Zurique</a>
            <a href="#manifesto" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Manifesto Tectônico</a>
            <a href="#about" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Conformidade ISO 19650</a>
            <a href="#about" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Carbono Incorporado</a>
            <a href="#about" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Validação Eurocódigos</a>
          </div>

          {/* Col 5 */}
          <div className="flex flex-col space-y-2">
            <span className="text-[#c5a880] uppercase tracking-wider font-semibold text-[10px]">
              Polos Globais
            </span>
            <div className="pt-1">
              <span className="text-[#e3e2e5] block text-[11px]">Zurique // Sede</span>
              <span className="text-[10px] text-[#8e9196]">Gotthardstrasse 26</span>
            </div>
            <div>
              <span className="text-[#e3e2e5] block text-[11px]">Londres</span>
              <span className="text-[10px] text-[#8e9196]">100 Bishopsgate</span>
            </div>
            <div>
              <span className="text-[#e3e2e5] block text-[11px]">Nova York</span>
              <span className="text-[10px] text-[#8e9196]">3 WTC, Sala 4800</span>
            </div>
          </div>

          {/* Col 6 */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-[#c5a880] uppercase tracking-wider font-semibold text-[10px]">
              Canais &amp; Jurídico
            </span>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Monografia LinkedIn</a>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Pesquisas CTBUH</a>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Acordo de Confidencialidade</a>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Conformidade Soberana</a>
            <a href="#" className="text-[#8e9196] hover:text-[#e3e2e5] transition-colors">Índice de Coordenadas</a>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 border-t border-[#998f83]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[#8e9196] font-mono text-[10px] uppercase">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 1999—2025 VECTA ENGENHARIA ESTRUTURAL S/A</span>
            <span className="hidden sm:inline">//</span>
            <span>REGISTRO SUÍÇO CHE-109.843.219</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#c5a880] transition-colors">Soberania de Dados</a>
            <a href="#" className="hover:text-[#c5a880] transition-colors">Protocolo de Segurança</a>
            <a href="#" className="hover:text-[#c5a880] transition-colors">Certificação Eurocódigo</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
