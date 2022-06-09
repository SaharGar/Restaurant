import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {LandingPageState, RestaurantOwner} from "../models/landing-page.models";

const initialState: LandingPageState = {
    isLandingPageOn: true,
}

const landingPageSlice = createSlice( {
    name: 'landing-page',
    initialState,
    reducers: {
        setIsLandingPageOn(state, action) {
            state.isLandingPageOn = false
        },

        setRestaurantName(state, action: PayloadAction<string>) {
            state.restaurantName = action.payload;
        },

        setRestaurantOwner(state, action: PayloadAction<RestaurantOwner>) {
            state.owner = action.payload;
        }
    }
})

export default landingPageSlice.reducer;
export const landingPageActions = landingPageSlice.actions;