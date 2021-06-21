import React from 'react'

interface ButtonProps {
  label: string
  handleClick: Function
}

const backBtnStyle = {
  backgroundColor: '#66EDA8',
  color: 'white',
  width: 'max(25vh, 15rem)',
  height: 'max(5vh, 3rem)',
  fontSize: 'max(2.5vh, 1.5rem)',
  fontWeight: 'bold' as const,
  padding: '0px',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer'
}

export function BackButton(props: ButtonProps): JSX.Element {
  const handleClick = (): void => {
    props.handleClick()
  }

  return (
    <button style={backBtnStyle} onClick={handleClick}>
      {props.label}
    </button>
  )
}
