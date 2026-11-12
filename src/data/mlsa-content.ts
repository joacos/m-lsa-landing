import {
  FloorLayoutId,
  FloorStatus,
  OperationEvent,
  RoiParams,
  WasteCategory,
  WasteTotalsKg,
} from "@/types/mlsa";

export const DEFAULT_WASTE_TOTALS_KG: WasteTotalsKg = {
  "Despuntes de Madera": 1240,
  "Despuntes Metálicos": 890,
  "Cartón / Film Embalaje": 640,
  "Escombro Limpio": 1520,
};

export const DEFAULT_ROI_PARAMS: RoiParams = {
  floors: 14,
  workers: 65,
  materialBudgetMillion: 55,
};

export const DEFAULT_EVENTS: OperationEvent[] = [
  {
    id: "evt-1",
    timestamp: "Hace 2 min",
    floorNumber: 10,
    moduleId: "FL-10C",
    action: "Carro al 90% en piso",
    detail: "Despuntes de Madera listos para bajar a patio",
    kind: "WASTE",
  },
  {
    id: "evt-2",
    timestamp: "Hace 4 min",
    floorNumber: 12,
    moduleId: "FL-12A",
    action: "Subiendo por montacargas",
    detail: "Volcanita / Yeso para Cuadrilla Tabiquería",
    kind: "SUPPLY",
  },
  {
    id: "evt-3",
    timestamp: "Hace 9 min",
    floorNumber: 8,
    moduleId: "FL-08B",
    action: "Cargando embalaje limpio",
    detail: "Cartón / Film Embalaje en Piso 8",
    kind: "WASTE",
  },
];

