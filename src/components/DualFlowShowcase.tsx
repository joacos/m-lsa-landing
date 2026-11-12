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
  Box,
} from "lucide-react";

const FLOW_STAGES = [
  {
    id: 0,
    phase: "UP" as const,
    short: "1. Portería QR",
    title: "Escaneo rápido en Portería (<85s)",
    detail: "El camión descarga directo al carro cerrado y portería asigna el piso con código QR.",
    position: "bottom" as const,
    badge: "En Portería · Nivel 0",
  },
  {
    id: 1,
    phase: "UP" as const,
    short: "2. Subida Segura",
    title: "Izaje vertical en grúa o montacargas",
    detail: "Sube asegurado con cáncamos D.S. 594 sin riesgo de vuelco ni caída de materiales.",
    position: "middle" as const,
    badge: "Subiendo por Torre",
  },
  {
    id: 2,
    phase: "UP" as const,
    short: "3. Bodega en Piso",
    title: "Material seco al lado de la cuadrilla",
    detail: "Los maestros sacan volcanita, pernos y moldajes directo en el piso sin bajar a bodega.",
    position: "top" as const,
    badge: "En Piso 8 · Insumos",
  },
  {
    id: 3,
    phase: "DOWN" as const,
    short: "4. Carga Despuntes",
    title: "Separación limpia de sobrantes",
    detail: "Al vaciarse los insumos, el mismo carro recibe despuntes de madera, fierro o cartón.",
    position: "top" as const,
    badge: "En Piso 8 · Retiro",
  },
  {
    id: 4,
    phase: "DOWN" as const,
    short: "5. Bajada Ordenada",
    title: "Retorno en el viaje de vuelta",
    detail: "Aprovecha la bajada del montacargas y deja pasillos y escaleras 100% despejadas.",
    position: "middle" as const,
    badge: "Bajando al Patio",
  },
  {
    id: 5,
    phase: "DOWN" as const,
    short: "6. Pesaje Patio",
    title: "Registro Sinader y Ley REP",
    detail: "En patio de acopio se pesan los kilos separados con respaldo digital ligado al QR del piso.",
    position: "bottom" as const,
    badge: "En Patio · Pesaje",
  },
];

