import React, { useEffect, useRef, useState } from 'react'

import { currencies, fetchExchangeRates } from './exchangeRate'

const rateFetchDelay = 600000 // Variable to set delay for fetching exchange rates (milliseconds)

export function MainScene(): JSX.Element {
  const isInitialRender = useRef(true) // Create a mutable ref object to keep track of initial render
  const [usdToCoinRates, setUsdToCoinRates] = useState({}) // State variable to keep track of the exchange rates

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
