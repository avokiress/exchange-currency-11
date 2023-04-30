import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";

import { Box } from '@mui/material';
import Button from '@mui/material/Button';

import countryCurrencySymbol from 'constants/countryCurrencySymbol';
import MarketEntity from 'components/MarketEntity';

import { fetchMarkets } from 'store/marketsSlice';
import { marketList } from 'constants/marketList'


export const MarketList = ({ currency = [] }) => {
  const [keyOne, setKeyOne] = useState('')
  const [keyTwo, setKeyTwo] = useState('')

  const dispatch = useDispatch()
  const { markets, loading } = useSelector((state) => state.markets)

  useEffect(() => {
    // dispatch(fetchMarkets())
  }, [])

  useEffect(() => {
    if (currency.length === 2) {
      setKeyOne(currency[0]);
      setKeyTwo(currency[1]);
    } else {
      const keys = Object.keys(marketList);
      const keyOneValue = keys[Math.floor(Math.random() * keys.length)];
      const keyTwoValue = keys[Math.floor(Math.random() * keys.length)];
      setKeyOne(keyOneValue);
      setKeyTwo(keyTwoValue);
    }
  }, [currency])

  const renderTitle = () => {
    let title = `Popular Trading markets`
    if (keyOne && keyTwo) {
      title += ` (${keyOne}, ${keyTwo})`
    }
    return title;
  }


  if (loading) return <p>Loading...</p>
  if (!keyOne || !keyTwo) return null;

  return (
    <>
      <h2>{renderTitle()}</h2>
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <MarketEntity currency={keyOne} />
        <MarketEntity currency={keyTwo} />
      </Box>
    </>
  )
}