import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSymbols } from 'store/symbolsSlice';
import { CurrencyExchange } from 'components/CurrencyExchange'
<<<<<<< HEAD

=======
import { Chart } from "../Chart"
import ModalSelectRegion from "../ModalSelectRegion";
>>>>>>> alex-develop

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
    </>
  )
}