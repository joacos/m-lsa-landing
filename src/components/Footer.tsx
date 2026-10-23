"use client";

import React from "react";
import { Boxes, ShieldCheck, Heart, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-brand-border bg-brand-dark py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-emerald text-slate-950 font-black">
                <Boxes className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-white">M-LSA</span>
              <span className="rounded bg-brand-emerald/10 px-2 py-0.5 text-xs font-mono font-bold text-brand-emerald border border-brand-emerald/30">
                INACAP Unidad 3
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Módulos Logísticos Satélite de Acopio. Sistema circular de doble utilidad para optimización de la milla intermedia y logística inversa de RCD en proyectos de edificación en altura.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-mono">
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
              <li>
                <a href="#flujo-dual" className="hover:text-brand-emerald transition-colors">
                  Flujo Dual (UP / DOWN)
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-brand-emerald transition-colors">
                  Simulador de Edificio (12P)
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="hover:text-brand-emerald transition-colors">
                  Hardware Galvanizado M-LSA
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-brand-emerald transition-colors">
                  Calculadora ROI ($850k OpEx)
                </a>
              </li>
              <li>
                <a href="#sostenibilidad" className="hover:text-brand-emerald transition-colors">
                  Trazabilidad Ley REP
                </a>
              </li>
            </ul>
          </div>

          {/* Academic & Project Context */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Proyecto Formativo
            </h4>
            <p className="mt-3 text-xs text-slate-400 leading-normal">
              Desarrollado bajo la metodología <strong>4+1 INACAP</strong> para la resolución de problemáticas críticas de productividad y sustentabilidad en la industria de la construcción.
            </p>
            <div className="mt-4 rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-[11px] text-slate-400">
              <span className="text-brand-emerald font-semibold">Vibe-Coding Ready:</span>
              <p className="mt-0.5 text-slate-400">Next.js App Router, Tailwind CSS & Framer Motion.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sistema M-LSA. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado para obra limpia y cero mermas.
          </p>
        </div>
      </div>
    </footer>
  );
};
