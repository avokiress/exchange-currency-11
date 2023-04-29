import moment from "moment";

const apiBaseUrl = "https://api.apilayer.com/";
const timeseriesEndPoint = "exchangerates_data/timeseries";
const symbolsEndPoint = "exchangerates_data/symbols";
const accessKey = import.meta.env.VITE_APILAYER_ACCESS_KEY;
console.log('accessKey', import.meta.env.VITE_APILAYER_ACCESS_KEY);
export interface exchangeRatesServiceType {
  getTimeseries: (startDate: Date, endDate: Date, base?: string, symbols?: string[]) => Promise<any>
  getSymbols: () => Promise<any>
}

const getRequestOptions = (): RequestInit => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", accessKey);
  var requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  return requestOptions;
}

const apilayerService: exchangeRatesServiceType = {
  getTimeseries: async (startDate: Date, endDate: Date, base: string = 'RUB', symbols = ['EUR', "USD"]) => {
    const startDateFromatString: String = moment(startDate).format("YYYY-MM-DD");
    const endDateFromatString: String = moment(endDate).format("YYYY-MM-DD");
    let result = null;
    try {
      const responce = await fetch(apiBaseUrl + timeseriesEndPoint + `?start_date=${startDateFromatString}&end_date=${endDateFromatString}&base=${base}&symbols=${symbols.join(',')}`, getRequestOptions());
      result = await responce.json();
    } catch (error) {
      console.log('Error', error)
    }
    return result;
  },
  getSymbols: async () => {
    let result = null;
    try {
      const responce = await fetch(apiBaseUrl + symbolsEndPoint, getRequestOptions());
      result = await responce.json();
    } catch (error) {
      console.log('Error', error)
    }
    return result;
  }
}

export default apilayerService