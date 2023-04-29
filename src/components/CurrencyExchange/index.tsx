import React, { useState } from 'react';

import Box from '@mui/material/Box';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import { DropdownCurrency } from 'components/DropdownCurrency'
import { AmountInput } from 'components/AmountInput'



export const CurrencyExchange = () => {

  const handleConvert = (data: any) => {
    console.log('data: ', data);
  }

  return (
    <>
      <h2>Currency exchange</h2>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>

        <Box sx={{ marginRight: '10px' }}>
          <AmountInput name="amount" title="Amount" prefix="$" onChange={handleConvert} />
        </Box>

        <Box>
          <DropdownCurrency
            title="From"
            field="from"
            currency="USD"
            onChange={handleConvert}
          />
        </Box>

        <Box>
          <MultipleStopIcon sx={{ fontSize: 40, margin: '25px 10px 0' }} />
        </Box>

        <Box>
          <DropdownCurrency
            title="To"
            field="to"
            currency="EUR"
            onChange={handleConvert}
          />
        </Box>
      </Box>
    </>
  )
}