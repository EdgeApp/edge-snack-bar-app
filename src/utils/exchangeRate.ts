import { asArray, asObject, asString } from 'cleaners'

import config from '../../config.json'
import { Rates } from '../types'

export interface CurrencyOption {
  address: string
  currencyPluginId: string
}

const asRatesServerResponse = asObject({
  data: asArray(
    asObject({
      currency_pair: asString,
      date: asString,
      exchangeRate: asString
    })
  )
})

const baseUri: string = config.ratesServerAddress
const route: string = 'v2/exchangeRates'
export const currencies: { [key: string]: CurrencyOption } = config.currencies

export const fetchExchangeRates = async (): Promise<Rates> => {
  // Create an arry of promises
  const data = Object.keys(currencies).map(currencyCode => ({
    currency_pair: `${currencyCode}_iso:USD`
  }))

  const url = `${baseUri}/${route}`
  const exchangeRatesObj = {}

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    })
    if (!response.ok) {
      const text = await response.text()
      throw new Error(text)
    }
    const reply = await response.json()
    const { data: exchangeRates } = asRatesServerResponse(reply)
    exchangeRates.forEach(r => {
      const ccode = r.currency_pair.split('_')[0]
      const rate = 1 / Number(r.exchangeRate)

      Object.assign(exchangeRatesObj, { [ccode]: rate.toString() })
    })
  } catch (e: any) {
    console.error(e.message)
  }

  return exchangeRatesObj
}
