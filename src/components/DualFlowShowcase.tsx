"use client";

import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, QrCode, Shield, Recycle, Truck, Check, Package, Layers } from "lucide-react";

export const DualFlowShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ALL" | "UP" | "DOWN">("ALL");

  return (
    <section id="flujo-dual" className="py-20 border-t border-brand-border bg-slate-950/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
            Logística Bidireccional Integrada
          </span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            El Concepto de Doble Utilidad: Subida JIT y Bajada RCD
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            El Sistema M-LSA no es un carrito convencional: es un circuito logístico cerrado que aprovecha el viaje vertical del montacargas en ambos sentidos.
          </p>

          {/* Flow Filter Tabs */}
          <div className="mt-8 inline-flex items-center rounded-xl bg-slate-900 p-1.5 border border-slate-800">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "ALL"
                  ? "bg-slate-700 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Circuito Completo 360°
            </button>
            <button
              onClick={() => setActiveTab("UP")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "UP"
                  ? "bg-brand-emerald text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ArrowUpRight className="h-4 w-4" />
              Flujo Ascendente (Insumos)
            </button>
            <button
              onClick={() => setActiveTab("DOWN")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "DOWN"
                  ? "bg-brand-amber text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ArrowDownRight className="h-4 w-4" />
              Flujo Descendente (RCD)
            </button>
          </div>
        </div>

        {/* Dual Grid Comparison */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Flujo Ascendente */}
          {(activeTab === "ALL" || activeTab === "UP") && (
            <div className="relative rounded-3xl border border-brand-emerald/30 bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 px-3 py-1 text-xs font-bold text-brand-emerald">
                  <ArrowUpRight className="h-4 w-4" />
                  FLUJO ASCENDENTE (UP)
                </span>
                <span className="text-xs font-mono text-slate-400">JIT & Acopio Satélite</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Recepción en Portería y Despacho Rápido a Piso
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Los camiones descargan directo en los módulos estancos M-LSA. La cabina asigna destino con código QR en &lt;85 segundos.
              </p>

              {/* Steps list */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emerald">
                    <QrCode className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1. Recepción & Trazabilidad Touchless</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Escaneo rápido en portería. El sistema genera el gemelo digital del bulto con destino exacto (Nivel y Cuadrilla).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emerald">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">2. Izaje Seguro y Traslado Vertical</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Diseñado bajo D.S. 594 con cáncamos certificados para grúa torre o montacargas sin peligro de volcado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emerald">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">3. Estación Satélite Hermética en Piso</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Cero merma por lluvia, polvo o intemperie (&lt;2%). El operario tiene pernos, yeso y moldajes a 10 metros de su zona.
                    </p>
                  </div>
                </div>
              </div>

              {/* Upward Stat box */}
              <div className="mt-6 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/20 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-mono">Tiempo de Búsqueda</span>
                  <p className="text-lg font-black text-brand-emerald">Baja de 60 a &lt;8 min/día</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase font-mono">Merma Material</span>
                  <p className="text-lg font-black text-white">&lt; 2% Protegido</p>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Flujo Descendente */}
          {(activeTab === "ALL" || activeTab === "DOWN") && (
            <div className="relative rounded-3xl border border-brand-amber/30 bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-amber/10 border border-brand-amber/30 px-3 py-1 text-xs font-bold text-brand-amber">
                  <ArrowDownRight className="h-4 w-4" />
                  FLUJO DESCENDENTE (DOWN)
                </span>
                <span className="text-xs font-mono text-slate-400">Logística Inversa & RCD</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Segregación Limpia en Piso y Retorno al Patio
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Una vez desocupados los insumos, el mismo carrito M-LSA se convierte en contenedor de excedentes limpios y mermas valorizables.
              </p>

              {/* Steps list */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amber">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1. Segregación Primaria en Origen</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Clasificación inmediata de maderas, despuntes metálicos y cartones antes de mezclarse con escombros sucios.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amber">
                    <Recycle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">2. Pasillos y Vías de Evacuación Despejadas</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Elimina los acopios informales en pasillos y descansos de escalera, reduciendo accidentes por tropiezos en un 50%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amber">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">3. Trazabilidad Sinader & Manifiesto REP</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Al bajar al patio de acopio general, el pesaje se liga al QR del piso, entregando reportes automáticos para la DIA.
                    </p>
                  </div>
                </div>
              </div>

              {/* Downward Stat box */}
              <div className="mt-6 rounded-2xl bg-brand-amber/10 border border-brand-amber/20 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-mono">Trazabilidad REP</span>
                  <p className="text-lg font-black text-brand-amber">100% Digital Sinader</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase font-mono">Valorización RCD</span>
                  <p className="text-lg font-black text-white">+85% Recuperable</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
