import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Material, Order} from "../models/general.models";
import {
  AddOrderPayload,
  SetCurrMaterialIdx, SetProdTimeLeft,
  SetTimePassedInProd,
  UpdateMatsProdStatusPayload
} from "../models/payloads.models";
import {Slot, ProductionState} from "../models/production.models";

const initialState: ProductionState = {
  availableMaterials: [],
  missingMaterials: [],
  productionQueue: [],
  productionSlots: []
}

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {
    setAvailableMaterials(state, action: PayloadAction<Material[]>) {
      state.availableMaterials = action.payload;
      state.missingMaterials = [];
    },

    setProductionSlots(state, action: PayloadAction<Slot[]>) {
      state.productionSlots = action.payload;
    },

    setSlotCurrentMaterialIdx(state, action: PayloadAction<SetCurrMaterialIdx>) {
      const {slotIdx, currMaterialIdx} = action.payload
      state.productionSlots[slotIdx].currentMaterialIdx = currMaterialIdx
    },

    setTimePassedInProd(state, action: PayloadAction<SetTimePassedInProd>) {
      const {slotIdx, timePassedInProd} = action.payload
      state.productionSlots[slotIdx].timePassedInProd = timePassedInProd
    },

    setProdTimeLeft(state, action: PayloadAction<SetProdTimeLeft>) {
      const {slotIdx, prodTimeLeft} = action.payload
      state.productionSlots[slotIdx].prodTimeLeft = prodTimeLeft
    },

    addToProductionQueue(state, action: PayloadAction<Order>) {
      state.productionQueue = [...state.productionQueue, action.payload];
    },

    removeFromProductionQueue(state, action: PayloadAction<string>) {
      state.productionQueue = state.productionQueue.filter(currOrder => action.payload !== currOrder.orderId);
    },

    addOrder(state, action: PayloadAction<AddOrderPayload>) {
      const {slotIdx, order} = action.payload;
      state.productionSlots[slotIdx].order = order;
    },

    removeOrder(state, action: PayloadAction<number>) {
      const slotIdx = action.payload;
      state.productionSlots[slotIdx].order = undefined;
    },

    removeFromAvailableMaterials(state, action: PayloadAction<Material[]>) {
      const materialsToRemove = action.payload.map(material => material.name);
      state.availableMaterials = state.availableMaterials.filter(material => !materialsToRemove.includes(material.name));
      state.missingMaterials = [...state.missingMaterials, ...action.payload];
    },

    addToAvailableMaterials(state, action: PayloadAction<Material[]>) {
      const materialsNamesToAdd = action.payload.map(material => material.name);
      const materialsToAdd = state.missingMaterials.filter(material => materialsNamesToAdd.includes(material.name));
      state.availableMaterials = [...state.availableMaterials, ...materialsToAdd];
      state.missingMaterials = state.missingMaterials.filter(material => !materialsNamesToAdd.includes(material.name));
    },

    updateMaterialsProdStatus(state, action: PayloadAction<UpdateMatsProdStatusPayload>) {
      const {slotIdx, materialIdx} = action.payload;
      state.productionSlots[slotIdx].order!.product.materials[materialIdx].isReady = true;
    },

    reProduceProduct(state, action: PayloadAction<Order>) {
      state.productionQueue = [action.payload, ...state.productionQueue]
    }
  }
})

export default productionSlice.reducer;
export const productionActions = productionSlice.actions;
