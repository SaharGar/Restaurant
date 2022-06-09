import React, {useEffect, useState} from "react";
import {ORDER_ID} from "../../consts";
import {EST_TIME} from "../../consts";
import {TO_CUSTOMER} from "../../consts";
import {Order} from "../../models/general.models";

interface DeliverySlotProps {
    slotIdx: number
    order?: Order;
    deliveryTime: number;
    timer: number;
}

export const DeliverySlot: React.FC<DeliverySlotProps> = ({order, slotIdx, deliveryTime, timer}) => {

    const [timeLeftForDelivery, setTimeLeftForDelivery] = useState(deliveryTime);
    const [currentOrderId, setCurrentOrderId] = useState<string>('');

    useEffect(() => {
        if(order && timeLeftForDelivery - 1 >= 0) setTimeLeftForDelivery(prevTime => prevTime - 1);
    },[timer])

    useEffect(() => {
        if(order) {
            if(!currentOrderId) setCurrentOrderId(order.orderId);
            else if(currentOrderId !== order.orderId) {
                setCurrentOrderId(order.orderId);
                setTimeLeftForDelivery(deliveryTime);
            }
        }
    },[order])

    return (
        <div className='delivery-slot flex column'>
            <h3>Delivery #{slotIdx + 1} {}</h3>
            <div className='delivery-info flex column align-center'>
                <div className='info-section'>
                    <h4>{ORDER_ID}:</h4>
                    {order && <span>{order.orderId}</span>}
                </div>
                <div className='info-section'>
                    <h4>{TO_CUSTOMER}:</h4>
                    {order && <span>{order.customerId}</span>}
                </div>
                <div className='info-section'>
                    <h4>{EST_TIME}:</h4>
                    {order && <span>{timeLeftForDelivery} Seconds</span>}
                </div>
            </div>
        </div>
    )
}
