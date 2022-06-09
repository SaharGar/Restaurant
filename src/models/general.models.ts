
export interface Customer {
        id: string;
        product: Product;
        timeEnteredQueue: number;
        orderingTimeInSec: number;
        money: number;
        priority: number;
        orderingTriesCount?: number;
}

export interface Product {
    name: string;
    materials: Material[];
    imgUrl: string;
    price: number;
}

export interface Material {
    name: string;
    isReady: boolean,
    productionTimeInSec: number;
}

export interface Order {
    orderId: string;
    customerId: string;
    product: Product;
    totalProductionTimeInSec: number;
    timeAddedToProduction?: number;
    timeAddedToDelivery?: number;
}

export interface GeneralInfoState {
  totalIncome: number;
  isTotalIncomeVisible: boolean;
}
