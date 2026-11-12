"use client";

import React from "react";
import { motion } from "framer-motion";
import { FLOW_STAGES } from "@/data/mlsa-content";
import { useCountUp } from "@/components/CountUp";

const GREEN = "#00b84a";
const ORANGE = "#ff6a00";
const INK = "#14213d";
const YELLOW = "#ffd60a";
const SKY = "#0ea5e9";

const GROUND_Y = 290;
const FLOOR_SLABS = [110, 170, 230]; // losas intermedias; techo en y=50, suelo en GROUND_Y
const CART_W = 44;
const CART_H = 30;

/** Posición (esquina sup. izq.) y carga del carro por etapa; `via` es el punto de paso para no cortar en diagonal. */
const CART_BY_STAGE = [
  { x: 66, y: 254, via: [66, 254], load: 1 }, // portería
  { x: 128, y: 164, via: [128, 254], load: 1 }, // subiendo
  { x: 200, y: 74, via: [128, 74], load: 0.3 }, // en piso, descargando
  { x: 200, y: 74, via: [200, 74], load: 0.85 }, // en piso, cargando despuntes
  { x: 128, y: 164, via: [128, 74], load: 0.85 }, // bajando
  { x: 40, y: 254, via: [128, 254], load: 0.85 }, // balanza en patio
];

const Worker = ({ x, feetY }: { x: number; feetY: number }) => (
  <g>
    <rect x={x - 5} y={feetY - 22} width={10} height={22} rx={3} fill={SKY} stroke={INK} strokeWidth={1.5} />
    <circle cx={x} cy={feetY - 27} r={5} fill="#fcd9b6" stroke={INK} strokeWidth={1.5} />
    <path d={`M${x - 6.5} ${feetY - 28} a6.5 6.5 0 0 1 13 0 z`} fill={YELLOW} stroke={INK} strokeWidth={1.5} />
  </g>
);

