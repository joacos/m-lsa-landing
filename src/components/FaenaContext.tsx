"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DispatchPayload, FaenaDemoState, RoiParams, SupplyMaterial, TourProgress, WasteType } from "@/types/mlsa";
import {
  DEFAULT_EVENTS,
  DEFAULT_ROI_PARAMS,
  DEFAULT_WASTE_TOTALS_KG,
  MLSA_SYSTEM_DATA,
} from "@/data/mlsa-content";
import {
  MAX_FLOORS,
  MIN_FLOORS,
  applyCartMove,
  applyCycleAdvance,
  applyFloorCount,
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
  advanceFloorCycle: (floorNumber: number, wasteType?: WasteType, nextMaterial?: SupplyMaterial) => void;
  moveCartBetweenFloors: (fromFloor: number, toFloor: number) => void;
  setFloorCount: (count: number) => void;
  setRoiParams: (params: RoiParams) => void;
  markImpactChecked: () => void;
  markTourStep: (key: keyof TourProgress) => void;
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
        if (Array.isArray(parsed.floors) && parsed.floors.length >= MIN_FLOORS && parsed.floors.length <= MAX_FLOORS) {
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
    (floorNumber: number, selectedWaste: WasteType = "Despuntes de Madera", nextMaterial?: SupplyMaterial) => {
      const timeLabel = formatNow();
      setState((prev) => applyCycleAdvance(prev, floorNumber, selectedWaste, timeLabel, nextMaterial));
    },
    []
  );

  const moveCartBetweenFloors = useCallback((fromFloor: number, toFloor: number) => {
    const timeLabel = formatNow();
    setState((prev) => applyCartMove(prev, fromFloor, toFloor, timeLabel));
  }, []);

  const setFloorCount = useCallback((count: number) => {
    const timeLabel = formatNow();
    setState((prev) => applyFloorCount(prev, count, timeLabel));
  }, []);

  const setRoiParams = useCallback((roiParams: RoiParams) => {
    setState((prev) => ({ ...prev, roiParams }));
  }, []);

  const markTourStep = useCallback((key: keyof TourProgress) => {
    setState((prev) =>
      prev.tourProgress[key] ? prev : { ...prev, tourProgress: { ...prev.tourProgress, [key]: true } }
    );
  }, []);
  const markImpactChecked = useCallback(() => markTourStep("impactChecked"), [markTourStep]);

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
        setFloorCount,
        setRoiParams,
        markImpactChecked,
        markTourStep,
        resetDemo,
      }}
    >
      {children}
    </FaenaContext.Provider>
  );
}
