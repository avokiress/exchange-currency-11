import React from "react";

import { Menu } from 'components/Menu'
import { CurrencyExchange } from 'components/CurrencyExchange'
import ModalSelectRegion from "components/ModalSelectRegion";

import { FavoritesProvider } from '../../context';


export const Main = () => {
  return (
    <>
      <FavoritesProvider>
        <Menu />
        <h1>Converter</h1>
        <ModalSelectRegion />
        <CurrencyExchange />
      </FavoritesProvider>
    </>
  )
}