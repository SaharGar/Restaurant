import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Queue, Queues} from "../models/queue.models";
import {AddToQueuePayload, RemoveFromQueuePayload} from "../models/payloads.models";

const initialState: Queues = {
    queues: []
}

const queuesSlice = createSlice({
    name: 'queues',
    initialState,
    reducers: {
        setQueues(state, action: PayloadAction<Queue[]>) {
            state.queues = action.payload;
        },

        addToQueue(state, action: PayloadAction<AddToQueuePayload>) {
            const {queueIdx, customer} = action.payload;
            state.queues[queueIdx].customers = [...state.queues[queueIdx].customers, customer];
        },

        removeFromQueue(state, action: PayloadAction<RemoveFromQueuePayload>) {
            const {queueIdx, customerId} = action.payload;
            state.queues[queueIdx].customers = state.queues[queueIdx].customers.filter(customer => customer.id !== customerId);

        },

        moveToEndOfQueue(state, action:PayloadAction<AddToQueuePayload>){
            const {queueIdx, customer} = action.payload;
            let customers = [...state.queues[queueIdx].customers];
            customers = customers.filter(currCustomer => customer.id !== currCustomer.id);
            customers.push(customer);
            state.queues[queueIdx].customers = customers;
        },

        closeQueue(state, action: PayloadAction<number>) {
            state.queues[action.payload].isOpen = false
        },

        openQueue(state, action: PayloadAction<number>) {
            state.queues[action.payload].isOpen = true
        },

        manageQueuePriority(state, action: PayloadAction<number>) {
            state.queues[action.payload].customers = state.queues[action.payload].customers.sort((a,b) => {
             return b.priority - a.priority || a.timeEnteredQueue - b.timeEnteredQueue;
            });
        },

        updateOrderingTriesCount(state, action: PayloadAction<number>) {
            const numberOfTries = state.queues[action.payload].customers[0].orderingTriesCount
            state.queues[action.payload].customers[0].orderingTriesCount = numberOfTries ? numberOfTries + 1 : 1
        },
    }
})

export default queuesSlice.reducer;
export const queuesActions = queuesSlice.actions;
