
import Button from '@mui/material/Button';

interface AmountInputData {
  value: string
  name: string
  checked: boolean
  onChange(data: object): void
}

export const ShortcutCurrency = ({ name, value, checked, onChange }: AmountInputData) => {
  return (
    <Button sx={{ marginRight: '5px' }} variant="outlined" onClick={() => onChange({ [name]: value })} disabled={checked}>{value}</Button>
  )
}