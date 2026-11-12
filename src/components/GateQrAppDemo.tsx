"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QrCode, Smartphone, ArrowRight, Clock } from "lucide-react";
import { useFaena } from "@/components/FaenaContext";
import { MaterialType } from "@/types/mlsa";

type SupplyMaterial = Exclude<MaterialType, "Residuos Separados">;

const PRESET_GUIDES: { code: string; material: SupplyMaterial; label: string }[] = [
  { code: "GD-4821", material: "Volcanita / Yeso", label: "GD-4821 · Volcanita / Yeso" },
  { code: "GD-4835", material: "Madera / Moldajes", label: "GD-4835 · Madera / Moldajes" },
  { code: "GD-4890", material: "Ferretería / Pernos", label: "GD-4890 · Ferretería / Pernos" },
];

const CREW_OPTIONS = [
  "M. González (Cuadrilla Tabiquería)",
  "E. Fuentes (Estructuras)",
  "C. Morales (Instalaciones)",
  "J. Tapia (Terminaciones)",
];

/** Interactive 3-click Portería QR app that dispatches live material carts into the building simulator. */
export const GateQrAppDemo: React.FC = () => {
  const { state, dispatchFromGate } = useFaena();
  const [guideCode, setGuideCode] = useState(PRESET_GUIDES[0].code);
  const [materialType, setMaterialType] = useState<SupplyMaterial>(PRESET_GUIDES[0].material);
  const [selectedFloor, setSelectedFloor] = useState<number>(2);
  const [supervisor, setSupervisor] = useState(CREW_OPTIONS[0]);
  const [lastDispatch, setLastDispatch] = useState<{
    token: string;
    floor: number;
    material: string;
  } | null>(null);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const token = dispatchFromGate({
      floorNumber: selectedFloor,
      materialType,
      supervisor,
      guideCode: guideCode.trim() || "GD-4800",
    });
    setLastDispatch({ token, floor: selectedFloor, material: materialType });
  };

  return (
    <div
      id="porteria"
      className="rounded-3xl border-2 border-brand-ink bg-gradient-to-br from-white to-brand-cream p-6 sm:p-8 shadow-hard flex flex-col justify-between"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">
            <Smartphone className="h-3.5 w-3.5 text-brand-amberDark" />
            App Portería QR (3 Clics)
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-mono text-brand-amberDark font-semibold">
            <Clock className="h-3.5 w-3.5" />
            Despacho &lt; 85s
          </span>
        </div>

        <h3 className="mt-4 text-xl sm:text-2xl font-black text-brand-ink">
          Simula el Despacho desde Portería
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
          Elige guía, piso destino y cuadrilla. El carro aparece al tiro en el Simulador de Edificio.
        </p>

        <form onSubmit={handleDispatch} className="mt-5 space-y-4">
          {/* Step 1: Guide & Material */}
          <div>
            <span className="block text-[11px] font-mono uppercase text-brand-emeraldDark mb-1.5">
              1. Escanea o elige guía de despacho
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_GUIDES.map((preset) => {
                const selected = guideCode === preset.code && materialType === preset.material;
                return (
                  <button
                    key={preset.code}
                    type="button"
                    onClick={() => {
                      setGuideCode(preset.code);
                      setMaterialType(preset.material);
                    }}
                    className={`rounded-xl border px-2.5 py-2 text-left text-[11px] font-bold transition-all ${
                      selected
                        ? "border-brand-emerald bg-brand-emerald/15 text-brand-emeraldDark"
                        : "border-slate-200 bg-brand-cream text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Target Floor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono uppercase text-brand-emeraldDark">
                2. Elige piso destino (P1–P{state.floors.length})
              </span>
              <span className="text-[10px] text-slate-500">Verde = libre</span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {state.floors
                .slice()
                .sort((a, b) => a.floorNumber - b.floorNumber)
                .map((fl) => {
                  const isSelected = selectedFloor === fl.floorNumber;
                  const isEmpty = fl.moduleState === "EMPTY";
                  return (
                    <button
                      key={fl.floorNumber}
                      type="button"
                      onClick={() => setSelectedFloor(fl.floorNumber)}
                      className={`rounded-lg border py-1.5 text-xs font-mono font-bold transition-all ${
                        isSelected
                          ? "border-brand-emerald bg-brand-emerald text-brand-ink shadow"
                          : isEmpty
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:border-brand-emerald"
                          : "border-slate-200 bg-brand-cream text-slate-500 hover:border-slate-400 hover:text-brand-ink"
                      }`}
                    >
                      P{fl.floorNumber}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Step 3: Crew */}
          <div>
            <label
              htmlFor="gate-crew-select"
              className="block text-[11px] font-mono uppercase text-brand-emeraldDark mb-1.5"
            >
              3. Asigna cuadrilla responsable
            </label>
            <select
              id="gate-crew-select"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-brand-cream px-3 py-2.5 text-xs sm:text-sm text-brand-ink focus:border-brand-emerald focus:outline-none"
            >
              {CREW_OPTIONS.map((crew) => (
                <option key={crew} value={crew}>
                  {crew}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald py-3 text-sm font-bold text-brand-ink shadow-lg shadow-brand-emerald/20 hover:bg-emerald-400 active:scale-95 transition-all"
          >
            <QrCode className="h-4 w-4" />
            Despachar y Generar QR a Piso {selectedFloor}
          </button>
        </form>
      </div>

      {/* Live QR Receipt */}
      {lastDispatch ? (
        <div className="mt-5 rounded-2xl border border-brand-emerald/40 bg-brand-emerald/10 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              {/* QR recién generado con línea de escaneo */}
              <div key={lastDispatch.token} className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border-2 border-brand-ink bg-white">
                <QrCode className="h-full w-full p-0.5 text-brand-ink" />
                <span className="absolute inset-x-0 top-0 h-full border-t-2 border-brand-sky motion-safe:animate-scan" />
              </div>
              <div>
                <p className="text-xs font-black text-brand-ink">
                  ¡Carro enviado al Piso {lastDispatch.floor}!
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {lastDispatch.material} · Token:{" "}
                  <code className="text-brand-emeraldDark font-mono">{lastDispatch.token}</code>
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/simulador"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-emeraldDark hover:underline"
          >
            Ver carro subiendo en el Simulador
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Funciona sin señal en subterráneos</span>
          <span className="font-mono text-brand-amberDark">Listo en 3 clics</span>
        </div>
      )}
    </div>
  );
};
