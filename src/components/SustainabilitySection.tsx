"use client";

import React, { useState } from "react";
import { MLSA_SYSTEM_DATA } from "@/data/mlsa-content";
import { Users, Trees, DollarSign, Check, TreePine, Wrench, PackageCheck, Layers, FileText } from "lucide-react";

export const SustainabilitySection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<"ALL" | "SOCIAL" | "AMBIENTAL" | "ECONOMICO">("ALL");

  return (
    <section id="sostenibilidad" className="py-20 bg-slate-950 relative border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
            Sostenibilidad en Faena
          </span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Plan de Triple Impacto & Cumplimiento Ley REP
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            El Sistema M-LSA alinea la rentabilidad financiera de la constructora con estándares internacionales ESG y exigencias normativas chilenas.
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
              Social (SSOMA)
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
              Económico (OpEx)
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
                  <h3 className="text-lg font-black text-white">Ergonomía & Seguridad</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cumplimiento D.S. 594:</strong> Alturas de agarre biomecánicas y rodados de baja resistencia al arrastre.
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
                    <strong>Menos Fatiga Cuadrillas:</strong> Disminución drástica de cargas a mano alzada en tramos horizontales.
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
                  <h3 className="text-lg font-black text-white">Huella Cero & Reciclaje</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>-45% Emisiones CO₂ en Portería:</strong> Descarga rápida que erradica camiones detenidos con motor en marcha.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Valorización Limpia en Origen:</strong> Madera, acero y cartón separados antes de mezclarse con tierra.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Trazabilidad Sinader/RETC:</strong> Manifiesto ambiental digital para informes de sustentabilidad y SMA.
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
                  <h3 className="text-lg font-black text-white">Servitización OpEx</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
                  <span>
                    <strong>$0 Inversión CapEx:</strong> Suscripción mensual de $850.000 CLP deducible 100% como gasto de faena.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
                  <span>
                    <strong>3.7x a 5.2x ROI Neto:</strong> Retorno directo generado por reducción de mermas y aumento de productividad.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                  <Check className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
                  <span>
                    <strong>Mantenimiento Incluido:</strong> Recambio de ruedas o ajustes estructurales sin costo adicional.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Waste Streams Breakdown Bar */}
        <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-brand-emerald uppercase">
                Segregación Clasificada en Módulo M-LSA
              </span>
              <h3 className="text-xl font-bold text-white">
                Flujos de Valorización y Códigos Sinader
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FileText className="h-4 w-4 text-brand-amber" />
              <span>Certificación según Norma Chilena NCh 3562 RCD</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MLSA_SYSTEM_DATA.wasteTypes.map((waste) => {
              return (
                <div
                  key={waste.type}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition-all hover:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-brand-emerald">
                      {waste.type.includes("Madera") && <TreePine className="h-5 w-5" />}
                      {waste.type.includes("Metálicos") && <Wrench className="h-5 w-5" />}
                      {waste.type.includes("Embalajes") && <PackageCheck className="h-5 w-5" />}
                      {waste.type.includes("Yeso") && <Layers className="h-5 w-5" />}
                    </div>
                    <span className="rounded bg-brand-emerald/10 border border-brand-emerald/30 px-2 py-0.5 text-xs font-mono font-bold text-brand-emerald">
                      {waste.recyclingRate} Reciclable
                    </span>
                  </div>

                  <h4 className="mt-3 text-sm font-bold text-white">{waste.type}</h4>
                  <p className="mt-1 text-[11px] text-slate-400 leading-normal">
                    {waste.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Código:</span>
                    <span className="text-brand-amber">{waste.sinaderCode}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
