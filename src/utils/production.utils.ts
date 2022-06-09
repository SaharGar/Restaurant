import {Customer, Material, Order} from "../models/general.models";
import {v4 as uuidv4} from "uuid";
import {getRandomIntInclusive} from "../utils";

export const setProdTime = (materials: Material[]): number => {
    const materialsProdTimes: number[] = materials.map(material => material.productionTimeInSec);
    const estTime: number = materialsProdTimes.reduce((a, b) => a + b);
    return estTime;
}

export const getNewOrder = (customer: Customer): Order => {
    const {id, product} = customer;
    return {
        //Don't need 20 characters id, 8 is enough because I need it to fit the UI
        orderId: uuidv4().slice(0, 8),
        customerId: id,
        product: product,
        totalProductionTimeInSec: setProdTime(customer.product.materials),
    }
}

export const isMaterialsInStock = (productMaterials: Material[], currentAvailableMaterials: Material[]): boolean => {
    const availableMaterialsNames: string[] = currentAvailableMaterials.map(material => material.name);
    return productMaterials.every(productMaterial => availableMaterialsNames.includes(productMaterial.name));
}



export const checkIfCustomerFinishedOrder = (customer: Customer, timer: number) => {
    return (timer - customer.timeEnteredQueue >= customer.orderingTimeInSec)
}

export const checkIfOrderAccepted = (customer: Customer) => {
    return checkIfEnoughMoney(customer) && checkCustomerOrderTriesCount(customer)
}

export const checkIfOrderSucceed = () => {
    return getRandomIntInclusive(1, 10) < 9
}

const checkIfEnoughMoney = (customer: Customer) => {
    return customer.money >= customer.product.price;
}

const checkCustomerOrderTriesCount = (customer: Customer) => {
    return (!customer.orderingTriesCount || customer.orderingTriesCount < 3)
}

export const checkIfCustomerWantToStopProd = () => {
    return getRandomIntInclusive(1,100) > 90;
}

export const checkIfCustomerWantToReorder = () => {
    return Math.random() < 0.5
}
