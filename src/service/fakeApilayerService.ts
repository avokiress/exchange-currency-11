import { exchangeRatesServiceType } from "./apilayerService";
import timeseries from "../constants/timeseries.json";
import symbols from "../constants/symbols.json"

const apilayerService: exchangeRatesServiceType = {
  getTimeseries: async (startDate: Date, endDate: Date, base: string = 'RUB', symbols = ['EUR', "USD"]) => {
    console.log("### fake getTimeseries with params", { startDate, endDate, base, symbols });
    return Promise.resolve(timeseries);
  },
  getSymbols: async () => {
    return Promise.resolve(symbols);
  }
}

export default apilayerService