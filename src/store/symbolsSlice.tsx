import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apilayerService } from "../service";

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

export const fetchSymbols = createAsyncThunk<Returned>(
  'symbols/fetchSymbols',
  apilayerService.getSymbols
)

const symbolsSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {
    fetchSymbols: (state: SymbolsState, action: PayloadAction<Returned>) => {
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