import moment from "moment";

const apiBaseUrl = "http://api.marketstack.com/";
const symbolsEndPoint = "v1/exchanges";
const accessKey = import.meta.env.VITE_APILAYER_ACCESS_KEY_MARKETS;

export interface exchangeRatesServiceType {
  getMarkets: () => Promise<any>
}

const apiLayerMarkets: exchangeRatesServiceType = {
  getMarkets: async () => {
    let result = null;
    try {
      const responce = await fetch(apiBaseUrl + symbolsEndPoint + '?access_key=' + accessKey);
      result = await responce.json();
    } catch (error) {
      console.log('Error', error)
    }
    return result;
  }
}

export default apiLayerMarkets