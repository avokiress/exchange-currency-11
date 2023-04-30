import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSymbols } from 'store/symbolsSlice';
import { CurrencyExchange } from 'components/CurrencyExchange'
import { Chart } from "components/Chart"
// import { IconButton, useTheme } from "@mui/material";
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import React from "react";
import ThemeButton from "../../components/Theme/ThemeButton.jsx";

// const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


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
      <CurrencyExchange />
      {/* <Chart startDate={new Date('2023-01-01')} endDate={new Date()} base="RUB" symbols={["EUR", "USD"]} /> */}
    </>
  )
}