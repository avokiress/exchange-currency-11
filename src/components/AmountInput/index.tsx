
import React, { useState, useEffect } from 'react';
import { useThrottle } from 'hooks/useThrottle';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

interface DataHandler {
  name: string
  value: string
}

interface AmountInputData {
  title: string
  prefix: string
  name: string
  onChange(data: object): void
}

export const AmountInput = ({ title, prefix = '', name, onChange }: AmountInputData) => {
  const [amount, setAmount] = useState<string>('')
  const throttledValue = useThrottle(amount)

  useEffect(() => {
    onChange({ [name]: throttledValue });
  }, [throttledValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: DataHandler = event.target;
    const parseValue = value.replace(/[^0-9,\s]/g, "");

    setAmount(parseValue);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">{title}</InputLabel>
        <OutlinedInput
          style={{ padding: '9px 12px' }}
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">{prefix || '$'}</InputAdornment>}
          label={title}
          name={name}
          type="number"
          value={amount}
          onChange={handleChange}
          placeholder="0"
        />
      </FormControl>
    </>
  )
}