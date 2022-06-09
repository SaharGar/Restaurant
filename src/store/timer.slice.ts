import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TimerState} from "../models/timer.models";

const initialState: TimerState = {
    time: 0,
    status: 'stopped'
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setTimer(state, action: PayloadAction<number>) {
            state.time = action.payload;
        },
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload
        }
    }
})

export default timerSlice.reducer;
export const timerActions = timerSlice.actions;