import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Faena Limpia | Logística Circular en Obra y Trazabilidad de Residuos",
  description:
    "Ordena el abastecimiento en piso y elimina los escombros en edificios en construcción. Subida de materiales con código QR y retiro separado bajo Ley REP N° 20.920.",
  keywords: [
    "Faena Limpia",
    "Logística construcción Chile",
    "Ley REP 20920",
    "Sinader",
    "Residuos de construcción",
    "INACAP",
    "Bodega en piso",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-brand-dark text-slate-800 min-h-screen antialiased selection:bg-brand-emerald selection:text-brand-ink">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
