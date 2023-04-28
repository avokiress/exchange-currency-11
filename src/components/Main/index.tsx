import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSymbols } from 'store/symbolsSlice';
import { CurrencyExchange } from 'components/CurrencyExchange'

export const Main = () => {
  const dispatch = useDispatch()
  const { symbols, loading } = useSelector((state)=> state.symbols)

  useEffect(() => {
    dispatch(getSymbols())
  }, [])

  console.log('symbols: ', symbols);
  if (loading) return <p>Loading...</p>
  

  return (
    <>
      <h1>Symbols</h1>
      <CurrencyExchange />
    </>
  )
}