import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface SymbolsState {
  symbols: object
  loading: boolean
  error: string
}

interface Returned {
  success: boolean,
  symbols: object
}


const initialState = {
  symbols: {},
  loading: false,
  error: ''
} as unknown as SymbolsState;

const myHeaders = new Headers();
myHeaders.append("apikey", "Hz7p5ZyXr7AqxDxM9T0Q9ENxMirSqpuX");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
} as RequestInit;


export const fetchSymbols = createAsyncThunk<Returned>(
  'symbols/fetchSymbols',
  async () => {
    // Fetch the backend endpoint:
    const response = await fetch('https://api.apilayer.com/exchangerates_data/symbols', requestOptions);

    // Get the JSON from the response:
    const data = await response.json();

    // Return result:
    return data;
  }
)

const symbolsSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {
    getSymbols: (state: SymbolsState, action: PayloadAction<Returned>) => {
      console.log('#### getSymbols state: ', state)
      console.log('#### getSymbols action: ', action)
      state.symbols = action.payload;
    }
  },

  extraReducers: {
    [fetchSymbols.pending]: (state) => {
      state.loading = true
    },
    [fetchSymbols.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.symbols = payload
    },
    [fetchSymbols.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const { getSymbols } = symbolsSlice.actions;
export default symbolsSlice.reducer;