export const MLSA_SYSTEM_DATA = {
  pricing: {
    monthlySubscriptionClp: 850000,
    estimatedSavingsPerMonthClp: 3200000,
    roiRatio: 3.7,
  },
  kpis: [
    {
      id: "search-time",
      label: "Búsqueda de Materiales",
      value: "-85%",
      subvalue: "60 min → 8 min",
      detail: "Despacho directo en cada piso",
      icon: "Clock",
    },
    {
      id: "waste-drop",
      label: "Pérdidas por Clima",
      value: "< 2%",
      subvalue: "Cero humedad y roturas",
      detail: "Carros de acero galvanizado sellados",
      icon: "ShieldCheck",
    },
    {
      id: "rep-compliance",
      label: "Respaldo Ley REP",
      value: "100%",
      subvalue: "Sinader y RETC",
      detail: "Certificados digitales con código QR",
      icon: "QrCode",
    },
    {
      id: "roi-multiple",
      label: "Retorno del Servicio",
      value: "3.7x",
      subvalue: "$0 en compra de equipos",
      detail: "Arriendo mensual 100% gasto de obra",
      icon: "TrendingUp",
    },
  ],
  wasteTypes: [
    {
      type: "Madera y Moldajes",
      wasteKey: "Despuntes de Madera",
      icon: "TreePine",
      recyclingRate: "85%",
      sinaderCode: "RCD-MAD-01",
      description: "Despuntes secos, listones y pallets para reciclaje o chip de madera.",
    },
    {
      type: "Despuntes Metálicos",
      wasteKey: "Despuntes Metálicos",
      icon: "Wrench",
      recyclingRate: "98%",
      sinaderCode: "RCD-MET-03",
      description: "Fierro estriado, perfiles de volcometal y restos de cañería.",
    },
    {
      type: "Envases y Embalajes (Ley REP)",
      wasteKey: "Cartón / Film Embalaje",
      icon: "PackageCheck",
      recyclingRate: "100%",
      sinaderCode: "REP-ENV-05",
      description: "Film de embalaje (alusa), zunchos plásticos, sacos limpios y cajas de cartón.",
    },
    {
      type: "Volcanita y Escombro Limpio",
      wasteKey: "Escombro Limpio",
      icon: "Layers",
      recyclingRate: "60%",
      sinaderCode: "RCD-YES-02",
      description: "Retazos de planchas de volcanita para estabilizado y áridos reciclados.",
    },
  ] as WasteCategory[],
  initialFloors: [
    {
      floorNumber: 12,
      activeModuleId: "FL-12A",
      moduleState: "DELIVERING_SUPPLIES",
      materialType: "Volcanita / Yeso",
      fillLevelPercentage: 80,
      supervisor: "M. González (Cuadrilla Tabiquería)",
      qrToken: "QR-FL12-SUP-0842",
      lastUpdated: "Hace 4 min",
    },
    {
      floorNumber: 11,
      activeModuleId: "FL-11B",
      moduleState: "STORED_SATELITE",
      materialType: "Ferretería / Pernos",
      fillLevelPercentage: 45,
      supervisor: "C. Morales (Instalaciones)",
      qrToken: "QR-FL11-SAT-0771",
      lastUpdated: "Hace 12 min",
    },
    {
      floorNumber: 10,
      activeModuleId: "FL-10C",
      moduleState: "COLLECTING_WASTE",
      materialType: "Residuos Separados",
      wasteType: "Despuntes de Madera",
      fillLevelPercentage: 90,
      supervisor: "R. Araya (Prevención / Cuadrilla Aseo)",
      qrToken: "QR-FL10-WST-0649",
      lastUpdated: "Hace 2 min",
    },
    {
      floorNumber: 9,
      activeModuleId: "FL-09A",
      moduleState: "DELIVERING_SUPPLIES",
      materialType: "Madera / Moldajes",
      fillLevelPercentage: 65,
      supervisor: "E. Fuentes (Estructuras)",
      qrToken: "QR-FL09-SUP-0590",
      lastUpdated: "Hace 18 min",
    },
    {
      floorNumber: 8,
      activeModuleId: "FL-08B",
      moduleState: "COLLECTING_WASTE",
      materialType: "Residuos Separados",
      wasteType: "Cartón / Film Embalaje",
      fillLevelPercentage: 75,
      supervisor: "J. Tapia (Terminaciones)",
      qrToken: "QR-FL08-WST-0512",
      lastUpdated: "Hace 9 min",
    },
    {
      floorNumber: 7,
      activeModuleId: "FL-07A",
      moduleState: "STORED_SATELITE",
      materialType: "Volcanita / Yeso",
      fillLevelPercentage: 30,
      supervisor: "H. Vargas (Tabiquería)",
      qrToken: "QR-FL07-SAT-0431",
      lastUpdated: "Hace 25 min",
    },
    {
      floorNumber: 6,
      activeModuleId: "FL-06C",
      moduleState: "COLLECTING_WASTE",
      materialType: "Residuos Separados",
      wasteType: "Despuntes Metálicos",
      fillLevelPercentage: 85,
      supervisor: "S. Peña (Fierreros)",
      qrToken: "QR-FL06-WST-0388",
      lastUpdated: "Hace 7 min",
    },
    {
      floorNumber: 5,
      activeModuleId: "FL-05A",
      moduleState: "DELIVERING_SUPPLIES",
      materialType: "Ferretería / Pernos",
      fillLevelPercentage: 95,
      supervisor: "A. Castro (Climatización)",
      qrToken: "QR-FL05-SUP-0315",
      lastUpdated: "Hace 15 min",
    },
    {
      floorNumber: 4,
      activeModuleId: "FL-04B",
      moduleState: "STORED_SATELITE",
      materialType: "Madera / Moldajes",
      fillLevelPercentage: 50,
      supervisor: "D. Orellana (Moldajes)",
      qrToken: "QR-FL04-SAT-0274",
      lastUpdated: "Hace 30 min",
    },
    {
      floorNumber: 3,
      activeModuleId: "FL-03C",
      moduleState: "COLLECTING_WASTE",
      materialType: "Residuos Separados",
      wasteType: "Escombro Limpio",
      fillLevelPercentage: 70,
      supervisor: "P. Rivas (Albañilería)",
      qrToken: "QR-FL03-WST-0219",
      lastUpdated: "Hace 11 min",
    },
    {
      floorNumber: 2,
      activeModuleId: "FL-02A",
      moduleState: "EMPTY",
      materialType: "Volcanita / Yeso",
      fillLevelPercentage: 0,
      supervisor: "En espera de reposición",
      qrToken: "QR-FL02-EMP-0144",
      lastUpdated: "Hace 1 hora",
    },
    {
      floorNumber: 1,
      activeModuleId: "FL-01A",
      moduleState: "DELIVERING_SUPPLIES",
      materialType: "Ferretería / Pernos",
      fillLevelPercentage: 100,
      supervisor: "L. Soto (Bodega Central)",
      qrToken: "QR-FL01-SUP-0087",
      lastUpdated: "Hace 1 min",
    },
  ] as FloorStatus[],
};

