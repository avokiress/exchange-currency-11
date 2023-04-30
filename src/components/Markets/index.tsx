import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { marketList } from 'constants/marketList'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import countryCurrencySymbol from 'constants/countryCurrencySymbol';

import { fetchMarkets } from 'store/marketsSlice';


export const Markets = ({ currency = [] }) => {
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

  // console.log('marketList: ', marketList)
  // console.log('countryCurrencySymbol: ', countryCurrencySymbol)

  const renderMarket = (__currency: string) => {
    const market = marketList[__currency][0]
    return (
      <Box sx={{ border: '1px solid #e0e1e5', padding: '20px', borderRadius: '8px', width: '45%' }}>
        <h3 style={{ alignItems: 'center', display: 'flex' }}>
          <div className={`currency-flag currency-flag-sm currency-flag-${__currency.toLowerCase()}`}></div>
          {market.name} ({market.country})
        </h3>
        <Button
          component="a"
          href={market.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {market.website}
        </Button>
        <Divider />
        
      </Box>
    )
  }

  return (
    <>
      <h2>{renderTitle()}</h2>
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        {renderMarket(keyOne)}
        {renderMarket(keyTwo)}
      </Box>
    </>
  )
}