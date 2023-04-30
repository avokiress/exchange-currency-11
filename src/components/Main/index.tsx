import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSymbols } from 'store/symbolsSlice';
import { CurrencyExchange } from 'components/CurrencyExchange'
import { Chart } from "components/Chart"
import ThemeButton from "../../components/Theme/ThemeButton.jsx";
import ModalSelectRegion from "../ModalSelectRegion/index.js";

export const Main = () => {
  const dispatch = useDispatch()
  const { symbols, loading } = useSelector((state) => state.symbols)

  useEffect(() => {
    // dispatch(fetchSymbols())
  }, [])
  // const theme = useTheme()
  // const colorMode = React.useContext(ColorModeContext);
  
  if (loading) return <p>Loading...</p>



  return (
    <>
    <ThemeButton />
      <h1>Converter</h1>
      <ModalSelectRegion />
      <CurrencyExchange />
    </>
  )
}