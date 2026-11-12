import React from "react";
import { Smartphone, Layers, FileCheck, CheckCircle2, Wrench } from "lucide-react";
import { GateQrAppDemo } from "@/components/GateQrAppDemo";
import { CartInteractiveView } from "@/components/CartInteractiveView";

export const FeatureBento: React.FC = () => {
  return (
    <section id="caracteristicas" className="py-16 bg-brand-cream relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full border-2 border-brand-ink bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-ink">
            Carros Metálicos + Control Digital
          </span>
          <h2 className="mt-2 text-3xl font-black text-brand-ink sm:text-4xl">
            Sistema Faena Limpia: Pensado para la Obra Real
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
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
          <div className="lg:col-span-7 rounded-3xl border-2 border-brand-ink bg-gradient-to-br from-white to-brand-navy p-8 shadow-hard flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  <Wrench className="h-3.5 w-3.5 text-brand-emeraldDark" />
                  Carro Reforzado de Obra
                </span>
                <span className="text-xs font-mono text-brand-emeraldDark font-semibold">Cumple D.S. 594</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-brand-ink">
                Carro Metálico Faena Limpia de Acero Galvanizado
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Estructura reforzada antivuelco con ruedas industriales de poliuretano, cáncamos certificados para grúa pluma o montacargas y doble puerta sellada que protege los materiales del agua y polvo.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-emeraldDark shrink-0" />
                  <span>Doble compartimento: Materiales / Escombros</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-emeraldDark shrink-0" />
                  <span>Ruedas con freno de seguridad industrial</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-emeraldDark shrink-0" />
                  <span>Cáncamos de izaje certificados D.S. 594</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-emeraldDark shrink-0" />
                  <span>Apilable en patio de maniobras</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Capacidad de carga: 450 kg por carro</span>
              <span className="font-mono text-brand-emeraldDark">Cero pérdidas por clima</span>
            </div>
          </div>

          {/* Card 2: Software QR en Portería (Span 5) */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-brand-ink bg-gradient-to-br from-white to-brand-cream p-8 shadow-hard flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  <Smartphone className="h-3.5 w-3.5 text-brand-amberDark" />
                  App Web y Celular
                </span>
                <span className="text-xs font-mono text-brand-amberDark font-semibold">&lt; 85s en Portería</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-brand-ink">
                Control QR sin Contacto en Portería
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Lectura rápida de guías de despacho y asignación al piso de destino. Los jefes de terreno reciben aviso al tiro, sin llamadas ni planillas de papel.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-amberDark shrink-0" />
                  <span>Sin instalación: funciona en el navegador del celular</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-amberDark shrink-0" />
                  <span>Asigna piso y cuadrilla en 3 clics</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-amberDark shrink-0" />
                  <span>Registro completo de movimientos</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Funciona sin señal en subterráneos</span>
              <span className="font-mono text-brand-amberDark">Listo en cualquier celular</span>
            </div>
          </div>

          {/* Card 3: Segregación Primaria RCD (Span 5) */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-brand-ink bg-gradient-to-br from-white to-brand-cream p-8 shadow-hard flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  <Layers className="h-3.5 w-3.5 text-brand-emeraldDark" />
                  Economía Circular
                </span>
                <span className="text-xs font-mono text-brand-emeraldDark font-semibold">Cero Escombro Suelto</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-brand-ink">
                Separación de Residuos por Piso
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                El mismo carro retira madera, despuntes y film de embalaje en su bajada. Evita microbasurales en pasillos y mantiene la obra ordenada según Prevención de Riesgos.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-emeraldDark shrink-0" />
                  <span>Pasillos y escaleras despejadas (-50% caídas)</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-emeraldDark shrink-0" />
                  <span>Separación limpia en origen antes de mezclarse</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Menos viajes a botadero</span>
              <span className="font-mono text-brand-emeraldDark">+85% Reutilizable</span>
            </div>
          </div>

          {/* Card 4: Reportabilidad Ley REP / Sinader (Span 7) */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-brand-ink bg-gradient-to-br from-white to-brand-navy p-8 shadow-hard flex flex-col justify-between group hover:border-brand-emerald/40 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  <FileCheck className="h-3.5 w-3.5 text-emerald-700" />
                  Cumplimiento Normativo
                </span>
                <span className="text-xs font-mono text-emerald-700 font-semibold">Ley N° 20.920 y Sinader</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-brand-ink">
                Informes Automáticos para Auditorías DIA y RETC
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Genera respaldos digitales certificados en un clic. Cumple con la Ley REP para envases y embalajes, exporta planillas listas para Sinader y facilita declaraciones ante la SMA y municipalidades.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>Certificados de pesaje y destino trazables</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>Cálculo directo de huella de carbono ahorrada</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>Reportes en PDF y Excel para jefatura técnica</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-brand-cream p-2.5 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>Protección ante multas y paralizaciones</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Auditorías ambientales sin trabas</span>
              <span className="font-mono text-emerald-700">100% Respaldo Digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
