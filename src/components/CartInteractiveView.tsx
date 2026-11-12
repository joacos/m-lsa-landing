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
    <div className="rounded-3xl border-2 border-brand-ink bg-gradient-to-br from-white to-brand-navy p-6 sm:p-8 shadow-hard flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-emeraldDark" />
            Esquema Interactivo del Carro
          </span>
          <span className="text-xs font-mono text-brand-emeraldDark font-semibold">
            Máx. 450 kg · D.S. 594
          </span>
        </div>

        <h3 className="mt-4 text-xl sm:text-2xl font-black text-brand-ink">
          Prueba sus Compuertas, Frenos e Izaje
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
          Toca cada botón para ver cómo protege materiales de la lluvia y separa despuntes sin mezclarse.
        </p>

        {/* Interactive Cart Visual */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-brand-cream p-5">
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
                    ? "border-brand-amber bg-brand-amber/20 text-brand-amberDark"
                    : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                <Anchor className="h-3 w-3" />
                Cáncamo Certificado
              </motion.div>
            ))}
          </div>

          {/* Galvanized Steel Frame */}
          <div className="rounded-2xl border-2 border-slate-400 bg-white p-3 shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Compartment 1: Materials */}
              <div className="relative rounded-xl border border-brand-emerald/40 bg-brand-cream p-3 overflow-hidden min-h-[118px]">
                <div className="flex items-center justify-between text-xs font-bold text-brand-emeraldDark">
                  <span className="inline-flex items-center gap-1">
                    <Package className="h-3.5 w-3.5" />
                    Zona Materiales
                  </span>
                  <span className="text-[10px] font-mono">
                    {supplyDoorOpen ? "Abierta" : "Sellada"}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-[11px] text-slate-600">
                  <div className="rounded bg-emerald-50 border border-emerald-300 px-2 py-1">
                    Planchas de Volcanita
                  </div>
                  <div className="rounded bg-emerald-50 border border-emerald-300 px-2 py-1">
                    Pernos y Moldajes secos
                  </div>
                </div>

                {/* Animated Sealed Door Overlay */}
                <motion.div
                  initial={false}
                  animate={{ x: supplyDoorOpen ? "-100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 border-r-2 border-brand-emerald/60 flex flex-col items-center justify-center p-2 text-center"
                >
                  <ShieldCheck className="h-5 w-5 text-brand-emeraldDark mb-1" />
                  <span className="text-[11px] font-bold text-brand-ink">Compuerta Sellada</span>
                  <span className="text-[10px] text-slate-600">Cero lluvia y polvo</span>
                </motion.div>
              </div>

              {/* Compartment 2: Waste */}
              <div className="relative rounded-xl border border-brand-amber/40 bg-brand-cream p-3 overflow-hidden min-h-[118px]">
                <div className="flex items-center justify-between text-xs font-bold text-brand-amberDark">
                  <span className="inline-flex items-center gap-1">
                    <Recycle className="h-3.5 w-3.5" />
                    Zona Despuntes
                  </span>
                  <span className="text-[10px] font-mono">
                    {wasteDoorOpen ? "Abierta" : "Cerrada"}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-[11px] text-slate-600">
                  <div className="rounded bg-orange-50 border border-orange-300 px-2 py-1">
                    Madera y Fierro limpio
                  </div>
                  <div className="rounded bg-orange-50 border border-orange-300 px-2 py-1">
                    Cartón y Film embalaje
                  </div>
                </div>

                {/* Animated Waste Door Overlay */}
                <motion.div
                  initial={false}
                  animate={{ x: wasteDoorOpen ? "100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 border-l-2 border-brand-amber/60 flex flex-col items-center justify-center p-2 text-center"
                >
                  <Recycle className="h-5 w-5 text-brand-amberDark mb-1" />
                  <span className="text-[11px] font-bold text-brand-ink">Tolva de Retiro</span>
                  <span className="text-[10px] text-slate-600">Listo para bajar a patio</span>
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
                      ? "border-brand-emerald bg-emerald-50 text-brand-emeraldDark"
                      : "border-slate-400 bg-slate-100 text-slate-600"
                  }`}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">
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
                ? "border-brand-emerald bg-brand-emerald/15 text-brand-emeraldDark"
                : "border-slate-300 bg-white text-slate-800 hover:border-slate-400"
            }`}
          >
            {supplyDoorOpen ? "Cerrar" : "Abrir"} Materiales
          </button>
          <button
            type="button"
            onClick={() => setWasteDoorOpen((prev) => !prev)}
            className={`rounded-xl border px-3 py-2 font-bold transition-all ${
              wasteDoorOpen
                ? "border-brand-amber bg-brand-amber/15 text-brand-amberDark"
                : "border-slate-300 bg-white text-slate-800 hover:border-slate-400"
            }`}
          >
            {wasteDoorOpen ? "Cerrar" : "Abrir"} Despuntes
          </button>
          <button
            type="button"
            onClick={() => setBrakesLocked((prev) => !prev)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 font-semibold text-slate-800 hover:border-slate-400"
          >
            {brakesLocked ? (
              <Lock className="h-3.5 w-3.5 text-brand-emeraldDark" />
            ) : (
              <Unlock className="h-3.5 w-3.5 text-brand-amberDark" />
            )}
            {brakesLocked ? "Soltar Frenos" : "Trabar Frenos"}
          </button>
          <button
            type="button"
            onClick={() => setHighlightHooks((prev) => !prev)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 font-semibold transition-all ${
              highlightHooks
                ? "border-brand-amber bg-brand-amber/15 text-brand-amberDark"
                : "border-slate-300 bg-white text-slate-800 hover:border-slate-400"
            }`}
          >
            <Anchor className="h-3.5 w-3.5" />
            Puntos de Izaje
          </button>
        </div>
      </div>

      {/* Load Simulator Slider */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-brand-cream p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600">
            <Scale className="h-3.5 w-3.5 text-brand-emeraldDark" />
            Simular Peso de Carga:
          </span>
          <span
            className={`font-mono font-black ${
              isNearMax ? "text-brand-amberDark" : "text-brand-emeraldDark"
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
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
        />
        <p className="mt-1.5 text-[11px] text-slate-500">
          {isNearMax
            ? "Cerca del límite máximo para grúa pluma o montacargas (450 kg)."
            : "Carga estable dentro del rango seguro D.S. 594."}
        </p>
      </div>
    </div>
  );
};
