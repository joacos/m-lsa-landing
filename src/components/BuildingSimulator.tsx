"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, Plus, RotateCcw } from "lucide-react";
import { useFaena } from "@/components/FaenaContext";
import { FloorPlanMap } from "@/components/FloorPlanMap";
import { SitePlanMap } from "@/components/SitePlanMap";
import { CYCLE_STEPS, FLOOR_LAYOUTS, FLOOR_PLAN, SITE_PLAN } from "@/data/mlsa-content";
import { MAX_FLOORS, MIN_FLOORS, floorLayoutId } from "@/lib/faena-state";
import { ModuleState, WasteType } from "@/types/mlsa";

/** Color por estado: verde = material, naranja = desechos, gris = sin carro. */
const STATE_COLOR: Record<ModuleState, string> = {
  DELIVERING_SUPPLIES: "bg-brand-emerald",
  STORED_SATELITE: "bg-brand-emerald",
  COLLECTING_WASTE: "bg-brand-amber",
  EMPTY: "bg-slate-200",
};

const STEP_ORDER: ModuleState[] = ["DELIVERING_SUPPLIES", "STORED_SATELITE", "COLLECTING_WASTE", "EMPTY"];

const FLOOR_PRESETS = [
  { label: "Edificio bajo", floors: 5 },
  { label: "Edificio medio", floors: 12 },
  { label: "Torre", floors: 20 },
];

const LEGEND = [
  { color: "bg-brand-emerald", text: "Zona A: materiales, junto al montacargas" },
  { color: "bg-brand-amber", text: "Zona B: desechos, un casillero por tipo" },
  { color: "bg-brand-yellow", text: "Frente de trabajo de la cuadrilla" },
  { color: "bg-slate-200", text: "Pasillo y escalera: nunca se acopia" },
];

const SITE_LEGEND = [
  { color: "bg-brand-emerald", text: "Ruta del material: portería → montacargas" },
  { color: "bg-brand-amber", text: "Ruta de desechos: montacargas → balanza → patio" },
  { color: "bg-brand-sky", text: "Portería: registro con código QR" },
  { color: "bg-slate-200", text: `Cada bloque de la pila ≈ ${SITE_PLAN.kgPerBlock} kg pesados` },
];

