import { DropdownCurrency } from 'components/DropdownCurrency'
import Box from '@mui/material/Box';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';


export const CurrencyExchange = () => {
  return (
    <>
      <h2>Currency exchange</h2>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <DropdownCurrency
            title="From"
            field="from"
            currency="USD"
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
          />
        </Box>
      </Box>
    </>
  )
}