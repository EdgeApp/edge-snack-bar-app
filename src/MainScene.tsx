import React, { useEffect, useRef, useState } from 'react'

import { CodeScreen } from './components/CodeScreen'
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
  const [showCodeScreen, setShowCodeScreen] = useState(false) // State variable to determine whether to show the code screen
  const [coinSelection, setCoinSelection] = useState('') // State variable that keeps track of coin selection

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

  const handleOptionClick = (option): void => {
    setCoinSelection(option)
    setShowCodeScreen(true)
  }

  return (
    <>
      <Header />
      {showCodeScreen && (
        <CodeScreen
          coinSelection={coinSelection}
          setShowCodeScreen={setShowCodeScreen}
        />
      )}
      {!showCodeScreen && (
        <>
          {Object.keys(currencies)
            .sort((a, b) => a.localeCompare(b))
            .map(option => (
              <React.Fragment key={option}>
                <button onClick={() => handleOptionClick(option)}>
                  {option}: {usdToCoinRates[option]}
                </button>
                <br />
              </React.Fragment>
            ))}
        </>
      )}
    </>
  )
}
