import { exchangeRatesServiceType } from "./apilayerService";
import timeseries from "./fakeApiData/timeseries.json";
import symbols from "./fakeApiData/symbols.json"

const apilayerService: exchangeRatesServiceType = {
  getTimeseries: async (startDate: Date, endDate: Date, base: string = 'RUB', symbols = ['EUR', "USD"]) => {
    console.log("### fake getTimeseries with params", { startDate, endDate, base, symbols });
    return Promise.resolve(timeseries);
  },
  getSymbols: async () => {
    console.log("### fake getSymbols");
    return Promise.resolve(symbols);
  }
}

export default apilayerService