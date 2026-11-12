"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  QrCode,
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle2,
  Compass,
  XCircle,
  Repeat,
  Building2,
  Calculator,
} from "lucide-react";
import { FLOW_STAGES, MLSA_SYSTEM_DATA, PROBLEM_SOLUTION } from "@/data/mlsa-content";
import { useFaena } from "@/components/FaenaContext";
import { ProcessScene } from "@/components/ProcessScene";
import { CountUp } from "@/components/CountUp";

const KPI_ICONS: Record<string, React.ReactNode> = {
  "search-time": <Clock className="h-5 w-5" />,
  "waste-drop": <ShieldCheck className="h-5 w-5" />,
  "rep-compliance": <QrCode className="h-5 w-5" />,
  "roi-multiple": <TrendingUp className="h-5 w-5" />,
};
const KPI_COLORS = ["bg-brand-emerald", "bg-brand-amber", "bg-brand-yellow", "bg-brand-sky"];

const NEXT_STEPS = [
  { href: "/flujo", icon: Repeat, color: "bg-brand-emerald", title: "1. Mira el circuito", detail: "Las 6 etapas de subida y bajada, paso a paso." },
  { href: "/simulador", icon: Building2, color: "bg-brand-amber", title: "2. Opera la torre", detail: "Mueve carros en un edificio de 12 pisos en vivo." },
  { href: "/calculadora", icon: Calculator, color: "bg-brand-yellow", title: "3. Calcula tu ahorro", detail: "Ajusta pisos y trabajadores y ve el retorno." },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export const HeroSection: React.FC = () => {
  const { state, openTour } = useFaena();
  const activeCarts = state.floors.filter((f) => f.moduleState !== "EMPTY").length;
  const totalRecoveredKg = Object.values(state.wasteTotalsKg).reduce((sum, kg) => sum + kg, 0);

  const [stageIndex, setStageIndex] = useState(0);
  const [mode, setMode] = useState<"sin" | "con">("sin");
  useEffect(() => {
    const timer = window.setInterval(() => setStageIndex((prev) => (prev + 1) % FLOW_STAGES.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  const stage = FLOW_STAGES[stageIndex];
  const isUp = stage.phase === "UP";

  return (
    <>
      {/* 1. Hero: titular + circuito animado */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20">
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-80 w-80 rounded-full bg-brand-emerald/20 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-24 -z-10 h-80 w-80 rounded-full bg-brand-amber/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-brand-ink bg-brand-yellow px-4 py-1.5 text-xs font-bold text-brand-ink sm:text-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-ink animate-pulse" />
              Proyecto 4+1 INACAP Unidad 3 — Obra Sin Escombros
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
              <span className="text-brand-emeraldDark">Sube el material.</span>{" "}
              <span className="text-brand-amberDark">Baja el escombro.</span> En el mismo viaje.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Carros cerrados con código QR que llevan los materiales directo a tus cuadrillas en cada piso y retiran
              los despuntes en el viaje de vuelta. Cero pérdidas por lluvia, cero pasillos tapados.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={openTour}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-ink bg-brand-emerald px-6 py-3.5 text-base font-bold text-brand-ink shadow-hard transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                <Compass className="h-5 w-5" />
                Iniciar Tour Guiado (4 Pasos)
              </button>
              <Link
                href="/simulador"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-ink bg-white px-6 py-3.5 text-base font-bold text-brand-ink transition-all hover:bg-brand-yellow"
              >
                <Play className="h-4 w-4 fill-current" />
                Ver Simulador
              </Link>
              <Link
                href="/calculadora"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-bold text-brand-amberDark hover:underline"
              >
                Calcular Ahorro
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-semibold text-brand-emeraldDark">
                <span className="h-2 w-2 rounded-full bg-brand-emerald animate-pulse" />
                Obra en vivo:
              </span>
              <span>{activeCarts}/12 pisos con carro activo</span>
              <span className="text-slate-400">•</span>
              <span className="font-mono font-semibold text-brand-amberDark">
                {totalRecoveredKg.toLocaleString("es-CL")} kg recuperados
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-600">
              {["$0 en Compra de Equipos (Arriendo Mensual)", "Cumple D.S. 594 y Ley REP N° 20.920", "Piloto en Obra en 48 Horas"].map(
                (text) => (
                  <span key={text} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-emeraldDark" />
                    {text}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-3xl border-2 border-brand-ink bg-white p-4 shadow-hard-green sm:p-5"
          >
            <ProcessScene stageIndex={stageIndex} />
            <div
              className={`mt-4 rounded-xl px-4 py-3 text-brand-ink transition-colors ${
                isUp ? "bg-brand-emerald/15" : "bg-brand-amber/15"
              }`}
            >
              <p className={`text-xs font-black uppercase ${isUp ? "text-brand-emeraldDark" : "text-brand-amberDark"}`}>
                {stage.short} · {isUp ? "Subida" : "Bajada"}
              </p>
              <p className="mt-0.5 min-h-[2.5rem] text-sm font-semibold">{stage.detail}</p>
            </div>
            <div className="mt-3 flex gap-1.5">
              {FLOW_STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={s.short}
                  onClick={() => setStageIndex(idx)}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    idx === stageIndex
                      ? s.phase === "UP"
                        ? "bg-brand-emerald"
                        : "bg-brand-amber"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="hazard-stripe" />

      {/* 2. El problema vs. la solución */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-brand-ink sm:text-4xl">¿Qué cambia en tu obra?</h2>
            <div className="mt-6 inline-flex rounded-2xl border-2 border-brand-ink bg-brand-cream p-1.5">
              {(["sin", "con"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-black transition-colors ${
                    mode === m
                      ? m === "sin"
                        ? "bg-red-600 text-white"
                        : "bg-brand-emerald text-brand-ink"
                      : "text-slate-600 hover:text-brand-ink"
                  }`}
                >
                  {m === "sin" ? "Sin Faena Limpia" : "Con Faena Limpia"}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <motion.div {...reveal}>
              <ProcessScene mode={mode} stageIndex={stageIndex} />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.ul
                key={mode}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {PROBLEM_SOLUTION[mode].map((item) => (
                  <li
                    key={item.title}
                    className={`flex items-start gap-3 rounded-2xl border-2 p-5 ${
                      mode === "sin" ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"
                    }`}
                  >
                    {mode === "sin" ? (
                      <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-emeraldDark" />
                    )}
                    <div>
                      <h3 className="text-lg font-black text-brand-ink">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                    </div>
                  </li>
                ))}
                {mode === "sin" && (
                  <li>
                    <button
                      type="button"
                      onClick={() => setMode("con")}
                      className="inline-flex items-center gap-2 text-sm font-black text-brand-emeraldDark hover:underline"
                    >
                      Ver la misma obra con Faena Limpia
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </li>
                )}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. KPIs */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {MLSA_SYSTEM_DATA.kpis.map((kpi, i) => (
            <motion.div
              key={kpi.id}
              {...reveal}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border-2 border-brand-ink p-6 text-brand-ink shadow-hard transition-transform hover:-translate-y-1 ${KPI_COLORS[i % KPI_COLORS.length]}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black">
                  <CountUp value={kpi.value} />
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/70">{KPI_ICONS[kpi.id]}</div>
              </div>
              <h3 className="mt-3 text-sm font-black uppercase tracking-wider">{kpi.label}</h3>
              <p className="mt-1 text-xs font-bold">{kpi.subvalue}</p>
              <p className="mt-2 text-xs">{kpi.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Cómo seguir */}
      <section className="border-t-2 border-brand-ink bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 {...reveal} className="text-center text-3xl font-black text-brand-ink sm:text-4xl">
            Pruébalo en 3 pasos
          </motion.h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {NEXT_STEPS.map((step, i) => (
              <motion.div key={step.href} {...reveal} transition={{ delay: i * 0.1 }}>
                <Link
                  href={step.href}
                  className="group flex h-full items-start gap-4 rounded-2xl border-2 border-brand-ink bg-brand-cream p-6 transition-all hover:-translate-y-1 hover:shadow-hard"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-brand-ink text-brand-ink ${step.color}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-brand-ink">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-black text-brand-emeraldDark">
                      Abrir
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
