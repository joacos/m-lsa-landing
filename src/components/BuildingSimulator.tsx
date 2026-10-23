"use client";

import React, { useState } from "react";
import { MLSA_SYSTEM_DATA } from "@/data/mlsa-content";
import { FloorStatus } from "@/types/mlsa";
import {
  Building2,
  ArrowUpCircle,
  ArrowDownCircle,
  QrCode,
  ShieldCheck,
  CheckCircle,
  Box,
  Trash2,
  Clock,
  User,
  Radio,
  ExternalLink,
} from "lucide-react";

export const BuildingSimulator: React.FC = () => {
  const [mode, setMode] = useState<"SUPPLIES" | "WASTE">("SUPPLIES");
  const [floors, setFloors] = useState<FloorStatus[]>(MLSA_SYSTEM_DATA.initialFloors);
  const [selectedFloorNumber, setSelectedFloorNumber] = useState<number>(12);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const selectedFloor = floors.find((f) => f.floorNumber === selectedFloorNumber) || floors[0];

  const handleSimulateScan = (floorNum: number) => {
    setFloors((prev) =>
      prev.map((item) => {
        if (item.floorNumber === floorNum) {
          const nextFill = item.fillLevelPercentage >= 90 ? 20 : item.fillLevelPercentage + 25;
          return {
            ...item,
            fillLevelPercentage: nextFill,
            lastUpdated: "Recién actualizado (QR Touch)",
          };
        }
        return item;
      })
    );
  };

  const copyQrToken = (token: string) => {
    navigator.clipboard?.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  return (
    <section id="simulador" className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-brand-emerald/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-amber/30 bg-brand-amber/10 px-3.5 py-1 text-xs font-semibold text-brand-amber">
            <Radio className="h-3.5 w-3.5 animate-pulse text-brand-amber" />
            Gemelo Digital de Obra en Tiempo Real
          </div>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Simulador Interactivo de Edificio (12 Pisos)
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Monitorea el posicionamiento vertical de los módulos M-LSA por piso. Alterna el modo para visualizar el abastecimiento JIT o el retorno de residuos limpios.
          </p>

          {/* Mode Switch Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800 shadow-xl">
              <button
                type="button"
                onClick={() => setMode("SUPPLIES")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  mode === "SUPPLIES"
                    ? "bg-brand-emerald text-slate-950 shadow-md shadow-brand-emerald/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ArrowUpCircle className="h-4 w-4" />
                Subida de Insumos (JIT)
              </button>
              <button
                type="button"
                onClick={() => setMode("WASTE")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  mode === "WASTE"
                    ? "bg-brand-amber text-slate-950 shadow-md shadow-brand-amber/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ArrowDownCircle className="h-4 w-4" />
                Retorno de Residuos (RCD)
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer Grid: Building on Left, Details on Right */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Building Elevation Visualizer */}
          <div className="lg:col-span-7 rounded-3xl border border-brand-border bg-slate-900/90 p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Building2 className="h-4 w-4 text-brand-emerald" />
                <span>Torre Vista Faena — Torre A (Pisos 1 al 12)</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {mode === "SUPPLIES" ? "Modo: Insumos JIT" : "Modo: Trazabilidad RCD"}
              </span>
            </div>

            {/* Tower Floors Vertical Stack */}
            <div className="mt-4 space-y-1.5">
              {floors.map((fl) => {
                const isSelected = fl.floorNumber === selectedFloorNumber;
                const isSuppliesMode = mode === "SUPPLIES";
                const isSuppliesActive =
                  fl.moduleState === "DELIVERING_SUPPLIES" || fl.moduleState === "STORED_SATELITE";
                const isWasteActive = fl.moduleState === "COLLECTING_WASTE";

                return (
                  <button
                    key={fl.floorNumber}
                    onClick={() => setSelectedFloorNumber(fl.floorNumber)}
                    className={`w-full group flex items-center justify-between rounded-xl px-4 py-2.5 transition-all text-left border ${
                      isSelected
                        ? "border-brand-emerald bg-brand-navy/90 shadow-md ring-1 ring-brand-emerald"
                        : "border-slate-800/80 bg-slate-950/50 hover:bg-slate-800/60 hover:border-slate-700"
                    }`}
                  >
                    {/* Floor Number & Tag */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-9 items-center justify-center rounded-lg text-xs font-black font-mono ${
                          isSelected
                            ? "bg-brand-emerald text-slate-950"
                            : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                        }`}
                      >
                        P{fl.floorNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {isSuppliesMode ? fl.materialType : fl.wasteType || "RCD Segregado"}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {fl.activeModuleId}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          {fl.supervisor}
                        </p>
                      </div>
                    </div>

                    {/* Module State Badge & Level */}
                    <div className="flex items-center gap-4">
                      {/* State badge */}
                      <span
                        className={`hidden sm:inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          fl.moduleState === "DELIVERING_SUPPLIES"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : fl.moduleState === "STORED_SATELITE"
                            ? "bg-blue-950 text-blue-300 border border-blue-800"
                            : fl.moduleState === "COLLECTING_WASTE"
                            ? "bg-amber-950 text-amber-300 border border-amber-800"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {fl.moduleState === "DELIVERING_SUPPLIES" && "En Despacho"}
                        {fl.moduleState === "STORED_SATELITE" && "Estación Satélite"}
                        {fl.moduleState === "COLLECTING_WASTE" && "Recolectando RCD"}
                        {fl.moduleState === "EMPTY" && "Disponible"}
                      </span>

                      {/* Fill indicator mini bar */}
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
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 px-2 pt-2 border-t border-slate-800">
              <span>* Haz click en cualquier piso para inspeccionar su módulo M-LSA</span>
              <span className="font-mono text-brand-emerald">12/12 Pisos Conectados</span>
            </div>
          </div>

          {/* Floor Detail & Real-time QR Inspection Card */}
          <div className="lg:col-span-5 rounded-3xl border border-brand-border bg-gradient-to-b from-slate-900 via-brand-navy to-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand-emerald">
                  Inspección Satélite Activa
                </span>
                <h3 className="text-xl font-black text-white">
                  Piso {selectedFloor.floorNumber} — {selectedFloor.activeModuleId}
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

            {/* Inventory Status Grid */}
            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Material Cargado</span>
                  <span className="text-xs font-mono font-bold text-white">
                    {selectedFloor.materialType}
                  </span>
                </div>
                {selectedFloor.wasteType && (
                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-xs text-slate-400">Segregación RCD</span>
                    <span className="text-xs font-bold text-brand-amber">
                      {selectedFloor.wasteType}
                    </span>
                  </div>
                )}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Nivel de Capacidad</span>
                    <span className="font-mono text-white font-bold">
                      {selectedFloor.fillLevelPercentage}% / 100%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-brand-emerald transition-all duration-300"
                      style={{ width: `${selectedFloor.fillLevelPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Personnel and status */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <User className="h-3.5 w-3.5 text-brand-emerald" />
                    <span>Responsable</span>
                  </div>
                  <p className="font-semibold text-white truncate">{selectedFloor.supervisor}</p>
                </div>

                <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Clock className="h-3.5 w-3.5 text-brand-amber" />
                    <span>Último Evento</span>
                  </div>
                  <p className="font-semibold text-white">{selectedFloor.lastUpdated}</p>
                </div>
              </div>

              {/* Simulated QR Code Badge */}
              <div className="rounded-2xl border border-brand-emerald/30 bg-slate-950/90 p-5 text-center shadow-inner">
                <div className="flex items-center justify-center">
                  <div className="relative rounded-xl bg-white p-3 shadow-md">
                    <QrCode className="h-28 w-28 text-slate-950" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-slate-950/80 rounded-xl transition-opacity">
                      <span className="text-[10px] font-bold text-brand-emerald">
                        QR Certificado
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">
                    Token Trazabilidad Portería:
                  </span>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <code className="rounded bg-slate-900 px-2 py-1 text-xs font-mono text-brand-emerald border border-slate-800">
                      {selectedFloor.qrToken}
                    </code>
                    <button
                      onClick={() => copyQrToken(selectedFloor.qrToken)}
                      className="rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-300 hover:text-white hover:bg-slate-700"
                    >
                      {copiedToken === selectedFloor.qrToken ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleSimulateScan(selectedFloor.floorNumber)}
                    className="w-full rounded-xl bg-brand-emerald/20 border border-brand-emerald/40 py-2.5 text-xs font-bold text-brand-emerald hover:bg-brand-emerald/30 transition-all active:scale-95"
                  >
                    ⚡ Simular Escaneo QR en Piso
                  </button>
                </div>
              </div>

              {/* Compliance note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="h-4 w-4 text-brand-emerald shrink-0" />
                <span>Módulo sellado contra polvo y lluvia. Certificación D.S. 594.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
