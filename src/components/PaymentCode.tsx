import QRCode from 'qrcode.react'
import React from 'react'

interface PaymentCodeProps {
  qrCodeValue: string
}

const paymentCodeStyle = {
  border: '1px solid rgba(0, 0, 0, 0.5)',
  borderRadius: '32px',
  display: 'inline-block',
  padding: 'max(2.5vh, 1.5rem)',
  marginTop: '1.5vh',
  marginBottom: '3vh'
}

const qrCodestyle = {
  height: 'max(35vh, 16rem)',
  width: 'auto'
}

export function PaymentCode(props: PaymentCodeProps): JSX.Element {
  return (
    <div style={paymentCodeStyle}>
      <QRCode value={props.qrCodeValue} style={qrCodestyle} renderAs="svg" />
    </div>
  )
}
