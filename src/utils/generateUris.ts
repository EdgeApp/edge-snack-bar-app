import { asNumber } from 'cleaners'
import { encodeMainnet } from 'tezos-uri'

interface TezosRequestContent {
  kind: string
  amount: string
  destination: string
}

const TEZOS_MULTIPLIER = 1000000

export const generateTezosUri = (
  currencyAmount: number,
  address: string
): string => {
  try {
    const amount = Math.round(
      asNumber(currencyAmount) * TEZOS_MULTIPLIER
    ).toString()
    const operation: TezosRequestContent = {
      kind: 'transaction',
      amount,
      destination: address
    }
    return encodeMainnet([{ content: operation }])
  } catch (e) {
    if (Array.isArray(e)) throw new Error(e.toString())
    throw e
  }
}
