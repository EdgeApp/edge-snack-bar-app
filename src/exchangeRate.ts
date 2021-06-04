import config from '../config.json'

export interface CurrencyOption {
  address: string
  currencyName: string
  coinCapCurrencyName: string
}

export const currencies: { [key: string]: CurrencyOption } = config.currencies
const uri: string = config.coinCapUri

export const fetchExchangeRates = async (): Promise<{
  [key: string]: number
}> => {
  // Create an arry of promises
  const promisesArr = Object.keys(currencies).map(async currencyCode => {
    const currencyData = currencies[currencyCode]
    const response = await fetch(uri + currencyData.coinCapCurrencyName)
    const { data } = await response.json()
    return { [currencyCode]: 1 / data.priceUsd }
  })

  // Resolve array of promises for exchange rates
  const rates = await Promise.all(promisesArr)
  return rates.reduce((result, rate) => ({ ...result, ...rate }), {})
}
