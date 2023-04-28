import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface RatesState {
  rates: []
  loading: boolean
  error: string
}

interface Returned {
  rates: []
}

const initialState = {
  rates: [],
  loading: false,
  error: ''
} as unknown as RatesState;

const myHeaders = new Headers();
myHeaders.append("apikey", "Hz7p5ZyXr7AqxDxM9T0Q9ENxMirSqpuX");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
} as RequestInit;


export const fetchRates = createAsyncThunk(
  'rates/fetchRates',
  async () => {
    const res = await fetch('https://api.apilayer.com/exchangerates_data/symbols', requestOptions).then(
      (data) => data.json()
    )
    console.log('#### res: ', res);
    return res;
  })

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

  extraReducers: {
    [fetchRates.pending]: (state) => {
      state.loading = true
    },
    [fetchRates.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.rates = payload
    },
    [fetchRates.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const { getRates } = ratesSlice.actions;
export default ratesSlice.reducer;