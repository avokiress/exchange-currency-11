import { useState, useCallback, useEffect } from "react";

export const useFetch = (url, options = {}) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetchData(url, options);
  }, []);

  
  const fetchData = useCallback((url, options = {}) => {
    url += '?' + (new URLSearchParams(options)).toString();

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch((error) => { setError(error); setLoading(false); });
  });

  return { data, isLoading, error, refetch: fetchData };
};