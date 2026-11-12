"use client";

import React from "react";
import Link from "next/link";
import { Clock, ShieldCheck, QrCode, TrendingUp, ArrowRight, Play, CheckCircle2, Compass } from "lucide-react";
import { MLSA_SYSTEM_DATA } from "@/data/mlsa-content";
import { useFaena } from "@/components/FaenaContext";

export const HeroSection: React.FC = () => {
  const { state, openTour } = useFaena();
  const activeCarts = state.floors.filter((f) => f.moduleState !== "EMPTY").length;
  const totalRecoveredKg = Object.values(state.wasteTotalsKg).reduce((sum, kg) => sum + kg, 0);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-emerald/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[400px] w-[500px] rounded-full bg-brand-amber/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-emerald shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-brand-emerald animate-pulse" />
            <span>Proyecto 4+1 INACAP Unidad 3 — Obra Sin Escombros</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl sm:leading-tight">
            Ordena el Abastecimiento en CADA PISO y{" "}
            <span className="bg-gradient-to-r from-brand-emerald via-teal-300 to-brand-amber bg-clip-text text-transparent">
              Elimina los Escombros en Obra
            </span>{" "}
            con Módulos Reutilizables
          </h1>
          <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            El primer sistema de carros cerrados con código QR que lleva materiales directo a tus cuadrillas y retira los despuntes en el viaje de vuelta. Cero pérdidas por lluvia, cero pasillos tapados.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={openTour}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-7 py-3.5 text-base font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-brand-emerald/25 active:scale-95"
            >
              <Compass className="h-5 w-5" />
              Iniciar Tour Guiado (4 Pasos)
            </button>
            <Link
              href="/simulador"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3.5 text-base font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800"
            >
              <Play className="h-4 w-4 fill-slate-200" />
              Ver Simulador del Edificio
            </Link>
            <Link
              href="/calculadora"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-emerald/30 bg-brand-emerald/10 px-6 py-3.5 text-base font-semibold text-brand-emerald transition-all hover:bg-brand-emerald/20"
            >
              Calcular Ahorro
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Live connected site indicator */}
          <div className="mt-5 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1.5 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 text-brand-emerald font-semibold">
                <span className="h-2 w-2 rounded-full bg-brand-emerald animate-pulse" />
                Obra en vivo:
              </span>
              <span>{activeCarts}/12 pisos con carro activo</span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-brand-amber font-semibold">
                {totalRecoveredKg.toLocaleString("es-CL")} kg recuperados
              </span>
            </div>
          </div>

          {/* Fast assurance checks */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand-emerald" />
              $0 en Compra de Equipos (Arriendo Mensual)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand-emerald" />
              Cumple D.S. 594 y Ley REP N° 20.920
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand-emerald" />
              Piloto en Obra en 48 Horas
            </span>
          </div>
        </div>

        {/* KPI Highlights Bar */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MLSA_SYSTEM_DATA.kpis.map((kpi) => {
            return (
              <div
                key={kpi.id}
                className="group relative rounded-2xl border border-brand-border bg-gradient-to-b from-slate-900/90 to-brand-navy/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-white group-hover:text-brand-emerald transition-colors">
                    {kpi.value}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-brand-emerald group-hover:bg-brand-emerald/10 transition-colors">
                    {kpi.id === "search-time" && <Clock className="h-5 w-5" />}
                    {kpi.id === "waste-drop" && <ShieldCheck className="h-5 w-5" />}
                    {kpi.id === "rep-compliance" && <QrCode className="h-5 w-5" />}
                    {kpi.id === "roi-multiple" && <TrendingUp className="h-5 w-5" />}
                  </div>
                </div>
                <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-slate-200">
                  {kpi.label}
                </h3>
                <p className="mt-1 text-xs font-semibold text-brand-amber">
                  {kpi.subvalue}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {kpi.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
