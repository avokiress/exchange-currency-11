import React from "react";
import { useSelector } from "react-redux";
import moment from 'moment-timezone'

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { marketList } from 'constants/marketList'

const OPEN_TIME = "10:00AM";
const CLOSE_TIME = "7:00PM";

interface DataMarketHours {
  openTime: string,
  closeTime: string,
  timezone: string
}

const getIsOpenMarket = (openTime, closeTime, timezone): DataMarketHours => {
  const now = moment.tz(timezone);
  const date = now.format("YYYY-MM-DD");
  const storeOpenTime = moment.tz(date + ' ' + openTime, "YYYY-MM-DD h:mmA", timezone);
  const storeCloseTime = moment.tz(date + ' ' + closeTime, "YYYY-MM-DD h:mmA", timezone);

  let check;
  if (storeCloseTime.isBefore(storeOpenTime)) {
    check = now.isAfter(storeOpenTime) || now.isBefore(storeCloseTime);
  } else {
    check = now.isBetween(storeOpenTime, storeCloseTime, null, '[)');
  }

  return check;
}

export const MarketEntity = ({ currency = '' }) => {
  // const { markets } = useSelector((state) => state.markets)
  const markets = marketList;

  const __markets = markets[currency]
  if (!__markets) return null;

  return __markets.map(market => {
    const { timezone } = market.timezone;
    const currentTime: moment.Moment = moment().tz(timezone);
    const key = `${market.acronym}_${market.name}`;
    const isOpenTrading = getIsOpenMarket(OPEN_TIME, CLOSE_TIME, timezone)
    const severity = isOpenTrading ? 'success' : 'error'
    const isOpen = isOpenTrading ? 'Open market' : 'Closed market'

    return (
      <Box key={key} sx={{ border: '1px solid #babbbf', padding: '20px', borderRadius: '8px', width: '45%', marginBottom: '20px' }}>
        <h3 style={{ alignItems: 'center', display: 'flex', margin: '0 0 10px' }}>
          <div className={`currency-flag currency-flag-sm currency-flag-${currency.toLowerCase()}`}></div>
          {market.name} ({market.country})
        </h3>
        <p>
          <strong>City:</strong> {market.city} <br />
          <strong>Country:</strong> {market.country}
        </p>

        <Button
          component="a"
          href={market.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {market.website}
        </Button>
        <Alert sx={{}} icon={<AccessTimeIcon fontSize="inherit" />} severity={severity}>
          <AlertTitle>{isOpen}</AlertTitle>
          Current time: {currentTime.format('HH:mm')}
        </Alert>

      </Box>
    )
  })
}
