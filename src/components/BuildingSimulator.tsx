"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { useFaena } from "@/components/FaenaContext";
import { FloorPlanMap } from "@/components/FloorPlanMap";
import { CYCLE_STEPS, FLOOR_PLAN } from "@/data/mlsa-content";
import { ModuleState, WasteType } from "@/types/mlsa";

/** Color por estado: verde = material, naranja = desechos, gris = sin carro. */
const STATE_COLOR: Record<ModuleState, string> = {
  DELIVERING_SUPPLIES: "bg-brand-emerald",
  STORED_SATELITE: "bg-brand-emerald",
  COLLECTING_WASTE: "bg-brand-amber",
  EMPTY: "bg-slate-200",
};

const STEP_ORDER: ModuleState[] = ["DELIVERING_SUPPLIES", "STORED_SATELITE", "COLLECTING_WASTE", "EMPTY"];

const LEGEND = [
  { color: "bg-brand-emerald", text: "Zona A: materiales, junto al montacargas" },
  { color: "bg-brand-amber", text: "Zona B: desechos, un casillero por tipo" },
  { color: "bg-brand-yellow", text: "Frente de trabajo de la cuadrilla" },
  { color: "bg-slate-200", text: "Pasillo y escalera: nunca se acopia" },
];

/** Simulador en 3 pasos: elige un piso, mira en el plano dónde va cada cosa, avanza el carro con un botón. */
export const BuildingSimulator: React.FC = () => {
  const { state, advanceFloorCycle, resetDemo } = useFaena();
  const [selectedFloorNumber, setSelectedFloorNumber] = useState(12);
  const [selectedWaste, setSelectedWaste] = useState<WasteType>("Despuntes de Madera");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const floors = state.floors;
  const floor = floors.find((f) => f.floorNumber === selectedFloorNumber) || floors[0];
  const step = CYCLE_STEPS[floor.moduleState];
  const isWaste = floor.moduleState === "COLLECTING_WASTE";

  const handleAdvance = () => {
    const messages: Record<ModuleState, string> = {
      DELIVERING_SUPPLIES: `Material entregado en la Zona A del Piso ${floor.floorNumber}.`,
      STORED_SATELITE: `Carro en la Zona B cargando ${selectedWaste}.`,
      COLLECTING_WASTE: "¡+180 kg pesados y sumados a Ley REP!",
      EMPTY: `Carro con material en camino al Piso ${floor.floorNumber}.`,
    };
    advanceFloorCycle(floor.floorNumber, selectedWaste);
    setFeedbackMsg(messages[floor.moduleState]);
    window.setTimeout(() => setFeedbackMsg(null), 3200);
  };

  return (
    <section id="simulador" className="py-12 bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-brand-ink sm:text-4xl">Simulador de Obra</h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Elige un piso, mira en el plano dónde se deja el material y dónde los desechos, y avanza el carro con un
            solo botón.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* 1. Torre: elegir piso */}
          <div className="rounded-3xl border-2 border-brand-ink bg-white p-4 shadow-hard lg:col-span-2">
            <h3 className="text-sm font-black text-brand-ink">1. Elige un piso</h3>
            <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-1">
              {floors.map((fl) => {
                const selected = fl.floorNumber === floor.floorNumber;
                return (
                  <button
                    key={fl.floorNumber}
                    type="button"
                    onClick={() => setSelectedFloorNumber(fl.floorNumber)}
                    aria-pressed={selected}
                    className={`flex items-center gap-2 rounded-lg border-2 px-2 py-1.5 text-left text-xs font-bold text-brand-ink transition-colors ${
                      selected ? "border-brand-ink bg-brand-yellow" : "border-transparent bg-brand-cream hover:border-slate-300"
                    }`}
                  >
                    <span className={`h-3 w-3 shrink-0 rounded-full border border-brand-ink ${STATE_COLOR[fl.moduleState]}`} />
                    <span className="font-mono">P{fl.floorNumber}</span>
                    <span className="hidden truncate font-medium text-slate-600 lg:inline">
                      {CYCLE_STEPS[fl.moduleState].status}
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={resetDemo}
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-brand-ink"
            >
              <RotateCcw className="h-3 w-3" />
              Reiniciar torre
            </button>
          </div>

          {/* 2. Plano del piso */}
          <div className="rounded-3xl border-2 border-brand-ink bg-white p-4 shadow-hard sm:p-5 lg:col-span-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-black text-brand-ink">2. Plano del Piso {floor.floorNumber}</h3>
              <span className="text-[11px] text-slate-500">Planta tipo esquemática · {floor.supervisor}</span>
            </div>
            <div className="mt-3">
              <FloorPlanMap floor={floor} />
            </div>
            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1.5 text-xs text-slate-600 sm:grid-cols-2">
              {LEGEND.map((item) => (
                <li key={item.text} className="flex items-center gap-2">
                  <span className={`h-3 w-3 shrink-0 rounded-sm border border-brand-ink ${item.color}`} />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Qué hacer ahora */}
          <div className="rounded-3xl border-2 border-brand-ink bg-white p-5 shadow-hard lg:col-span-4">
            <h3 className="text-sm font-black text-brand-ink">3. Qué hacer ahora</h3>

            <ol className="mt-4 space-y-2">
              {STEP_ORDER.map((key, i) => {
                const done = i < step.stepIndex;
                const current = i === step.stepIndex;
                return (
                  <li
                    key={key}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm ${
                      current ? "bg-brand-cream font-black text-brand-ink" : done ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black ${
                        current
                          ? `border-brand-ink text-brand-ink ${isWaste ? "bg-brand-amber" : "bg-brand-emerald"}`
                          : done
                          ? "border-slate-300 bg-slate-100 text-slate-500"
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    {CYCLE_STEPS[key].short}
                  </li>
                );
              })}
            </ol>

            <motion.p
              key={`${floor.floorNumber}-${floor.moduleState}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 rounded-xl border-2 p-3.5 text-sm font-medium text-brand-ink ${
                isWaste ? "border-brand-amber bg-orange-50" : "border-brand-emerald bg-emerald-50"
              }`}
            >
              {step.where(floor)}
            </motion.p>

            {floor.moduleState !== "EMPTY" && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Carro {floor.activeModuleId}</span>
                  <span className="font-mono font-bold text-brand-ink">{floor.fillLevelPercentage}% lleno</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full transition-all duration-500 ${isWaste ? "bg-brand-amber" : "bg-brand-emerald"}`}
                    style={{ width: `${floor.fillLevelPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {floor.moduleState === "STORED_SATELITE" && (
              <label className="mt-4 block text-xs font-bold text-brand-amberDark">
                ¿Qué desecho se va a cargar?
                <select
                  value={selectedWaste}
                  onChange={(e) => setSelectedWaste(e.target.value as WasteType)}
                  className="mt-1.5 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-sm font-medium text-brand-ink focus:border-brand-amber focus:outline-none"
                >
                  {FLOOR_PLAN.wasteSlots.map((slot) => (
                    <option key={slot.key} value={slot.key}>
                      {slot.key}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <button
              type="button"
              onClick={handleAdvance}
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-ink px-4 py-3.5 text-sm font-black text-brand-ink shadow-hard transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none ${
                isWaste ? "bg-brand-amber" : "bg-brand-emerald"
              }`}
            >
              {step.action}
              <ArrowRight className="h-4 w-4" />
            </button>

            {feedbackMsg && (
              <p role="status" className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-brand-yellow/40 px-3 py-2 text-xs font-bold text-brand-ink">
                {feedbackMsg}
                {feedbackMsg.includes("Ley REP") && (
                  <Link href="/ley-rep" className="underline">
                    Ver Ley REP →
                  </Link>
                )}
              </p>
            )}

            <Link
              href="/sistema#porteria"
              className="mt-4 inline-block text-xs font-bold text-brand-emeraldDark hover:underline"
            >
              Despachar una guía nueva desde Portería →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