/** Cuadraditos que viajan en bucle entre dos puntos (material que sale / despuntes que entran). */
const Particles = ({ fromX, toX, y, color }: { fromX: number; toX: number; y: number; color: string }) => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.rect
        key={i}
        width={9}
        height={9}
        rx={2}
        y={y}
        fill={color}
        stroke={INK}
        strokeWidth={1.5}
        initial={{ x: fromX, opacity: 0 }}
        animate={{ x: [fromX, toX], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </>
);

const Building = ({ dimShaft }: { dimShaft?: boolean }) => (
  <g>
    {/* cielo y suelo */}
    <rect width={400} height={GROUND_Y} fill="#e0f2fe" />
    <circle cx={352} cy={30} r={14} fill={YELLOW} />
    <rect y={GROUND_Y} width={400} height={30} fill="#e7dcc8" />
    <line x1={0} y1={GROUND_Y} x2={400} y2={GROUND_Y} stroke={INK} strokeWidth={3} />
    {/* montacargas */}
    <rect x={120} y={50} width={60} height={240} fill={dimShaft ? "#e2e8f0" : "#ffffff"} stroke={INK} strokeWidth={3} />
    <text x={150} y={42} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
      MONTACARGAS
    </text>
    {/* torre en obra gruesa */}
    <rect x={180} y={50} width={210} height={240} fill="#fffdf8" stroke={INK} strokeWidth={3} />
    {FLOOR_SLABS.map((y) => (
      <line key={y} x1={180} y1={y} x2={390} y2={y} stroke={INK} strokeWidth={3} />
    ))}
    <line x1={285} y1={110} x2={285} y2={GROUND_Y} stroke="#cbd5e1" strokeWidth={5} />
    <text x={384} y={63} textAnchor="end" fontSize={9} fontWeight={800} fill={INK}>
      PISO 8 · CUADRILLA
    </text>
    <text x={8} y={309} fontSize={9} fontWeight={800} fill={INK}>
      NIVEL 0 · PORTERÍA Y PATIO
    </text>
  </g>
);

/** El circuito con Faena Limpia: un carro que sube verde con material y baja naranja con despuntes. */
const WithSystem = ({ stageIndex }: { stageIndex: number }) => {
  const stage = FLOW_STAGES[stageIndex];
  const cart = CART_BY_STAGE[stageIndex];
  const isUp = stage.phase === "UP";
  const color = isUp ? GREEN : ORANGE;
  const kg = useCountUp(180, stageIndex === 5, 2.4); // termina de contar cuando el carro ya está en la balanza
  const loadH = (CART_H - 6) * cart.load;

  return (
    <g>
      <Building />
      {/* recorrido punteado: corre hacia arriba en subida y hacia abajo en bajada */}
      <line
        x1={150}
        y1={56}
        x2={150}
        y2={284}
        stroke={color}
        strokeWidth={3}
        strokeDasharray="6 6"
        className="motion-safe:animate-dash"
        style={{ animationDirection: isUp ? "reverse" : "normal" }}
      />

      <Worker x={310} feetY={110} />
      <Worker x={345} feetY={110} />

      {/* etapa 1: camión + escaneo QR */}
      <motion.g initial={false} animate={{ x: stageIndex === 0 ? 0 : -80 }} transition={{ duration: 0.6 }}>
        <rect x={4} y={262} width={38} height={22} rx={2} fill="#ffffff" stroke={INK} strokeWidth={2.5} />
        <rect x={42} y={268} width={16} height={16} rx={2} fill={SKY} stroke={INK} strokeWidth={2.5} />
        <circle cx={16} cy={286} r={4.5} fill={INK} />
        <circle cx={48} cy={286} r={4.5} fill={INK} />
      </motion.g>
      <motion.g initial={false} animate={{ opacity: stageIndex === 0 ? 1 : 0, scale: stageIndex === 0 ? 1 : 0.6 }}>
        <motion.rect
          x={72}
          y={206}
          width={32}
          height={32}
          rx={6}
          fill="none"
          stroke={SKY}
          strokeWidth={3}
          animate={{ scale: [1, 1.35], opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <rect x={76} y={210} width={24} height={24} rx={4} fill="#ffffff" stroke={INK} strokeWidth={2} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={80 + (i % 2) * 10} y={214 + Math.floor(i / 2) * 10} width={6} height={6} fill={INK} />
        ))}
        <text x={88} y={200} textAnchor="middle" fontSize={10} fontWeight={800} fill={SKY}>
          QR ✓ Piso 8
        </text>
      </motion.g>

      {/* etapas 3 y 4: material que sale, despuntes que entran */}
      {stageIndex === 2 && <Particles fromX={246} toX={292} y={92} color={GREEN} />}
      {stageIndex === 3 && <Particles fromX={292} toX={246} y={92} color={ORANGE} />}

      {/* etapa 6: balanza + kilos + sello */}
      <motion.g
        initial={false}
        animate={{ opacity: stageIndex === 5 ? 1 : 0 }}
        transition={{ delay: stageIndex === 5 ? 1 : 0 }}
      >
        <rect x={30} y={286} width={64} height={7} rx={2} fill={INK} />
        <rect x={22} y={194} width={80} height={36} rx={8} fill="#ffffff" stroke={INK} strokeWidth={2.5} />
        <text x={62} y={210} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>
          {Math.round(kg)} kg
        </text>
        <text x={62} y={223} textAnchor="middle" fontSize={9} fontWeight={800} fill={GREEN}>
          Sinader ✓
        </text>
      </motion.g>

      {/* el carro */}
      <motion.g
        initial={false}
        animate={{ x: [null, cart.via[0], cart.x], y: [null, cart.via[1], cart.y] }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      >
        <path d={`M8 0 v-6 M${CART_W - 8} 0 v-6`} stroke={INK} strokeWidth={2.5} />
        <rect width={CART_W} height={CART_H} rx={4} fill="#ffffff" stroke={INK} strokeWidth={2.5} />
        <motion.rect
          x={3}
          width={CART_W - 6}
          rx={2}
          initial={false}
          animate={{ fill: color, height: loadH, y: CART_H - 3 - loadH }}
          transition={{ duration: 1.2 }}
        />
        <circle cx={10} cy={CART_H + 3} r={4} fill={INK} />
        <circle cx={CART_W - 10} cy={CART_H + 3} r={4} fill={INK} />
        <text x={CART_W / 2} y={-9} textAnchor="middle" fontSize={13} fontWeight={900} fill={color}>
          {isUp ? "▲" : "▼"}
        </text>
      </motion.g>
    </g>
  );
};

/** La obra sin el sistema: escombro en cada piso, material bajo la lluvia y maestros yendo a bodega. */
const WithoutSystem = () => (
  <g>
    <Building dimShaft />
    {/* escombros que se acumulan en los pasillos */}
    {[110, 170, 230, GROUND_Y].map((floorY, i) => (
      <motion.g
        key={floorY}
        style={{ originY: 1 }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1] }}
        transition={{ duration: 4, times: [0, 0.3, 1], delay: i * 0.5, repeat: Infinity }}
      >
        <path
          d={`M${205 + i * 22} ${floorY} l10 -16 l12 8 l9 -13 l14 21 z`}
          fill="#a8a29e"
          stroke={INK}
          strokeWidth={2}
        />
        <rect x={232 + i * 22} y={floorY - 9} width={16} height={8} fill="#b45309" stroke={INK} strokeWidth={2} />
      </motion.g>
    ))}
    {/* material mojándose en el patio */}
    <ellipse cx={60} cy={196} rx={34} ry={12} fill="#94a3b8" stroke={INK} strokeWidth={2} />
    {[36, 48, 60, 72, 84].map((x, i) => (
      <line
        key={x}
        x1={x}
        y1={214}
        x2={x - 3}
        y2={224}
        stroke={SKY}
        strokeWidth={2.5}
        strokeLinecap="round"
        className="motion-safe:animate-rain"
        style={{ animationDelay: `${i * 0.17}s` }}
      />
    ))}
    {[0, 1, 2].map((i) => (
      <rect key={i} x={30} y={280 - i * 9} width={60} height={8} fill="#fbbf24" stroke={INK} strokeWidth={2} />
    ))}
    {/* maestro que baja y sube a buscar material */}
    <motion.g animate={{ y: [0, -180, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      <Worker x={150} feetY={GROUND_Y - 2} />
    </motion.g>
    <rect x={8} y={8} width={166} height={20} rx={10} fill="#dc2626" />
    <text x={91} y={22} textAnchor="middle" fontSize={10} fontWeight={800} fill="#ffffff">
      60 min/día buscando material
    </text>
  </g>
);

/**
 * Escena animada del proceso. `mode="con"` muestra el circuito de 6 etapas (`stageIndex` 0–5 de FLOW_STAGES);
 * `mode="sin"` muestra el problema que resuelve.
 */
export function ProcessScene({
  stageIndex = 0,
  mode = "con",
  className = "",
}: {
  stageIndex?: number;
  mode?: "con" | "sin";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 320"
      role="img"
      aria-label={
        mode === "sin"
          ? "Obra sin Faena Limpia: escombros en los pisos, material bajo la lluvia y maestros bajando a bodega"
          : `Circuito Faena Limpia, etapa ${FLOW_STAGES[stageIndex].short}: ${FLOW_STAGES[stageIndex].title}`
      }
      className={`w-full rounded-2xl border-2 border-brand-ink ${className}`}
    >
      {mode === "sin" ? <WithoutSystem /> : <WithSystem stageIndex={stageIndex} />}
    </svg>
  );
}
