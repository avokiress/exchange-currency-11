import { useState, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { useFetchConvert } from 'hooks/useFetchConvert'
import { DropdownCurrency } from 'components/DropdownCurrency'
import { AmountInput } from 'components/AmountInput'

import countryCurrencySymbol from 'constants/countryCurrencySymbol';
interface DataHandler {
  name: string
  value: string
}

interface DataConverter {
  amount: string
  from: string
  to: string
}

interface DataFetch {
  data: object
  isLoading: boolean
  error: string
  fetchData(data: DataConverter): string
}


export const CurrencyExchange = () => {
  const initialData = useRef({
    amount: '',
    from: '',
    to: '',
  });

  const [dataConverter, setDataConverter] = useState<DataConverter>(initialData.current)
  const { data, isLoading, error, fetchData } = useFetchConvert<DataFetch>()

  const isValidData = () => {
    let valid = true;
    for (const field in dataConverter) {
      if (dataConverter[field].length === 0) {
        valid = false;
      }
    }
    return valid;
  };

  useEffect(() => {
    if (isValidData()) {
      fetchData(dataConverter);
    }
  }, [dataConverter])


  const handleConvert = (data: DataHandler) => {
    setDataConverter(__prevData => ({ ...__prevData, ...data }))
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
        <Box>
          <Button>
            <StarIcon fontSize="large" />
            <StarBorderIcon fontSize="large" />
          </Button>
        </Box>
      </Box>

      <Box sx={{ padding: '20px 0' }}>
        {isLoading &&
          <CircularProgress />
        }
        {!isLoading && data &&
          <>
            <h3>Exchange rate for {data.date}</h3>
            <p>{dataConverter.amount} {countryCurrencySymbol[dataConverter.from]} = {data.result} {dataConverter.to}</p>
            <p>1 {dataConverter.to} = {data.info.rate} {dataConverter.from}</p>
          </>
        }
        {!isLoading && error &&
          <Alert severity="error">{error}</Alert>
        }
      </Box>

    </>
  )
}