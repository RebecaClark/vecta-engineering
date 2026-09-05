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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#161719] border border-[#998f83]/20 p-4 sm:p-6 md:p-8">
        {/* Large Asymmetric Image */}
        <div className="lg:col-span-7 relative overflow-hidden group aspect-[16/10] bg-[#1f2022]">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover grayscale-[15%] contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute top-4 left-4 bg-[#0d0e10]/90 backdrop-blur-md px-3 py-1.5 border border-[#998f83]/30 font-mono text-[10px] text-[#c5a880] uppercase tracking-wider">
            {project.ref}
          </div>
          <div className="absolute bottom-4 right-4 bg-[#0d0e10]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#e3e2e5] uppercase">
            {project.statusBadge}
          </div>
        </div>

        {/* Narrative & Metrics */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#c5a880]"></span>
              <span className="font-mono text-[10px] text-[#8e9196] uppercase tracking-wider">
                {project.location}
              </span>
            </div>

            <h3 className="font-space text-2xl sm:text-3xl text-[#e3e2e5] font-medium leading-tight">
              {project.title}
            </h3>

            <p className="font-sans text-sm text-[#d1c5b8] leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-[#998f83]/20 py-4 font-mono">
            <div>
              <span className="text-[10px] text-[#8e9196] uppercase block">ALTURA TOTAL</span>
              <span className="text-xl text-[#e3e2e5] font-normal">{project.specs[0]?.value}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8e9196] uppercase block">VOLUME DE CONCRETO</span>
              <span className="text-xl text-[#e3e2e5] font-normal">{project.specs[1]?.value}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-2 font-mono text-[11px] text-[#c5a880] hover:text-[#fedeb2] uppercase tracking-wider group transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] p-1"
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
    <div className="bg-[#161719] border border-[#998f83]/20 p-6 md:p-8 flex flex-col justify-between space-y-6 group">
      <div className="relative overflow-hidden aspect-[16/10] bg-[#1f2022]">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 bg-[#0d0e10]/90 backdrop-blur-md px-3 py-1.5 border border-[#998f83]/30 font-mono text-[10px] text-[#c5a880] uppercase tracking-wider">
          {project.ref}
        </div>
        <div className="absolute bottom-4 right-4 bg-[#0d0e10]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#e3e2e5] uppercase">
          {project.statusBadge}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-[#8e9196] uppercase">{project.location}</span>
          <span className="text-[#c5a880] uppercase">{project.category}</span>
        </div>

        <h3 className="font-space text-xl sm:text-2xl text-[#e3e2e5] font-medium">
          {project.title}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-[#d1c5b8] leading-relaxed font-light">
          {project.description}
        </p>
      </div>

      <div className="border-t border-[#998f83]/20 pt-4 flex items-center justify-between font-mono">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#8e9196] uppercase">{project.specs[0]?.label}</span>
          <span className="text-sm text-[#e3e2e5]">{project.specs[0]?.value}</span>
        </div>

        <button
          onClick={() => onInspect(project)}
          className="font-mono text-[10px] text-[#c5a880] hover:text-[#fedeb2] uppercase tracking-wider flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] p-1"
        >
          <span>VER ESPECIFICAÇÕES</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
