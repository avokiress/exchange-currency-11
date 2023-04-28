import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getRates } from 'store/ratesSlice';
import { CurrencyExchange } from 'components/CurrencyExchange'

export const Main = () => {
  const dispatch = useDispatch();

  const fetchRates = () => dispatch(getRates());

  useEffect(() => {
    fetchRates();
  }, [dispatch])

  return (
    <>
      <h1>Rates</h1>
      <CurrencyExchange />
    </>
  )
}