/** Las 6 etapas del circuito (3 de subida, 3 de bajada); las usan /flujo y la escena animada. */
export const FLOW_STAGES = [
  {
    id: 0,
    phase: "UP" as const,
    short: "1. Portería QR",
    title: "Escaneo rápido en Portería (<85s)",
    detail: "El camión descarga directo al carro cerrado y portería asigna el piso con código QR.",
    position: "bottom" as const,
    badge: "En Portería · Nivel 0",
  },
  {
    id: 1,
    phase: "UP" as const,
    short: "2. Subida Segura",
    title: "Izaje vertical en grúa o montacargas",
    detail: "Sube asegurado con cáncamos D.S. 594 sin riesgo de vuelco ni caída de materiales.",
    position: "middle" as const,
    badge: "Subiendo por Torre",
  },
  {
    id: 2,
    phase: "UP" as const,
    short: "3. Bodega en Piso",
    title: "Material seco al lado de la cuadrilla",
    detail: "Los maestros sacan volcanita, pernos y moldajes directo en el piso sin bajar a bodega.",
    position: "top" as const,
    badge: "En Piso 8 · Insumos",
  },
  {
    id: 3,
    phase: "DOWN" as const,
    short: "4. Carga Despuntes",
    title: "Separación limpia de sobrantes",
    detail: "Al vaciarse los insumos, el mismo carro recibe despuntes de madera, fierro o cartón.",
    position: "top" as const,
    badge: "En Piso 8 · Retiro",
  },
  {
    id: 4,
    phase: "DOWN" as const,
    short: "5. Bajada Ordenada",
    title: "Retorno en el viaje de vuelta",
    detail: "Aprovecha la bajada del montacargas y deja pasillos y escaleras 100% despejadas.",
    position: "middle" as const,
    badge: "Bajando al Patio",
  },
  {
    id: 5,
    phase: "DOWN" as const,
    short: "6. Pesaje Patio",
    title: "Registro Sinader y Ley REP",
    detail: "En patio de acopio se pesan los kilos separados con respaldo digital ligado al QR del piso.",
    position: "bottom" as const,
    badge: "En Patio · Pesaje",
  },
];

/**
 * Simulador, modo guiado: un piso y un carro en 5 pasos. Cada paso dice qué pasa, cómo era antes y qué se gana.
 * `minutes`/`kg` se suman al contador del recorrido (mismas cifras que `kpis`: 60 → 8 min, 180 kg por viaje).
 */
export const GUIDED_STEPS: {
  view: "piso" | "faena";
  state: FloorStatus["moduleState"];
  title: string;
  now: string;
  before: string;
  win: string;
  minutes?: number;
  kg?: number;
}[] = [
  {
    view: "faena",
    state: "DELIVERING_SUPPLIES",
    title: "Llega el material y portería escanea el QR",
    now: "El camión descarga en el patio. Portería escanea la guía con el celular y el carro queda asignado al Piso 7.",
    before: "La guía se archiva en papel y nadie sabe a qué piso fue el material.",
    win: "Despacho registrado con QR",
  },
  {
    view: "piso",
    state: "DELIVERING_SUPPLIES",
    title: "El carro sube cerrado por el montacargas",
    now: "Llega al piso por el montacargas. Al ir cerrado, el material no se moja ni se rompe en el camino.",
    before: "El material espera a la intemperie y hasta un 6% se pierde por clima y golpes.",
    win: "Material protegido (menos de 2% de pérdida)",
  },
  {
    view: "piso",
    state: "STORED_SATELITE",
    title: "Queda en la Zona A, junto al montacargas",
    now: "La cuadrilla saca el material directo del carro, siempre en el mismo lugar del plano.",
    before: "El maestro baja a bodega y pierde hasta 60 minutos al día buscando.",
    win: "52 minutos ahorrados por cuadrilla",
    minutes: 52,
  },
  {
    view: "piso",
    state: "COLLECTING_WASTE",
    title: "El mismo carro se llena con desechos separados",
    now: "Cuando se vacía, pasa a la Zona B y recibe despuntes de madera en su casillero. Nada queda en el pasillo.",
    before: "Escombro mezclado en pasillos y escaleras, con riesgo de caídas.",
    win: "Pasillo despejado (D.S. 594)",
  },
  {
    view: "faena",
    state: "COLLECTING_WASTE",
    title: "Baja, se pesa y se apila en el patio",
    now: "El montacargas no baja vacío: el carro trae 180 kg que se pesan en la balanza y se apilan por tipo.",
    before: "El montacargas bajaba vacío y el escombro salía mezclado, sin respaldo.",
    win: "180 kg con respaldo Ley REP",
    kg: 180,
  },
];

