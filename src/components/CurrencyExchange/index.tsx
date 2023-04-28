import { useSelector } from "react-redux";

export const CurrencyExchange = () => {
  const rates = useSelector(state => state.rates.rates);

  console.log('rates: ', rates);

  return (
    <>
      <h2>Currency exchange</h2>
    </>
  )
}