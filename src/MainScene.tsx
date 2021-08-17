import React, { useEffect, useState } from 'react'

import { CodeScreen } from './components/CodeScreen'
import { Header, headerHeight } from './components/Header'
import { SelectScreen } from './components/SelectScreen'
import { Waves } from './components/Waves'
import { currencies, fetchExchangeRates } from './exchangeRate'
import { generateTezosUri } from './utils/generateUris'

const bodyStyle = {
  margin: '0px',
  padding: '0px',
  height: '100%',
  width: '100%',
  minHeight: '768px',
  overflowX: 'hidden',
  position: 'relative'
}

export const initBgDivStyle = {
  position: 'absolute' as const,
  display: 'inline',
  top: headerHeight,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'radial-gradient(50% 50% at 50% 50%, rgba(175, 173, 173, 0.95) 50.52%, rgba(208, 205, 205, 0.95) 81.25%, rgba(196, 196, 196, 0.95) 100%)',
  zIndex: 3
}

const foregroundDivStyle = {
  position: 'absolute' as const,
  top: headerHeight,
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'auto' as const,
  zIndex: 4
}

const wavesPositionDivStyle = {
  position: 'absolute' as const,
  bottom: '0'
}

const rateFetchDelay = 600000 // Variable to set delay for fetching exchange rates (milliseconds)

export function MainScene(): JSX.Element {
  const [usdToCoinRates, setUsdToCoinRates] = useState({}) // State variable to keep track of the exchange rates
  const [showCodeScreen, setShowCodeScreen] = useState(false) // State variable to determine whether to show the code screen
  const [coinSelection, setCoinSelection] = useState('') // State variable that keeps track of coin selection
  const [qrCodeValue, setQrCodeValue] = useState('') // State variable that contains the value for the QR code
  const [bgDivStyle, setBgDivStyle] = useState(initBgDivStyle) // State variable for the background blur overlay

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

    Object.assign(document.body.style, bodyStyle) // Update styling for 'body'

    updateExchangeRates()
  }, []) // Only run on initial render

  useEffect(() => {
    try {
      // Update QR code value
      const currencyInfo = currencies[coinSelection]
      const currencyAmount: number = usdToCoinRates[coinSelection]
      // Update QR code's value in state
      if (coinSelection === 'XTZ') {
        const tezosUri = generateTezosUri(currencyAmount, currencyInfo.address)
        setQrCodeValue(tezosUri)
      } else if (coinSelection === 'XLM') {
        setQrCodeValue(
          `web+stellar:pay?destination=${currencyInfo.address}&amount=${currencyAmount}`
        )
      } else {
        setQrCodeValue(
          `${currencyInfo?.currencyName}:${currencyInfo?.address}?amount=${currencyAmount}`
        )
      }
    } catch (e) {
      console.log(e)
    }
  }, [usdToCoinRates, coinSelection]) // Only run the effect if the exchange rates or the coin selection changes

  const handleOptionClick = (option): void => {
    setCoinSelection(option)
    setBgDivStyle({ ...initBgDivStyle, display: 'none' })
    setTimeout(() => {
      setShowCodeScreen(true)
    }, 350)
  }

  return (
    <>
      <Header />
      <div style={bgDivStyle} />
      <div style={foregroundDivStyle}>
        {showCodeScreen && (
          <CodeScreen
            coinSelection={coinSelection}
            qrCodeValue={qrCodeValue}
            setShowCodeScreen={setShowCodeScreen}
            setBgDivStyle={setBgDivStyle}
          />
        )}
        {!showCodeScreen && (
          <SelectScreen
            usdToCoinRates={Object.keys(usdToCoinRates)}
            handleOptionClick={handleOptionClick}
          />
        )}
      </div>
      <div style={wavesPositionDivStyle}>
        <Waves />
      </div>
    </>
  )
}
