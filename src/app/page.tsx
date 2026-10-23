"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DualFlowShowcase } from "@/components/DualFlowShowcase";
import { BuildingSimulator } from "@/components/BuildingSimulator";
import { FeatureBento } from "@/components/FeatureBento";
import { RoiCalculator } from "@/components/RoiCalculator";
import { SustainabilitySection } from "@/components/SustainabilitySection";
import { PilotFormModal } from "@/components/PilotFormModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [isPilotOpen, setIsPilotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Navbar onOpenPilot={() => setIsPilotOpen(true)} />

      <main className="flex-1">
        <HeroSection onOpenPilot={() => setIsPilotOpen(true)} />
        <DualFlowShowcase />
        <BuildingSimulator />
        <FeatureBento />
        <RoiCalculator onOpenPilot={() => setIsPilotOpen(true)} />
        <SustainabilitySection />
      </main>

      <Footer />

      <PilotFormModal
        isOpen={isPilotOpen}
        onClose={() => setIsPilotOpen(false)}
      />
    </div>
  );
}
