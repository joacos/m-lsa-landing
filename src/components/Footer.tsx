import React from "react";
import Link from "next/link";
import { Boxes } from "lucide-react";

const PLATFORM_LINKS = [
  { href: "/flujo", label: "Flujo Doble (Subida / Bajada)" },
  { href: "/simulador", label: "Simulador de Edificio (12P)" },
  { href: "/sistema", label: "Carros Galvanizados Faena Limpia" },
  { href: "/calculadora", label: "Calculadora Ahorro ($850k/mes)" },
  { href: "/ley-rep", label: "Trazabilidad Ley REP" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-ink py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-emerald text-brand-ink font-black">
                <Boxes className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-white group-hover:text-brand-emerald transition-colors">
                Faena Limpia
              </span>
              <span className="rounded bg-brand-emerald/10 px-2 py-0.5 text-xs font-mono font-bold text-brand-emerald border border-brand-emerald/30">
                INACAP Unidad 3
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Sistema de carros cerrados en obra para llevar materiales directo al piso y retirar despuntes y escombros de vuelta, sin ensuciar pasillos.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono">
              <span>Marco Legal:</span>
              <span className="text-slate-300">Ley REP N° 20.920</span>
              <span>•</span>
              <span className="text-slate-300">D.S. 594 Ergonomía</span>
              <span>•</span>
              <span className="text-slate-300">Sinader / RETC</span>
              <span>•</span>
              <span className="text-slate-300">NCh 3562 RCD</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Plataforma
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {PLATFORM_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-emerald transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic & Project Context */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Proyecto Formativo
            </h4>
            <p className="mt-3 text-xs text-slate-400 leading-normal">
              Desarrollado bajo la metodología <strong>4+1 INACAP</strong> para resolver problemas reales de orden, productividad y sustentabilidad en la construcción chilena.
            </p>
            <div className="mt-4 rounded-xl bg-white/5 border border-white/15 p-3 text-[11px] text-slate-400">
              <span className="text-brand-emerald font-semibold">Piloto en Terreno:</span>
              <p className="mt-0.5 text-slate-400">Despacho en 48 hrs para obras activas en Chile.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Faena Limpia. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado para obra limpia y cero mermas.
          </p>
        </div>
      </div>
    </footer>
  );
};
