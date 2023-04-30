import { configureStore } from "@reduxjs/toolkit";
import symbolsReducer from './symbolsSlice';
import marketsReducer from './marketsSlice';

const store = configureStore({
  reducer: {
    symbols: symbolsReducer,
    markets: marketsReducer,
  }
});

export default store