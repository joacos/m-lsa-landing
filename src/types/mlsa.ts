export type ModuleState =
  | 'DELIVERING_SUPPLIES'
  | 'STORED_SATELITE'
  | 'COLLECTING_WASTE'
  | 'EMPTY';

export type MaterialType =
  | 'Yeso/Placocentro'
  | 'Madera/Moldajes'
  | 'Herrajes/Pernos'
  | 'RCD Segregado';

export type WasteType =
  | 'Madera RCD'
  | 'Metales'
  | 'Cartón/Embalaje'
  | 'Escombro Limpio';

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
  icon: string;
  recyclingRate: string;
  sinaderCode: string;
  description: string;
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
