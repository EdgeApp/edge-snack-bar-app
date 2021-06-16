import React from 'react'

import constant from '../constant.json'
import logo from '../images/logoMintWhite.png'

const { greetingStr, appNameStr } = constant.header

const headerStyle = {
  background: 'linear-gradient(180deg, #0E4B75 0%, #0D2145 100%)',
  height: 'max(15vh, 8rem)',
  fontSize: 'max(5vh, 2.7rem)',
  fontWeight: 'bold' as const,
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap' as const
}

const imageStyle = {
  height: 'max(7.5vh, 4rem)',
  marginLeft: '1rem',
  marginRight: '1rem'
}

export function Header(): JSX.Element {
  return (
    <>
      <div style={headerStyle}>
        <div>{greetingStr}</div>
        <img style={imageStyle} src={logo} />
        <div>{appNameStr}</div>
      </div>
    </>
  )
}
