"use client";

import React, { useState } from "react";
import { MLSA_SYSTEM_DATA } from "@/data/mlsa-content";
import { DollarSign, Clock, Leaf, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

interface RoiCalculatorProps {
  onOpenPilot: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenPilot }) => {
  const [floors, setFloors] = useState<number>(14);
  const [workers, setWorkers] = useState<number>(65);
  const [materialBudgetMillion, setMaterialBudgetMillion] = useState<number>(55); // in Millions CLP

  const monthlySubscription = MLSA_SYSTEM_DATA.pricing.monthlySubscriptionClp; // 850,000 CLP

  // Calculations:
  // 1. Material waste savings: In raw construction, unprotected waste is ~6%. With M-LSA it drops to <2%, saving ~4.5% of materials.
  const monthlyBudgetClp = materialBudgetMillion * 1000000;
  const wasteSavedClp = Math.round(monthlyBudgetClp * 0.045);

  // 2. Man-hours recovered: 52 minutes saved per worker per day (from 60 to 8 min).
  // 52 min / 60 min = 0.866 hrs/day * 22 working days.
  const hoursSavedPerWorker = 0.866 * 22;
  const totalRecoveredHours = Math.round(workers * hoursSavedPerWorker);

  // Approximate economic value of recovered worker hours (assuming $4,500 CLP/hr base labor cost)
  const laborValueRecoveredClp = totalRecoveredHours * 4500;

  // 3. Diverted RCD tons: ~0.45 tons per floor per month through clean segregation
  const divertedTons = Math.round((floors * 0.45 + (workers * 0.02)) * 10) / 10;

  // 4. Net ROI Multiple vs $850,000 CLP OpEx
  const totalFinancialBenefit = wasteSavedClp + laborValueRecoveredClp;
  const roiMultiple = Math.round((totalFinancialBenefit / monthlySubscription) * 10) / 10;
  const netMonthlyBenefitClp = totalFinancialBenefit - monthlySubscription;

  const formatClp = (num: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="calculadora" className="py-20 bg-brand-navy/90 border-t border-brand-border relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-brand-emerald/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
            Simulador Económico & Sustentable
          </span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Calculadora de ROI & Impacto Operacional
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Ingresa las variables de tu faena y evalúa el retorno económico del modelo OpEx servitizado frente a las mermas habituales de obra.
          </p>
        </div>

        {/* Interactive Layout: Controls vs Results Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Sliders (Span 6) */}
          <div className="lg:col-span-6 rounded-3xl border border-brand-border bg-slate-900/90 p-8 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-emerald" />
                Parámetros de tu Faena
              </h3>

              <div className="space-y-8">
                {/* Slider 1: Pisos */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label className="font-semibold text-slate-300">
                      Número de Pisos en Altura:
                    </label>
                    <span className="font-mono text-base font-black text-brand-emerald bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                      {floors} pisos
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>5 pisos</span>
                    <span>18 pisos</span>
                    <span>30 pisos</span>
                  </div>
                </div>

                {/* Slider 2: Operarios */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label className="font-semibold text-slate-300">
                      N° de Operarios en Obra:
                    </label>
                    <span className="font-mono text-base font-black text-brand-emerald bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                      {workers} trabajadores
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="5"
                    value={workers}
                    onChange={(e) => setWorkers(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>20 personas</span>
                    <span>100 personas</span>
                    <span>200 personas</span>
                  </div>
                </div>

                {/* Slider 3: Presupuesto Materiales */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label className="font-semibold text-slate-300">
                      Presupuesto Mensual de Materiales:
                    </label>
                    <span className="font-mono text-base font-black text-brand-amber bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                      ${materialBudgetMillion}M CLP
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="250"
                    step="5"
                    value={materialBudgetMillion}
                    onChange={(e) => setMaterialBudgetMillion(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-amber"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>$15M CLP</span>
                    <span>$130M CLP</span>
                    <span>$250M CLP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Model note */}
            <div className="mt-8 rounded-2xl bg-slate-950/70 border border-slate-800 p-4 text-xs text-slate-400 flex items-center justify-between">
              <span>Suscripción Mensual OpEx M-LSA:</span>
              <span className="font-mono font-bold text-white text-sm">
                $850.000 CLP / mes
              </span>
            </div>
          </div>

          {/* Results Output Card (Span 6) */}
          <div className="lg:col-span-6 rounded-3xl border border-brand-emerald/40 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
                  Impacto Proyectado Mensual
                </span>
                <span className="rounded-full bg-brand-emerald/10 border border-brand-emerald/30 px-3 py-0.5 text-xs font-bold text-brand-emerald">
                  Modelo 100% Deducible
                </span>
              </div>

              {/* 4 Output Metrics */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Metric 1: Ahorro mermas */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <DollarSign className="h-4 w-4 text-brand-emerald" />
                    <span>Ahorro en Mermas</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {formatClp(wasteSavedClp)}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Por reducción de daño climático e intemperie (&lt;2%).
                  </p>
                </div>

                {/* Metric 2: Horas hombre */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Clock className="h-4 w-4 text-brand-amber" />
                    <span>Horas Recuperadas</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {totalRecoveredHours.toLocaleString("es-CL")} hrs
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Equivalente a {Math.round(totalRecoveredHours / 180)} jornales a tiempo completo.
                  </p>
                </div>

                {/* Metric 3: Residuos desviados */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Leaf className="h-4 w-4 text-emerald-400" />
                    <span>RCD Desviado</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {divertedTons} Toneladas
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Segregación limpia con manifiesto digital Ley REP.
                  </p>
                </div>

                {/* Metric 4: Multiplicador ROI */}
                <div className="rounded-2xl bg-brand-emerald/10 border border-brand-emerald/30 p-4">
                  <div className="flex items-center gap-2 text-brand-emerald text-xs mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">Retorno de Inversión</span>
                  </div>
                  <div className="text-3xl font-black text-brand-emerald font-mono">
                    {roiMultiple}x ROI
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 font-medium">
                    Beneficio neto: {formatClp(netMonthlyBenefitClp)}/mes
                  </p>
                </div>
              </div>
            </div>

            {/* CTA in result card */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenPilot}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-4 text-base font-bold text-slate-950 shadow-lg shadow-brand-emerald/25 hover:bg-emerald-400 active:scale-95 transition-all"
              >
                Solicitar Piloto de 30 Días con este ROI
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Incluye 2 módulos M-LSA + App QR para portería y piso. Sin compromiso de compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
