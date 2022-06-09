import React from 'react'
import { QueueSpot } from './QueueSpot'
import {Queue} from "../../models/queue.models";

interface singleQueueLineProps {
    queue: Queue;
}

export const SingleQueueLine: React.FC<singleQueueLineProps> = ({queue}) => {
    const {spots, customers } = queue;
    return (
        <div className={`queue-line flex ${!queue.isOpen && 'close'}`}>
            {spots.map(spot => <QueueSpot key={spot}  customer={customers[spot]} />)}
        </div>
    )
}
