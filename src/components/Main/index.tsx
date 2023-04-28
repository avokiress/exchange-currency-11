import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRates } from 'store/ratesSlice';
import { CurrencyExchange } from 'components/CurrencyExchange'

export const Main = () => {
  const dispatch = useDispatch()
  const { rates, loading } = useSelector((state)=> state.rates)

  useEffect(() => {
    dispatch(getRates())
  }, [])

  console.log('rates: ', rates);
  if (loading) return <p>Loading...</p>
  

  return (
    <>
      <h1>Rates</h1>
      <CurrencyExchange />
    </>
  )
}