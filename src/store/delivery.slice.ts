import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {AddToDeliveryPayload, RemoveFromDeliveryPayload} from "../models/payloads.models";
import {DeliverySlotInterface, DeliveryState} from "../models/delivery.models";
import {Order} from "../models/general.models";

const initialState: DeliveryState = {
    deliveryTimeInSec: 15,
    deliveryQueue: [],
    deliverySlots: []
}

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        setDeliverySlots(state, action: PayloadAction<DeliverySlotInterface[]>) {
            state.deliverySlots = action.payload;
        },

        addToDeliveryQueue(state, action: PayloadAction<Order>) {
            state.deliveryQueue = [...state.deliveryQueue, action.payload]
        },

        addToDelivery(state, action: PayloadAction<AddToDeliveryPayload>) {
            const {slotIdx, order} = action.payload;
            state.deliverySlots[slotIdx].order = order;
            state.deliveryQueue = state.deliveryQueue.filter(currOrder => order.orderId !== currOrder.orderId)
        },

        removeFromDelivery(state, action: PayloadAction<RemoveFromDeliveryPayload>) {
            const {slotIdx, orderId} = action.payload;
            if(state.deliverySlots[slotIdx].order?.orderId === orderId) {
                state.deliverySlots[slotIdx].order = undefined;
            }
        }
    }
})

export default deliverySlice.reducer;
export const deliveryActions = deliverySlice.actions;
