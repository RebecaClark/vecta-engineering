"use client";

import React, { useState, useEffect, useRef } from "react";
import { PROJECTS_DATA, ProjectItem } from "@/lib/projects-data";
import { ProjectCard } from "./ProjectCard";
import { DossierModal } from "../ui/DossierModal";
import { getGSAP } from "@/lib/gsap";

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const heroProject = PROJECTS_DATA[0];
  const secondaryProjects = PROJECTS_DATA.slice(1);

  const handleInspect = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".project-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
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
      id="featured-works"
      ref={sectionRef}
      className="w-full border-b border-white/10 bg-[#0d0e10] py-16 md:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-[1440px] xl:max-w-[1680px] mx-auto flex flex-col space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 project-anim">
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold">
              SEÇÃO 03 // GRANDES OBRAS
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-[#e3e2e5] font-medium tracking-tight">
              Obras Estruturais Selecionadas
            </h2>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] text-[#8e9196] uppercase tracking-wider">
            <span>CATÁLOGO DE ACERVO: 2018—2025</span>
            <div className="w-8 h-[1px] bg-[#4d463c]"></div>
          </div>
        </div>

        {/* Hero Asymmetric Project (Chicago Citadel) */}
        <div className="project-anim">
          <ProjectCard
            project={heroProject}
            isHero={true}
            onInspect={handleInspect}
          />
        </div>

        {/* Dual Column Secondary Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 project-anim">
          {secondaryProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onInspect={handleInspect}
            />
          ))}
        </div>
      </div>

      {/* Slide-out / Modal Dossier Inspector */}
      <DossierModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
