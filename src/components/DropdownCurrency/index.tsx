
import { useEffect, useState } from 'react';
import countryCurrencySymbol from 'constants/countryCurrencySymbol';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';


interface DataHandler {
  name: string
  value: string
}
interface DropdownData {
  title: string
  field: string
  currency: string
  onChange(data: object): void
}

export const DropdownCurrency = ({ title, field, currency = '', onChange }: DropdownData) => {
  const [currencyState, setCurrencyState] = useState(currency);

  useEffect(() => {
    setCurrencyState(currency)
  }, [currency])

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value }: DataHandler = event.target
    onChange({ [name]: value })
    setCurrencyState(value);
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
    </>
  )
}