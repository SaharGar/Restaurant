import React, {useEffect, useState} from 'react';
import {PRODUCTION_STATUS} from "../../consts";
import {useDispatch, useSelector} from "react-redux";
import {ProductionItemProps} from "../../models/production.models";
import {productionActions} from "../../store/production.slice";
import {RootState} from "../../store";

interface ProdStateProps extends ProductionItemProps {
  slotIdx: number;
  timer: number;
}

export const ProductionStatus: React.FC<ProdStateProps> = ({order, slotIdx, timer}) => {

  const timerStatus = useSelector((state: RootState) => state.timer.status)
  const currentMaterialIdx = useSelector((state: RootState) => state.production.productionSlots[slotIdx].currentMaterialIdx);
  const timePassedInProd = useSelector((state: RootState) => state.production.productionSlots[slotIdx].timePassedInProd);
  const [currentOrderId, setCurrentOrderId] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (order) {
      if (!currentOrderId) setCurrentOrderId(order.orderId);
      else if (currentOrderId !== order.orderId) {
        setCurrentOrderId(order.orderId);
        dispatch(productionActions.setSlotCurrentMaterialIdx({slotIdx, currMaterialIdx: 0}))
        dispatch(productionActions.setTimePassedInProd({slotIdx, timePassedInProd: 0}))
      }
    }
  }, [order])

  useEffect(() => {
    if (order && currentMaterialIdx! + 1 <= order.product.materials.length) {
      const currentMaterialProdTime = order?.product.materials[currentMaterialIdx!].productionTimeInSec;
      if (timerStatus === 'running' && currentMaterialProdTime && timer - order?.timeAddedToProduction! === currentMaterialProdTime + timePassedInProd) updateMaterialsProdStatus();
    }
  }, [timer])

  const updateMaterialsProdStatus = () => {
    if (order) {
      const materialProdTime = order.product.materials[currentMaterialIdx!].productionTimeInSec;
      dispatch(productionActions.updateMaterialsProdStatus({slotIdx, materialIdx: currentMaterialIdx}));
      dispatch(productionActions.setSlotCurrentMaterialIdx({slotIdx, currMaterialIdx: currentMaterialIdx! + 1}))
      dispatch(productionActions.setTimePassedInProd({slotIdx, timePassedInProd: timePassedInProd + materialProdTime}))
    }
  }

  return (
    <div className='production-status slot-item'>
      <h3>
        {PRODUCTION_STATUS}
      </h3>
      {order && <ul className='clean-list'>
        {order.product.materials.map(material => <li className={`${material.isReady && 'ready'}`}
                                                     key={material.name}>{material.name}</li>)}
      </ul>}
    </div>
  )
}
