import type {
  DispatchPayload,
  FaenaDemoState,
  FloorLayoutId,
  FloorStatus,
  OperationEvent,
  RoiParams,
  WasteTotalsKg,
  WasteType,
} from "../types/mlsa";

export const RETURN_LOAD_KG = 180;
export const MAX_EVENTS = 12;
export const MIN_FLOORS = 3;
export const MAX_FLOORS = 30;

/** Builds a clean deep copy of initial Faena Limpia demo state. */
export function createInitialFaenaState(seed: {
  floors: FloorStatus[];
  wasteTotalsKg: WasteTotalsKg;
  events: OperationEvent[];
  roiParams: RoiParams;
}): FaenaDemoState {
  return {
    floors: seed.floors.map((f) => ({ ...f })),
    wasteTotalsKg: { ...seed.wasteTotalsKg },
    events: seed.events.map((e) => ({ ...e })),
    roiParams: { ...seed.roiParams },
    tourProgress: {
      gateDispatched: false,
      floorDelivered: false,
      wasteReturned: false,
      impactChecked: false,
    },
  };
}

const buildToken = (floorNumber: number, tag: string, randomSuffix?: number) => {
  const num = randomSuffix ?? Math.floor(1000 + Math.random() * 8999);
  return `QR-FL${String(floorNumber).padStart(2, "0")}-${tag}-${num}`;
};

/** Dispatches a supply cart from Portería QR to the chosen floor. */
export function applyGateDispatch(
  prev: FaenaDemoState,
  payload: DispatchPayload,
  timeLabel: string,
  randomSuffix?: number
): { state: FaenaDemoState; token: string } {
  const token = buildToken(payload.floorNumber, "SUP", randomSuffix);
  const fallbackModuleId = `FL-${String(payload.floorNumber).padStart(2, "0")}A`;
  const targetFloor = prev.floors.find((f) => f.floorNumber === payload.floorNumber);
  const nextModuleId = targetFloor?.activeModuleId || fallbackModuleId;

  const floors = prev.floors.map((f) =>
    f.floorNumber === payload.floorNumber
      ? {
          ...f,
          activeModuleId: nextModuleId,
          moduleState: "DELIVERING_SUPPLIES" as const,
          materialType: payload.materialType,
          wasteType: undefined,
          fillLevelPercentage: 100,
          supervisor: payload.supervisor,
          qrToken: token,
          lastUpdated: `Despachado hoy (${timeLabel})`,
        }
      : f
  );

  const newEvent: OperationEvent = {
    id: `evt-${Date.now()}-${payload.floorNumber}`,
    timestamp: timeLabel,
    floorNumber: payload.floorNumber,
    moduleId: nextModuleId,
    action: `Portería QR (${payload.guideCode})`,
    detail: `${payload.materialType} → Piso ${payload.floorNumber} (${payload.supervisor})`,
    kind: "GATE",
  };

  return {
    token,
    state: {
      ...prev,
      floors,
      events: [newEvent, ...prev.events].slice(0, MAX_EVENTS),
      tourProgress: { ...prev.tourProgress, gateDispatched: true },
    },
  };
}

/** Advances one step of a floor cart's round-trip lifecycle. */
export function applyCycleAdvance(
  prev: FaenaDemoState,
  floorNumber: number,
  selectedWaste: WasteType,
  timeLabel: string
): FaenaDemoState {
  const current = prev.floors.find((f) => f.floorNumber === floorNumber);
  if (!current) return prev;

  const moduleId = current.activeModuleId || `FL-${String(floorNumber).padStart(2, "0")}A`;
  let nextFloors = prev.floors;
  let nextWasteTotals = prev.wasteTotalsKg;
  let nextTour = prev.tourProgress;
  let newEvent: OperationEvent;

  if (current.moduleState === "DELIVERING_SUPPLIES") {
    nextFloors = prev.floors.map((f) =>
      f.floorNumber === floorNumber
        ? {
            ...f,
            activeModuleId: moduleId,
            moduleState: "STORED_SATELITE",
            fillLevelPercentage: 65,
            qrToken: buildToken(floorNumber, "SAT"),
            lastUpdated: `En bodega (${timeLabel})`,
          }
        : f
    );
    nextTour = { ...prev.tourProgress, floorDelivered: true };
    newEvent = {
      id: `evt-${Date.now()}-${floorNumber}`,
      timestamp: timeLabel,
      floorNumber,
      moduleId,
      action: "Llegó a bodega en piso",
      detail: `${current.materialType} disponible para cuadrilla`,
      kind: "SUPPLY",
    };
  } else if (current.moduleState === "STORED_SATELITE") {
    nextFloors = prev.floors.map((f) =>
      f.floorNumber === floorNumber
        ? {
            ...f,
            activeModuleId: moduleId,
            moduleState: "COLLECTING_WASTE",
            materialType: "Residuos Separados",
            wasteType: selectedWaste,
            fillLevelPercentage: 85,
            qrToken: buildToken(floorNumber, "WST"),
            lastUpdated: `Cargando retiro (${timeLabel})`,
          }
        : f
    );
    newEvent = {
      id: `evt-${Date.now()}-${floorNumber}`,
      timestamp: timeLabel,
      floorNumber,
      moduleId,
      action: "Cambio a modo retiro",
      detail: `Cargando ${selectedWaste} en Piso ${floorNumber}`,
      kind: "WASTE",
    };
  } else if (current.moduleState === "COLLECTING_WASTE") {
    const wasteKind = current.wasteType || selectedWaste;
    nextWasteTotals = {
      ...prev.wasteTotalsKg,
      [wasteKind]: prev.wasteTotalsKg[wasteKind] + RETURN_LOAD_KG,
    };
    nextFloors = prev.floors.map((f) =>
      f.floorNumber === floorNumber
        ? {
            ...f,
            moduleState: "EMPTY",
            wasteType: undefined,
            fillLevelPercentage: 0,
            supervisor: "En espera de reposición",
            qrToken: buildToken(floorNumber, "EMP"),
            lastUpdated: `Bajado a patio (${timeLabel})`,
          }
        : f
    );
    nextTour = { ...prev.tourProgress, wasteReturned: true };
    newEvent = {
      id: `evt-${Date.now()}-${floorNumber}`,
      timestamp: timeLabel,
      floorNumber,
      moduleId,
      action: `Pesaje en patio (+${RETURN_LOAD_KG} kg)`,
      detail: `${wasteKind} registrado para Sinader / Ley REP`,
      kind: "WASTE",
    };
  } else {
    nextFloors = prev.floors.map((f) =>
      f.floorNumber === floorNumber
        ? {
            ...f,
            activeModuleId: moduleId,
            moduleState: "DELIVERING_SUPPLIES",
            materialType: "Volcanita / Yeso",
            wasteType: undefined,
            fillLevelPercentage: 100,
            supervisor: "M. González (Tabiquería)",
            qrToken: buildToken(floorNumber, "SUP"),
            lastUpdated: `Subida solicitada (${timeLabel})`,
          }
        : f
    );
    newEvent = {
      id: `evt-${Date.now()}-${floorNumber}`,
      timestamp: timeLabel,
      floorNumber,
      moduleId,
      action: "Reposición a piso",
      detail: `Carro asignado con Volcanita / Yeso al Piso ${floorNumber}`,
      kind: "SUPPLY",
    };
  }

  return {
    ...prev,
    floors: nextFloors,
    wasteTotalsKg: nextWasteTotals,
    tourProgress: nextTour,
    events: [newEvent, ...prev.events].slice(0, MAX_EVENTS),
  };
}

