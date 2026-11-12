import React from "react";
import { Smartphone, Layers, FileCheck, CheckCircle2, Wrench } from "lucide-react";
import { GateQrAppDemo } from "@/components/GateQrAppDemo";
import { CartInteractiveView } from "@/components/CartInteractiveView";

export const FeatureBento: React.FC = () => {
  return (
    <section id="caracteristicas" className="py-16 border-t border-brand-border bg-slate-950/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald">
            Carros Metálicos + Control Digital
          </span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Sistema Faena Limpia: Pensado para la Obra Real
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Prueba en vivo el despacho desde Portería con QR y revisa por dentro el carro galvanizado de 450 kg.
          </p>
        </div>

        {/* Interactive Lab: Gate QR App + Cart Schematic */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GateQrAppDemo />
          <CartInteractiveView />
        </div>

        {/* Bento Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: Hardware Módulo Metálico (Span 7) */}
          <div className="lg:col-span-7 rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 to-brand-navy p-8 shadow-xl flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  <Wrench className="h-3.5 w-3.5 text-brand-emerald" />
                  Carro Reforzado de Obra
                </span>
                <span className="text-xs font-mono text-brand-emerald font-semibold">Cumple D.S. 594</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Carro Metálico Faena Limpia de Acero Galvanizado
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Estructura reforzada antivuelco con ruedas industriales de poliuretano, cáncamos certificados para grúa pluma o montacargas y doble puerta sellada que protege los materiales del agua y polvo.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Doble compartimento: Materiales / Escombros</span>
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
              <span>Capacidad de carga: 450 kg por carro</span>
              <span className="font-mono text-brand-emerald">Cero pérdidas por clima</span>
            </div>
          </div>

          {/* Card 2: Software QR en Portería (Span 5) */}
          <div className="lg:col-span-5 rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  <Smartphone className="h-3.5 w-3.5 text-brand-amber" />
                  App Web y Celular
                </span>
                <span className="text-xs font-mono text-brand-amber font-semibold">&lt; 85s en Portería</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Control QR sin Contacto en Portería
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Lectura rápida de guías de despacho y asignación al piso de destino. Los jefes de terreno reciben aviso al tiro, sin llamadas ni planillas de papel.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-amber shrink-0" />
                  <span>Sin instalación: funciona en el navegador del celular</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-amber shrink-0" />
                  <span>Asigna piso y cuadrilla en 3 clics</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-amber shrink-0" />
                  <span>Registro completo de movimientos</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Funciona sin señal en subterráneos</span>
              <span className="font-mono text-brand-amber">Listo en cualquier celular</span>
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
                <span className="text-xs font-mono text-brand-emerald font-semibold">Cero Escombro Suelto</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Separación de Residuos por Piso
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                El mismo carro retira madera, despuntes y film de embalaje en su bajada. Evita microbasurales en pasillos y mantiene la obra ordenada según Prevención de Riesgos.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Pasillos y escaleras despejadas (-50% caídas)</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                  <span>Separación limpia en origen antes de mezclarse</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Menos viajes a botadero</span>
              <span className="font-mono text-brand-emerald">+85% Reutilizable</span>
            </div>
          </div>

          {/* Card 4: Reportabilidad Ley REP / Sinader (Span 7) */}
          <div className="lg:col-span-7 rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 to-brand-navy p-8 shadow-xl flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Cumplimiento Normativo
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Ley N° 20.920 y Sinader</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Informes Automáticos para Auditorías DIA y RETC
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Genera respaldos digitales certificados en un clic. Cumple con la Ley REP para envases y embalajes, exporta planillas listas para Sinader y facilita declaraciones ante la SMA y municipalidades.
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
                  <span>Reportes en PDF y Excel para jefatura técnica</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-2.5 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Protección ante multas y paralizaciones</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Auditorías ambientales sin trabas</span>
              <span className="font-mono text-emerald-400">100% Respaldo Digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
