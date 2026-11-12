"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DispatchPayload, FaenaDemoState, RoiParams, WasteType } from "@/types/mlsa";
import {
  DEFAULT_EVENTS,
  DEFAULT_ROI_PARAMS,
  DEFAULT_WASTE_TOTALS_KG,
  MLSA_SYSTEM_DATA,
} from "@/data/mlsa-content";
import {
  applyCartMove,
  applyCycleAdvance,
  applyGateDispatch,
  createInitialFaenaState,
} from "@/lib/faena-state";

const STORAGE_KEY = "faena_limpia_demo_v1";

const buildSeedState = () =>
  createInitialFaenaState({
    floors: MLSA_SYSTEM_DATA.initialFloors,
    wasteTotalsKg: DEFAULT_WASTE_TOTALS_KG,
    events: DEFAULT_EVENTS,
    roiParams: DEFAULT_ROI_PARAMS,
  });

const formatNow = () =>
  new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });

interface FaenaContextValue {
  state: FaenaDemoState;
  isTourOpen: boolean;
  openTour: () => void;
  closeTour: () => void;
  dispatchFromGate: (payload: DispatchPayload) => string;
  advanceFloorCycle: (floorNumber: number, wasteType?: WasteType) => void;
  moveCartBetweenFloors: (fromFloor: number, toFloor: number) => void;
  setRoiParams: (params: RoiParams) => void;
  markImpactChecked: () => void;
  resetDemo: () => void;
}

const FaenaContext = createContext<FaenaContextValue | null>(null);

/** Reads live shared Faena Limpia demo state and actions across routes. */
export function useFaena() {
  const ctx = useContext(FaenaContext);
  if (!ctx) {
    throw new Error("useFaena must be used inside FaenaProvider");
  }
  return ctx;
}

/** Provides persistent localStorage state for the connected construction site simulation. */
export function FaenaProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FaenaDemoState>(buildSeedState);
  const [hydrated, setHydrated] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<FaenaDemoState>;
        if (Array.isArray(parsed.floors) && parsed.floors.length === 12) {
          setState((prev) => ({
            floors: parsed.floors ?? prev.floors,
            wasteTotalsKg: parsed.wasteTotalsKg ?? prev.wasteTotalsKg,
            events: Array.isArray(parsed.events) ? parsed.events : prev.events,
            roiParams: parsed.roiParams ?? prev.roiParams,
            tourProgress: parsed.tourProgress ?? prev.tourProgress,
          }));
        }
      }
    } catch {
      // Ignore malformed storage and keep safe initial defaults.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in restricted browsing modes.
    }
  }, [state, hydrated]);

  const openTour = useCallback(() => setIsTourOpen(true), []);
  const closeTour = useCallback(() => setIsTourOpen(false), []);

  const dispatchFromGate = useCallback((payload: DispatchPayload) => {
    const suffix = Math.floor(1000 + Math.random() * 8999);
    const token = `QR-FL${String(payload.floorNumber).padStart(2, "0")}-SUP-${suffix}`;
    const timeLabel = formatNow();
    setState((prev) => applyGateDispatch(prev, payload, timeLabel, suffix).state);
    return token;
  }, []);

  const advanceFloorCycle = useCallback(
    (floorNumber: number, selectedWaste: WasteType = "Despuntes de Madera") => {
      const timeLabel = formatNow();
      setState((prev) => applyCycleAdvance(prev, floorNumber, selectedWaste, timeLabel));
    },
    []
  );

  const moveCartBetweenFloors = useCallback((fromFloor: number, toFloor: number) => {
    const timeLabel = formatNow();
    setState((prev) => applyCartMove(prev, fromFloor, toFloor, timeLabel));
  }, []);

  const setRoiParams = useCallback((roiParams: RoiParams) => {
    setState((prev) => ({ ...prev, roiParams }));
  }, []);

  const markImpactChecked = useCallback(() => {
    setState((prev) => {
      if (prev.tourProgress.impactChecked) return prev;
      return {
        ...prev,
        tourProgress: { ...prev.tourProgress, impactChecked: true },
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    setState(buildSeedState());
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }, []);

  return (
    <FaenaContext.Provider
      value={{
        state,
        isTourOpen,
        openTour,
        closeTour,
        dispatchFromGate,
        advanceFloorCycle,
        moveCartBetweenFloors,
        setRoiParams,
        markImpactChecked,
        resetDemo,
      }}
    >
      {children}
    </FaenaContext.Provider>
  );
}
