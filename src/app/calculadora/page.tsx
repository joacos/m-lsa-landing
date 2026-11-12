import type { Metadata } from "next";
import { RoiCalculator } from "@/components/RoiCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Ahorro | Faena Limpia",
};

export default function CalculadoraPage() {
  return <RoiCalculator />;
}
