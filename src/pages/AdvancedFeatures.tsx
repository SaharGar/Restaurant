import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {Customer} from "../models/general.models";
import {queuesActions} from "../store/queues.slice";
import {getShortestQueue} from "../utils/queue.utils";
import {generalInfoActions} from "../store/general-info.slice";
import {Queue} from "../models/queue.models";

export const AdvancedFeatures: React.FC = () => {

    const [closingQueueIdx, setClosingQueueIdx] = useState<number | null>(null);
    const queues = useSelector((state: RootState) => state.queues.queues);
    const isTotalIncomeVisible = useSelector((state: RootState) => state.generalInfo.isTotalIncomeVisible);
    const dispatch = useDispatch();

    useEffect(() => {
        if(typeof closingQueueIdx === 'number' && !queues[closingQueueIdx].isOpen) {
            if(queues[closingQueueIdx].customers[0])moveFromClosingQueue(closingQueueIdx);
            else setClosingQueueIdx(null);
        }
    },[closingQueueIdx,queues])

    const moveFromClosingQueue = (queueIdx: number) => {
            const customerToMove: Customer = {
                ...queues[queueIdx].customers[0]
            }
            const newQueueIdx: number = getShortestQueue(queues);
            dispatch(queuesActions.removeFromQueue({queueIdx, customerId: customerToMove.id}));
            dispatch(queuesActions.addToQueue({queueIdx: newQueueIdx, customer: customerToMove}));

    }

    const closeQueue = (queueIdx: number) => {
        dispatch(queuesActions.closeQueue(queueIdx));
        setClosingQueueIdx(queueIdx);
    }

    const openQueue = (queueIdx: number) => {
        dispatch(queuesActions.openQueue(queueIdx));
    }

    const onToggleShowIncome = () => {
        dispatch(generalInfoActions.toggleShowIncome());
    }

    const manageQueues = (queue: Queue) => {
      queue.isOpen ? closeQueue(queue.queueIdx) : openQueue(queue.queueIdx)
    }

    return (
        <div className='advanced-features'>
            <div className='queue-actions'>
                {queues.map((queue, idx) => {
                      return <button
                        onClick={() => manageQueues(queue)} key={idx}>{queue.isOpen? `Close Queue ${idx}`: `Open Queue ${idx}`}</button>
                  })}
            </div>
            <button onClick={onToggleShowIncome}>{isTotalIncomeVisible ? 'Hide Total Income' : 'Show Total Income'}</button>
        </div>
    )
}
