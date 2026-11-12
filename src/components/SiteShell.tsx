"use client";

import React, { createContext, useContext, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PilotFormModal } from "@/components/PilotFormModal";
import { FaenaProvider } from "@/components/FaenaContext";
import { GuidedTourBar } from "@/components/GuidedTourBar";

const PilotModalContext = createContext<() => void>(() => {});

/** Returns a stable callback to open the pilot request modal from any page. */
export const usePilotModal = () => useContext(PilotModalContext);

/** Shared client shell providing state, navigation, tour guide, footer, and pilot modal. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [isPilotOpen, setIsPilotOpen] = useState(false);
  const openPilot = () => setIsPilotOpen(true);

  return (
    <MotionConfig reducedMotion="user">
    <FaenaProvider>
      <PilotModalContext.Provider value={openPilot}>
        <div className="min-h-screen bg-brand-dark flex flex-col print:bg-white print:text-slate-900">
          <div className="print:hidden">
            <Navbar onOpenPilot={openPilot} />
            <GuidedTourBar />
          </div>
          <main className={isPilotOpen ? "flex-1 print:hidden" : "flex-1"}>{children}</main>
          <div className="print:hidden">
            <div className="hazard-stripe" />
            <Footer />
          </div>
          <PilotFormModal
            isOpen={isPilotOpen}
            onClose={() => setIsPilotOpen(false)}
          />
        </div>
      </PilotModalContext.Provider>
    </FaenaProvider>
    </MotionConfig>
  );
}
