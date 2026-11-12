"use client";

import React from "react";
import { motion } from "framer-motion";
import { FLOOR_PLAN, SITE_PLAN } from "@/data/mlsa-content";
import { FloorStatus, WasteTotalsKg, WasteType } from "@/types/mlsa";

const GREEN = "#00b84a";
const ORANGE = "#ff6a00";
const ORANGE_DARK = "#c2410c";
const INK = "#14213d";
const SKY = "#0ea5e9";

type Rect = { x: number; y: number; w: number; h: number };
const cx = (r: Rect) => r.x + r.w / 2;
const cy = (r: Rect) => r.y + r.h / 2;

const Box = ({ r, fill, label, sub }: { r: Rect; fill: string; label: string; sub?: string }) => (
  <g>
    <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={fill} stroke={INK} strokeWidth={2.5} />
    <text x={cx(r)} y={cy(r) + (sub ? -1 : 3)} textAnchor="middle" fontSize={7.5} fontWeight={900} fill={INK}>
      {label}
    </text>
    {sub && (
      <text x={cx(r)} y={cy(r) + 9} textAnchor="middle" fontSize={6.5} fontWeight={600} fill="#475569">
        {sub}
      </text>
    )}
  </g>
);

/**
 * Plano general de la faena: por dónde entra el material, por dónde bajan los desechos y cómo se apilan
 * en el patio de acopio (una pila por tipo; la altura crece con los kg pesados).
 */
export function SitePlanMap({
  floor,
  totalFloors,
  wasteTotalsKg,
}: {
  floor: FloorStatus;
  totalFloors: number;
  wasteTotalsKg: WasteTotalsKg;
}) {
  const { lot, gateIn, gateOut, gatehouse, warehouse, tower, lift, scale, yard, kgPerBlock, maxBlocks } = SITE_PLAN;
  const isWaste = floor.moduleState === "COLLECTING_WASTE";
  const isSupply = floor.moduleState === "DELIVERING_SUPPLIES";
  const bayW = yard.w / FLOOR_PLAN.wasteSlots.length;
  const laneY = cy(scale);

  return (
    <svg
      viewBox="0 0 480 300"
      role="img"
      aria-label={`Plano general de la faena: portería con QR, torre de ${totalFloors} pisos, montacargas, balanza y patio de acopio con una pila por tipo de desecho`}
      className="w-full rounded-2xl border-2 border-brand-ink bg-white"
    >
      {/* terreno y calle */}
      <rect x={lot.x} y={lot.y} width={lot.w} height={lot.h} fill="#f5efe0" stroke={INK} strokeWidth={3} />
      <rect x={0} y={lot.y + lot.h + 2} width={480} height={38} fill="#cbd5e1" />
      <text x={240} y={287} textAnchor="middle" fontSize={8} fontWeight={800} fill="#475569" letterSpacing={2}>
        CALLE
      </text>
      {[
        { g: gateIn, label: "ENTRA MATERIAL", color: GREEN },
        { g: gateOut, label: "SALE A RECICLAJE", color: ORANGE },
      ].map(({ g, label, color }) => (
        <g key={label}>
          <rect x={g.x} y={g.y + 6} width={g.w} height={g.h} fill={color} stroke={INK} strokeWidth={2} />
          <text x={cx(g)} y={g.y + 30} textAnchor="middle" fontSize={6.5} fontWeight={900} fill={INK}>
            {label}
          </text>
        </g>
      ))}

      {/* rutas: verde = material hacia el montacargas; naranja = desechos hacia balanza y patio */}
      <path
        d={`M${cx(gateIn)} ${gateIn.y + 6} V${laneY} H${cx(lift)} V${lift.y + lift.h}`}
        fill="none"
        stroke={GREEN}
        strokeWidth={isSupply ? 3.5 : 2}
        strokeOpacity={isSupply ? 1 : 0.45}
        strokeDasharray="6 6"
        className={isSupply ? "motion-safe:animate-dash" : undefined}
      />
      <path
        d={`M${cx(lift) + 8} ${lift.y + lift.h} V${laneY + 8} H${yard.x} M${cx(gateOut)} ${yard.y + yard.h} V${gateOut.y + 6}`}
        fill="none"
        stroke={ORANGE}
        strokeWidth={isWaste ? 3.5 : 2}
        strokeOpacity={isWaste ? 1 : 0.45}
        strokeDasharray="6 6"
        className={isWaste ? "motion-safe:animate-dash" : undefined}
      />

      <Box r={warehouse} fill="#ffffff" label="BODEGA" sub="central" />
      <Box r={gatehouse} fill="#e0f2fe" label="PORTERÍA" sub="QR" />
      <rect x={gatehouse.x - 5} y={gatehouse.y + 8} width={5} height={14} fill={SKY} stroke={INK} strokeWidth={1.5} />
      <Box r={tower} fill="#fffdf8" label={`TORRE · ${totalFloors} PISOS`} sub={`viendo Piso ${floor.floorNumber}`} />
      <Box r={lift} fill="#e0f2fe" label="MC" />
      <text x={lift.x + lift.w - 2} y={lift.y - 5} textAnchor="end" fontSize={6.5} fontWeight={800} fill={INK}>
        MONTACARGAS
      </text>
      <Box r={scale} fill="#ffffff" label="BALANZA" />

      {/* patio de acopio: apilamiento por tipo de desecho */}
      <rect x={yard.x} y={yard.y} width={yard.w} height={yard.h} fill={ORANGE} fillOpacity={0.12} stroke={INK} strokeWidth={2.5} />
      <text x={cx(yard)} y={yard.y - 5} textAnchor="middle" fontSize={8} fontWeight={900} fill={ORANGE_DARK}>
        PATIO DE ACOPIO · UNA PILA POR TIPO
      </text>
      {FLOOR_PLAN.wasteSlots.map((slot, i) => {
        const kg = wasteTotalsKg[slot.key as WasteType] ?? 0;
        const blocks = Math.min(maxBlocks, Math.ceil(kg / kgPerBlock));
        const active = isWaste && floor.wasteType === slot.key;
        const x = yard.x + i * bayW;
        const baseY = yard.y + yard.h - 22;
        return (
          <g key={slot.key}>
            <rect
              x={x + 3}
              y={yard.y + 3}
              width={bayW - 6}
              height={yard.h - 6}
              rx={3}
              fill={active ? ORANGE : "#ffffff"}
              fillOpacity={active ? 0.3 : 0.6}
              stroke={active ? ORANGE_DARK : "#94a3b8"}
              strokeWidth={active ? 2.5 : 1}
              strokeDasharray={active ? undefined : "3 3"}
            />
            {Array.from({ length: blocks }, (_, b) => (
              <motion.rect
                key={b}
                x={x + 9}
                y={baseY - (b + 1) * 8}
                width={bayW - 18}
                height={7}
                rx={1.5}
                fill={ORANGE}
                stroke={INK}
                strokeWidth={1.5}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: b * 0.06 }}
              />
            ))}
            <text x={x + bayW / 2} y={yard.y + yard.h - 14} textAnchor="middle" fontSize={6.5} fontWeight={900} fill={INK}>
              {slot.label}
            </text>
            <text x={x + bayW / 2} y={yard.y + yard.h - 6} textAnchor="middle" fontSize={6} fontWeight={700} fill="#475569">
              {kg.toLocaleString("es-CL")} kg
            </text>
          </g>
        );
      })}
      <text x={lot.x + lot.w - 14} y={lot.y + 16} textAnchor="middle" fontSize={8} fontWeight={900} fill={INK}>
        N ↑
      </text>
    </svg>
  );
}
