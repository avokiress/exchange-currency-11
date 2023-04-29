import { useState, useCallback, useEffect } from "react";


const url = 'https://api.apilayer.com/exchangerates_data/convert';
export const useFetchConvert = () => {

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  // useEffect(() => {
  //   fetchData(options);
  // }, []);

  
  const fetchData = useCallback((options = {}) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "Hz7p5ZyXr7AqxDxM9T0Q9ENxMirSqpuX");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    const newUrl = url + '?' + (new URLSearchParams(options)).toString();

    setLoading(true);
    fetch(newUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch((error) => { setError(error); setLoading(false); });
  });

  return { data, isLoading, error, fetchData };
};