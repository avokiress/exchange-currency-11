
import { useEffect, useState } from 'react';
import countryCurrencySymbol from 'constants/countryCurrencySymbol';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

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

const sortableOptions = Object.entries(countryCurrencySymbol).sort((a, b) => {
  if (b[1] > a[1]) return -1;
  else if (b[1] < a[1]) return 1;
});

const options: CountryType[] = sortableOptions.map(option => ({ code: option[0], label: option[1] }))


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
        sx={{ width: 450, "& .MuiInputBase-root": { height: "73px" } }}
        options={options}
        autoHighlight
        selectOnFocus
        getOptionLabel={(option) => option.code ?? currencyState}
        value={currencyState}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={`${title}_${option.code}`}>
            {renderCurrency(option.code)}
          </Box>
        )}
        ListboxProps={{ style: { maxHeight: 350 } }}
        renderInput={(params) => (
          <TextField
            {...params}
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