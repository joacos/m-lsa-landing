"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  QrCode,
  Shield,
  Recycle,
  Truck,
  Package,
  Layers,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FLOW_STAGES } from "@/data/mlsa-content";
import { ProcessScene } from "@/components/ProcessScene";

export const DualFlowShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ALL" | "UP" | "DOWN">("ALL");
  const [stageIndex, setStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setStageIndex((prev) => (prev + 1) % FLOW_STAGES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const currentStage = FLOW_STAGES[stageIndex];
  const isUpPhase = currentStage.phase === "UP";

  return (
    <section id="flujo-dual" className="py-16 bg-brand-cream relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full border-2 border-brand-ink bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-ink">
            Ida y Vuelta en Montacargas
          </span>
          <h2 className="mt-2 text-3xl font-black text-brand-ink sm:text-4xl">
            Doble Uso en Cada Viaje: Sube Material y Baja Escombro
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Faena Limpia no es una carretilla común: es un circuito cerrado que aprovecha cada viaje de la grúa o montacargas en ambos sentidos.
          </p>
        </div>

        {/* Interactive 6-Stage Animated Circuit */}
        <div className="mt-10 rounded-3xl border-2 border-brand-ink bg-gradient-to-br from-white via-brand-navy to-brand-cream p-6 sm:p-8 shadow-hard">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-brand-emeraldDark">
                Recorrido Interactivo Paso a Paso
              </span>
              <h3 className="text-lg sm:text-xl font-black text-brand-ink">
                Mira cómo funciona un ciclo completo en obra
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setStageIndex((prev) => (prev - 1 + FLOW_STAGES.length) % FLOW_STAGES.length);
                }}
                aria-label="Etapa anterior"
                className="rounded-lg border border-slate-300 bg-slate-100 p-2 text-slate-800 hover:bg-slate-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-emerald px-3.5 py-2 text-xs font-bold text-brand-ink hover:bg-emerald-400"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isPlaying ? "Pausar" : "Animar"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setStageIndex((prev) => (prev + 1) % FLOW_STAGES.length);
                }}
                aria-label="Etapa siguiente"
                className="rounded-lg border border-slate-300 bg-slate-100 p-2 text-slate-800 hover:bg-slate-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Escena animada del circuito + progreso de la etapa */}
            <div className="lg:col-span-5">
              <ProcessScene stageIndex={stageIndex} />
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  key={`${stageIndex}-${isPlaying}`}
                  className={`h-full ${isUpPhase ? "bg-brand-emerald" : "bg-brand-amber"}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: 2.6, ease: "linear" }}
                />
              </div>
              <p className="mt-2 text-center text-xs font-bold text-slate-600">{currentStage.badge}</p>
            </div>


            {/* Stage Controls & Active Explanation */}
            <div className="lg:col-span-7 space-y-5">
              <div
                className={`rounded-2xl border p-5 transition-colors ${
                  isUpPhase
                    ? "border-brand-emerald/40 bg-brand-emerald/10"
                    : "border-brand-amber/40 bg-brand-amber/10"
                }`}
              >
                <span
                  className={`text-xs font-mono font-bold uppercase ${
                    isUpPhase ? "text-brand-emeraldDark" : "text-brand-amberDark"
                  }`}
                >
                  {isUpPhase ? "Viaje de Subida (Insumos)" : "Viaje de Retorno (Residuos)"}
                </span>
                <h4 className="mt-1 text-xl font-black text-brand-ink">{currentStage.title}</h4>
                <p className="mt-2 text-sm text-slate-800">{currentStage.detail}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FLOW_STAGES.map((stage, idx) => {
                  const active = idx === stageIndex;
                  const stageIsUp = stage.phase === "UP";
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        setIsPlaying(false);
                        setStageIndex(idx);
                      }}
                      className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-all ${
                        active
                          ? stageIsUp
                            ? "border-brand-emerald bg-brand-emerald text-brand-ink shadow-md"
                            : "border-brand-amber bg-brand-amber text-brand-ink shadow-md"
                          : "border-slate-200 bg-brand-cream text-slate-600 hover:border-slate-400 hover:text-brand-ink"
                      }`}
                    >
                      {stage.short}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs text-slate-500">
                  ¿Listo para probar este circuito con carros reales?
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/sistema#porteria"
                    className="rounded-lg bg-brand-emerald px-3.5 py-2 text-xs font-bold text-brand-ink hover:bg-emerald-400"
                  >
                    Probar Portería QR →
                  </Link>
                  <Link
                    href="/simulador"
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3.5 py-2 text-xs font-semibold text-brand-ink hover:bg-slate-200"
                  >
                    Ir al Simulador
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Filter Tabs */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center rounded-xl bg-white p-1.5 border border-slate-200">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "ALL"
                  ? "bg-slate-200 text-brand-ink shadow"
                  : "text-slate-500 hover:text-brand-ink"
              }`}
            >
              Circuito Completo
            </button>
            <button
              onClick={() => setActiveTab("UP")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "UP"
                  ? "bg-brand-emerald text-brand-ink shadow"
                  : "text-slate-500 hover:text-brand-ink"
              }`}
            >
              <ArrowUpRight className="h-4 w-4" />
              Subida (Materiales)
            </button>
            <button
              onClick={() => setActiveTab("DOWN")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "DOWN"
                  ? "bg-brand-amber text-brand-ink shadow"
                  : "text-slate-500 hover:text-brand-ink"
              }`}
            >
              <ArrowDownRight className="h-4 w-4" />
              Bajada (Escombros)
            </button>
          </div>
        </div>

        {/* Dual Grid Comparison */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Flujo Ascendente */}
          {(activeTab === "ALL" || activeTab === "UP") && (
            <div className="relative rounded-3xl border-2 border-brand-emerald bg-gradient-to-br from-brand-navy via-white to-brand-cream p-8 shadow-hard-green">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 px-3 py-1 text-xs font-bold text-brand-emeraldDark">
                  <ArrowUpRight className="h-4 w-4" />
                  SUBIDA A PISOS
                </span>
                <span className="text-xs font-mono text-slate-500">Bodega Directa en Piso</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-brand-ink">
                Recepción en Portería y Subida Directa a Piso
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Los camiones descargan directo en los carros cerrados Faena Limpia. Portería asigna el piso con código QR en menos de 85 segundos.
              </p>

              {/* Steps list */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emeraldDark">
                    <QrCode className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-ink">1. Recepción Rápida sin Papeles</h4>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Escaneo al instante en portería. Queda registrado el bulto con su destino exacto (Piso y Cuadrilla).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emeraldDark">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-ink">2. Izaje Seguro en Grúa o Montacargas</h4>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Diseñado bajo D.S. 594 con cáncamos certificados para grúa pluma o montacargas sin riesgo de volcamiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emeraldDark">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-ink">3. Mini Bodega Cerrada en Cada Piso</h4>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Cero pérdidas por lluvia, polvo o robos (&lt;2%). Los maestros tienen pernos, volcanita y moldajes al lado del trabajo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Upward Stat box */}
              <div className="mt-6 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/20 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono">Tiempo de Búsqueda</span>
                  <p className="text-lg font-black text-brand-emeraldDark">Baja de 60 a &lt;8 min/día</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase font-mono">Pérdida Material</span>
                  <p className="text-lg font-black text-brand-ink">&lt; 2% Protegido</p>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Flujo Descendente */}
          {(activeTab === "ALL" || activeTab === "DOWN") && (
            <div className="relative rounded-3xl border-2 border-brand-amber bg-gradient-to-br from-brand-navy via-white to-brand-cream p-8 shadow-hard-orange">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-amber/10 border border-brand-amber/30 px-3 py-1 text-xs font-bold text-brand-amberDark">
                  <ArrowDownRight className="h-4 w-4" />
                  BAJADA DE RETORNO
                </span>
                <span className="text-xs font-mono text-slate-500">Retiro Ordenado de Obra</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-brand-ink">
                Separación Limpia en Piso y Retiro al Patio
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Al desocupar los materiales, el mismo carro Faena Limpia recibe los despuntes limpios y sobrantes reciclables.
              </p>

              {/* Steps list */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amberDark">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-ink">1. Separación Directa en el Piso</h4>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Clasificación inmediata de madera, despuntes metálicos y cartón antes de mezclarse con escombro sucio.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amberDark">
                    <Recycle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-ink">2. Pasillos y Escaleras Despejadas</h4>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Elimina los acopios informales en pasillos y descansos de escalera, reduciendo caídas y tropiezos en un 50%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amberDark">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-ink">3. Trazabilidad Sinader y Ley REP</h4>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Al bajar al patio de acopio, el pesaje queda ligado al QR del piso, entregando reportes listos para la DIA.
                    </p>
                  </div>
                </div>
              </div>

              {/* Downward Stat box */}
              <div className="mt-6 rounded-2xl bg-brand-amber/10 border border-brand-amber/20 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono">Respaldo Ley REP</span>
                  <p className="text-lg font-black text-brand-amberDark">100% Digital Sinader</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase font-mono">Material Recuperable</span>
                  <p className="text-lg font-black text-brand-ink">+85% Reciclable</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
