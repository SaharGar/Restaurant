import React, {useEffect, useState} from 'react'
import {SingleQueueLine} from './SingleQueueLine'
import {QUEUE_HEADLINE} from "../../consts";
import {products} from "../../data/products";
import {getRandomIntInclusive} from "../../utils";
import {v4 as uuidv4} from 'uuid'
import {useDispatch, useSelector} from "react-redux";
import {Customer, Product} from "../../models/general.models";
import {Queue} from "../../models/queue.models";
import {queuesActions} from "../../store/queues.slice";
import {RootState} from "../../store";
import {getShortestQueue} from "../../utils/queue.utils";

export const Queues: React.FC = () => {

    const [queuesAmount, setQueuesAmount] = useState<number>(3);
    const [queuesLength, setQueuesLengths] = useState<number>(5);
    const queues = useSelector((state: RootState) => state.queues.queues);
    const timer = useSelector((state: RootState) => state.timer.time);
    const timerStatus = useSelector((state: RootState) => state.timer.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if(timer === 0) generateInitialQueues();
        if(timerStatus === 'running' && timer !==0 && timer % 2 === 0) {
            addCustomer();
            manageQueuePriority();
        }
    },[timer, queuesAmount, queuesLength])

    const generateInitialQueues = () => {
        const queues = [];
        for (let i = 0; i < queuesAmount; i++) {
            const queue: Queue = {
                queueIdx: i,
                customers: [],
                spots: [],
                isOpen: true
            };
            for (let j = 0; j < queuesLength; j++) {
                queue.spots[j] = j
            }
            queues.push(queue);
        }
        dispatch(queuesActions.setQueues(queues));
    }

    const addCustomer = () => {
        const customer: Customer = getNewCustomer();
        const queueIdx: number = getShortestQueue(queues);
        if (typeof (queueIdx) === 'number') {
            dispatch(queuesActions.addToQueue({queueIdx, customer}));
        };
    }

    const getNewCustomer = (): Customer => {
        const product: Product = products[getRandomIntInclusive(0, products.length - 1)];
        const newCustomer: Customer = {
            id: uuidv4().slice(0,3),
            product: product,
            timeEnteredQueue: timer,
            orderingTimeInSec: getRandomIntInclusive(3,10),
            money: getRandomIntInclusive(30,70),
            priority: getRandomIntInclusive(1,3)
        }
        return newCustomer;
    }

    const manageQueuePriority = () => {
        queues.forEach(queue => {
            if (queue.customers.length) {
                dispatch(queuesActions.manageQueuePriority(queue.queueIdx));
            }
        })
    }

    return (
        <div className='queue'>
            <h2 className='section-headline'>
                {QUEUE_HEADLINE}
            </h2>
            <div className='queue-container flex column align-center justify-center'>
                {queues.map(queue => <SingleQueueLine key={queue.queueIdx} queue={queue}/>)}
            </div>
        </div>
    )
}
