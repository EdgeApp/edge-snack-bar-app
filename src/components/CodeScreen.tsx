import React from 'react'

import constant from '../constant.json'
import { initBgDivStyle } from '../MainScene'
import { BackButton } from './Buttons'
import { PaymentCode } from './PaymentCode'

const { selectedStr } = constant.codeScreen

interface CodeScreenProps {
  coinSelection: string
  qrCodeValue: string
  setShowCodeScreen: Function
  setBgDivStyle: Function
}

const codeScreenStyle = {
  textAlign: 'center' as const
}

const textStyle = {
  fontSize: 'max(2.5vh, 1.5rem)',
  fontWeight: 'bold' as const,
  marginTop: 'max(2.5vh, 1.5rem)'
}

export function CodeScreen(props: CodeScreenProps): JSX.Element {
  const handleBackBtnClick = (): void => {
    props.setShowCodeScreen(false)
    props.setBgDivStyle({ ...initBgDivStyle, display: 'inline' })
  }

  return (
    <>
      <div style={codeScreenStyle}>
        <div style={textStyle}>
          {selectedStr}
          {props.coinSelection}
        </div>
        <PaymentCode qrCodeValue={props.qrCodeValue} />
        <div>
          <BackButton label="BACK" handleClick={handleBackBtnClick} />
        </div>
      </div>
    </>
  )
}
