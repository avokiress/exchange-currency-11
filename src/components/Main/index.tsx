import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSymbols } from 'store/symbolsSlice';
import { CurrencyExchange } from 'components/CurrencyExchange'
import { Chart } from "../Chart"
import ModalSelectRegion from "../ModalSelectRegion";

export const Main = () => {
  const dispatch = useDispatch()
  const { symbols, loading } = useSelector((state) => state.symbols)

  useEffect(() => {
    // dispatch(fetchSymbols())
  }, [])

  if (loading) return <p>Loading...</p>


  return (
    <>
      <h1>Converter</h1>
      <ModalSelectRegion />
      <CurrencyExchange />
      {/* <Chart startDate={new Date('2023-01-01')} endDate={new Date()} base="RUB" symbols={["EUR", "USD"]} /> */}
    </>
  )
}