const CART_Y_BY_POSITION = {
  top: 0,
  middle: 88,
  bottom: 176,
};

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
    <section id="flujo-dual" className="py-16 border-t border-brand-border bg-slate-950/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
            Ida y Vuelta en Montacargas
          </span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Doble Uso en Cada Viaje: Sube Material y Baja Escombro
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Faena Limpia no es una carretilla común: es un circuito cerrado que aprovecha cada viaje de la grúa o montacargas en ambos sentidos.
          </p>
        </div>

        {/* Interactive 6-Stage Animated Circuit */}
        <div className="mt-10 rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-brand-emerald">
                Recorrido Interactivo Paso a Paso
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
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
                className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-emerald px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
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
                className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vertical Shaft Animation */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
              <div className="relative h-[264px] flex flex-col justify-between">
                {/* Top Level: Floor */}
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5">
                  <span className="text-xs font-bold text-white">Piso 8 — Cuadrilla</span>
                  <span className="text-[11px] font-mono text-slate-400">Obra Activa</span>
                </div>

                {/* Vertical Track */}
                <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-slate-800" />

                {/* Middle Marker */}
                <div className="flex items-center justify-end pr-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    Grúa / Montacargas
                  </span>
                </div>

                {/* Bottom Level: Gate / Patio */}
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5">
                  <span className="text-xs font-bold text-white">Nivel 0 — Portería y Patio</span>
                  <span className="text-[11px] font-mono text-slate-400">Control QR / Sinader</span>
                </div>

                {/* Animated Cart */}
                <motion.div
                  animate={{ y: CART_Y_BY_POSITION[currentStage.position] }}
                  transition={{ type: "spring", stiffness: 130, damping: 18 }}
                  className={`absolute left-3 top-4 flex items-center gap-3 rounded-xl border px-3.5 py-2.5 shadow-lg ${
                    isUpPhase
                      ? "border-brand-emerald bg-emerald-950/95 text-brand-emerald shadow-brand-emerald/20"
                      : "border-brand-amber bg-amber-950/95 text-brand-amber shadow-brand-amber/20"
                  }`}
                >
                  <Box className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-white">{currentStage.badge}</p>
                    <p className="text-[11px] font-mono">
                      {isUpPhase ? "▲ Subiendo Materiales" : "▼ Bajando Despuntes"}
                    </p>
                  </div>
                </motion.div>
              </div>
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
                    isUpPhase ? "text-brand-emerald" : "text-brand-amber"
                  }`}
                >
                  {isUpPhase ? "Viaje de Subida (Insumos)" : "Viaje de Retorno (Residuos)"}
                </span>
                <h4 className="mt-1 text-xl font-black text-white">{currentStage.title}</h4>
                <p className="mt-2 text-sm text-slate-200">{currentStage.detail}</p>
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
                            ? "border-brand-emerald bg-brand-emerald text-slate-950 shadow-md"
                            : "border-brand-amber bg-brand-amber text-slate-950 shadow-md"
                          : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-600 hover:text-white"
                      }`}
                    >
                      {stage.short}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs text-slate-400">
                  ¿Listo para probar este circuito con carros reales?
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/sistema#porteria"
                    className="rounded-lg bg-brand-emerald px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                  >
                    Probar Portería QR →
                  </Link>
                  <Link
                    href="/simulador"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                  >
                    Ir al Edificio 12P
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Filter Tabs */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center rounded-xl bg-slate-900 p-1.5 border border-slate-800">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "ALL"
                  ? "bg-slate-700 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Circuito Completo
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
              Subida (Materiales)
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
              Bajada (Escombros)
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
                  SUBIDA A PISOS
                </span>
                <span className="text-xs font-mono text-slate-400">Bodega Directa en Piso</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Recepción en Portería y Subida Directa a Piso
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Los camiones descargan directo en los carros cerrados Faena Limpia. Portería asigna el piso con código QR en menos de 85 segundos.
              </p>

              {/* Steps list */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emerald">
                    <QrCode className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1. Recepción Rápida sin Papeles</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Escaneo al instante en portería. Queda registrado el bulto con su destino exacto (Piso y Cuadrilla).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emerald">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">2. Izaje Seguro en Grúa o Montacargas</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Diseñado bajo D.S. 594 con cáncamos certificados para grúa pluma o montacargas sin riesgo de volcamiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/20 text-brand-emerald">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">3. Mini Bodega Cerrada en Cada Piso</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Cero pérdidas por lluvia, polvo o robos (&lt;2%). Los maestros tienen pernos, volcanita y moldajes al lado del trabajo.
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
                  <span className="text-xs text-slate-400 uppercase font-mono">Pérdida Material</span>
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
                  BAJADA DE RETORNO
                </span>
                <span className="text-xs font-mono text-slate-400">Retiro Ordenado de Obra</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Separación Limpia en Piso y Retiro al Patio
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Al desocupar los materiales, el mismo carro Faena Limpia recibe los despuntes limpios y sobrantes reciclables.
              </p>

              {/* Steps list */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amber">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1. Separación Directa en el Piso</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Clasificación inmediata de madera, despuntes metálicos y cartón antes de mezclarse con escombro sucio.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amber">
                    <Recycle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">2. Pasillos y Escaleras Despejadas</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Elimina los acopios informales en pasillos y descansos de escalera, reduciendo caídas y tropiezos en un 50%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/20 text-brand-amber">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">3. Trazabilidad Sinader y Ley REP</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Al bajar al patio de acopio, el pesaje queda ligado al QR del piso, entregando reportes listos para la DIA.
                    </p>
                  </div>
                </div>
              </div>

              {/* Downward Stat box */}
              <div className="mt-6 rounded-2xl bg-brand-amber/10 border border-brand-amber/20 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-mono">Respaldo Ley REP</span>
                  <p className="text-lg font-black text-brand-amber">100% Digital Sinader</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase font-mono">Material Recuperable</span>
                  <p className="text-lg font-black text-white">+85% Reciclable</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
