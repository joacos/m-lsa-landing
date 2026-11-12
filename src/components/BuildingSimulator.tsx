"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFaena } from "@/components/FaenaContext";
import { ModuleState, WasteType } from "@/types/mlsa";
import {
  Building2,
  ArrowUpCircle,
  ArrowDownCircle,
  QrCode,
  ShieldCheck,
  Box,
  Trash2,
  Clock,
  User,
  Radio,
  AlertTriangle,
  ArrowRight,
  MoveRight,
  RotateCcw,
} from "lucide-react";

type FilterMode = "ALL" | "SUPPLIES" | "WASTE" | "ALERTS";

const WASTE_OPTIONS: WasteType[] = [
  "Despuntes de Madera",
  "Despuntes Metálicos",
  "Cartón / Film Embalaje",
  "Escombro Limpio",
];

const STATE_UI: Record<
  ModuleState,
  { label: string; badgeClass: string; nextActionLabel: string }
> = {
  DELIVERING_SUPPLIES: {
    label: "En Despacho",
    badgeClass: "bg-emerald-950 text-emerald-300 border border-emerald-800",
    nextActionLabel: "Confirmar Llegada a Piso",
  },
  STORED_SATELITE: {
    label: "Bodega en Piso",
    badgeClass: "bg-blue-950 text-blue-300 border border-blue-800",
    nextActionLabel: "Terminar Material y Cargar Despuntes",
  },
  COLLECTING_WASTE: {
    label: "Cargando Retiro",
    badgeClass: "bg-amber-950 text-amber-300 border border-amber-800",
    nextActionLabel: "Bajar al Patio y Pesar (+180 kg)",
  },
  EMPTY: {
    label: "Disponible",
    badgeClass: "bg-slate-800 text-slate-400",
    nextActionLabel: "Solicitar Reposición Rápida",
  },
};

