"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { useFaena } from "@/components/FaenaContext";
import { usePilotModal } from "@/components/SiteShell";
import { useCountUp } from "@/components/CountUp";
import { FloorPlanMap } from "@/components/FloorPlanMap";
import { SitePlanMap } from "@/components/SitePlanMap";
import { GUIDED_STEPS } from "@/data/mlsa-content";
import { FloorStatus } from "@/types/mlsa";

const GUIDE_FLOOR = 7;
const GUIDE_TOTAL = 12;
const FILL: Record<FloorStatus["moduleState"], number> = {
  DELIVERING_SUPPLIES: 100,
  STORED_SATELITE: 65,
  COLLECTING_WASTE: 85,
  EMPTY: 0,
};

/** Piso ficticio del recorrido: no toca la torre del modo Explorar. */
const guideFloor = (state: FloorStatus["moduleState"]): FloorStatus => ({
  floorNumber: GUIDE_FLOOR,
  activeModuleId: "FL-07A",
  moduleState: state,
  materialType: "Volcanita / Yeso",
  wasteType: state === "COLLECTING_WASTE" ? "Despuntes de Madera" : undefined,
  fillLevelPercentage: FILL[state],
  supervisor: "M. González (Tabiquería)",
  qrToken: "QR-FL07-SUP-0107",
  lastUpdated: "Recorrido guiado",
});

/** Simulador, modo guiado: cuenta el circuito de un carro en 5 pasos, con el antes y lo que se gana en cada uno. */
export function GuidedCycle({ onExplore }: { onExplore: () => void }) {
  const { state, markTourStep } = useFaena();
  const openPilot = usePilotModal();
  const [i, setI] = useState(0);
  const done = i >= GUIDED_STEPS.length;
  const step = GUIDED_STEPS[Math.min(i, GUIDED_STEPS.length - 1)];
  const reached = GUIDED_STEPS.slice(0, i + 1);
  const minutes = useCountUp(reached.reduce((s, x) => s + (x.minutes ?? 0), 0), true, 0.8);
  const kg = useCountUp(reached.reduce((s, x) => s + (x.kg ?? 0), 0), true, 0.8);
  const weighed = reached.some((x) => x.kg);

  // El tour general avanza con el recorrido: material entregado (paso 3) y retiro pesado (paso 5).
  useEffect(() => {
    if (i >= 2) markTourStep("floorDelivered");
    if (i >= 4) markTourStep("wasteReturned");
  }, [i, markTourStep]);

  const floor = guideFloor(done ? "COLLECTING_WASTE" : step.state);
  const showSite = done || step.view === "faena";
  const totals = weighed
    ? { ...state.wasteTotalsKg, "Despuntes de Madera": state.wasteTotalsKg["Despuntes de Madera"] + 180 }
    : state.wasteTotalsKg;

  return (
    <div className="rounded-3xl border-2 border-brand-ink bg-white p-4 shadow-hard sm:p-6">
      {/* Progreso */}
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-xs font-black text-brand-ink">
          {done ? "Resultado" : `Paso ${i + 1} de ${GUIDED_STEPS.length}`}
        </span>
        <div className="flex flex-1 gap-1.5">
          {GUIDED_STEPS.map((s, k) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Ir al paso ${k + 1}: ${s.title}`}
              onClick={() => setI(k)}
              className={`h-2.5 flex-1 rounded-full border border-brand-ink transition-colors ${
                k < i || done ? "bg-brand-ink" : k === i ? (s.kg || s.state === "COLLECTING_WASTE" ? "bg-brand-amber" : "bg-brand-emerald") : "bg-slate-100"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Plano */}
        <div className="lg:col-span-7">
          <p className="mb-2 text-xs font-bold text-slate-600">
            {showSite ? "Plano general de la faena" : `Plano del Piso ${GUIDE_FLOOR}`}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={showSite ? "faena" : "piso"}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              {showSite ? (
                <SitePlanMap floor={floor} totalFloors={GUIDE_TOTAL} wasteTotalsKg={totals} />
              ) : (
                <FloorPlanMap floor={floor} totalFloors={GUIDE_TOTAL} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Relato */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {done ? (
                <>
                  <h3 className="text-2xl font-black text-brand-ink">Lo que deja un solo viaje del carro</h3>
                  <ul className="mt-4 space-y-2">
                    {GUIDED_STEPS.map((s) => (
                      <li key={s.win} className="flex items-start gap-2 text-sm font-semibold text-brand-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-emeraldDark" />
                        {s.win}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-slate-600">
                    Con 2 carros por piso esto se repite varias veces al día. Las cifras son estimaciones de referencia.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-black leading-tight text-brand-ink">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-700">{step.now}</p>
                  <div className="mt-4 flex items-start gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span>
                      <strong className="text-slate-700">Sin Faena Limpia:</strong> {step.before}
                    </span>
                  </div>
                  <div className="mt-2 flex items-start gap-2 rounded-xl border-2 border-brand-emerald bg-emerald-50 p-3 text-sm font-bold text-brand-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-emeraldDark" />
                    {step.win}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Contadores del recorrido */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border-2 border-brand-ink bg-brand-cream p-3">
              <p className="font-mono text-2xl font-black text-brand-emeraldDark">{Math.round(minutes)} min</p>
              <p className="text-xs font-semibold text-slate-600">ahorrados en búsqueda</p>
            </div>
            <div className="rounded-xl border-2 border-brand-ink bg-brand-cream p-3">
              <p className="font-mono text-2xl font-black text-brand-amberDark">{Math.round(kg)} kg</p>
              <p className="text-xs font-semibold text-slate-600">con respaldo Ley REP</p>
            </div>
          </div>

          {/* Controles */}
          {done ? (
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={openPilot}
                className="rounded-xl border-2 border-brand-ink bg-brand-emerald px-4 py-3 text-sm font-black text-brand-ink shadow-hard hover:-translate-y-0.5"
              >
                Solicitar piloto
              </button>
              <button
                type="button"
                onClick={onExplore}
                className="rounded-xl border-2 border-brand-ink bg-white px-4 py-3 text-sm font-black text-brand-ink hover:bg-brand-cream"
              >
                Probar con mi edificio
              </button>
              <button
                type="button"
                onClick={() => setI(0)}
                className="inline-flex items-center justify-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-ink"
              >
                <RotateCcw className="h-3 w-3" /> Ver de nuevo
              </button>
              <Link href="/ley-rep" className="text-center text-xs font-bold text-brand-amberDark hover:underline">
                Ver cómo se respalda en Ley REP →
              </Link>
            </div>
          ) : (
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setI(i - 1)}
                disabled={i === 0}
                aria-label="Paso anterior"
                className="rounded-xl border-2 border-brand-ink bg-white px-4 py-3 text-brand-ink disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setI(i + 1)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brand-ink bg-brand-emerald px-4 py-3 text-sm font-black text-brand-ink shadow-hard transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                {i === GUIDED_STEPS.length - 1 ? "Ver resultado" : "Siguiente"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
