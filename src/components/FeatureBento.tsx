"use client";

import React from "react";
import { Shield, Smartphone, Layers, FileCheck, CheckCircle2, Cpu, Wrench, BarChart3 } from "lucide-react";

export const FeatureBento: React.FC = () => {
  return (
    <section id="caracteristicas" className="py-20 border-t border-brand-border bg-slate-950/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
            Hardware Robusto + Software Cloud
          </span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            El Sistema M-LSA: Diseñado para Faenas Reales
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Combinamos ingeniería mecánica de alta resistencia con trazabilidad digital ágil para transformar el orden operativo de la obra.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: Hardware Módulo Metálico (Span 7) */}
          <div className="lg:col-span-7 rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 to-brand-navy p-8 shadow-xl flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  <Wrench className="h-3.5 w-3.5 text-brand-emerald" />
                  Hardware Grado Obra
                </span>
                <span className="text-xs font-mono text-brand-emerald font-semibold">D.S. 594 Ready</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Módulo Metálico M-LSA de Acero Galvanizado
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Estructura reforzada antivuelco con ruedas de poliuretano industrial de alto tráfico, cáncamos certificados para izaje con grúa pluma o montacargas, y doble compuerta hermética que aísla el material de la intemperie.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Doble compartimento: Insumos / Residuos</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Ruedas con freno de seguridad industrial</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Cáncamos de izaje certificados D.S. 594</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Apilable en patio de maniobras</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Capacidad de carga: 450 kg por módulo</span>
              <span className="font-mono text-brand-emerald">Cero merma climática</span>
            </div>
          </div>

          {/* Card 2: Software QR en Portería (Span 5) */}
          <div className="lg:col-span-5 rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  <Smartphone className="h-3.5 w-3.5 text-brand-amber" />
                  Software Web & Móvil
                </span>
                <span className="text-xs font-mono text-brand-amber font-semibold">&lt; 85s Despacho</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Trazabilidad QR Touchless en Portería
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Lectura instantánea de guías de despacho y asignación digital al nivel de destino. Los jefes de terreno reciben notificaciones en tiempo real sin requerir llamadas ni planillas de papel.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-amber shrink-0" />
                  <span>Sin instalación compleja: App PWA móvil</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-amber shrink-0" />
                  <span>Asignación de cuadrilla y piso en 3 taps</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-amber shrink-0" />
                  <span>Historial de movimientos auditable</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Sincronización Offline en subterráneos</span>
              <span className="font-mono text-brand-amber">PWA Responsive</span>
            </div>
          </div>

          {/* Card 3: Segregación Primaria RCD (Span 5) */}
          <div className="lg:col-span-5 rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  <Layers className="h-3.5 w-3.5 text-brand-emerald" />
                  Economía Circular
                </span>
                <span className="text-xs font-mono text-brand-emerald font-semibold">Cero Acopios Libres</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Segregación Primaria RCD por Nivel
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                El mismo carrito recolecta madera, despuntes y film de embalaje en su retorno. Evita los microbasurales en pasillos de evacuación y mantiene la faena impecable según normas SSOMA.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Despeje total de vías de evacuación (-50% caídas)</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Clasificación limpia en origen antes de contaminarse</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Desvío de vertedero garantizado</span>
              <span className="font-mono text-brand-emerald">+85% Reutilizable</span>
            </div>
          </div>

          {/* Card 4: Reportabilidad Ley REP / Sinader (Span 7) */}
          <div className="lg:col-span-7 rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 to-brand-navy p-8 shadow-xl flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Compliance Normativo
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Ley N° 20.920 & Sinader</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Reportabilidad Automática para Auditorías DIA y RETC
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Genera manifiestos digitales certificados en un clic. Cumple con la Ley REP para envases y embalajes, exporta planillas estandarizadas para el Sinader y simplifica las declaraciones ante la SMA y municipalidades.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Certificados de pesaje y destino trazables</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Cálculo directo de huella de carbono ahorrada</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Reportes en PDF/Excel para jefatura técnica</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Protección ante multas y paralizaciones</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Auditorías ambientales sin fricción</span>
              <span className="font-mono text-emerald-400">100% Manifiesto Digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
