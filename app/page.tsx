"use client";

import React, { useState } from "react";
import { LenisProvider } from "@/components/smooth-scroll/LenisProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { TechnicalPreloader } from "@/components/preloader/TechnicalPreloader";
import { Header } from "@/components/navigation/Header";
import { HeroV1 } from "@/components/hero/HeroV1";
import { Manifesto } from "@/components/manifesto/Manifesto";
import { CompanyMetrics } from "@/components/metrics/CompanyMetrics";
import { StandardsMarquee } from "@/components/marquee/StandardsMarquee";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { VectaLabsBento } from "@/components/labs/VectaLabsBento";
import { StructuralExplodedView } from "@/components/exploded-view/StructuralExplodedView";
import { Structural3DViewer } from "@/components/viewer3d/Structural3DViewer";
import { TransformationSection } from "@/components/chronology/TransformationSection";
import { AboutSection } from "@/components/about/AboutSection";
import { MonumentalCTA } from "@/components/cta/MonumentalCTA";
import { Footer } from "@/components/footer/Footer";
import { FloatingActionHUD } from "@/components/conversion/FloatingActionHUD";
import { DossierModal } from "@/components/ui/DossierModal";
import { PROJECTS_DATA } from "@/lib/projects-data";

export default function HomePage() {
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);

  return (
    <LenisProvider>
      <main className="min-h-screen bg-[#0d0e10] text-[#e3e2e5] relative selection:bg-[#c5a880] selection:text-[#281800]">
        {/* Premium Custom Cursor (Desktop Only) */}
        <CustomCursor />

        {/* Film Grain Cinematic Overlay */}
        <GrainOverlay />

        {/* Phase 1: Technical Preloader (System Boot / Blueprint Init) */}
        <TechnicalPreloader onComplete={() => setIsHeroRevealed(true)} />

        {/* Flagship Header - glides in when hero is revealed */}
        <Header
          onOpenDossier={() => setIsDossierOpen(true)}
          isVisible={isHeroRevealed}
        />

        {/* Cinematic Hero with time-lapse, lateral phrases and reveal */}
        <HeroV1
          isHeroRevealed={isHeroRevealed}
          onHeroReveal={setIsHeroRevealed}
        />

        {/* Section 02: Miesian Manifesto */}
        <Manifesto />

        {/* Section 03: Company Scale Metrics + Proof CTA */}
        <CompanyMetrics onOpenDossier={() => setIsDossierOpen(true)} />

        {/* Phase 2: Dual Infinite Standards & Computational Marquee */}
        <StandardsMarquee />

        {/* Section 04: Selected Structural Works */}
        <ProjectsSection />

        {/* Section 05: Core Engineering Capabilities + Proof CTA */}
        <CapabilitiesSection onOpenDossier={() => setIsDossierOpen(true)} />

        {/* Phase 4: Vecta Labs Bento Grid (Topology Optimization, IoT SHM, CFD) */}
        <VectaLabsBento />

        {/* Phase 5: Structural Exploded View (Apple-style Scrollytelling) */}
        <div data-cursor="drag">
          <StructuralExplodedView />
        </div>

        {/* Phase 6: Interactive 3D Orbit Structural Inspection Viewer (Three.js WebGL) */}
        <div data-cursor="drag">
          <Structural3DViewer />
        </div>

        {/* Section 08: Physical Chronology (Site to Landmark) */}
        <TransformationSection />

        {/* Section 09: Institutional Credibility & Accreditations */}
        <AboutSection />

        {/* Section 10: Monumental Final CTA */}
        <MonumentalCTA onOpenDossier={() => setIsDossierOpen(true)} />

        {/* Section 11: Architectural Footer */}
        <Footer />

        {/* Phase 3: Jarvis Conversion Rule - Floating Action HUD */}
        <FloatingActionHUD onOpenDossier={() => setIsDossierOpen(true)} />

        {/* Global Engineering Dossier Drawer */}
        <DossierModal
          project={PROJECTS_DATA[0]}
          isOpen={isDossierOpen}
          onClose={() => setIsDossierOpen(false)}
        />
      </main>
    </LenisProvider>
  );
}

