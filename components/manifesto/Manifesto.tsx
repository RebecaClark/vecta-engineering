"use client";

import React, { useEffect, useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";
import { getGSAP } from "@/lib/gsap";

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".manifesto-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="w-full border-b border-[#998f83]/15 bg-[#0d0e10] py-20 md:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20 md:scroll-mt-24 relative"
    >
      <div className="max-w-[1440px] xl:max-w-[1680px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Architectural Datum & Section Tag */}
          <div className="lg:col-span-4 flex flex-col space-y-8 lg:sticky lg:top-28 manifesto-anim">
            <div className="flex flex-col space-y-3">
              <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest">
                SEÇÃO 02 // MANIFESTO
              </span>
              <div className="w-12 h-[1px] bg-[#4d463c]"></div>
            </div>

            <div className="space-y-4">
              <div className="p-6 border border-[#998f83]/30 bg-[#121417] shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#998f83]/20">
                  <span className="font-mono text-[10px] text-[#8e9196] uppercase tracking-wider">
                    PRINCÍPIO FUNDAMENTAL
                  </span>
                  <span className="w-1.5 h-1.5 bg-[#c5a880]"></span>
                </div>
                <p className="font-sans text-xs text-[#d1c5b8] pt-3 leading-relaxed font-light">
                  A integridade estrutural não é um detalhe estético secundário. É a geometria primordial que dita a longevidade cívica através de eras sísmicas, meteorológicas e térmicas.
                </p>
                <div className="mt-4 pt-3 border-t border-[#998f83]/20 flex justify-between items-center font-mono text-[10px] text-[#8e9196]">
                  <span>COORDENADA BASE</span>
                  <span className="text-[#c5a880]">ZURIQUE / LONDRES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Expansive Typographic Statement */}
          <div className="lg:col-span-8 flex flex-col space-y-10 manifesto-anim">
            <TextReveal
              as="h2"
              className="font-headline text-3xl md:text-5xl lg:text-6xl text-[#e3e2e5] font-medium tracking-tight max-w-4xl leading-[1.04]"
            >
              Grandes estruturas começam muito antes da construção. Elas emergem na resolução serena de cargas extremas.
            </TextReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#998f83]/20">
              <p className="font-sans text-base sm:text-lg text-[#d1c5b8] leading-relaxed font-light">
                Na Vecta, não calculamos apenas tolerâncias de carga; sintetizamos física pura, intenção arquitetônica e geologia física. Ao integrar modelagem não linear avançada com ciência forense dos materiais, neutralizamos desafios estruturais críticos antes que o primeiro solo seja tocado.
              </p>

              <div className="flex flex-col space-y-6">
                <p className="font-sans text-sm text-[#8e9196] leading-relaxed font-normal">
                  Nossas equipes multidisciplinares articulam engenharia computacional, planejamento rigoroso, tecnologia proprietária de construção e execução determinística para transformar visões cívicas audaciosas em marcos monolíticos permanentes. Projetamos para os próximos dois séculos.
                </p>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-wider">
                      MARGEM DE TOLERÂNCIA
                    </span>
                    <span className="font-mono text-xl text-[#e3e2e5] font-normal">
                      ± 1,2 MM
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-[#4d463c]"></div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-wider">
                      VIDA ÚTIL DE PROJETO
                    </span>
                    <span className="font-mono text-xl text-[#e3e2e5] font-normal">
                      200+ ANOS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro FEA Engineering Indicators */}
            <div className="pt-6 border-t border-[#998f83]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#121417] border border-[#1f2022]">
                <span className="text-[10px] text-[#8e9196] uppercase block">ANÁLISE NÃO LINEAR (FEA)</span>
                <span className="text-sm text-[#e3e2e5]">ANSYS / SAP2000</span>
              </div>
              <div className="p-3 bg-[#121417] border border-[#1f2022]">
                <span className="text-[10px] text-[#8e9196] uppercase block">RESISTÊNCIA DO NÚCLEO</span>
                <span className="text-sm text-[#e3e2e5]">C90/105 COM SÍLICA</span>
              </div>
              <div className="p-3 bg-[#121417] border border-[#1f2022]">
                <span className="text-[10px] text-[#8e9196] uppercase block">BALANÇO MÁXIMO</span>
                <span className="text-sm text-[#c5a880]">38,0 METROS</span>
              </div>
              <div className="p-3 bg-[#121417] border border-[#1f2022]">
                <span className="text-[10px] text-[#8e9196] uppercase block">NORMAS TÉCNICAS</span>
                <span className="text-sm text-[#e3e2e5]">EUROCÓDIGOS 0–8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
