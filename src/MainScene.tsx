import React, { useEffect, useRef, useState } from 'react'

import { Header } from './components/Header'
import { currencies, fetchExchangeRates } from './exchangeRate'

const bodyStyle = {
  margin: '0px',
  padding: '0px',
  height: '100%'
}

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

      Object.assign(document.body.style, bodyStyle) // Update styling for 'body'

      updateExchangeRates()
    }
  }, [usdToCoinRates])

  return (
    <>
      <Header />
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
