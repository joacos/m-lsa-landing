import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M-LSA | Sistema de Logística Modular Circular & Trazabilidad RCD",
  description:
    "Optimiza la milla intermedia y elimina los residuos en faena de edificación en altura. Flujo bidireccional de insumos JIT con QR y logística inversa de mermas bajo Ley REP N° 20.920.",
  keywords: [
    "M-LSA",
    "Logística circular construcción",
    "Ley REP 20920",
    "Sinader",
    "RCD edificación",
    "INACAP",
    "Acopio satélite",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-brand-dark text-slate-100 min-h-screen antialiased selection:bg-brand-emerald selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
