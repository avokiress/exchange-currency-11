import { useState, useEffect, useRef } from 'react';


import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { CurrencyExchangeEntity } from 'components/CurrencyExchangeEntity'
import { HistoryProvider } from '../../context';

export const CurrencyExchange = () => {
  const [countConverter, setCountConverter] = useState([CurrencyExchangeEntity])

  return (
    <>
      <h2>Currency exchange</h2>
      {countConverter.map((Component, index) => {
        return (
          <Box sx={{ padding: '10px 0' }} key={index}>
            <HistoryProvider>
              <Component />
              <Divider />
            </HistoryProvider>
          </Box>
        )
      })}

      <Button
        fullWidth
        variant="contained"
        endIcon={<AddIcon />}
        onClick={() => setCountConverter(__prevState => [...__prevState, CurrencyExchangeEntity])}
      >
        Add new converter
      </Button >
    </>
  )
}