export const BuildingSimulator: React.FC = () => {
  const { state, advanceFloorCycle, moveCartBetweenFloors, resetDemo } = useFaena();
  const [filter, setFilter] = useState<FilterMode>("ALL");
  const [selectedFloorNumber, setSelectedFloorNumber] = useState<number>(12);
  const [selectedWaste, setSelectedWaste] = useState<WasteType>("Despuntes de Madera");
  const [moveTargetFloor, setMoveTargetFloor] = useState<number>(2);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const floors = state.floors;
  const selectedFloor = floors.find((f) => f.floorNumber === selectedFloorNumber) || floors[0];

  const isAlertFloor = (stateVal: ModuleState, fill: number) =>
    stateVal === "COLLECTING_WASTE" && fill >= 85;

  const filteredFloors = floors.filter((fl) => {
    if (filter === "SUPPLIES") {
      return fl.moduleState === "DELIVERING_SUPPLIES" || fl.moduleState === "STORED_SATELITE";
    }
    if (filter === "WASTE") return fl.moduleState === "COLLECTING_WASTE";
    if (filter === "ALERTS") return isAlertFloor(fl.moduleState, fl.fillLevelPercentage);
    return true;
  });

  const alertCount = floors.filter((f) =>
    isAlertFloor(f.moduleState, f.fillLevelPercentage)
  ).length;
  const supplyCount = floors.filter(
    (f) => f.moduleState === "DELIVERING_SUPPLIES" || f.moduleState === "STORED_SATELITE"
  ).length;
  const wasteCount = floors.filter((f) => f.moduleState === "COLLECTING_WASTE").length;

  const showTempFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    window.setTimeout(() => setFeedbackMsg(null), 3200);
  };

  const handleAdvanceCycle = () => {
    const prevState = selectedFloor.moduleState;
    advanceFloorCycle(selectedFloor.floorNumber, selectedWaste);
    if (prevState === "COLLECTING_WASTE") {
      showTempFeedback("¡+180 kg sumados a Ley REP!");
    } else if (prevState === "DELIVERING_SUPPLIES") {
      showTempFeedback(`Material entregado en Piso ${selectedFloor.floorNumber}.`);
    } else if (prevState === "STORED_SATELITE") {
      showTempFeedback(`Cargando ${selectedWaste} para retiro.`);
    } else {
      showTempFeedback(`Carro en camino al Piso ${selectedFloor.floorNumber}.`);
    }
  };

  const handleMoveCart = () => {
    if (effectiveMoveTarget === selectedFloor.floorNumber) return;
    moveCartBetweenFloors(selectedFloor.floorNumber, effectiveMoveTarget);
    setSelectedFloorNumber(effectiveMoveTarget);
    showTempFeedback(`Carro movido al Piso ${effectiveMoveTarget}.`);
  };

  const copyQrToken = (token: string) => {
    navigator.clipboard?.writeText(token);
    setCopiedToken(token);
    window.setTimeout(() => setCopiedToken(null), 2500);
  };

  const uiMeta = STATE_UI[selectedFloor.moduleState];
  const emptyTargets = floors.filter((f) => f.floorNumber !== selectedFloor.floorNumber);
  const effectiveMoveTarget =
    emptyTargets.find((f) => f.floorNumber === moveTargetFloor)?.floorNumber ??
    emptyTargets[0]?.floorNumber ??
    selectedFloor.floorNumber;

  return (
    <section id="simulador" className="py-16 bg-brand-dark relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-brand-emerald/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-amber/30 bg-brand-amber/10 px-3.5 py-1 text-xs font-semibold text-brand-amber">
            <Radio className="h-3.5 w-3.5 animate-pulse text-brand-amber" />
            Control de Obra Vivo · Conectado con Portería y Ley REP
          </div>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Simulador Interactivo de Edificio (12 Pisos)
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Toca cualquier piso para avanzar su ciclo real, cargar despuntes, bajar peso al patio o mover carros entre niveles.
          </p>

          {/* Filter Tabs */}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <div className="inline-flex flex-wrap justify-center rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800 shadow-xl gap-1">
              <button
                type="button"
                onClick={() => setFilter("ALL")}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  filter === "ALL"
                    ? "bg-slate-700 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Todos (12)
              </button>
              <button
                type="button"
                onClick={() => setFilter("SUPPLIES")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  filter === "SUPPLIES"
                    ? "bg-brand-emerald text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ArrowUpCircle className="h-4 w-4" />
                Subida ({supplyCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter("WASTE")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  filter === "WASTE"
                    ? "bg-brand-amber text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ArrowDownCircle className="h-4 w-4" />
                Retiro ({wasteCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter("ALERTS")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  filter === "ALERTS"
                    ? "bg-red-500 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Alertas ({alertCount})
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Building Elevation Visualizer */}
          <div className="lg:col-span-7 rounded-3xl border border-brand-border bg-slate-900/90 p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Building2 className="h-4 w-4 text-brand-emerald" />
                <span>Torre en Obra — Torre A (Pisos 1 al 12)</span>
              </div>
              <button
                type="button"
                onClick={resetDemo}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                Reiniciar Torre
              </button>
            </div>

            {/* Tower Floors Stack */}
            <div className="mt-4 space-y-1.5">
              {filteredFloors.length === 0 ? (
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-8 text-center text-xs text-slate-400">
                  No hay pisos en este filtro por ahora.
                </div>
              ) : (
                filteredFloors.map((fl) => {
                  const isSelected = fl.floorNumber === selectedFloorNumber;
                  const isWasteActive = fl.moduleState === "COLLECTING_WASTE";
                  const hasAlert = isAlertFloor(fl.moduleState, fl.fillLevelPercentage);
                  const rowMeta = STATE_UI[fl.moduleState];

                  return (
                    <motion.button
                      layout
                      key={fl.floorNumber}
                      type="button"
                      onClick={() => setSelectedFloorNumber(fl.floorNumber)}
                      className={`w-full group flex items-center justify-between rounded-xl px-4 py-2.5 transition-colors text-left border ${
                        isSelected
                          ? "border-brand-emerald bg-brand-navy/90 shadow-md ring-1 ring-brand-emerald"
                          : hasAlert
                          ? "border-amber-500/40 bg-slate-950/70 hover:bg-slate-800/70"
                          : "border-slate-800/80 bg-slate-950/50 hover:bg-slate-800/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-8 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-black font-mono ${
                            isSelected
                              ? "bg-brand-emerald text-slate-950"
                              : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                          }`}
                        >
                          P{fl.floorNumber}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-white truncate">
                              {isWasteActive
                                ? fl.wasteType || "Escombro Limpio"
                                : fl.moduleState === "EMPTY"
                                ? "Piso Despejado"
                                : fl.materialType}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {fl.activeModuleId || "Sin carro"}
                            </span>
                            {hasAlert && (
                              <span className="inline-flex items-center gap-1 rounded bg-red-500/20 border border-red-500/40 px-1.5 py-0.5 text-[10px] font-bold text-red-300">
                                ¡Listo para bajar!
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">{fl.supervisor}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span
                          className={`hidden sm:inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${rowMeta.badgeClass}`}
                        >
                          {rowMeta.label}
                        </span>

                        <div className="w-16 sm:w-24 text-right">
                          <div className="flex items-center justify-end gap-1 text-[10px] font-mono text-slate-300 mb-1">
                            <span>{fl.fillLevelPercentage}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                isWasteActive
                                  ? "bg-brand-amber"
                                  : fl.fillLevelPercentage > 75
                                  ? "bg-brand-emerald"
                                  : "bg-teal-400"
                              }`}
                              style={{ width: `${fl.fillLevelPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 px-2 pt-2 border-t border-slate-800">
              <span>* Toca un piso para operar su carro en tiempo real</span>
              <Link href="/sistema#porteria" className="text-brand-emerald font-semibold hover:underline">
                Despachar nueva guía en Portería →
              </Link>
            </div>
          </div>

          {/* Right Column: Controls + Live Activity Log */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-brand-border bg-gradient-to-b from-slate-900 via-brand-navy to-slate-950 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-brand-emerald">
                    Control de Carro en Piso
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Piso {selectedFloor.floorNumber} — {selectedFloor.activeModuleId || "Disponible"}
                  </h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/30">
                  {selectedFloor.moduleState === "COLLECTING_WASTE" ? (
                    <Trash2 className="h-6 w-6 text-brand-amber" />
                  ) : (
                    <Box className="h-6 w-6" />
                  )}
                </div>
              </div>

              {/* Status & Interactive Cycle */}
              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Estado Actual</span>
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${uiMeta.badgeClass}`}>
                      {uiMeta.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Material Cargado</span>
                    <span className="text-xs font-mono font-bold text-white">
                      {selectedFloor.materialType}
                    </span>
                  </div>
                  {selectedFloor.wasteType && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-xs text-slate-400">Tipo de Residuo</span>
                      <span className="text-xs font-bold text-brand-amber">
                        {selectedFloor.wasteType}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Nivel de Carga</span>
                      <span className="font-mono text-white font-bold">
                        {selectedFloor.fillLevelPercentage}% / 100%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          selectedFloor.moduleState === "COLLECTING_WASTE"
                            ? "bg-brand-amber"
                            : "bg-brand-emerald"
                        }`}
                        style={{ width: `${selectedFloor.fillLevelPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Waste selector shown right before converting supply cart to waste return */}
                {selectedFloor.moduleState === "STORED_SATELITE" && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3">
                    <label
                      htmlFor="floor-waste-select"
                      className="block text-[11px] font-bold text-brand-amber mb-1.5"
                    >
                      Elige el residuo limpio a cargar para el retorno:
                    </label>
                    <select
                      id="floor-waste-select"
                      value={selectedWaste}
                      onChange={(e) => setSelectedWaste(e.target.value as WasteType)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-brand-amber focus:outline-none"
                    >
                      {WASTE_OPTIONS.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Primary Cycle Action Button */}
                <button
                  type="button"
                  onClick={handleAdvanceCycle}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 ${
                    selectedFloor.moduleState === "COLLECTING_WASTE"
                      ? "bg-brand-amber text-slate-950 hover:bg-amber-400"
                      : "bg-brand-emerald text-slate-950 hover:bg-emerald-400"
                  }`}
                >
                  <span>{uiMeta.nextActionLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {feedbackMsg && (
                  <div className="rounded-xl border border-brand-emerald/40 bg-brand-emerald/10 px-3 py-2 text-xs font-semibold text-brand-emerald flex items-center justify-between gap-2">
                    <span>{feedbackMsg}</span>
                    {feedbackMsg.includes("Ley REP") && (
                      <Link href="/ley-rep" className="underline whitespace-nowrap">
                        Ver Ley REP →
                      </Link>
                    )}
                  </div>
                )}

                {/* Move Cart to Another Floor */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <span className="block text-[11px] font-semibold text-slate-300 mb-2">
                    Mover o reasignar este carro a otro piso:
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      aria-label="Piso destino"
                      value={effectiveMoveTarget}
                      onChange={(e) => setMoveTargetFloor(Number(e.target.value))}
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-emerald focus:outline-none"
                    >
                      {emptyTargets
                        .slice()
                        .sort((a, b) => a.floorNumber - b.floorNumber)
                        .map((fl) => (
                          <option key={fl.floorNumber} value={fl.floorNumber}>
                            Piso {fl.floorNumber} ({fl.moduleState === "EMPTY" ? "Libre" : STATE_UI[fl.moduleState].label})
                          </option>
                        ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleMoveCart}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-white hover:border-brand-emerald hover:text-brand-emerald"
                    >
                      <MoveRight className="h-3.5 w-3.5" />
                      Mover
                    </button>
                  </div>
                </div>

                {/* Personnel & QR */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <User className="h-3.5 w-3.5 text-brand-emerald" />
                      <span>A Cargo</span>
                    </div>
                    <p className="font-semibold text-white truncate">{selectedFloor.supervisor}</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Clock className="h-3.5 w-3.5 text-brand-amber" />
                      <span>Última Marca</span>
                    </div>
                    <p className="font-semibold text-white truncate">{selectedFloor.lastUpdated}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-emerald/25 bg-slate-950/90 p-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <QrCode className="h-5 w-5 text-brand-emerald shrink-0" />
                    <code className="text-[11px] font-mono text-brand-emerald truncate">
                      {selectedFloor.qrToken}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyQrToken(selectedFloor.qrToken)}
                    className="rounded bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-slate-300 hover:text-white hover:bg-slate-700 shrink-0"
                  >
                    {copiedToken === selectedFloor.qrToken ? "Copiado" : "Copiar QR"}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Módulo sellado contra polvo y lluvia. Certificación D.S. 594.</span>
                </div>
              </div>
            </div>

            {/* Live Operations Log */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Últimos Movimientos en Obra
              </h4>
              <div className="space-y-2">
                {state.events.slice(0, 4).map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs flex items-start justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{evt.action}</p>
                      <p className="text-[11px] text-slate-400 truncate">{evt.detail}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {evt.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
