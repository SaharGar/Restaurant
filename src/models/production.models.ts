import {Material, Order} from "./general.models";

export interface ProductionState {
    availableMaterials: Material[];
    missingMaterials: Material[];
    productionQueue: Order[];
    productionSlots: Slot[];
}

export interface Slot {
    slotIdx: number;
    order?: Order;
    currentMaterialIdx: number;
    timePassedInProd: number;
    prodTimeLeft?: number;
}

export interface ProductionItemProps {
    order?: Order;
}
