import React from 'react';
import {ProductionImg} from "./ProductionImg";
import {ProductionInfo} from "./ProductionInfo";
import {ProductionStatus} from "./ProductionStatus";
import {Slot} from "../../models/production.models";

interface ProductionSlotProps {
    slot: Slot;
    timer: number;
}

export const ProductionSlot: React.FC<ProductionSlotProps> = ({slot, timer}) => {
    return (
        <div className='production-slot flex'>
            <ProductionImg order={slot.order}/>
            <ProductionInfo order={slot.order} timer={timer} slotIdx={slot.slotIdx}/>
            <ProductionStatus order={slot.order} slotIdx={slot.slotIdx} timer={timer}/>
        </div>
    )
}