/** Simulador: consola para definir los pisos y luego 3 pasos (elegir piso, ver el plano, avanzar el carro con un botón). */
export const BuildingSimulator: React.FC = () => {
  const { state, advanceFloorCycle, setFloorCount, resetDemo } = useFaena();
  const [selectedFloorNumber, setSelectedFloorNumber] = useState(12);
  const [selectedWaste, setSelectedWaste] = useState<WasteType>("Despuntes de Madera");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [view, setView] = useState<"piso" | "faena">("piso");

  const floors = state.floors;
  const floor = floors.find((f) => f.floorNumber === selectedFloorNumber) || floors[0];
  const step = CYCLE_STEPS[floor.moduleState];
  const isWaste = floor.moduleState === "COLLECTING_WASTE";
  const total = floors.length;
  const layout = FLOOR_LAYOUTS[floorLayoutId(floor.floorNumber, total)];

  const handleAdvance = () => {
    const messages: Record<ModuleState, string> = {
      DELIVERING_SUPPLIES: `Material entregado en la Zona A del Piso ${floor.floorNumber}.`,
      STORED_SATELITE: `Carro en la Zona B cargando ${selectedWaste}.`,
      COLLECTING_WASTE: "¡+180 kg pesados y sumados a Ley REP!",
      EMPTY: `Carro con material en camino al Piso ${floor.floorNumber}.`,
    };
    advanceFloorCycle(floor.floorNumber, selectedWaste);
    if (isWaste) setView("faena"); // al bajar, mostrar cómo crece la pila en el patio de acopio
    setFeedbackMsg(messages[floor.moduleState]);
    window.setTimeout(() => setFeedbackMsg(null), 3200);
  };

  return (
    <section id="simulador" className="py-12 bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-brand-ink sm:text-4xl">Simulador de Obra</h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Define los pisos de tu obra, elige uno, mira en el plano dónde se deja el material y dónde los desechos, y
            avanza el carro con un solo botón.
          </p>
        </div>

        {/* Consola: definir la obra antes de simular */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl border-2 border-brand-ink bg-brand-yellow px-5 py-4 shadow-hard">
          <div className="min-w-[12rem] flex-1">
            <h3 className="text-sm font-black text-brand-ink">Consola de obra: ¿cuántos pisos tiene tu edificio?</h3>
            <p className="text-xs text-brand-ink/80">
              El piso 1 es la planta de acceso, el último es distinto y el resto cambia de planta según la altura.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FLOOR_PRESETS.map((preset) => (
              <button
                key={preset.floors}
                type="button"
                onClick={() => setFloorCount(preset.floors)}
                aria-pressed={total === preset.floors}
                className={`rounded-lg border-2 border-brand-ink px-3 py-1.5 text-xs font-bold ${
                  total === preset.floors ? "bg-brand-ink text-white" : "bg-white text-brand-ink hover:bg-brand-cream"
                }`}
              >
                {preset.label} ({preset.floors})
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Quitar un piso"
              disabled={total <= MIN_FLOORS}
              onClick={() => setFloorCount(total - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-brand-ink bg-white text-brand-ink disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>
            <label className="flex items-center gap-1.5 text-sm font-black text-brand-ink">
              <input
                type="number"
                min={MIN_FLOORS}
                max={MAX_FLOORS}
                value={total}
                onChange={(e) => e.target.value && setFloorCount(Number(e.target.value))}
                className="w-16 rounded-lg border-2 border-brand-ink bg-white px-2 py-1.5 text-center font-mono text-base"
              />
              pisos
            </label>
            <button
              type="button"
              aria-label="Agregar un piso"
              disabled={total >= MAX_FLOORS}
              onClick={() => setFloorCount(total + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-brand-ink bg-white text-brand-ink disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* 1. Torre: elegir piso */}
          <div className="rounded-3xl border-2 border-brand-ink bg-white p-4 shadow-hard lg:col-span-2">
            <h3 className="text-sm font-black text-brand-ink">1. Elige un piso</h3>
            <div className={`mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6 ${total > 15 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
              {floors.map((fl) => {
                const selected = fl.floorNumber === floor.floorNumber;
                return (
                  <button
                    key={fl.floorNumber}
                    type="button"
                    onClick={() => {
                      setSelectedFloorNumber(fl.floorNumber);
                      setView("piso");
                    }}
                    aria-pressed={selected}
                    className={`flex items-center gap-2 rounded-lg border-2 px-2 py-1.5 text-left text-xs font-bold text-brand-ink transition-colors ${
                      selected ? "border-brand-ink bg-brand-yellow" : "border-transparent bg-brand-cream hover:border-slate-300"
                    }`}
                  >
                    <span className={`h-3 w-3 shrink-0 rounded-full border border-brand-ink ${STATE_COLOR[fl.moduleState]}`} />
                    <span className="font-mono">P{fl.floorNumber}</span>
                    {total <= 15 && (
                      <span className="hidden truncate font-medium text-slate-600 lg:inline">
                        {CYCLE_STEPS[fl.moduleState].status}
                      </span>
                    )}
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
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-black text-brand-ink">2. Mira el plano</h3>
              <div className="inline-flex rounded-lg border-2 border-brand-ink p-0.5 text-xs font-bold">
                {(["piso", "faena"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    aria-pressed={view === v}
                    className={`rounded-md px-3 py-1 ${view === v ? "bg-brand-ink text-white" : "text-brand-ink hover:bg-brand-cream"}`}
                  >
                    {v === "piso" ? `Piso ${floor.floorNumber}` : "Faena completa"}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              {view === "piso" ? (
                <>
                  <strong className="text-brand-ink">{layout.name}.</strong> {layout.note}
                </>
              ) : (
                <>
                  <strong className="text-brand-ink">Plano general.</strong> Los desechos de todos los pisos bajan por el
                  montacargas, se pesan y se apilan en el patio, una pila por tipo.
                </>
              )}
            </p>
            <div className="mt-3">
              {view === "piso" ? (
                <FloorPlanMap floor={floor} totalFloors={total} />
              ) : (
                <SitePlanMap floor={floor} totalFloors={total} wasteTotalsKg={state.wasteTotalsKg} />
              )}
            </div>
            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1.5 text-xs text-slate-600 sm:grid-cols-2">
              {(view === "piso" ? LEGEND : SITE_LEGEND).map((item) => (
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
