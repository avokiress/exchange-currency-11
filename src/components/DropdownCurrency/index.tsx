
import { useState } from 'react';
import countryCurrencySymbol from 'constants/countryCurrencySymbol';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

type DropdownData = {
  title: string
  field: string
  currency: string
}

export const DropdownCurrency = ({ title, field, currency = '' }: DropdownData) => {
  const [currencyState, setCurrencyState] = useState(currency);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrencyState(event.target.value as string);
  };

  const renderCurrency = (__currency: string) => {
    const code = __currency.toLowerCase();
    const name = countryCurrencySymbol[__currency];

    return (
      <MenuItem key={__currency} value={__currency}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {__currency
            ?
            <>
              <div className={`currency-flag currency-flag-xl currency-flag-${code}`}></div>
              <p>{name}</p>
            </>
            :
            <p>Select currency</p>
          }
        </Box>
      </MenuItem>
    )
  };

  return (
    <>
      <FormHelperText sx={{ fontSize: '16px' }}>{title}</FormHelperText>

      <FormControl>
        <Select
          sx={{ width: '500px', padding: '0' }}
          displayEmpty
          name={field}
          value={currencyState}
          onChange={handleChange}
          MenuProps={{ PaperProps: { sx: { maxHeight: '400px' } } }}
          renderValue={() => renderCurrency(currencyState)}
        >

          {Object.keys(countryCurrencySymbol).map(currencySymbol => renderCurrency(currencySymbol))}

        </Select>
      </FormControl>
    </>
  )
}