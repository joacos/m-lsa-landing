"use client";

import React, { useState } from "react";
import { MLSA_SYSTEM_DATA } from "@/data/mlsa-content";
import { useFaena } from "@/components/FaenaContext";
import { WasteType } from "@/types/mlsa";
import {
  Users,
  Trees,
  DollarSign,
  Check,
  TreePine,
  Wrench,
  PackageCheck,
  Layers,
  FileText,
  Printer,
} from "lucide-react";

const WASTE_ICON_BY_KEY: Record<WasteType, React.ComponentType<{ className?: string }>> = {
  "Despuntes de Madera": TreePine,
  "Despuntes Metálicos": Wrench,
  "Cartón / Film Embalaje": PackageCheck,
  "Escombro Limpio": Layers,
};

export const SustainabilitySection: React.FC = () => {
  const { state, markImpactChecked } = useFaena();
  const [activePillar, setActivePillar] = useState<"ALL" | "SOCIAL" | "AMBIENTAL" | "ECONOMICO">("ALL");

  const totalRecoveredKg = Object.values(state.wasteTotalsKg).reduce((sum, kg) => sum + kg, 0);
  const co2SavedKg = Math.round(totalRecoveredKg * 0.42);
  const recentWasteEvents = state.events.filter((e) => e.kind === "WASTE").slice(0, 4);

  const handlePrint = () => {
    markImpactChecked();
    window.print();
  };

  return (
    <section
      id="sostenibilidad"
      className="py-16 bg-slate-950 relative border-t border-brand-border print:bg-white print:text-slate-900 print:border-0 print:py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
            Sustentabilidad en Faena
          </span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Triple Impacto y Cumplimiento Ley REP
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Faena Limpia alinea el ahorro de la constructora con metas de sustentabilidad y las exigencias legales en Chile.
          </p>

          {/* Pillar Filter Tabs */}
          <div className="mt-8 inline-flex items-center rounded-xl bg-slate-900 p-1.5 border border-slate-800">
            <button
              onClick={() => setActivePillar("ALL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activePillar === "ALL"
                  ? "bg-slate-700 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Los 3 Pilares
            </button>
            <button
              onClick={() => setActivePillar("SOCIAL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activePillar === "SOCIAL"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Seguridad (Prevención)
            </button>
            <button
              onClick={() => setActivePillar("AMBIENTAL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activePillar === "AMBIENTAL"
                  ? "bg-brand-emerald text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Ambiental (Ley REP)
            </button>
            <button
              onClick={() => setActivePillar("ECONOMICO")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activePillar === "ECONOMICO"
                  ? "bg-brand-amber text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Económico (Arriendo)
            </button>
          </div>
        </div>

        {/* 3 Pillars Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Social */}
          {(activePillar === "ALL" || activePillar === "SOCIAL") && (
            <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-slate-900 to-brand-navy p-7 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400 font-bold">Pilar Social</span>
                  <h3 className="text-lg font-black text-white">Seguridad y Ergonomía</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cumple D.S. 594:</strong> Manillas a altura cómoda y ruedas livianas de fácil empuje.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>-50% Accidentes por Caídas:</strong> Pasillos y escaleras 100% libres de escombros y cajas acumuladas.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Menos Fatiga en Cuadrillas:</strong> Baja drástica de carga manual al hombro por los pisos.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 2: Ambiental */}
          {(activePillar === "ALL" || activePillar === "AMBIENTAL") && (
            <div className="rounded-3xl border border-brand-emerald/40 bg-gradient-to-b from-slate-900 to-brand-navy p-7 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-emerald/20 text-brand-emerald">
                  <Trees className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-brand-emerald font-bold">Pilar Ambiental</span>
                  <h3 className="text-lg font-black text-white">Huella Cero y Reciclaje</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>-45% Emisiones CO₂ en Portería:</strong> Descarga rápida que evita camiones esperando con motor andando.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Separación Limpia en Piso:</strong> Madera, fierro y cartón apartados antes de mezclarse con tierra.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Trazabilidad Sinader/RETC:</strong> Respaldo digital listo para reportes ambientales y fiscalizaciones SMA.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 3: Económico */}
          {(activePillar === "ALL" || activePillar === "ECONOMICO") && (
            <div className="rounded-3xl border border-brand-amber/40 bg-gradient-to-b from-slate-900 to-brand-navy p-7 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-amber/20 text-brand-amber">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-brand-amber font-bold">Pilar Económico</span>
                  <h3 className="text-lg font-black text-white">Modelo en Arriendo</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
                  <span>
                    <strong>$0 en Compra de Equipos:</strong> Arriendo mensual de $850.000 CLP deducible 100% como gasto de obra.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
                  <span>
                    <strong>3.7x a 5.2x Retorno Neto:</strong> Ahorro directo por menos mermas y mayor rendimiento de cuadrillas.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
                  <span>
                    <strong>Mantención Incluida:</strong> Cambio de ruedas y arreglos estructurales sin costo extra.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Waste Streams Breakdown Bar */}
        <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 print:bg-white print:border-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
            <div>
              <span className="text-xs font-mono text-brand-emerald uppercase print:text-emerald-700">
                Trazabilidad Viva Conectada al Simulador
              </span>
              <h3 className="text-xl font-bold text-white print:text-slate-900">
                Residuos Recuperados y Códigos Sinader
              </h3>
              <p className="mt-1 text-xs text-slate-400 print:text-slate-600">
                Total desviado en obra:{" "}
                <strong className="text-white font-mono print:text-slate-900">
                  {totalRecoveredKg.toLocaleString("es-CL")} kg
                </strong>{" "}
                · ~{co2SavedKg.toLocaleString("es-CL")} kg CO₂ evitado
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 print:text-slate-700">
                <FileText className="h-4 w-4 text-brand-amber" />
                <span>Norma Chilena NCh 3562</span>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:border-brand-emerald hover:text-brand-emerald print:hidden"
              >
                <Printer className="h-3.5 w-3.5" />
                Imprimir Reporte
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MLSA_SYSTEM_DATA.wasteTypes.map((waste) => {
              const Icon = WASTE_ICON_BY_KEY[waste.wasteKey];
              const categoryKg = state.wasteTotalsKg[waste.wasteKey] || 0;
              return (
                <div
                  key={waste.type}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition-all hover:border-slate-700 print:bg-slate-50 print:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-brand-emerald print:bg-emerald-100 print:text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded bg-brand-emerald/10 border border-brand-emerald/30 px-2 py-0.5 text-xs font-mono font-bold text-brand-emerald print:text-emerald-700">
                      {waste.recyclingRate} Reciclable
                    </span>
                  </div>

                  <h4 className="mt-3 text-sm font-bold text-white print:text-slate-900">
                    {waste.type}
                  </h4>
                  <p className="mt-1 text-lg font-black font-mono text-brand-amber print:text-amber-700">
                    {categoryKg.toLocaleString("es-CL")} kg
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400 leading-normal print:text-slate-600">
                    {waste.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400 print:border-slate-300 print:text-slate-700">
                    <span>Código Sinader:</span>
                    <span className="text-brand-amber print:text-amber-700">{waste.sinaderCode}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {recentWasteEvents.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-800 print:border-slate-300">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 print:text-slate-800">
                Últimos Retiros Registrados desde Pisos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recentWasteEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs flex items-center justify-between gap-2 print:bg-slate-50 print:border-slate-300"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate print:text-slate-900">
                        {evt.action}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate print:text-slate-600">
                        {evt.detail}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {evt.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
