import React, { useEffect, useRef, useState } from 'react'

import { CodeScreen } from './components/CodeScreen'
import { Header } from './components/Header'
import { SelectScreen } from './components/SelectScreen'
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
  const [qrCodeValue, setQrCodeValue] = useState('') // State variable that contains the value for the QR code

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
    } else {
      // On subsequent renders, update QR code value
      const currencyInfo = currencies[coinSelection]
      const currencyAmount: number = usdToCoinRates[coinSelection]
      // Update QR code's value in state
      setQrCodeValue(
        `${currencyInfo?.currencyName}:${currencyInfo?.address}?amount=${currencyAmount}`
      )
    }
  }, [usdToCoinRates, coinSelection]) // Only re-run the effect if the exchange rates or the coin selection changes

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
          qrCodeValue={qrCodeValue}
          setShowCodeScreen={setShowCodeScreen}
        />
      )}
      {!showCodeScreen && (
        <SelectScreen
          usdToCoinRates={Object.keys(usdToCoinRates)}
          handleOptionClick={handleOptionClick}
        />
      )}
    </>
  )
}
