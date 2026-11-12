"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Unlock, Anchor, Package, Recycle, Scale } from "lucide-react";

/** Interactive schematic of the 450 kg galvanized cart showing doors, brakes, crane hooks, and load limit. */
export const CartInteractiveView: React.FC = () => {
  const [supplyDoorOpen, setSupplyDoorOpen] = useState(true);
  const [wasteDoorOpen, setWasteDoorOpen] = useState(false);
  const [brakesLocked, setBrakesLocked] = useState(true);
  const [highlightHooks, setHighlightHooks] = useState(false);
  const [loadKg, setLoadKg] = useState(280);

  const loadPercent = Math.round((loadKg / 450) * 100);
  const isNearMax = loadKg >= 400;

  return (
    <div className="rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 to-brand-navy p-6 sm:p-8 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-200">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-emerald" />
            Esquema Interactivo del Carro
          </span>
          <span className="text-xs font-mono text-brand-emerald font-semibold">
            Máx. 450 kg · D.S. 594
          </span>
        </div>

        <h3 className="mt-4 text-xl sm:text-2xl font-black text-white">
          Prueba sus Compuertas, Frenos e Izaje
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
          Toca cada botón para ver cómo protege materiales de la lluvia y separa despuntes sin mezclarse.
        </p>

        {/* Interactive Cart Visual */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          {/* Top Crane Hooks Row */}
          <div className="flex items-center justify-between px-4 mb-2">
            {[0, 1].map((hook) => (
              <motion.div
                key={hook}
                animate={{
                  scale: highlightHooks ? 1.15 : 1,
                }}
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-mono font-bold transition-colors ${
                  highlightHooks
                    ? "border-brand-amber bg-brand-amber/20 text-brand-amber"
                    : "border-slate-700 bg-slate-900 text-slate-400"
                }`}
              >
                <Anchor className="h-3 w-3" />
                Cáncamo Certificado
              </motion.div>
            ))}
          </div>

          {/* Galvanized Steel Frame */}
          <div className="rounded-2xl border-2 border-slate-600 bg-slate-900/90 p-3 shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Compartment 1: Materials */}
              <div className="relative rounded-xl border border-brand-emerald/40 bg-slate-950 p-3 overflow-hidden min-h-[118px]">
                <div className="flex items-center justify-between text-xs font-bold text-brand-emerald">
                  <span className="inline-flex items-center gap-1">
                    <Package className="h-3.5 w-3.5" />
                    Zona Materiales
                  </span>
                  <span className="text-[10px] font-mono">
                    {supplyDoorOpen ? "Abierta" : "Sellada"}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-[11px] text-slate-300">
                  <div className="rounded bg-emerald-950/60 border border-emerald-800/60 px-2 py-1">
                    Planchas de Volcanita
                  </div>
                  <div className="rounded bg-emerald-950/60 border border-emerald-800/60 px-2 py-1">
                    Pernos y Moldajes secos
                  </div>
                </div>

                {/* Animated Sealed Door Overlay */}
                <motion.div
                  initial={false}
                  animate={{ x: supplyDoorOpen ? "-100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  className="absolute inset-0 bg-gradient-to-br from-slate-700/95 to-slate-800/95 border-r-2 border-brand-emerald/60 flex flex-col items-center justify-center p-2 text-center"
                >
                  <ShieldCheck className="h-5 w-5 text-brand-emerald mb-1" />
                  <span className="text-[11px] font-bold text-white">Compuerta Sellada</span>
                  <span className="text-[10px] text-slate-300">Cero lluvia y polvo</span>
                </motion.div>
              </div>

              {/* Compartment 2: Waste */}
              <div className="relative rounded-xl border border-brand-amber/40 bg-slate-950 p-3 overflow-hidden min-h-[118px]">
                <div className="flex items-center justify-between text-xs font-bold text-brand-amber">
                  <span className="inline-flex items-center gap-1">
                    <Recycle className="h-3.5 w-3.5" />
                    Zona Despuntes
                  </span>
                  <span className="text-[10px] font-mono">
                    {wasteDoorOpen ? "Abierta" : "Cerrada"}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-[11px] text-slate-300">
                  <div className="rounded bg-amber-950/60 border border-amber-800/60 px-2 py-1">
                    Madera y Fierro limpio
                  </div>
                  <div className="rounded bg-amber-950/60 border border-amber-800/60 px-2 py-1">
                    Cartón y Film embalaje
                  </div>
                </div>

                {/* Animated Waste Door Overlay */}
                <motion.div
                  initial={false}
                  animate={{ x: wasteDoorOpen ? "100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  className="absolute inset-0 bg-gradient-to-br from-slate-700/95 to-slate-800/95 border-l-2 border-brand-amber/60 flex flex-col items-center justify-center p-2 text-center"
                >
                  <Recycle className="h-5 w-5 text-brand-amber mb-1" />
                  <span className="text-[11px] font-bold text-white">Tolva de Retiro</span>
                  <span className="text-[10px] text-slate-300">Listo para bajar a patio</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Wheels & Brakes Row */}
          <div className="mt-2.5 flex items-center justify-between px-4">
            {[0, 1].map((wheel) => (
              <div key={wheel} className="flex items-center gap-2">
                <div
                  className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    brakesLocked
                      ? "border-brand-emerald bg-emerald-950 text-brand-emerald"
                      : "border-slate-500 bg-slate-800 text-slate-300"
                  }`}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {brakesLocked ? "Freno trabado" : "Rueda libre"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Feature Controls */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setSupplyDoorOpen((prev) => !prev)}
            className={`rounded-xl border px-3 py-2 font-bold transition-all ${
              supplyDoorOpen
                ? "border-brand-emerald bg-brand-emerald/15 text-brand-emerald"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500"
            }`}
          >
            {supplyDoorOpen ? "Cerrar" : "Abrir"} Materiales
          </button>
          <button
            type="button"
            onClick={() => setWasteDoorOpen((prev) => !prev)}
            className={`rounded-xl border px-3 py-2 font-bold transition-all ${
              wasteDoorOpen
                ? "border-brand-amber bg-brand-amber/15 text-brand-amber"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500"
            }`}
          >
            {wasteDoorOpen ? "Cerrar" : "Abrir"} Despuntes
          </button>
          <button
            type="button"
            onClick={() => setBrakesLocked((prev) => !prev)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 font-semibold text-slate-200 hover:border-slate-500"
          >
            {brakesLocked ? (
              <Lock className="h-3.5 w-3.5 text-brand-emerald" />
            ) : (
              <Unlock className="h-3.5 w-3.5 text-brand-amber" />
            )}
            {brakesLocked ? "Soltar Frenos" : "Trabar Frenos"}
          </button>
          <button
            type="button"
            onClick={() => setHighlightHooks((prev) => !prev)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 font-semibold transition-all ${
              highlightHooks
                ? "border-brand-amber bg-brand-amber/15 text-brand-amber"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500"
            }`}
          >
            <Anchor className="h-3.5 w-3.5" />
            Puntos de Izaje
          </button>
        </div>
      </div>

      {/* Load Simulator Slider */}
      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="inline-flex items-center gap-1.5 font-semibold text-slate-300">
            <Scale className="h-3.5 w-3.5 text-brand-emerald" />
            Simular Peso de Carga:
          </span>
          <span
            className={`font-mono font-black ${
              isNearMax ? "text-brand-amber" : "text-brand-emerald"
            }`}
          >
            {loadKg} / 450 kg ({loadPercent}%)
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="450"
          step="15"
          value={loadKg}
          onChange={(e) => setLoadKg(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
        />
        <p className="mt-1.5 text-[11px] text-slate-400">
          {isNearMax
            ? "Cerca del límite máximo para grúa pluma o montacargas (450 kg)."
            : "Carga estable dentro del rango seguro D.S. 594."}
        </p>
      </div>
    </div>
  );
};
