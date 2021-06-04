import React, { useEffect, useRef, useState } from 'react'

import { currencies, fetchExchangeRates } from './exchangeRate'

const initRates: { [key: string]: number } = {} // Initialize empty object to store initial exchange rates in state
// Set exchange rates to zero initially until they are fetched from API
for (const key in currencies) {
  initRates[key] = 0
}

const rateFetchDelay = 5000 // Variable to set delay for fetching exchange rates (milliseconds)

export function MainScene(): JSX.Element {
  const isInitialRender = useRef(true) // Create a mutable ref object to keep track of initial render
  const [usdToCoinRates, setUsdToCoinRates] = useState(initRates) // State variable to keep track of the exchange rates

  useEffect(() => {
    const updateExchangeRates = (): void => {
      fetchExchangeRates()
        .then(exchangeRates => {
          setUsdToCoinRates(exchangeRates)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => setTimeout(updateExchangeRates, rateFetchDelay))
    }

    // Check if this is the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false // Set isInitialMount to false

      updateExchangeRates()

      // fetchExchangeRates() // Update exchange rates on initial render
      //   .then(exchangeRates => {
      //     setUsdToCoinRates(exchangeRates)
      //     // setInterval(updateExchangeRates, rateFetchInterval) // Continue to update exchange rates in intervals
      //   })
      //   .catch(error => console.log(error))
    }
  }, [usdToCoinRates])

  return (
    <>
      <h1>Edge Snack Bar</h1>
      {Object.keys(currencies)
        .sort((a, b) => a.localeCompare(b))
        .map(option => (
          <p key={option}>
            {option}: {usdToCoinRates[option]}
          </p>
        ))}
    </>
  )
}
