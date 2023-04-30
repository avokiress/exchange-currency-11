import React from "react";
import { CurrencyExchange } from 'components/CurrencyExchange'
import ThemeButton from "components/Theme/ThemeButton.jsx";
import ModalSelectRegion from "components/ModalSelectRegion";

export const Main = () => {
  return (
    <>
    <ThemeButton />
      <h1>Converter</h1>
      <ModalSelectRegion />
      <CurrencyExchange />
    </>
  )
}