import React, { useEffect, useRef, useState } from 'react'

import config from '../config.json'

interface CurrencyOption {
  address: string
  uriScheme: string
  amountParam: string
  rateEndpoint: string
}

const currencyOptions: { [key: string]: CurrencyOption } = config

const initRates: { [key: string]: number } = {} // Initialize empty object to store initial exchange rates in state
// Set exchange rates to zero initially until they are fetched from API
for (const key in currencyOptions) {
  initRates[key] = 0
}

const rateEndpointsArr: string[] = [] // Initialize empty array to store API endpoints of exchange rates
// Iterate through `currencyOptions` object to add endpoints to array
for (const key in currencyOptions) {
  const { rateEndpoint } = currencyOptions[key]
  rateEndpointsArr.push(rateEndpoint)
}

const rateFetchInterval = 30000 // Variable to set interval for fetching exchange rates (milliseconds)

export function MainScene(): JSX.Element {
  const isInitialRender = useRef(true) // Create a mutable ref object to keep track of initial render
  const [usdToCoinRates, setUsdToCoinRates] = useState(initRates) // State variable to keep track of the exchange rates

  useEffect(() => {
    // Helper function to update the exchange rates
    const updateExchangeRates = (): void => {
      // Create an arry of promises
      const promisesArr = rateEndpointsArr.map(
        async url =>
          await fetch(url).then(async response => await response.json())
      )

      // Resolve array of promises for exchange rates
      Promise.all(promisesArr)
        .then(responses => {
          const exchangeRates: { [key: string]: number } = {} // Create 'exchangeRates' object to store all exchange rate information
          // Iterate through the promise results to add exchange rate information for each coin
          for (const response of responses) {
            const { data } = response
            exchangeRates[data.symbol] = 1 / data.priceUsd
          }
          setUsdToCoinRates(exchangeRates) // Update state of exchange rates
        })
        .catch(error => console.log(error))
    }

    // Check if this is the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false // Set isInitialMount to false

      updateExchangeRates() // Update exchange rates on initial render
      setInterval(updateExchangeRates, rateFetchInterval) // Continue to update exchange rates in intervals
    }
  }, [usdToCoinRates])

  return (
    <>
      <h1>Edge Snack Bar</h1>
      {Object.keys(currencyOptions)
        .sort((a, b) => a.localeCompare(b))
        .map(option => (
          <p key={option}>
            {option}: {usdToCoinRates[option]}
          </p>
        ))}
    </>
  )
}
