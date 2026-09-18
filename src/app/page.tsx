import React from "react";
import { Hero } from "@/components/hero/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SpecializationDeck } from "@/components/home/SpecializationDeck";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { SkillsSection } from "@/components/home/SkillsSection";
import { EngineeringMindset } from "@/components/home/EngineeringMindset";
import { MetricsDashboard } from "@/components/home/MetricsDashboard";
import { MarqueeSignalsSection } from "@/components/home/MarqueeSignalsSection";
import { TextFlippingBoard } from "@/components/aceternity/TextFlippingBoard";
import { ContactSection } from "@/components/home/ContactSection";
import { SystemBentoSection } from "@/components/home/SystemBentoSection";
export default function HomePage() {
  return (
    <div className="flex flex-col space-y-0">
      {/* 01. Hero Section */}
      <Hero />

      {/* 02. Three Capabilities Pillars */}
      <Capabilities />

      {/* 03. Selected Work / Projects */}
      <SelectedWork />

      {/* 04. System Capability Bento Matrix */}
      <SystemBentoSection />
      <SpecializationDeck />

      {/* 05. Production Telemetry Infinite Marquee */}
      <MarqueeSignalsSection />

      {/* 06. Aceternity Split-Flap Text Flipping Board Matrix */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#020408]">
        <div className="max-w-5xl mx-auto">
          <TextFlippingBoard />
        </div>
      </section>

      {/* 07. System Architecture Visualizer */}
      <ArchitectureDiagram />

      {/* 07. The Technical Stack */}
      <SkillsSection />

      {/* 08. How I Work (Engineering Lifecycle) */}
      <EngineeringMindset />

      {/* 09. Empirical Validation & Metrics Dashboard */}
      <MetricsDashboard />

      {/* 10. Contact & Reach Out */}
      <ContactSection />
    </div>
  );
}
