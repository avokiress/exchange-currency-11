
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';

import InputLabel from '@mui/material/InputLabel';


const DEFAULT_AMOUNT = 1;

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
  const [amount, setAmount] = useState<string>(DEFAULT_AMOUNT.toFixed(2))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: DataHandler = event.target;
    const parseValue = value.slice(1)

    onChange({ [name]: parseValue });
    setAmount(parseValue);
  };

  return (
    <>
      <InputLabel shrink style={{ fontSize: '20px' }}>
        {title}
      </InputLabel>

      <NumericFormat
        style={{ border: '1px solid #ced4da', padding: '10px 12px', borderRadius: '4px', height: '80px' }}
        onChange={handleChange}
        thousandSeparator
        valueIsNumericString
        value={amount}
        prefix={prefix}
        name={name}
      />
    </>
  )
}