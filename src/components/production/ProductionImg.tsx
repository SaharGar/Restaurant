import React from 'react';
import {ProductionItemProps} from "../../models/production.models";

export const ProductionImg: React.FC<ProductionItemProps> = ({order}) => {
    return (
        <div className='production-img slot-item relative'>
            <div className='img-container absolute'>
                {order ? <img src={order.product.imgUrl} alt='Product Image'/>
                :
                <span>Slot is Empty</span>
                }
            </div>
        </div>
    )
}