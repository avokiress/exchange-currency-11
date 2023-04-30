import { useSelector } from "react-redux";
import moment from 'moment-timezone'

import { Box } from '@mui/material';
import Button from '@mui/material/Button';

import { marketList } from 'constants/marketList'

export const MarketEntity = ({ currency = '' }) => {
  // const { markets } = useSelector((state) => state.markets)
  const markets = marketList;

  const __markets = markets[currency]
  if (!__markets) return null;

  return __markets.map(market => {
    const currentTime: moment.Moment = moment().tz(market.timezone.timezone);
    const key = `${market.acronym}_${market.name}`;

    return (
      <Box key={key} sx={{ border: '1px solid #e0e1e5', padding: '20px', borderRadius: '8px', width: '45%', background: '#f4f4f5', marginBottom: '20px' }}>
        <h3 style={{ alignItems: 'center', display: 'flex' }}>
          <div className={`currency-flag currency-flag-sm currency-flag-${currency.toLowerCase()}`}></div>
          {market.name} ({market.country})
        </h3>
        <p>Current time: {currentTime.format('HH:mm')}</p>
        <Button
          component="a"
          href={market.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {market.website}
        </Button>
      </Box>
    )
  })
}
