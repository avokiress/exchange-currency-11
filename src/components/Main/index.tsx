import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSymbols } from 'store/symbolsSlice';
import { CurrencyExchange } from 'components/CurrencyExchange'

export const Main = () => {
  const dispatch = useDispatch()
  const { symbols, loading } = useSelector((state)=> state.symbols)

  useEffect(() => {
    // dispatch(fetchSymbols())
  }, [])

  console.log('symbols: ', symbols);
  console.log('loading: ', loading);
  if (loading) return <p>Loading...</p>
  

  return (
    <>
      <h1>Symbols</h1>
      <CurrencyExchange />
    </>
  )
}