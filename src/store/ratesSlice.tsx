import { createSlice } from "@reduxjs/toolkit";

interface RatesState {
  rates: []
  loading: boolean
  error: string
}

const initialState = {
  rates: [],
  loading: false,
  error: ''
} as RatesState;


const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    getRates(state, action) {
      console.log('#### getRates state: ', state)
      console.log('#### getRates action: ', action)
      // state.rates = action.payload.rates;
    }
  },
})

export const { getRates } = ratesSlice.actions;
export default ratesSlice.reducer;