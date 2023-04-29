import { useState, useEffect, useRef } from 'react';
import currencyToSymbolMap from 'currency-symbol-map'

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { useFetchConvert } from 'hooks/useFetchConvert'

import { AmountInput } from 'components/AmountInput'
import { DropdownCurrency } from 'components/DropdownCurrency'
import { Chart } from "components/Chart"

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


export const CurrencyExchangeEntity = () => {
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
    console.log('>>>>> isValidData dataConverter: ', dataConverter);
    if (isValidData()) {
      // fetchData(dataConverter);
    }
  }, [dataConverter])


  const handleConvert = (data: DataHandler) => {
    setDataConverter(__prevData => ({ ...__prevData, ...data }))
  }

  const onChangeConvert = () => {
    const { from, to } = dataConverter;
    setDataConverter(__prevData => ({
      ...__prevData,
      from: to,
      to: from,
    }))
  }

  const prefix = currencyToSymbolMap(dataConverter.from);

  return (
    <>
      <Box sx={{ alignItems: 'center', border: '1px solid #e0e1e5', padding: '20px', borderRadius: '8px' }}>

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ marginRight: '20px' }}>
            <AmountInput name="amount" title="Amount" prefix={prefix} onChange={handleConvert} />
          </Box>

          <Box>
            <DropdownCurrency
              title="From"
              field="from"
              currency={dataConverter.from}
              onChange={handleConvert}
            />
          </Box>

          <Box sx={{ margin: '12px 10px 0' }}>
            <Button onClick={onChangeConvert}>
              <MultipleStopIcon sx={{ fontSize: 40 }} />
            </Button>
          </Box>

          <Box>
            <DropdownCurrency
              title="To"
              field="to"
              currency={dataConverter.to}
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
              <p>1 {dataConverter.to} = {data.info?.rate} {dataConverter.from}</p>
            </>
          }

          {!isLoading && data &&
            <Chart startDate={new Date('2023-01-01')} endDate={new Date()} base={dataConverter.from} symbols={[dataConverter.to]} />
          }

          {!isLoading && error &&
            <Alert severity="error">{error}</Alert>
          }
        </Box>
      </Box>

    </>
  )
}