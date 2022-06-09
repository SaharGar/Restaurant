import React from 'react'
import {RestaurantNamePick} from "./RestaurantNamePick";
import {People} from "./People";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const LandingPage: React.FC = () => {

    const restaurantName = useSelector((state: RootState) => state.landingPage.restaurantName);

    return (
        <div className='landing-page flex column'>
            {restaurantName ?
                <People/>
                :
                <RestaurantNamePick/>}
        </div>
    )
}