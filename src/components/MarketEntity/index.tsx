
export const renderMarket = (__currency: string) => {
  if (!__currency || !marketList[__currency]) return null;

  const __markets = marketList[__currency]

  return __markets.map(market => {
    const currentTime: moment.Moment = moment().tz(market.timezone.timezone);

    return (
      <Box key={market.acronym} sx={{ border: '1px solid #e0e1e5', padding: '20px', borderRadius: '8px', width: '45%', background: '#f4f4f5', marginBottom: '20px' }}>
        <h3 style={{ alignItems: 'center', display: 'flex' }}>
          <div className={`currency-flag currency-flag-sm currency-flag-${__currency.toLowerCase()}`}></div>
          {market.name} ({market.country})
        </h3>
        <p>Current time: {currentTime.format('HH:mm')}</p>
        <Button
          component="a"
          href={market.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {market.website}
        </Button>
      </Box>
    )
  })
}
