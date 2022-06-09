import React, {useEffect} from 'react'
import {restaurantMaterials} from "../../data/materials";
import {PRODUCTION_HEADLINE} from "../../consts";
import {ProductionSlot} from "./ProductionSlot";
import {useDispatch, useSelector} from "react-redux";
import {productionActions} from "../../store/production.slice";
import {Customer, Order} from "../../models/general.models";
import {Slot} from "../../models/production.models";
import {queuesActions} from "../../store/queues.slice";
import {RootState} from "../../store";
import {deliveryActions} from "../../store/delivery.slice";
import {getNewOrder, isMaterialsInStock, checkIfCustomerFinishedOrder, checkIfOrderAccepted, checkIfOrderSucceed, checkIfCustomerWantToStopProd, checkIfCustomerWantToReorder} from "../../utils/production.utils";
import {generalInfoActions} from "../../store/general-info.slice";

export const Production: React.FC = () => {

  const productionSlots = useSelector((state: RootState) => state.production.productionSlots);
  const productionQueue = useSelector((state: RootState) => state.production.productionQueue);
  const availableMaterials = useSelector((state: RootState) => state.production.availableMaterials);
  const queues = useSelector((state: RootState) => state.queues.queues);
  const timer = useSelector((state: RootState) => state.timer.time);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!timer) {
      setInitialMaterials();
      generateInitialProdSlots();
    } else {
      addToProductionQueue();
      addToProduction();
      addToDeliveryQueue();
      checkIfContinueProduction();
    }
  }, [timer])

  const setInitialMaterials = () => {
    dispatch(productionActions.setAvailableMaterials(restaurantMaterials));
  }

  const generateInitialProdSlots = () => {
    const productionSlots: Slot[] = [];
    for (let i = 0; i < 3; i++) {
      const slot: Slot = {
        slotIdx: i,
        currentMaterialIdx: 0,
        timePassedInProd: 0
      }
      productionSlots.push(slot);
    }
    dispatch(productionActions.setProductionSlots(productionSlots));
  }

  const addToProductionQueue = () => {
    queues.forEach(queue => {
      const orderingCustomer: Customer = queue.customers[0];
      if (!orderingCustomer) return;
        if (checkIfCustomerFinishedOrder(orderingCustomer, timer)) {
          if (checkIfOrderAccepted(orderingCustomer)) {
            if (checkIfOrderSucceed()) {
              const order: Order = getNewOrder(orderingCustomer);
              dispatch(productionActions.addToProductionQueue(order));
              dispatch(generalInfoActions.addToTotalIncome(order.product.price));
              dispatch(queuesActions.removeFromQueue({queueIdx: queue.queueIdx, customerId: orderingCustomer.id}));
            } else dispatch(queuesActions.updateOrderingTriesCount(queue.queueIdx));
          } else dispatch(queuesActions.removeFromQueue({queueIdx: queue.queueIdx, customerId: orderingCustomer.id}));
        }
    })
  }

  const addToProduction = () => {
    let isOrderSent: boolean = false;
    if (productionQueue[0]) {
      const orderToAdd: Order = {
        ...productionQueue[0],
        timeAddedToProduction: timer
      }
      if (isMaterialsInStock(orderToAdd.product.materials, availableMaterials)) {
        productionSlots.forEach(slot => {
          if (!slot.order && !isOrderSent) {
            dispatch(productionActions.addOrder({slotIdx: slot.slotIdx, order: orderToAdd}));
            dispatch(productionActions.removeFromProductionQueue(orderToAdd.orderId));
            dispatch(productionActions.removeFromAvailableMaterials(orderToAdd.product.materials));
            isOrderSent = true;
          }
        })
      } else dispatch(productionActions.addToAvailableMaterials(orderToAdd.product.materials));
    }
  }

  const checkIfContinueProduction = () => {
    productionSlots.forEach(productionSlot => {
      if(productionSlot.order && checkIfCustomerWantToStopProd()) {
        dispatch(generalInfoActions.removeFromTotalIncome(productionSlot.order.product.price))
        if(checkIfCustomerWantToReorder()){
          dispatch(productionActions.addToProductionQueue(productionSlot.order));
        }
        dispatch(productionActions.removeOrder(productionSlot.slotIdx));
      }
    })
  }

  const addToDeliveryQueue = () => {
    productionSlots.forEach(productionSlot => {
      if (productionSlot.order) {
        if (timer - productionSlot.order.timeAddedToProduction! >= productionSlot.order.totalProductionTimeInSec) {
          dispatch(productionActions.removeOrder(productionSlot.slotIdx));
          dispatch(deliveryActions.addToDeliveryQueue(productionSlot.order));
        }
      }
    })
  }

  return (
    <div className='production flex column'>
      <h2 className='section-headline'>
        {PRODUCTION_HEADLINE}
      </h2>
      <div className='production-container flex column'>
        {productionSlots.map(slot => <ProductionSlot key={slot.slotIdx} slot={slot} timer={timer}/>)}
      </div>
    </div>
  )
}
