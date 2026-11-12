"use client";

import React from "react";
import { motion } from "framer-motion";
import { FLOOR_PLAN } from "@/data/mlsa-content";
import { FloorStatus } from "@/types/mlsa";

const GREEN = "#00b84a";
const GREEN_DARK = "#047a3b";
const ORANGE = "#ff6a00";
const ORANGE_DARK = "#c2410c";
const INK = "#14213d";
const YELLOW = "#ffd60a";
const CORRIDOR_Y = 130;

type Rect = { x: number; y: number; w: number; h: number };

/** Zona con casilleros rotulados (uno por tipo de material o de desecho); resalta el casillero activo. */
const Bay = ({
  zone,
  title,
  slots,
  activeIndex,
  color,
  colorDark,
}: {
  zone: Rect;
  title: string;
  slots: { key: string; label: string }[];
  activeIndex: number | null;
  color: string;
  colorDark: string;
}) => {
  const slotW = zone.w / slots.length;
  return (
    <g>
      <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} fill={color} fillOpacity={0.14} stroke={INK} strokeWidth={2.5} />
      <text x={zone.x + zone.w / 2} y={zone.y + 18} textAnchor="middle" fontSize={9} fontWeight={900} fill={colorDark}>
        {title}
      </text>
      {slots.map((slot, i) => {
        const active = i === activeIndex;
        return (
          <g key={slot.key}>
            <rect
              x={zone.x + i * slotW + 3}
              y={zone.y + zone.h - 62}
              width={slotW - 6}
              height={56}
              rx={3}
              fill={active ? color : "#ffffff"}
              fillOpacity={active ? 0.45 : 0.7}
              stroke={active ? colorDark : "#94a3b8"}
              strokeWidth={active ? 2.5 : 1}
              strokeDasharray={active ? undefined : "3 3"}
            />
            <text
              x={zone.x + (i + 0.5) * slotW}
              y={zone.y + zone.h - 10}
              textAnchor="middle"
              fontSize={6.5}
              fontWeight={active ? 900 : 600}
              fill={active ? INK : "#64748b"}
            >
              {slot.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/**
 * Plano de planta del piso seleccionado: Zona A (materiales), Zona B (desechos por tipo), montacargas,
 * frente de trabajo y pasillo. El carro se mueve a la zona que corresponde a su estado.
 */
export function FloorPlanMap({ floor }: { floor: FloorStatus }) {
  const { lift, materials, waste, workFronts, materialSlots, wasteSlots } = FLOOR_PLAN;
  const state = floor.moduleState;
  const matIdx = Math.max(0, materialSlots.findIndex((s) => s.key === floor.materialType));
  const wasteIdx = Math.max(0, wasteSlots.findIndex((s) => s.key === floor.wasteType));
  const slotCenter = (zone: Rect, count: number, i: number) => ({
    x: zone.x + (zone.w / count) * (i + 0.5),
    y: zone.y + zone.h - 38,
  });
  const liftCenter = { x: lift.x + lift.w / 2, y: lift.y + lift.h / 2 };
  const matSlot = slotCenter(materials, materialSlots.length, matIdx);
  const wasteSlot = slotCenter(waste, wasteSlots.length, wasteIdx);

  const isWaste = state === "COLLECTING_WASTE";
  const cart = state === "STORED_SATELITE" ? matSlot : isWaste ? wasteSlot : liftCenter;
  const work = workFronts[floor.floorNumber % workFronts.length];
  // Ruta punteada: del montacargas a la Zona A al subir; de la Zona B al montacargas al bajar.
  const routeTo = state === "DELIVERING_SUPPLIES" ? matSlot : isWaste ? wasteSlot : null;

  return (
    <svg
      viewBox="0 0 480 260"
      role="img"
      aria-label={`Plano del piso ${floor.floorNumber}: Zona A de materiales junto al montacargas, Zona B de desechos separados por tipo, pasillo despejado y frente de trabajo de la cuadrilla`}
      className="w-full rounded-2xl border-2 border-brand-ink bg-white"
    >
      {/* losa y pasillo */}
      <rect x={10} y={10} width={460} height={240} fill="#fffdf8" stroke={INK} strokeWidth={3} />
      <rect x={10} y={110} width={460} height={40} fill="#f1f5f9" />
      <text x={240} y={145} textAnchor="middle" fontSize={7} fontWeight={700} fill="#94a3b8" letterSpacing={1.5}>
        PASILLO SIEMPRE DESPEJADO
      </text>

      {/* recintos */}
      <path d="M10 110 H70 M410 110 H470 M10 150 H470 M125 150 V250 M240 150 V250 M355 150 V250" stroke={INK} strokeWidth={2.5} fill="none" />
      {workFronts
        .filter((room) => room !== work)
        .map((room) => (
          <text key={room.x} x={room.x + room.w / 2} y={room.y + 54} textAnchor="middle" fontSize={7} fontWeight={700} fill="#cbd5e1" letterSpacing={1.5}>
            RECINTO
          </text>
        ))}
      <rect x={work.x} y={work.y} width={work.w} height={work.h} fill={YELLOW} fillOpacity={0.35} stroke={INK} strokeWidth={2.5} strokeDasharray="6 4" />
      <text x={work.x + work.w / 2} y={work.y + 22} textAnchor="middle" fontSize={8} fontWeight={900} fill={INK}>
        FRENTE DE TRABAJO
      </text>
      <text x={work.x + work.w / 2} y={work.y + 34} textAnchor="middle" fontSize={6.5} fill="#475569">
        {floor.supervisor.replace(/^.*\((.*)\)$/, "$1")}
      </text>
      {[-14, 14].map((dx) => (
        <g key={dx}>
          <circle cx={work.x + work.w / 2 + dx} cy={work.y + 60} r={7} fill={YELLOW} stroke={INK} strokeWidth={2} />
          <circle cx={work.x + work.w / 2 + dx} cy={work.y + 60} r={3} fill="#fcd9b6" stroke={INK} strokeWidth={1} />
        </g>
      ))}

      {/* núcleo: montacargas + escalera */}
      <rect x={lift.x} y={lift.y} width={lift.w} height={lift.h} fill="#e0f2fe" stroke={INK} strokeWidth={2.5} />
      <text transform={`rotate(-90 ${lift.x + 12} ${liftCenter.y})`} x={lift.x + 12} y={liftCenter.y + 3} textAnchor="middle" fontSize={7} fontWeight={900} fill={INK}>
        MONTACARGAS
      </text>
      <rect x={240} y={10} width={40} height={100} fill="#e2e8f0" stroke={INK} strokeWidth={2.5} />
      {[22, 34, 46, 58, 70, 82, 94].map((y) => (
        <line key={y} x1={244} y1={y} x2={276} y2={y} stroke="#94a3b8" strokeWidth={1.5} />
      ))}
      <text transform="rotate(-90 263 60)" x={263} y={63} textAnchor="middle" fontSize={7} fontWeight={800} fill="#475569">
        ESCALERA
      </text>

      <Bay
        zone={materials}
        title="ZONA A · MATERIALES"
        slots={materialSlots}
        activeIndex={state === "DELIVERING_SUPPLIES" || state === "STORED_SATELITE" ? matIdx : null}
        color={GREEN}
        colorDark={GREEN_DARK}
      />
      <Bay
        zone={waste}
        title="ZONA B · DESECHOS"
        slots={wasteSlots}
        activeIndex={isWaste ? wasteIdx : null}
        color={ORANGE}
        colorDark={ORANGE_DARK}
      />

      {routeTo && (
        <path
          d={`M${liftCenter.x} ${lift.y + lift.h} V${CORRIDOR_Y} H${routeTo.x} V${routeTo.y + 12}`}
          fill="none"
          stroke={isWaste ? ORANGE : GREEN}
          strokeWidth={2.5}
          strokeDasharray="6 6"
          className="motion-safe:animate-dash"
          style={{ animationDirection: isWaste ? "reverse" : "normal" }}
        />
      )}

      {/* el carro (vista en planta): sale al pasillo, avanza y entra a su casillero */}
      <motion.g
        initial={false}
        animate={{ x: cart.x, y: [null, CORRIDOR_Y, CORRIDOR_Y, cart.y], opacity: state === "EMPTY" ? 0 : 1 }}
        transition={{
          y: { duration: 1.3, times: [0, 0.3, 0.7, 1], ease: "easeInOut" },
          x: { delay: 0.39, duration: 0.52, ease: "easeInOut" }, // x solo avanza mientras está en el pasillo
        }}
      >
        <rect x={-13} y={-9} width={26} height={18} rx={3} fill={isWaste ? ORANGE : GREEN} stroke={INK} strokeWidth={2.5} />
        <text y={3} textAnchor="middle" fontSize={8} fontWeight={900} fill={INK}>
          {isWaste ? "▼" : "▲"}
        </text>
      </motion.g>

      <text x={440} y={30} textAnchor="middle" fontSize={8} fontWeight={900} fill={INK}>
        N ↑
      </text>
    </svg>
  );
}
