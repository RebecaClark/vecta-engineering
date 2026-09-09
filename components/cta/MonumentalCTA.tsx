"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { getGSAP } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

interface MonumentalCTAProps {
  onOpenDossier?: () => void;
}

export const MonumentalCTA: React.FC<MonumentalCTAProps> = ({ onOpenDossier }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card container reveal with scale
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: "power3.out",
      });

      // Buttons stagger in
      gsap.from(".cta-button", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.3,
        ease: "power2.out",
        clearProps: "all",
      });

      // Crosshair corners draw in
      gsap.from(".cta-corner", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
        ease: "back.out(2)",
      });

      // Ambient gold glow pulse
      gsap.to(".cta-glow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0.15,
        scale: 1.2,
        duration: 2,
        delay: 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full border-b border-white/10 bg-[#0d0e10] py-16 md:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      {/* Background Subtle Radial Dot Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#c5a88008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1440px] xl:max-w-[1680px] mx-auto">
        <div
          ref={cardRef}
          className="border border-white/10 bg-[#141518] p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl"
        >
          {/* Ambient Gold Glow */}
          <div
            aria-hidden="true"
            className="cta-glow absolute inset-0 opacity-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(197,168,128,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Crosshair Accents on Corners */}
          <span aria-hidden="true" className="cta-corner absolute top-2 left-2 font-mono text-[10px] text-[#c5a880]/60">+</span>
          <span aria-hidden="true" className="cta-corner absolute top-2 right-2 font-mono text-[10px] text-[#c5a880]/60">+</span>
          <span aria-hidden="true" className="cta-corner absolute bottom-2 left-2 font-mono text-[10px] text-[#c5a880]/60">+</span>
          <span aria-hidden="true" className="cta-corner absolute bottom-2 right-2 font-mono text-[10px] text-[#c5a880]/60">+</span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#c5a880]"></span>
                <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold">
                  INICIAR CONSULTA DE VIABILIDADE
                </span>
              </div>

              <TextReveal
                as="h2"
                className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#e3e2e5] uppercase font-medium leading-[0.95] tracking-tight"
              >
                VAMOS CONSTRUIR O QUE VEM A SEGUIR.
              </TextReveal>

              <p className="font-sans text-base sm:text-lg text-[#d1c5b8] max-w-2xl font-light leading-relaxed">
                Prestamos consultoria para infraestruturas soberanas, núcleos corporativos superaltos, reforços sísmicos e geometrias arquitetônicas experimentais em jurisdições globais.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-4 lg:items-end w-full">
              <MagneticButton strength={0.25}>
                <button
                  onClick={onOpenDossier}
                  className="cta-button w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-5 bg-[#c5a880] hover:bg-[#fedeb2] text-[#281800] font-mono text-xs uppercase tracking-widest font-semibold transition-all group shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e3e2e5]"
                >
                  <span>INICIAR UM PROJETO</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <button
                  onClick={onOpenDossier}
                  className="cta-button w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#998f83]/40 hover:border-[#c5a880] bg-[#121417] text-[#e3e2e5] font-mono text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880]"
                >
                  <FileText className="w-4 h-4 text-[#c5a880]" />
                  <span>SOLICITAR DOSSIÊ TÉCNICO</span>
                </button>
              </MagneticButton>

              <div className="pt-4 text-[#8e9196] font-mono text-[9px] sm:text-[10px] text-center lg:text-right tracking-wider">
                CONSULTAS CONFIDENCIAIS PROTEGIDAS POR PROTOCOLO BILATERAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
