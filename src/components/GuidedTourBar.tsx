"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, Compass, RotateCcw, X, ArrowRight } from "lucide-react";
import { useFaena } from "@/components/FaenaContext";

const TOUR_STEPS = [
  {
    key: "gateDispatched" as const,
    step: 1,
    title: "Portería (3 clics)",
    hint: "Despacha una guía con código QR",
    href: "/sistema#porteria",
  },
  {
    key: "floorDelivered" as const,
    step: 2,
    title: "Entrega en Piso",
    hint: "Confirma llegada de materiales al piso",
    href: "/simulador",
  },
  {
    key: "wasteReturned" as const,
    step: 3,
    title: "Retiro al Patio",
    hint: "Carga despuntes y pesa el retorno",
    href: "/simulador",
  },
  {
    key: "impactChecked" as const,
    step: 4,
    title: "Ley REP y Ahorro",
    hint: "Revisa kilos recuperados y ahorro",
    href: "/ley-rep",
  },
];

/** Guided 4-step walkthrough bar synced with real user actions across pages. */
export const GuidedTourBar: React.FC = () => {
  const { state, isTourOpen, openTour, closeTour, markImpactChecked, resetDemo } = useFaena();
  const pathname = usePathname();
  const progress = state.tourProgress;
  const completedCount = TOUR_STEPS.filter((s) => progress[s.key]).length;

  useEffect(() => {
    if (isTourOpen && (pathname === "/ley-rep" || pathname === "/calculadora")) {
      markImpactChecked();
    }
  }, [isTourOpen, pathname, markImpactChecked]);

  if (!isTourOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-40 print:hidden">
        <button
          type="button"
          onClick={openTour}
          className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/40 bg-slate-900/95 px-4 py-2 text-xs font-bold text-brand-emerald shadow-xl shadow-slate-950/60 backdrop-blur-md transition-all hover:border-brand-emerald hover:bg-slate-800 active:scale-95"
        >
          <Compass className="h-4 w-4" />
          <span>Tour Guiado ({completedCount}/4)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="border-b border-brand-emerald/25 bg-slate-900/95 backdrop-blur-md print:hidden">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Compass className="h-4 w-4 text-brand-emerald" />
            <span>Prueba un ciclo completo en obra ({completedCount}/4)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetDemo}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:border-slate-500 hover:text-white"
            >
              <RotateCcw className="h-3 w-3" />
              Reiniciar Demo
            </button>
            <button
              type="button"
              onClick={closeTour}
              aria-label="Ocultar guía"
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {TOUR_STEPS.map((item) => {
            const done = progress[item.key];
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`group flex items-center justify-between rounded-xl border px-3 py-2 text-left transition-all ${
                  done
                    ? "border-brand-emerald/50 bg-brand-emerald/10"
                    : "border-slate-800 bg-slate-950/70 hover:border-brand-emerald/40 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
                      done
                        ? "bg-brand-emerald text-slate-950"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : item.step}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-white">{item.title}</p>
                    <p className="truncate text-[11px] text-slate-400">{item.hint}</p>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-500 group-hover:text-brand-emerald" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