/** Moves or swaps a cart between two floor slots. */
export function applyCartMove(
  prev: FaenaDemoState,
  fromFloor: number,
  toFloor: number,
  timeLabel: string
): FaenaDemoState {
  if (fromFloor === toFloor) return prev;
  const source = prev.floors.find((f) => f.floorNumber === fromFloor);
  const target = prev.floors.find((f) => f.floorNumber === toFloor);
  if (!source || !target) return prev;

  const sourceModuleId = source.activeModuleId || `FL-${String(fromFloor).padStart(2, "0")}A`;
  const targetModuleId = target.activeModuleId;

  const floors = prev.floors.map((f) => {
    if (f.floorNumber === toFloor) {
      return {
        ...source,
        floorNumber: toFloor,
        activeModuleId: sourceModuleId,
        lastUpdated: `Movido desde P${fromFloor} (${timeLabel})`,
      };
    }
    if (f.floorNumber === fromFloor) {
      return {
        ...target,
        floorNumber: fromFloor,
        activeModuleId: targetModuleId,
        lastUpdated:
          target.moduleState === "EMPTY"
            ? `Liberado hacia P${toFloor} (${timeLabel})`
            : `Intercambiado con P${toFloor} (${timeLabel})`,
      };
    }
    return f;
  });

  const moveEvent: OperationEvent = {
    id: `evt-${Date.now()}-${toFloor}`,
    timestamp: timeLabel,
    floorNumber: toFloor,
    moduleId: sourceModuleId,
    action: `Traslado P${fromFloor} → P${toFloor}`,
    detail: `${sourceModuleId} reasignado a Piso ${toFloor}`,
    kind: "MOVE",
  };

  return {
    ...prev,
    floors,
    events: [moveEvent, ...prev.events].slice(0, MAX_EVENTS),
  };
}

/** Resizes the tower from the setup console: keeps existing floors, adds empty ones, drops those above `count`. */
export function applyFloorCount(prev: FaenaDemoState, count: number, timeLabel: string): FaenaDemoState {
  const total = Math.min(MAX_FLOORS, Math.max(MIN_FLOORS, Math.round(count)));
  if (total === prev.floors.length) return prev;
  const existing = new Map(prev.floors.map((f) => [f.floorNumber, f]));
  const floors = Array.from({ length: total }, (_, i) => total - i).map(
    (floorNumber): FloorStatus =>
      existing.get(floorNumber) ?? {
        floorNumber,
        activeModuleId: null,
        moduleState: "EMPTY",
        materialType: "Volcanita / Yeso",
        fillLevelPercentage: 0,
        supervisor: "En espera de reposición",
        qrToken: `QR-FL${String(floorNumber).padStart(2, "0")}-EMP-0000`,
        lastUpdated: `Piso agregado (${timeLabel})`,
      }
  );
  return { ...prev, floors };
}

/** Picks the plan variant of a floor: ground floor and top floor are unique; the rest split in thirds by height. */
export function floorLayoutId(floorNumber: number, totalFloors: number): FloorLayoutId {
  if (floorNumber <= 1) return "acceso";
  if (floorNumber >= totalFloors) return "atico";
  const third = Math.floor(((floorNumber - 2) * 3) / (totalFloors - 2));
  return (["tipoA", "tipoB", "tipoC"] as const)[third];
}
