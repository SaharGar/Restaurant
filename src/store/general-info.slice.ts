import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GeneralInfoState} from "../models/general.models";

const initialState: GeneralInfoState = {
  totalIncome: 0,
  isTotalIncomeVisible: true,
}

const generalInfoSlice = createSlice({
  name: 'general-info',
  initialState,
  reducers: {
    addToTotalIncome(state, action: PayloadAction<number>) {
      state.totalIncome = state.totalIncome + action.payload
    },

    removeFromTotalIncome(state, action: PayloadAction<number>) {
      state.totalIncome = state.totalIncome - action.payload
    },

    toggleShowIncome(state) {
      state.isTotalIncomeVisible = !state.isTotalIncomeVisible
    },
  }
})

export default generalInfoSlice.reducer;
export const generalInfoActions = generalInfoSlice.actions
