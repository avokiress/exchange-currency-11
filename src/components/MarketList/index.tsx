import React from "react";
import { useEffect, useState } from "react";

/**
 * этот фукционал закомментировала, для запроса данных надо быть авторизованным
 * сохранила данные в константу
 * в целом запрос и сохранение в redux осталось
*/

// import { useDispatch, useSelector } from "react-redux";

import { Box } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';
import { MarketEntity } from 'components/MarketEntity';

// import { fetchMarkets } from 'store/marketsSlice';
import { marketList } from 'constants/marketList'


export const MarketList = ({ currency = [] }) => {
  const [keyOne, setKeyOne] = useState('')
  const [keyTwo, setKeyTwo] = useState('')

  // const dispatch = useDispatch()
  // const { markets, loading } = useSelector((state) => state.markets)
  const markets = marketList;

  // useEffect(() => {
  //   dispatch(fetchMarkets())
  // }, [])

  useEffect(() => {
    if (currency.length === 2) {
      setKeyOne(currency[0]);
      setKeyTwo(currency[1]);
    } else {
      const keys = Object.keys(markets);
      const keyOneValue = keys[Math.floor(Math.random() * keys.length)];
      const keyTwoValue = keys[Math.floor(Math.random() * keys.length)];
      setKeyOne(keyOneValue);
      setKeyTwo(keyTwoValue);
    }
  }, [currency])

  const renderTitle = () => {
    let title = `Popular trading markets: `
    if (markets[keyOne]) {
      title += ` ${keyOne}`
    }
    if (markets[keyTwo]) {
      title += ` ${keyTwo}`
    }
    return title;
  }


  // if (loading) return <CircularProgress />
  if (!markets) return null;
  if (!keyOne || !keyTwo) return null;
  if (!markets[keyOne] || !markets[keyTwo]) return null;


  return (
    <>
      <h2>{renderTitle()}</h2>
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {markets[keyOne] &&
          <MarketEntity currency={keyOne} />
        }
        {markets[keyTwo] &&
          <MarketEntity currency={keyTwo} />
        }
      </Box>
    </>
  )
}