import { round } from 'biggystring'
import React, { useEffect, useMemo, useState } from 'react'

import configJson from '../config.json'
import { asConfig, Rates } from './types'
import { fetchExchangeRates } from './utils/exchangeRate'
import { generateTezosUri, generateXrpUri } from './utils/generateUris'

const USD_AMOUNT = 3

const otherLinks = [
  {
    title: 'Swap Links',
    links: ['edge://swap', 'edge:swap']
  },
  {
    title: 'Request Address',
    links: [
      `edge://reqaddr?codes=BTC-ETH-ETH_USDC&redir=${encodeURIComponent(
        'https://edge.app'
      )}`
    ]
  }
]

const config = asConfig(configJson)

export function MainScene(): JSX.Element {
  const [rates, setRates] = useState<Rates | undefined>(undefined)

  useEffect(() => {
    fetchExchangeRates()
      .then(newRates => setRates(newRates))
      .catch(e => console.error(e.message))
  }, [])

  const assets = useMemo(() => {
    return Object.entries(config.currencies).map(([currencyCode, entry]) => {
      const {
        address,
        contractAddress,
        currencyPluginId,
        label,
        multiplier,
        networkPrefix
      } = entry
      if (rates == null) return undefined
      const rate = rates[currencyCode]
      if (rate == null) return undefined
      const amount =
        Number(rate) * USD_AMOUNT * (multiplier != null ? multiplier : 1)
      let link: string
      let linkNoAmount: string
      const protocol = networkPrefix ?? currencyPluginId
      if (currencyPluginId === 'tezos') {
        linkNoAmount = generateTezosUri(address, 0)
        link = generateTezosUri(address, amount)
      } else if (currencyPluginId === 'ripple') {
        linkNoAmount = generateXrpUri(address)
        link = generateXrpUri(address, amount)
      } else if (contractAddress != null) {
        const nativeAmount = amount.toString().replace('+', '')
        link = `${protocol}:${contractAddress}/transfer?address=${address}&uint256=${nativeAmount}`
        linkNoAmount = `${protocol}:${contractAddress}/transfer?address=${address}`
        if (label != null) {
          link += `&label=${label}`
          linkNoAmount += `&label=${label}`
        }
      } else {
        linkNoAmount = `${protocol}:${address}`
        link = `${linkNoAmount}?amount=${round(amount.toString(), -6)}`
      }
      return { currencyCode, link, linkNoAmount }
    })
  }, [rates])

  return (
    <>
      {otherLinks.map(ol => {
        const { title, links } = ol
        return (
          <div key={title}>
            {title}
            <br />
            {links.map(link => {
              return (
                <div key={link}>
                  <a href={link}>{link}</a>
                  <br />
                </div>
              )
            })}
            <br />
          </div>
        )
      })}
      {assets.map(asset => {
        if (asset == null) return null
        const { currencyCode, link, linkNoAmount } = asset
        return (
          <div key={link}>
            {currencyCode} with no amount
            <br />
            <a href={linkNoAmount}>{linkNoAmount}</a>
            <br />
            <br />
            {currencyCode} with amount
            <br />
            <a href={link}>{link}</a>
            <br />
            <br />
            <br />
          </div>
        )
      })}
    </>
  )
}
