import React from 'react'

import constant from '../constant.json'
import { BackButton } from './Buttons'

const { selectedStr } = constant.codeScreen

interface CodeScreenProps {
  coinSelection: string
  setShowCodeScreen: Function
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
  }

  return (
    <>
      <div style={codeScreenStyle}>
        <div style={textStyle}>
          {selectedStr}
          {props.coinSelection}
        </div>
        <BackButton label="BACK" handleClick={handleBackBtnClick} />
      </div>
    </>
  )
}
