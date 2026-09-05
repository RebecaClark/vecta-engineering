"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Building2, Lock, Scale, ArrowUpRight } from "lucide-react";
import { getGSAP } from "@/lib/gsap";

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full border-b border-[#998f83]/20 bg-[#0d0e10] py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Photography with Architectural Inset */}
          <div className="lg:col-span-6 relative about-anim">
            <div className="relative overflow-hidden aspect-[4/3] bg-[#1f2022] border border-[#998f83]/30">
              <Image
                src="/images/zurich_studio.jpg"
                alt="Vecta Swiss Engineering Laboratory in Zurich"
                fill
                className="object-cover contrast-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Inset Monogram Badge */}
              <div className="absolute bottom-6 left-6 bg-[#0d0e10]/95 p-4 border border-[#998f83]/30 flex items-center gap-4">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src="/images/monogram.png"
                    alt="Monograma Vecta"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-semibold text-[#e3e2e5]">
                    VECTA ESTRUTURAL
                  </span>
                  <span className="font-mono text-[10px] text-[#8e9196]">
                    FUND. 1999 // SEDE ZURIQUE
                  </span>
                </div>
              </div>
            </div>

            {/* Corner coordinate datum */}
            <div className="absolute -top-3 -right-3 hidden sm:block p-2 bg-[#0d0e10] border border-[#998f83]/30 font-mono text-[10px] text-[#c5a880]">
              + 47°22&apos;38&quot;N 8°32&apos;30&quot;E
            </div>
          </div>

          {/* Right Philosophy & Accreditations */}
          <div className="lg:col-span-6 flex flex-col space-y-8 about-anim">
            <div className="space-y-3">
              <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest">
                SEÇÃO 06 // CREDIBILIDADE INSTITUCIONAL
              </span>
              <h2 className="font-space text-3xl sm:text-4xl md:text-5xl text-[#e3e2e5] font-medium tracking-tight leading-[1.08]">
                Certeza Determinística Sobre Risco Especulativo.
              </h2>
            </div>

            <p className="font-sans text-base sm:text-lg text-[#d1c5b8] font-light leading-relaxed">
              Fundada em Zurique e atuando em Londres, Nova York e Singapura, a Vecta une a disciplina tectônica suíça com a mecânica estrutural computacional de vanguarda.
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#8e9196] leading-relaxed font-normal">
              Atuamos como consultores primários de engenharia estrutural para fundos soberanos de investimento, ministérios internacionais de infraestrutura e escritórios de arquitetura laureados com o Prêmio Pritzker. Nossa metodologia erradica ambiguidades por meio de modelagem de elementos finitos em malha fechada, verificação contínua de cargas in loco e ciência dos materiais sem concessões.
            </p>

            {/* Formal Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#998f83]/20 font-mono text-xs">
              <div className="flex items-start gap-3 p-3 bg-[#121417] border border-[#1f2022]">
                <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[#e3e2e5] uppercase font-semibold text-[11px]">MEMBRO TITULAR IABSE</span>
                  <span className="text-[10px] text-[#8e9196] font-sans">Engenharia de Pontes &amp; Estruturas</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#121417] border border-[#1f2022]">
                <Building2 className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[#e3e2e5] uppercase font-semibold text-[11px]">CONSELHO CTBUH</span>
                  <span className="text-[10px] text-[#8e9196] font-sans">Edifícios Altos &amp; Habitat Urbano</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#121417] border border-[#1f2022]">
                <Lock className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[#e3e2e5] uppercase font-semibold text-[11px]">ISO 19650 NÍVEL 3</span>
                  <span className="text-[10px] text-[#8e9196] font-sans">Gestão da Informação BIM</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#121417] border border-[#1f2022]">
                <Scale className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[#e3e2e5] uppercase font-semibold text-[11px]">EUROCÓDIGOS &amp; ASCE</span>
                  <span className="text-[10px] text-[#8e9196] font-sans">Conformidade Multijurisdicional</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#manifesto"
                className="inline-flex items-center gap-3 font-mono text-[11px] text-[#c5a880] hover:text-[#fedeb2] uppercase tracking-wider group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] p-1"
              >
                <span>LER A MONOGRAFIA INSTITUCIONAL</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
