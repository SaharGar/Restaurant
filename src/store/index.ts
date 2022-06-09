import {configureStore} from "@reduxjs/toolkit";
import queuesReducer from "./queues.slice";
import productionReducer from './production.slice';
import deliveryReducer from './delivery.slice';
import timerReducer from './timer.slice';
import landingPageReducer from './landing-page.slice'
import generalInfoReducer from './general-info.slice'

const store = configureStore({
    reducer: {
        queues: queuesReducer,
        production: productionReducer,
        delivery: deliveryReducer,
        timer: timerReducer,
        landingPage: landingPageReducer,
        generalInfo: generalInfoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
