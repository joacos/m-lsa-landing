"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, FileCheck, Building, User, MapPin, Phone, Mail } from "lucide-react";
import { PilotFormData } from "@/types/mlsa";

interface PilotFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PilotFormModal: React.FC<PilotFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<PilotFormData>({
    projectName: "",
    companyName: "",
    role: "Administrador de Obra",
    city: "Santiago",
    phone: "",
    email: "",
    includeQrApp: true,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-brand-emerald/40 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-emerald/10 border border-brand-emerald/30 px-3 py-1 text-xs font-mono font-bold text-brand-emerald">
                Carta de Intención (LOI)
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-black text-white">
              Solicitar Piloto de 30 Días en Faena
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Prueba 2 Módulos Satélite M-LSA + App Web QR en tu obra activa sin compromiso de compra.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nombre del Proyecto / Obra *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      required
                      type="text"
                      placeholder="Ej. Edificio Parque Central"
                      value={formData.projectName}
                      onChange={(e) =>
                        setFormData({ ...formData, projectName: e.target.value })
                      }
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-emerald focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Empresa Constructora *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ej. Constructora Andina SpA"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-emerald focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Rol en la Obra *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:border-brand-emerald focus:outline-none"
                    >
                      <option value="Administrador de Obra">Administrador de Obra</option>
                      <option value="Jefe de Terreno">Jefe de Terreno</option>
                      <option value="Gerente de Operaciones">Gerente de Operaciones</option>
                      <option value="Encargado SSOMA / Sustentabilidad">Encargado SSOMA</option>
                      <option value="Jefe de Bodega / Logística">Jefe de Bodega</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ciudad / Ubicación *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      required
                      type="text"
                      placeholder="Ej. Santiago, Concepción, etc."
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-emerald focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      required
                      type="tel"
                      placeholder="+56 9 8765 4321"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-emerald focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Correo Corporativo *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      required
                      type="email"
                      placeholder="obra@constructora.cl"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-emerald focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3.5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeQrApp}
                    onChange={(e) =>
                      setFormData({ ...formData, includeQrApp: e.target.checked })
                    }
                    className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-brand-emerald focus:ring-brand-emerald"
                  />
                  <span className="text-xs text-slate-300 leading-snug">
                    Solicitar Piloto de 30 días con <strong>2 Módulos M-LSA</strong> + App QR de portería e informes automáticos para <strong>Ley REP y Sinader</strong>.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-brand-emerald/25 hover:bg-emerald-400 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generando Protocolo de Piloto...
                    </>
                  ) : (
                    <>
                      Solicitar Carta de Intención (LOI) & Demo
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/40">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className="mt-4 text-2xl font-black text-white">
              ¡Solicitud de Piloto Registrada!
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
              Hemos emitido la <strong>Carta de Intención (LOI)</strong> para el proyecto{" "}
              <span className="text-brand-emerald font-semibold">{formData.projectName}</span>{" "}
              de <span className="text-white font-semibold">{formData.companyName}</span>.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-950/80 border border-slate-800 p-4 text-left text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Entrega en faena estimada:</span>
                <span className="font-mono text-brand-emerald font-bold">48 - 72 hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Equipamiento asignado:</span>
                <span className="font-semibold text-white">2 Carros M-LSA + PWA QR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contacto de coordinación:</span>
                <span className="font-mono text-brand-amber">{formData.phone}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 rounded-xl bg-slate-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-700"
            >
              Cerrar y Volver a la Landing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
