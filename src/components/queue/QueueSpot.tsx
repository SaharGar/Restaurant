import React from 'react';
import {Customer} from "../../models/general.models";

interface QueueSpotProps {
  customer?: Customer;
}

export const QueueSpot: React.FC<QueueSpotProps> = ({customer}) => {

  return (
    <div className={`queue-spot flex justify-center align-center ${customer && 'customer'}`}>
      {customer && <span>{customer.id}</span>}
    </div>
  )
}
