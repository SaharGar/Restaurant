import React, {useEffect, useState} from 'react';

import {ORDER_ID, PRODUCING, EST_TIME} from "../../consts";
import {ProductionItemProps} from "../../models/production.models";
import {useDispatch, useSelector} from "react-redux";
import {productionActions} from "../../store/production.slice";
import {RootState} from "../../store";

interface ProductionInfoProps extends ProductionItemProps {
    timer: number;
    slotIdx: number;
}

export const ProductionInfo: React.FC<ProductionInfoProps> = ({order, timer, slotIdx}) => {

  const prodTimeLeft = useSelector((state: RootState) => state.production.productionSlots[slotIdx].prodTimeLeft);
  const timerStatus = useSelector((state: RootState) => state.timer.status);
  const dispatch = useDispatch()

    useEffect(() => {
      if(!prodTimeLeft && order?.totalProductionTimeInSec) dispatch(productionActions.setProdTimeLeft({slotIdx, prodTimeLeft:order?.totalProductionTimeInSec}));
    },[order])

    useEffect(() => {
      if(timerStatus === 'running' && prodTimeLeft && prodTimeLeft - 1 >= 0) dispatch(productionActions.setProdTimeLeft({slotIdx, prodTimeLeft: prodTimeLeft - 1}));

    },[timer])

    return (
        <div className='production-info slot-item flex column space-between'>
            <div className='info-section'>
                <h4>{ORDER_ID}</h4>
                {order && <span>{order.orderId}</span>}
            </div>
            <div className='info-section'>
                <h4>{PRODUCING}</h4>
                {order && <span>{order.product.name}</span>}
            </div>
            <div className='info-section'>
                <h4>{EST_TIME}</h4>
                {order && <span>{prodTimeLeft} Seconds</span>}
            </div>
        </div>
    )
}
