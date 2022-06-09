import {Customer} from "./general.models";

export interface Queue {
    queueIdx: number;
    customers: Customer[];
    spots: number[];
    isOpen: boolean;
}

export interface Queues {
    queues: Queue[];
}