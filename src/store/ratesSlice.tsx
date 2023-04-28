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
  loading: 'idle',
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
    const response = await fetch('https://api.apilayer.com/exchangerates_data/symbols', requestOptions)
    return (await response.json()) as Returned;
  }
)

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

  extraReducers: (builder) => {
    builder.addCase(fetchRates.pending, (state, action) => {
      console.log('#### builder state: ', state)
      console.log('#### builder action: ', action)
    })

    builder.addCase(fetchRates.fulfilled, (state, { payload }) => {
      console.log('#### builder payload: ', payload)
      console.log('#### builder state: ', state)
      state.rates.push(...payload);
    })
    builder.addCase(fetchRates.rejected, (state, action) => {
      console.log('#### builder state: ', state)
      console.log('#### builder action: ', action)

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error
      }
    })
  },
})

export const { getRates } = ratesSlice.actions;
export default ratesSlice.reducer;