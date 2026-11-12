"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, ArrowUpDown, QrCode, Calculator, ShieldCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenPilot: () => void;
}

const NAV_ITEMS = [
  {
    href: "/flujo",
    label: "Flujo Doble",
    mobileLabel: "Flujo Doble (Subida y Bajada)",
    icon: ArrowUpDown,
    iconClass: "text-brand-emeraldDark",
  },
  {
    href: "/simulador",
    label: "Simulador Edificio",
    mobileLabel: "Simulador de Edificio (12 Pisos)",
    icon: QrCode,
    iconClass: "text-brand-amberDark",
  },
  {
    href: "/sistema",
    label: "Sistema Faena Limpia",
    mobileLabel: "Sistema Faena Limpia",
    icon: null,
    iconClass: "",
  },
  {
    href: "/calculadora",
    label: "Calculadora Ahorro",
    mobileLabel: "Calculadora de Ahorro",
    icon: Calculator,
    iconClass: "text-brand-emeraldDark",
  },
  {
    href: "/ley-rep",
    label: "Ley REP y Seguridad",
    mobileLabel: "Sustentabilidad y Ley REP",
    icon: ShieldCheck,
    iconClass: "text-emerald-700",
  },
] as const;

export const Navbar: React.FC<NavbarProps> = ({ onOpenPilot }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-brand-ink bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-emerald to-brand-emeraldDark shadow-lg shadow-brand-emerald/20">
            <Boxes className="h-6 w-6 text-brand-ink" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-brand-ink group-hover:text-brand-emeraldDark transition-colors">
                Faena Limpia
              </span>
              <span className="rounded bg-brand-emerald/10 px-1.5 py-0.5 text-xs font-semibold text-brand-emeraldDark border border-brand-emerald/30">
                Unidad 3
              </span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              Orden y Logística en Obra
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "text-brand-emeraldDark font-semibold"
                    : "text-slate-600 hover:text-brand-emeraldDark"
                }`}
              >
                {Icon && <Icon className={`h-4 w-4 ${item.iconClass}`} />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenPilot}
            className="rounded-lg border-2 border-brand-ink bg-brand-emerald px-4 py-2 text-sm font-bold text-brand-ink transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-brand-emerald/25 active:scale-95"
          >
            Solicitar Piloto
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-ink"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-brand-navy px-4 pb-6 pt-2 space-y-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-base font-medium ${
                  isActive ? "text-brand-emeraldDark font-semibold" : "text-slate-800 hover:text-brand-emeraldDark"
                }`}
              >
                {item.mobileLabel}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPilot();
            }}
            className="w-full rounded-lg bg-brand-emerald py-2.5 text-center text-sm font-bold text-brand-ink shadow-md"
          >
            Solicitar Piloto en Obra
          </button>
        </div>
      )}
    </header>
  );
};
