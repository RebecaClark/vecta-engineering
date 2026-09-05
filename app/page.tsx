"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/Header";
import { HeroV1 } from "@/components/hero/HeroV1";
import { Manifesto } from "@/components/manifesto/Manifesto";
import { CompanyMetrics } from "@/components/metrics/CompanyMetrics";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { TransformationSection } from "@/components/chronology/TransformationSection";
import { AboutSection } from "@/components/about/AboutSection";
import { MonumentalCTA } from "@/components/cta/MonumentalCTA";
import { Footer } from "@/components/footer/Footer";
import { DossierModal } from "@/components/ui/DossierModal";
import { PROJECTS_DATA } from "@/lib/projects-data";

export default function HomePage() {
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);

  return (
    <main className="min-h-screen bg-[#0d0e10] text-[#e3e2e5] relative selection:bg-[#c5a880] selection:text-[#281800]">
      {/* Flagship Header - glides in when hero is revealed at 21s */}
      <Header
        onOpenDossier={() => setIsDossierOpen(true)}
        isVisible={isHeroRevealed}
      />

      {/* Cinematic Hero with 22s time-lapse, lateral phrases and 21s reveal */}
      <HeroV1
        isHeroRevealed={isHeroRevealed}
        onHeroReveal={setIsHeroRevealed}
      />

      {/* Section 02: Miesian Manifesto */}
      <Manifesto />

      {/* Section 03: Company Scale Metrics */}
      <CompanyMetrics />

      {/* Section 04: Selected Structural Works */}
      <ProjectsSection />

      {/* Section 05: Core Engineering Capabilities */}
      <CapabilitiesSection />

      {/* Section 06: Physical Chronology (Site to Landmark) */}
      <TransformationSection />

      {/* Section 07: Institutional Credibility & Accreditations */}
      <AboutSection />

      {/* Section 08: Monumental Final CTA */}
      <MonumentalCTA onOpenDossier={() => setIsDossierOpen(true)} />

      {/* Section 09: Architectural Footer */}
      <Footer />

      {/* Global Engineering Dossier Drawer */}
      <DossierModal
        project={PROJECTS_DATA[0]}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </main>
  );
}

