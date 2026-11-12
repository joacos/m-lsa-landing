"use client";

import React from "react";
import { motion } from "framer-motion";
import { MLSA_SYSTEM_DATA } from "@/data/mlsa-content";
import { usePilotModal } from "@/components/SiteShell";
import { useFaena } from "@/components/FaenaContext";
import {
  DollarSign,
  Clock,
  Leaf,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Printer,
  Scale,
} from "lucide-react";

export const RoiCalculator: React.FC = () => {
  const openPilot = usePilotModal();
  const { state, setRoiParams, markImpactChecked } = useFaena();
  const { floors, workers, materialBudgetMillion } = state.roiParams;

  const monthlySubscription = MLSA_SYSTEM_DATA.pricing.monthlySubscriptionClp;

  const monthlyBudgetClp = materialBudgetMillion * 1000000;
  // Traditional ~6% material waste vs <2% (~1.5% residual) with Faena Limpia -> ~4.5% saved.
  const traditionalWasteClp = Math.round(monthlyBudgetClp * 0.06);
  const faenaLimpiaWasteClp = Math.round(monthlyBudgetClp * 0.015);
  const wasteSavedClp = traditionalWasteClp - faenaLimpiaWasteClp;

  const hoursSavedPerWorker = 0.866 * 22;
  const totalRecoveredHours = Math.round(workers * hoursSavedPerWorker);
  const laborValueRecoveredClp = totalRecoveredHours * 4500;

  const divertedTons = Math.round((floors * 0.45 + workers * 0.02) * 10) / 10;

  const totalFinancialBenefit = wasteSavedClp + laborValueRecoveredClp;
  const roiMultiple = Math.round((totalFinancialBenefit / monthlySubscription) * 10) / 10;
  const netMonthlyBenefitClp = totalFinancialBenefit - monthlySubscription;

  const formatClp = (num: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(num);

  const handlePrint = () => {
    markImpactChecked();
    window.print();
  };

  return (
    <section
      id="calculadora"
      className="py-16 bg-brand-navy/90 border-t border-brand-border relative print:bg-white print:text-slate-900 print:border-0 print:py-6"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-brand-emerald/10 blur-[130px] print:hidden" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald print:text-emerald-700">
            Simulador de Ahorro en Obra
          </span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl print:text-slate-900">
            Calculadora de Ahorro e Impacto en Faena
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base print:text-slate-600">
            Ingresa los datos de tu obra y compara cuánto pierdes hoy frente al ahorro mensual con Faena Limpia.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Sliders */}
          <div className="lg:col-span-6 rounded-3xl border border-brand-border bg-slate-900/90 p-8 shadow-xl flex flex-col justify-between print:bg-slate-50 print:border-slate-300">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 print:text-slate-900">
                <Sparkles className="h-5 w-5 text-brand-emerald print:text-emerald-700" />
                Parámetros de tu Faena
              </h3>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label htmlFor="calc-floors" className="font-semibold text-slate-300 print:text-slate-700">
                      Número de Pisos en Altura:
                    </label>
                    <span className="font-mono text-base font-black text-brand-emerald bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 print:bg-white print:text-emerald-700 print:border-slate-300">
                      {floors} pisos
                    </span>
                  </div>
                  <input
                    id="calc-floors"
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={floors}
                    onChange={(e) =>
                      setRoiParams({ ...state.roiParams, floors: Number(e.target.value) })
                    }
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald print:hidden"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 print:hidden">
                    <span>5 pisos</span>
                    <span>18 pisos</span>
                    <span>30 pisos</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label htmlFor="calc-workers" className="font-semibold text-slate-300 print:text-slate-700">
                      N° de Maestros y Jornales en Obra:
                    </label>
                    <span className="font-mono text-base font-black text-brand-emerald bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 print:bg-white print:text-emerald-700 print:border-slate-300">
                      {workers} trabajadores
                    </span>
                  </div>
                  <input
                    id="calc-workers"
                    type="range"
                    min="20"
                    max="200"
                    step="5"
                    value={workers}
                    onChange={(e) =>
                      setRoiParams({ ...state.roiParams, workers: Number(e.target.value) })
                    }
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald print:hidden"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 print:hidden">
                    <span>20 personas</span>
                    <span>100 personas</span>
                    <span>200 personas</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label htmlFor="calc-budget" className="font-semibold text-slate-300 print:text-slate-700">
                      Presupuesto Mensual de Materiales:
                    </label>
                    <span className="font-mono text-base font-black text-brand-amber bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 print:bg-white print:text-amber-700 print:border-slate-300">
                      ${materialBudgetMillion}M CLP
                    </span>
                  </div>
                  <input
                    id="calc-budget"
                    type="range"
                    min="15"
                    max="250"
                    step="5"
                    value={materialBudgetMillion}
                    onChange={(e) =>
                      setRoiParams({
                        ...state.roiParams,
                        materialBudgetMillion: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-amber print:hidden"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 print:hidden">
                    <span>$15M CLP</span>
                    <span>$130M CLP</span>
                    <span>$250M CLP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-950/70 border border-slate-800 p-4 text-xs text-slate-400 flex items-center justify-between print:bg-white print:border-slate-300 print:text-slate-700">
              <span>Arriendo Mensual Faena Limpia:</span>
              <span className="font-mono font-bold text-white text-sm print:text-slate-900">
                $850.000 CLP / mes
              </span>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 rounded-3xl border border-brand-emerald/40 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 p-8 shadow-2xl flex flex-col justify-between print:bg-white print:border-slate-300 print:shadow-none">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:border-slate-300">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald print:text-emerald-700">
                  Ahorro Proyectado al Mes
                </span>
                <span className="rounded-full bg-brand-emerald/10 border border-brand-emerald/30 px-3 py-0.5 text-xs font-bold text-brand-emerald print:text-emerald-700">
                  100% Gasto Deducible
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 print:bg-slate-50 print:border-slate-300">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 print:text-slate-600">
                    <DollarSign className="h-4 w-4 text-brand-emerald" />
                    <span>Ahorro en Materiales</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono print:text-slate-900">
                    {formatClp(wasteSavedClp)}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 print:text-slate-600">
                    Por evitar roturas, humedad y mermas (&lt;2%).
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 print:bg-slate-50 print:border-slate-300">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 print:text-slate-600">
                    <Clock className="h-4 w-4 text-brand-amber" />
                    <span>Horas Recuperadas</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono print:text-slate-900">
                    {totalRecoveredHours.toLocaleString("es-CL")} hrs
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 print:text-slate-600">
                    Equivalente a {Math.round(totalRecoveredHours / 180)} jornales a tiempo completo.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 print:bg-slate-50 print:border-slate-300">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 print:text-slate-600">
                    <Leaf className="h-4 w-4 text-emerald-400" />
                    <span>Residuos Recuperados</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono print:text-slate-900">
                    {divertedTons} Toneladas
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 print:text-slate-600">
                    Retiro separado con respaldo digital Ley REP.
                  </p>
                </div>

                <div className="rounded-2xl bg-brand-emerald/10 border border-brand-emerald/30 p-4 print:bg-emerald-50 print:border-emerald-400">
                  <div className="flex items-center gap-2 text-brand-emerald text-xs mb-1 print:text-emerald-700">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">Retorno Mensual</span>
                  </div>
                  <div className="text-3xl font-black text-brand-emerald font-mono print:text-emerald-700">
                    {roiMultiple}x Retorno
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 font-medium print:text-slate-800">
                    Ahorro neto: {formatClp(netMonthlyBenefitClp)}/mes
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3 print:hidden">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={openPilot}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-brand-emerald/25 hover:bg-emerald-400 active:scale-95 transition-all"
                >
                  Solicitar Piloto con este Ahorro
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-xs font-bold text-white hover:border-slate-500 hover:bg-slate-700"
                >
                  <Printer className="h-4 w-4" />
                  Imprimir / PDF
                </button>
              </div>
              <p className="text-center text-[11px] text-slate-400">
                Incluye 2 carros Faena Limpia + App QR para portería y pisos. Sin compromiso de compra.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Comparison: Traditional Site vs Faena Limpia */}
        <div className="mt-10 rounded-3xl border border-brand-border bg-slate-900/80 p-6 sm:p-8 shadow-xl print:bg-white print:border-slate-300">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="h-5 w-5 text-brand-emerald print:text-emerald-700" />
            <h3 className="text-lg sm:text-xl font-black text-white print:text-slate-900">
              Comparador Visual: Obra Tradicional vs Faena Limpia
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Comparison 1: Material Loss */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-4 print:bg-slate-50 print:border-slate-300">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200 print:text-slate-900">
                <span>Pérdida mensual en materiales</span>
                <span className="font-mono text-brand-emerald print:text-emerald-700">
                  Ahorras {formatClp(wasteSavedClp)}/mes
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1 print:text-slate-700">
                    <span>Obra tradicional (~6% intemperie y rotura)</span>
                    <span className="font-mono font-bold text-red-400 print:text-red-700">
                      {formatClp(traditionalWasteClp)}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden print:bg-slate-200">
                    <motion.div
                      animate={{ width: "100%" }}
                      className="h-full bg-red-500/80 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1 print:text-slate-800">
                    <span>Con Faena Limpia (&lt;2% carro cerrado)</span>
                    <span className="font-mono font-bold text-brand-emerald print:text-emerald-700">
                      {formatClp(faenaLimpiaWasteClp)}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden print:bg-slate-200">
                    <motion.div
                      animate={{ width: "25%" }}
                      className="h-full bg-brand-emerald rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison 2: Search Time */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-4 print:bg-slate-50 print:border-slate-300">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200 print:text-slate-900">
                <span>Tiempo diario buscando insumos por maestro</span>
                <span className="font-mono text-brand-amber print:text-amber-700">
                  -85% tiempo perdido
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1 print:text-slate-700">
                    <span>Obra tradicional (bajar a bodega central)</span>
                    <span className="font-mono font-bold text-amber-400 print:text-amber-700">
                      60 min / día
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden print:bg-slate-200">
                    <motion.div
                      animate={{ width: "100%" }}
                      className="h-full bg-amber-500/80 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1 print:text-slate-800">
                    <span>Con Faena Limpia (bodega en cada piso)</span>
                    <span className="font-mono font-bold text-brand-emerald print:text-emerald-700">
                      8 min / día
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden print:bg-slate-200">
                    <motion.div
                      animate={{ width: "13%" }}
                      className="h-full bg-brand-emerald rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
