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
      className="py-16 bg-brand-cream relative border-t-2 border-brand-ink print:bg-white print:text-slate-900 print:border-0 print:py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full border-2 border-brand-ink bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-ink">
            Sustentabilidad en Faena
          </span>
          <h2 className="mt-2 text-3xl font-black text-brand-ink sm:text-4xl">
            Triple Impacto y Cumplimiento Ley REP
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Faena Limpia alinea el ahorro de la constructora con metas de sustentabilidad y las exigencias legales en Chile.
          </p>

          {/* Pillar Filter Tabs */}
          <div className="mt-8 inline-flex items-center rounded-xl bg-white p-1.5 border border-slate-200">
            <button
              onClick={() => setActivePillar("ALL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activePillar === "ALL"
                  ? "bg-slate-200 text-brand-ink shadow"
                  : "text-slate-500 hover:text-brand-ink"
              }`}
            >
              Los 3 Pilares
            </button>
            <button
              onClick={() => setActivePillar("SOCIAL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activePillar === "SOCIAL"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-500 hover:text-brand-ink"
              }`}
            >
              Seguridad (Prevención)
            </button>
            <button
              onClick={() => setActivePillar("AMBIENTAL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activePillar === "AMBIENTAL"
                  ? "bg-brand-emerald text-brand-ink shadow"
                  : "text-slate-500 hover:text-brand-ink"
              }`}
            >
              Ambiental (Ley REP)
            </button>
            <button
              onClick={() => setActivePillar("ECONOMICO")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activePillar === "ECONOMICO"
                  ? "bg-brand-amber text-brand-ink shadow"
                  : "text-slate-500 hover:text-brand-ink"
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
            <div className="rounded-3xl border-2 border-brand-sky bg-gradient-to-b from-white to-brand-navy p-7 shadow-hard">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-sky-700">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-sky-700 font-bold">Pilar Social</span>
                  <h3 className="text-lg font-black text-brand-ink">Seguridad y Ergonomía</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cumple D.S. 594:</strong> Manillas a altura cómoda y ruedas livianas de fácil empuje.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>-50% Accidentes por Caídas:</strong> Pasillos y escaleras 100% libres de escombros y cajas acumuladas.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Menos Fatiga en Cuadrillas:</strong> Baja drástica de carga manual al hombro por los pisos.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 2: Ambiental */}
          {(activePillar === "ALL" || activePillar === "AMBIENTAL") && (
            <div className="rounded-3xl border-2 border-brand-emerald bg-gradient-to-b from-white to-brand-navy p-7 shadow-hard-green">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-emerald/20 text-brand-emeraldDark">
                  <Trees className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-brand-emeraldDark font-bold">Pilar Ambiental</span>
                  <h3 className="text-lg font-black text-brand-ink">Huella Cero y Reciclaje</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-brand-emeraldDark shrink-0 mt-0.5" />
                  <span>
                    <strong>-45% Emisiones CO₂ en Portería:</strong> Descarga rápida que evita camiones esperando con motor andando.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-brand-emeraldDark shrink-0 mt-0.5" />
                  <span>
                    <strong>Separación Limpia en Piso:</strong> Madera, fierro y cartón apartados antes de mezclarse con tierra.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-brand-emeraldDark shrink-0 mt-0.5" />
                  <span>
                    <strong>Trazabilidad Sinader/RETC:</strong> Respaldo digital listo para reportes ambientales y fiscalizaciones SMA.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 3: Económico */}
          {(activePillar === "ALL" || activePillar === "ECONOMICO") && (
            <div className="rounded-3xl border-2 border-brand-amber bg-gradient-to-b from-white to-brand-navy p-7 shadow-hard-orange">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-amber/20 text-brand-amberDark">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-brand-amberDark font-bold">Pilar Económico</span>
                  <h3 className="text-lg font-black text-brand-ink">Modelo en Arriendo</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-brand-amberDark shrink-0 mt-0.5" />
                  <span>
                    <strong>$0 en Compra de Equipos:</strong> Arriendo mensual de $850.000 CLP deducible 100% como gasto de obra.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-brand-amberDark shrink-0 mt-0.5" />
                  <span>
                    <strong>3.7x a 5.2x Retorno Neto:</strong> Ahorro directo por menos mermas y mayor rendimiento de cuadrillas.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-brand-cream p-3 border border-slate-200">
                  <Check className="h-4 w-4 text-brand-amberDark shrink-0 mt-0.5" />
                  <span>
                    <strong>Mantención Incluida:</strong> Cambio de ruedas y arreglos estructurales sin costo extra.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Waste Streams Breakdown Bar */}
        <div className="mt-14 rounded-3xl border-2 border-brand-ink bg-white p-6 sm:p-8 print:bg-white print:border-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 print:border-slate-300">
            <div>
              <span className="text-xs font-mono text-brand-emeraldDark uppercase print:text-emerald-700">
                Trazabilidad Viva Conectada al Simulador
              </span>
              <h3 className="text-xl font-bold text-brand-ink print:text-slate-900">
                Residuos Recuperados y Códigos Sinader
              </h3>
              <p className="mt-1 text-xs text-slate-500 print:text-slate-600">
                Total desviado en obra:{" "}
                <strong className="text-brand-ink font-mono print:text-slate-900">
                  {totalRecoveredKg.toLocaleString("es-CL")} kg
                </strong>{" "}
                · ~{co2SavedKg.toLocaleString("es-CL")} kg CO₂ evitado
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 print:text-slate-700">
                <FileText className="h-4 w-4 text-brand-amberDark" />
                <span>Norma Chilena NCh 3562</span>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-bold text-brand-ink hover:border-brand-emerald hover:text-brand-emeraldDark print:hidden"
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
                  className="rounded-2xl border border-slate-200 bg-brand-cream p-4 transition-all hover:border-slate-300 print:bg-slate-50 print:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-brand-emeraldDark print:bg-emerald-100 print:text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded bg-brand-emerald/10 border border-brand-emerald/30 px-2 py-0.5 text-xs font-mono font-bold text-brand-emeraldDark print:text-emerald-700">
                      {waste.recyclingRate} Reciclable
                    </span>
                  </div>

                  <h4 className="mt-3 text-sm font-bold text-brand-ink print:text-slate-900">
                    {waste.type}
                  </h4>
                  <p className="mt-1 text-lg font-black font-mono text-brand-amberDark print:text-amber-700">
                    {categoryKg.toLocaleString("es-CL")} kg
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 leading-normal print:text-slate-600">
                    {waste.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500 print:border-slate-300 print:text-slate-700">
                    <span>Código Sinader:</span>
                    <span className="text-brand-amberDark print:text-amber-700">{waste.sinaderCode}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {recentWasteEvents.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200 print:border-slate-300">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 print:text-slate-800">
                Últimos Retiros Registrados desde Pisos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recentWasteEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-xl border border-slate-200 bg-brand-cream px-3 py-2 text-xs flex items-center justify-between gap-2 print:bg-slate-50 print:border-slate-300"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-brand-ink truncate print:text-slate-900">
                        {evt.action}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate print:text-slate-600">
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
