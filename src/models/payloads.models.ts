import {Customer, Order} from "./general.models";

export interface AddToQueuePayload {
    queueIdx: number;
    customer: Customer;
}

export interface RemoveFromQueuePayload {
    queueIdx: number;
    customerId: string;
}

export interface AddOrderPayload {
    slotIdx: number;
    order: Order;
}

export interface UpdateMatsProdStatusPayload {
    slotIdx: number;
    materialIdx: number;
}

export interface AddToDeliveryPayload {
    slotIdx: number;
    order: Order;
}

export interface RemoveFromDeliveryPayload {
    slotIdx: number;
    orderId: string;
}

export interface SetCurrMaterialIdx {
    slotIdx: number;
    currMaterialIdx: number;
}

export interface SetTimePassedInProd {
    slotIdx: number;
    timePassedInProd: number;
}

export interface SetProdTimeLeft {
    slotIdx: number;
    prodTimeLeft: number;
}
