import type { Metadata } from "next";
import { BuildingSimulator } from "@/components/BuildingSimulator";

export const metadata: Metadata = {
  title: "Simulador de Edificio | Faena Limpia",
};

export default function SimuladorPage() {
  return <BuildingSimulator />;
}
