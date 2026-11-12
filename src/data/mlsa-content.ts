import {
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
 * Plano de planta tipo (esquemático) para orientar dónde se deja cada cosa en el piso.
 * Coordenadas en el viewBox 480×260 de FloorPlanMap; ajustar `lift`, `materials`, `waste`
 * y `workFronts` cuando se cargue el plano real de la obra.
 */
export const FLOOR_PLAN = {
  lift: { x: 200, y: 10, w: 40, h: 100 },
  materials: { x: 70, y: 10, w: 130, h: 100 }, // Zona A, junto al montacargas
  waste: { x: 280, y: 10, w: 130, h: 100 }, // Zona B, al otro lado del núcleo
  // ponytail: el frente de trabajo rota por número de piso solo para la demo; ligar a la programación real cuando exista
  workFronts: [
    { x: 10, y: 150, w: 115, h: 100 },
    { x: 125, y: 150, w: 115, h: 100 },
    { x: 240, y: 150, w: 115, h: 100 },
    { x: 355, y: 150, w: 115, h: 100 },
  ],
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
      `El carro está en la Zona A con ${fl.materialType}. La cuadrilla saca desde ahí y el pasillo queda libre. Cuando se vacíe, elige qué desecho cargar.`,
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
    status: "Sin carro",
    where: () => "Este piso no tiene carro: las dos zonas están libres. Pide uno nuevo con material.",
    action: "Pedir carro con material",
  },
};
