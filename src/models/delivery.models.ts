import {Order} from "./general.models";

export interface DeliveryState {
    deliveryTimeInSec: number;
    deliveryQueue: Order[]
    deliverySlots: DeliverySlotInterface[]
}

export interface DeliverySlotInterface {
    slotIdx: number;
    order?: Order;
}