/** Home: el problema en obra vs. lo que cambia con el sistema (mismas cifras que `kpis`). */
export const PROBLEM_SOLUTION = {
  sin: [
    { title: "60 minutos al día buscando material", detail: "Los maestros bajan a bodega y esperan el montacargas por cada perno." },
    { title: "Material mojado, roto o perdido", detail: "Volcanita y moldajes acopiados a la intemperie o en pasillos." },
    { title: "Escombro en pasillos y escaleras", detail: "Riesgo de caídas y residuos mezclados sin respaldo para la Ley REP." },
  ],
  con: [
    { title: "Bodega cerrada al lado de la cuadrilla", detail: "El carro llega al piso con el material asignado por QR: 8 minutos de búsqueda." },
    { title: "Carro galvanizado sellado", detail: "Protege de lluvia, polvo y robos: pérdidas bajo el 2%." },
    { title: "El mismo carro baja los despuntes", detail: "Separados en el piso y pesados en patio: 100% de respaldo Sinader." },
  ],
};

/**
 * Planos esquemáticos del simulador. Coordenadas en el viewBox de cada componente
 * (FloorPlanMap 480×260, SitePlanMap 480×300); ajustarlas cuando se cargue el plano real de la obra.
 *
 * `FLOOR_PLAN` es lo que NO cambia entre pisos: el núcleo (montacargas + escalera) y las dos zonas
 * de acopio van en la misma vertical. Lo que sí cambia por piso está en `FLOOR_LAYOUTS`.
 */
export const FLOOR_PLAN = {
  lift: { x: 200, y: 10, w: 40, h: 100 },
  stairs: { x: 240, y: 10, w: 40, h: 100 },
  materials: { x: 70, y: 10, w: 130, h: 100 }, // Zona A, junto al montacargas
  waste: { x: 280, y: 10, w: 130, h: 100 }, // Zona B, al otro lado del núcleo
  materialSlots: [
    { key: "Volcanita / Yeso", label: "Volcanita" },
    { key: "Madera / Moldajes", label: "Madera" },
    { key: "Ferretería / Pernos", label: "Ferretería" },
  ],
  wasteSlots: [
    { key: "Despuntes de Madera", label: "Madera" },
    { key: "Despuntes Metálicos", label: "Metal" },
    { key: "Cartón / Film Embalaje", label: "Cartón" },
    { key: "Escombro Limpio", label: "Escombro" },
  ],
};

export type PlanRoom = { x: number; y: number; w: number; h: number; label: string; kind: "recinto" | "exterior" | "acceso" };

const sideRooms = (left: string, right: string, rightKind: PlanRoom["kind"] = "recinto"): PlanRoom[] => [
  { x: 10, y: 10, w: 60, h: 100, label: left, kind: "recinto" },
  { x: 410, y: 10, w: 60, h: 100, label: right, kind: rightKind },
];
const bottomRow = (widths: number[], label = "Recinto"): PlanRoom[] => {
  let x = 10;
  return widths.map((w) => ({ x: (x += w) - w, y: 150, w, h: 100, label, kind: "recinto" as const }));
};

