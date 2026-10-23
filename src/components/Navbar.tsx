"use client";

import React, { useState } from "react";
import { Boxes, ArrowUpDown, QrCode, Calculator, ShieldCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenPilot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPilot }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-emerald to-brand-emeraldDark shadow-lg shadow-brand-emerald/20">
            <Boxes className="h-6 w-6 text-brand-dark" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">M-LSA</span>
              <span className="rounded bg-brand-emerald/10 px-1.5 py-0.5 text-xs font-semibold text-brand-emerald border border-brand-emerald/30">
                Unidad 3
              </span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              Logística Modular Circular
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#flujo-dual"
            className="flex items-center gap-1.5 hover:text-brand-emerald transition-colors"
          >
            <ArrowUpDown className="h-4 w-4 text-brand-emerald" />
            Flujo Dual
          </a>
          <a
            href="#simulador"
            className="flex items-center gap-1.5 hover:text-brand-emerald transition-colors"
          >
            <QrCode className="h-4 w-4 text-brand-amber" />
            Simulador Edificio
          </a>
          <a
            href="#caracteristicas"
            className="hover:text-brand-emerald transition-colors"
          >
            Sistema M-LSA
          </a>
          <a
            href="#calculadora"
            className="flex items-center gap-1.5 hover:text-brand-emerald transition-colors"
          >
            <Calculator className="h-4 w-4 text-brand-emerald" />
            Calculadora ROI
          </a>
          <a
            href="#sostenibilidad"
            className="flex items-center gap-1.5 hover:text-brand-emerald transition-colors"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Ley REP / SSOMA
          </a>
        </nav>

        {/* Desktop Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenPilot}
            className="rounded-lg bg-brand-emerald px-4 py-2 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-brand-emerald/25 active:scale-95"
          >
            Solicitar Piloto (LOI)
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-brand-navy px-4 pb-6 pt-2 space-y-3">
          <a
            href="#flujo-dual"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-brand-emerald"
          >
            Flujo Dual (JIT & RCD)
          </a>
          <a
            href="#simulador"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-brand-emerald"
          >
            Simulador de Edificio (12 Pisos)
          </a>
          <a
            href="#caracteristicas"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-brand-emerald"
          >
            Sistema M-LSA & Bento
          </a>
          <a
            href="#calculadora"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-brand-emerald"
          >
            Calculadora ROI & Impacto
          </a>
          <a
            href="#sostenibilidad"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-brand-emerald"
          >
            Sostenibilidad & Ley REP
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPilot();
            }}
            className="w-full rounded-lg bg-brand-emerald py-2.5 text-center text-sm font-bold text-slate-950 shadow-md"
          >
            Solicitar Piloto Faena
          </button>
        </div>
      )}
    </header>
  );
};
