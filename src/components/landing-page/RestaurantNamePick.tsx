import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {landingPageActions} from "../../store/landing-page.slice";
import {FormInput} from "../input/FormInput";

export const RestaurantNamePick: React.FC = () => {
    const [restaurantName, setRestaurantName] = useState<string>('');
    const dispatch = useDispatch();

    const submitRestaurantName = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (restaurantName) {
            dispatch(landingPageActions.setRestaurantName(restaurantName));
            setRestaurantName('');
        }
    }

    const onSetRestaurantName = (name: string) => {
        setRestaurantName(name)
    }

    return (
            <FormInput required={true} placeholder={'Enter Restaurant Name'} value={restaurantName} onChangeFunc={onSetRestaurantName} onSubmitFunc={submitRestaurantName}/>
    )
}
