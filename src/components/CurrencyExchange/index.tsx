
import { useState } from 'react';
import countryData from 'constants/countryData.json';
import countryCurrencySymbol from 'constants/countryCurrencySymbol';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

console.log('countryData: ', countryData)
console.log('countryCurrencySymbol: ', countryCurrencySymbol)

export const CurrencyExchange = () => {
  const [currency, setCurrency] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const renderCurrency = (__currency: string) => {
    const code = __currency.toLowerCase();
    const name = countryCurrencySymbol[__currency];

    return (
      <MenuItem key={code} value={name}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <div className={`currency-flag currency-flag-xl currency-flag-${code}`}></div>
          <p>{name}</p>
        </div>
      </MenuItem>
    );
  };

  return (
    <>
      <h2>Currency exchange</h2>
      <FormHelperText>From</FormHelperText>

      <Select
        value={currency}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="">
          <em>Select currency</em>
        </MenuItem>
        {Object.keys(countryCurrencySymbol).map(currencySymbol => renderCurrency(currencySymbol)) }
      </Select>
    </>
  )
}