export type ModuleState =
  | 'DELIVERING_SUPPLIES'
  | 'STORED_SATELITE'
  | 'COLLECTING_WASTE'
  | 'EMPTY';

export type MaterialType =
  | 'Volcanita / Yeso'
  | 'Madera / Moldajes'
  | 'Ferretería / Pernos'
  | 'Residuos Separados';

export type SupplyMaterial = Exclude<MaterialType, 'Residuos Separados'>;

export type WasteType =
  | 'Despuntes de Madera'
  | 'Despuntes Metálicos'
  | 'Cartón / Film Embalaje'
  | 'Escombro Limpio';

/** Variante de planta de un piso: el piso 1 y el último son distintos; el resto cambia por tramo de altura. */
export type FloorLayoutId = 'acceso' | 'tipoA' | 'tipoB' | 'tipoC' | 'atico';

export interface FloorStatus {
  floorNumber: number;
  activeModuleId: string | null;
  moduleState: ModuleState;
  materialType: MaterialType;
  fillLevelPercentage: number;
  wasteType?: WasteType;
  supervisor: string;
  qrToken: string;
  lastUpdated: string;
}

export interface WasteCategory {
  type: string;
  wasteKey: WasteType;
  icon: string;
  recyclingRate: string;
  sinaderCode: string;
  description: string;
}

export type WasteTotalsKg = Record<WasteType, number>;

export interface OperationEvent {
  id: string;
  timestamp: string;
  floorNumber: number;
  moduleId: string;
  action: string;
  detail: string;
  kind: 'SUPPLY' | 'WASTE' | 'GATE' | 'MOVE';
}

export interface RoiParams {
  floors: number;
  workers: number;
  materialBudgetMillion: number;
}

export interface TourProgress {
  gateDispatched: boolean;
  floorDelivered: boolean;
  wasteReturned: boolean;
  impactChecked: boolean;
}

export interface FaenaDemoState {
  floors: FloorStatus[];
  wasteTotalsKg: WasteTotalsKg;
  events: OperationEvent[];
  roiParams: RoiParams;
  tourProgress: TourProgress;
}

export interface DispatchPayload {
  floorNumber: number;
  materialType: Exclude<MaterialType, 'Residuos Separados'>;
  supervisor: string;
  guideCode: string;
}

export interface RoiInputs {
  floors: number;
  workers: number;
  monthlyBudgetClp: number;
}

export interface RoiResults {
  monthlySavingsClp: number;
  recoveredHours: number;
  divertedTons: number;
  roiRatio: number;
  netBenefitClp: number;
}

export interface PilotFormData {
  projectName: string;
  companyName: string;
  role: string;
  city: string;
  phone: string;
  email: string;
  includeQrApp: boolean;
}
