import React, {useEffect} from "react";
import {DELIVERY_HEADLINE} from "../../consts";
import {DeliverySlot} from "./DeliverySlot";
import {DeliverySlotInterface} from "../../models/delivery.models";
import {Order} from "../../models/general.models";
import {useDispatch, useSelector} from "react-redux";
import {deliveryActions} from "../../store/delivery.slice";
import {RootState} from "../../store";
import {productionActions} from "../../store/production.slice";
import {getRandomIntInclusive} from "../../utils";
const lodash = require('lodash')

export const Delivery: React.FC = () => {

    const timer = useSelector((state: RootState) => state.timer.time);
    const deliveryTimeInSec = useSelector((state: RootState) => state.delivery.deliveryTimeInSec);
    const deliverySlots = useSelector((state: RootState) => state.delivery.deliverySlots);
    const deliveryQueue = useSelector((state: RootState) => state.delivery.deliveryQueue);
    const dispatch = useDispatch();

    useEffect(() => {
        if(timer === 0) generateInitialDeliverySlots()
        else {
            addToDelivery()
            removeFromDelivery();
            checkIfDeliveryFailed()
        }
    },[timer])

    const generateInitialDeliverySlots = () => {
        const deliverySlots: DeliverySlotInterface[] = [];
        for(let i = 0; i < 3; i++) {
            const slot: DeliverySlotInterface = {
                slotIdx: i
            }
            deliverySlots.push(slot);
        }
        dispatch(deliveryActions.setDeliverySlots(deliverySlots));
    }

    const addToDelivery = () => {
        let isOrderAdded: boolean = false;
        if(deliveryQueue[0]) {
            deliverySlots.forEach((deliverySlot, idx) => {
                if(!deliverySlot.order && !isOrderAdded) {
                    const orderToDeliver: Order = {
                        ...deliveryQueue[0],
                        timeAddedToDelivery: timer
                    }
                    dispatch(deliveryActions.addToDelivery({slotIdx: idx, order: orderToDeliver}))
                    isOrderAdded = true
                }
            })
        }
    }

    const removeFromDelivery = () => {
        deliverySlots.forEach(slot => {
            if(slot.order) {
                if(timer - slot.order.timeAddedToDelivery! === deliveryTimeInSec) {
                    dispatch(deliveryActions.removeFromDelivery({slotIdx: slot.slotIdx, orderId: slot.order.orderId}));
                }
            }
        })
    }

    const checkIfDeliveryFailed = () => {
        deliverySlots.forEach(slot => {
            if(slot.order) {
                if(getRandomIntInclusive(1,1000) > 996  ) {
                    const orderToReProduce: Order = lodash.cloneDeep(slot.order);
                    orderToReProduce.product.materials.forEach(material => material.isReady = false)
                    dispatch(deliveryActions.removeFromDelivery({slotIdx: slot.slotIdx, orderId: slot.order.orderId}));
                    dispatch(productionActions.reProduceProduct(orderToReProduce));
                }
            }
        })
    }

    return (
        <div className='delivery'>
            <h2 className='section-headline'>
                {DELIVERY_HEADLINE}
            </h2>
            <div className='delivery-slot-container flex space-between'>
                {deliverySlots.map(slot => <DeliverySlot key={slot.slotIdx} slotIdx={slot.slotIdx} order={slot.order} deliveryTime={deliveryTimeInSec} timer={timer}/>)}
            </div>
        </div>
    )
}
