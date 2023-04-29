import { useState, useCallback } from "react";
import { apiKey, urlConvert } from 'config';

export const useFetchConvert = () => {

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();


  const fetchData = useCallback((options = {}) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    const newUrl = urlConvert + '?' + (new URLSearchParams(options)).toString();

    setLoading(true);
    fetch(newUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch((error) => { setError(error); setLoading(false); });
  });

  return { data, isLoading, error, fetchData };
};