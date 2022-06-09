import {Queue} from "../models/queue.models";

export const getShortestQueue = (queues: Queue[]): number => {
    let shortestQueueIdx: number = 0;
    let minCustomersNum: number = 100;
    queues.forEach((queue, idx) => {
        if (queue.isOpen && queue.customers.length < minCustomersNum) {
            shortestQueueIdx = idx
            minCustomersNum = queue.customers.length
        }
        ;
    });
    return shortestQueueIdx;
}