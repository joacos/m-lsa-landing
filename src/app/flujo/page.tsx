import type { Metadata } from "next";
import { DualFlowShowcase } from "@/components/DualFlowShowcase";

export const metadata: Metadata = {
  title: "Flujo Doble | Faena Limpia",
};

export default function FlujoPage() {
  return <DualFlowShowcase />;
}
