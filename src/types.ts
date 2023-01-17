import { asMap, asNumber, asObject, asOptional, asString } from 'cleaners'

export interface Rates {
  [currencyCode: string]: number
}

export const asCurrency = asObject({
  address: asString,
  contractAddress: asOptional(asString),
  multiplier: asOptional(asNumber),
  currencyPluginId: asString,
  label: asOptional(asString),
  networkPrefix: asOptional(asString)
})

export const asConfig = asObject({
  ratesServerAddress: asString,
  assetServerAddress: asString,
  currencies: asMap(asCurrency)
})
