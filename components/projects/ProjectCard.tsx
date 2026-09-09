"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/lib/projects-data";

interface ProjectCardProps {
  project: ProjectItem;
  isHero?: boolean;
  onInspect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isHero = false, onInspect }) => {
  if (isHero) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131416] border border-white/10 hover:border-[#c5a880]/60 hover:shadow-2xl hover:shadow-[#c5a880]/10 hover:-translate-y-1.5 transition-all duration-500 ease-out p-4 sm:p-6 md:p-8 group blueprint-corner">
        {/* Large Asymmetric Image */}
        <div className="lg:col-span-7 relative overflow-hidden aspect-[16/10] bg-[#1f2022] border border-white/5">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover grayscale-[20%] contrast-110 group-hover:grayscale-0 group-hover:contrast-105 group-hover:scale-108 transition-all duration-1000 ease-out"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          {/* Technical Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#c5a880]/50 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#c5a880]/50 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#c5a880]/50 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#c5a880]/50 pointer-events-none" />

          <div className="absolute top-4 left-4 bg-[#0d0e10]/90 backdrop-blur-md px-3 py-1.5 border border-[#c5a880]/40 group-hover:border-[#c5a880] group-hover:bg-[#c5a880]/10 font-mono text-[10px] text-[#c5a880] uppercase tracking-wider transition-colors shadow-lg">
            {project.ref}
          </div>
          <div className="absolute bottom-4 right-4 bg-[#0d0e10]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#e3e2e5] border border-white/10 uppercase shadow-lg">
            {project.statusBadge}
          </div>
        </div>

        {/* Narrative & Metrics */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] group-hover:animate-ping transition-all"></span>
              <span className="font-mono text-[10px] text-[#8e9196] uppercase tracking-wider">
                {project.location}
              </span>
            </div>

            <h3 className="font-headline text-2xl sm:text-3xl text-[#e3e2e5] group-hover:text-[#c5a880] transition-colors duration-300 font-medium leading-tight">
              {project.title}
            </h3>

            <p className="font-sans text-sm text-[#d1c5b8] leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-4 font-mono">
            <div>
              <span className="text-[10px] text-[#8e9196] uppercase block">ALTURA TOTAL</span>
              <span className="text-xl text-[#e3e2e5] font-semibold">{project.specs[0]?.value}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8e9196] uppercase block">VOLUME DE CONCRETO</span>
              <span className="text-xl text-[#e3e2e5] font-semibold">{project.specs[1]?.value}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-2 font-mono text-[11px] text-[#c5a880] hover:text-[#fedeb2] uppercase tracking-wider group-hover:translate-x-1 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] p-1 font-medium"
            >
              <span>EXAMINAR DOSSIÊ ESTRUTURAL</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="font-mono text-[10px] text-[#8e9196]">DESLOC. LATERAL &lt; 1/500</span>
          </div>
        </div>
      </div>
    );
  }

  // Standard Dual Column Card
  return (
    <div className="bg-[#131416] border border-white/10 hover:border-[#c5a880]/60 hover:shadow-2xl hover:shadow-[#c5a880]/10 hover:-translate-y-1.5 transition-all duration-500 ease-out p-6 md:p-8 flex flex-col justify-between space-y-6 group blueprint-corner">
      <div className="relative overflow-hidden aspect-[16/10] bg-[#1f2022] border border-white/5">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover grayscale-[20%] contrast-110 group-hover:grayscale-0 group-hover:contrast-105 group-hover:scale-108 transition-all duration-1000 ease-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Technical Corner Brackets */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a880]/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a880]/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a880]/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a880]/40 pointer-events-none" />

        <div className="absolute top-4 left-4 bg-[#0d0e10]/90 backdrop-blur-md px-3 py-1.5 border border-[#c5a880]/40 group-hover:border-[#c5a880] group-hover:bg-[#c5a880]/10 font-mono text-[10px] text-[#c5a880] uppercase tracking-wider transition-colors shadow-lg">
          {project.ref}
        </div>
        <div className="absolute bottom-4 right-4 bg-[#0d0e10]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#e3e2e5] border border-white/10 uppercase shadow-lg">
          {project.statusBadge}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-[#8e9196] uppercase">{project.location}</span>
          <span className="text-[#c5a880] uppercase font-semibold">{project.category}</span>
        </div>

        <h3 className="font-headline text-xl sm:text-2xl text-[#e3e2e5] group-hover:text-[#c5a880] transition-colors duration-300 font-medium">
          {project.title}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-[#d1c5b8] leading-relaxed font-light">
          {project.description}
        </p>
      </div>

      <div className="border-t border-white/10 pt-4 flex items-center justify-between font-mono">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#8e9196] uppercase">{project.specs[0]?.label}</span>
          <span className="text-sm text-[#e3e2e5] font-semibold">{project.specs[0]?.value}</span>
        </div>

        <button
          onClick={() => onInspect(project)}
          className="font-mono text-[10px] text-[#c5a880] hover:text-[#fedeb2] uppercase tracking-wider flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] p-1 font-semibold group-hover:translate-x-0.5"
        >
          <span>VER ESPECIFICAÇÕES</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