/** Estructura de cada variante de planta (qué variante le toca a cada piso lo decide `floorLayoutId`). */
export const FLOOR_LAYOUTS: Record<FloorLayoutId, { name: string; note: string; rooms: PlanRoom[] }> = {
  acceso: {
    name: "Planta de acceso",
    note: "El piso más distinto: por aquí entran los carros desde portería y salen los desechos al patio de acopio.",
    rooms: [
      ...sideRooms("Bodega", "Sala basura"),
      { x: 10, y: 150, w: 150, h: 100, label: "Acceso desde portería", kind: "acceso" },
      { x: 160, y: 150, w: 150, h: 100, label: "Hall / locales", kind: "recinto" },
      { x: 310, y: 150, w: 160, h: 100, label: "Salida al patio de acopio", kind: "acceso" },
    ],
  },
  tipoA: {
    name: "Planta tipo A",
    note: "Pisos bajos: 4 recintos por piso.",
    rooms: [...sideRooms("Recinto", "Recinto"), ...bottomRow([115, 115, 115, 115])],
  },
  tipoB: {
    name: "Planta tipo B",
    note: "Pisos medios: 3 recintos más amplios.",
    rooms: [...sideRooms("Recinto", "Recinto"), ...bottomRow([153, 154, 153])],
  },
  tipoC: {
    name: "Planta tipo C",
    note: "Pisos altos: 5 recintos chicos y ducto técnico.",
    rooms: [...sideRooms("Ducto", "Recinto"), ...bottomRow([92, 92, 92, 92, 92])],
  },
  atico: {
    name: "Último piso",
    note: "Sala de máquinas y terrazas: en terraza no se acopia nada.",
    rooms: [
      ...sideRooms("Sala máquinas", "Terraza", "exterior"),
      ...bottomRow([150, 150]),
      { x: 310, y: 150, w: 160, h: 100, label: "Terraza · sin acopio", kind: "exterior" },
    ],
  },
};

/** Plano general de la faena (emplazamiento): portería, torre, montacargas, balanza y patio de acopio de desechos. */
export const SITE_PLAN = {
  lot: { x: 10, y: 10, w: 460, h: 250 },
  gateIn: { x: 40, y: 250, w: 50, h: 12 }, // acceso camiones con material
  gateOut: { x: 400, y: 250, w: 50, h: 12 }, // salida camión gestor de residuos
  gatehouse: { x: 96, y: 222, w: 46, h: 30 },
  warehouse: { x: 30, y: 36, w: 90, h: 56 },
  tower: { x: 190, y: 36, w: 180, h: 104 },
  lift: { x: 158, y: 76, w: 32, h: 44 },
  scale: { x: 226, y: 196, w: 44, h: 30 },
  yard: { x: 290, y: 160, w: 170, h: 88 }, // patio de acopio: una pila por tipo de desecho
  kgPerBlock: 400, // ponytail: altura de pila = 1 bloque cada 400 kg, máx. 6; usar el plan de manejo real cuando exista
  maxBlocks: 6,
};

/** Simulador: los 4 pasos del ciclo de un carro, en lenguaje de obra. `where` dice dónde va según el plano. */
export const CYCLE_STEPS: Record<
  FloorStatus["moduleState"],
  { stepIndex: number; short: string; status: string; where: (fl: FloorStatus) => string; action: string }
> = {
  DELIVERING_SUPPLIES: {
    stepIndex: 0,
    short: "Sube material",
    status: "Subiendo",
    where: (fl) =>
      `El carro viene en el montacargas con ${fl.materialType}. Recíbelo y déjalo en la Zona A (verde), junto al montacargas.`,
    action: "Confirmar llegada al piso",
  },
  STORED_SATELITE: {
    stepIndex: 1,
    short: "Material en piso",
    status: "Material",
    where: (fl) =>
      `El carro está en la Zona A con ${fl.materialType}. La cuadrilla va sacando desde ahí y el pasillo queda libre. Cuando se vacíe, pasa a la Zona B a recibir desechos.`,
    action: "Cargar desechos en el carro",
  },
  COLLECTING_WASTE: {
    stepIndex: 2,
    short: "Carga desechos",
    status: "Desechos",
    where: (fl) =>
      `El carro está en la Zona B (naranja) recibiendo ${fl.wasteType ?? "desechos"}. Solo ese tipo, sin mezclar. Cuando esté lleno, bájalo.`,
    action: "Bajar al patio y pesar (+180 kg)",
  },
  EMPTY: {
    stepIndex: 4, // ciclo completo: los 4 pasos quedan marcados
    short: "Baja y pesa",
    status: "Ciclo listo",
    where: () =>
      "Ciclo completo: el carro bajó con los desechos y se pesó en el patio. Las dos zonas quedaron libres; elige qué material subir en el próximo carro.",
    action: "Pedir carro con material",
  },
};
