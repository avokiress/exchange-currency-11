import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiLayerMarkets } from "service";

interface MarketsState {
  markets: object
  loading: boolean
  error: string
}

interface Returned {
  success: boolean,
  markets: object
}

interface MarketCurrencyData {
  code: string,
  symbol: string,
  name: string,
}

interface MarketTimezoneData {
  timezone: string,
  abbr: string,
  abbr_dst: string,
}

interface MarketData {
  acronym: string,
  city: string,
  country: string,
  country_code: string,
  currency: MarketCurrencyData,
  mic: string,
  name: string,
  timezone: MarketTimezoneData
  website: string
}

const mappingMarketList = (marketList: MarketData[]) => {
  let markets: object = {};
  marketList.forEach((currentMarket: MarketData) => {
    const marketCurrency = [currentMarket.currency?.code][0];
    
    if (marketCurrency) {
      markets = {
        ...markets,
        [marketCurrency]: [...(markets[marketCurrency] || []), currentMarket],
      }
    }
  })
  return markets;
}

const initialState = {
  markets: {},
  loading: false,
  error: ''
} as unknown as MarketsState;


export const fetchMarkets = createAsyncThunk<Returned>(
  'markets/fetchMarkets',
  apiLayerMarkets.getMarkets
)

const marketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {
    fetchMarkets: (state: MarketsState, action: PayloadAction<Returned>) => {
      state.markets = action.payload;
    }
  },

  extraReducers: {
    [fetchMarkets.pending]: (state) => {
      state.loading = true
    },
    [fetchMarkets.fulfilled]: (state, { payload }) => {

      state.loading = false
      state.markets = mappingMarketList(payload?.data)
    },

    [fetchMarkets.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const { getMarkets } = marketsSlice.actions;
export default marketsSlice.reducer;