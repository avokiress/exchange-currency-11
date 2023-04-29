
import { useEffect, useState } from 'react';
import countryCurrencySymbol from 'constants/countryCurrencySymbol';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const PLACEHOLDER = 'Choose a currency';

interface DropdownData {
  title: string
  field: string
  currency: string
  onChange(data: object): void
}

interface CountryType {
  code: string;
  label: string;
}

const OPTIONS: CountryType[] = Object.keys(countryCurrencySymbol).map(key => ({ code: key, label: countryCurrencySymbol[key] }))

export const DropdownCurrency = ({ title, field, currency = '', onChange }: DropdownData) => {
  const [currencyState, setCurrencyState] = useState<string | null>(currency);

  useEffect(() => {
    setCurrencyState(currency)
  }, [currency])

  useEffect(() => {
    onChange({ [field]: currencyState })
  }, [currencyState])


  const handleChange = (data: CountryType | null) => {
    if (!data) return setCurrencyState('');

    const { code } = data;
    onChange({ [field]: code })
    setCurrencyState(code);
  };


  const renderCurrency = (__currency: string) => {
    if (!__currency) return null;

    const code = __currency.toLowerCase();
    const name = countryCurrencySymbol[__currency];

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <div className={`currency-flag currency-flag-xl currency-flag-${code}`}></div>
        <p>{name}</p>
      </Box>
    )
  };

  return (
    <>
      <Autocomplete
        sx={{ width: 450 }}
        style={{ height: '70px' }}
        options={OPTIONS}
        autoHighlight
        selectOnFocus
        getOptionLabel={(option) => option.code ?? currencyState}
        value={currencyState}
        renderOption={(props, option) => (
          <Box component="li" sx={{ height: '70px' }} {...props} key={`${title}_${option.code}`}>
            {renderCurrency(option.code)}
          </Box>
        )}
        ListboxProps={{ style: { maxHeight: 350 } }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ height: '70px' }}
            style={{ height: '70px' }}
            label={title}
            placeholder={PLACEHOLDER}
            InputProps={{
              ...params.InputProps,
              startAdornment:
                <>
                  {currencyState &&
                    <>
                      <div className={`currency-flag currency-flag-xl currency-flag-${(currencyState).toLowerCase()}`}></div>
                      <p>{countryCurrencySymbol[currencyState]}</p>
                    </>
                  }
                </>
            }}
          />
        )}
        onChange={(_, value) => {
          handleChange(value)
        }}
      />
    </>
  )
}