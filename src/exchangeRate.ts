import { asObject, asString } from 'cleaners'

import config from '../config.json'
import constant from './constant.json'

export interface CurrencyOption {
  address: string
  currencyName: string
}

const asRatesServerResponse = asObject({
  currency_pair: asString,
  date: asString,
  exchangeRate: asString
})

const baseUri: string = config.ratesServerAddress
const route: string = 'v1/exchangeRate/'
const queryStr: string = '?currency_pair=USD_'
export const currencies: { [key: string]: CurrencyOption } = config.currencies

const { errorMsg } = constant.exchangeRate

export const fetchExchangeRates = async (): Promise<{
  [key: string]: number
}> => {
  // Create an arry of promises
  const promisesArr = Object.keys(currencies).map(async currencyCode => {
    try {
      const response = await fetch(baseUri + route + queryStr + currencyCode)
      const { exchangeRate } = asRatesServerResponse(await response.json())

      // Check if the response was successful or if the exchange rate is a valid number
      if (!response.ok || isNaN(parseFloat(exchangeRate))) {
        throw new TypeError(errorMsg + currencyCode)
      }

      return { [currencyCode]: +exchangeRate }
    } catch (e) {
      console.log(e)
    }
  })

  // Resolve array of promises for exchange rates
  const rates = await Promise.all(promisesArr)
  const exchangeRatesObj = {}
  for (const rate of rates) {
    if (rate === undefined) continue
    Object.assign(exchangeRatesObj, rate)
  }
  return exchangeRatesObj
}
