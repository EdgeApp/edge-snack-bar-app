import 'swiper/swiper-bundle.min.css'

import React from 'react'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import config from '../../config.json'

// install Swiper modules
SwiperCore.use([Pagination])

const ITEMS_PER_PAGE = 16

interface SelectScreenProps {
  usdToCoinRates: string[]
  handleOptionClick: Function
}

const assetHost: string = config.assetServerAddress
const tokenPath: string = 'snackBarAssets/'
const tokenFilenameInfo: string = '-token-scalable.svg'

const optionGridDivStyle = {
  display: 'grid',
  maxWidth: '1140px',
  margin: 'auto',
  paddingTop: 'max(2.5vh, 1rem)',
  paddingBottom: 'max(2.5vh, 1rem)',
  gridTemplateColumns: 'auto auto auto auto',
  rowGap: 'max(4vh, 2rem)',
  justifyContent: 'space-evenly'
}

const optionDivStyle = {
  textAlign: 'center' as const
}

const iconStyle = {
  height: 'max(11vh, 6rem)',
  width: 'auto',
  cursor: 'pointer'
}

const labelStyle = {
  fontSize: 'max(2vh, 1rem)',
  fontWeight: 'bold' as const,
  marginTop: 'max(1vh, 0.5rem)',
  marginBottom: '0'
}

export function SelectScreen(props: SelectScreenProps): JSX.Element {
  const handleClick = (option): void => {
    props.handleOptionClick(option)
  }

  const { usdToCoinRates } = props
  usdToCoinRates.sort((a, b) => a.localeCompare(b))

  const slideArr: string[][] = []
  usdToCoinRates.forEach((currencyCode, index) => {
    if (index % ITEMS_PER_PAGE === 0) slideArr.push([])
    const slideNum = Math.floor(index / ITEMS_PER_PAGE)
    slideArr[slideNum].push(currencyCode)
  })

  return (
    <>
      <Swiper pagination={{ clickable: true }}>
        {slideArr.map((currencyArr, index) => (
          <SwiperSlide key={index}>
            <div style={optionGridDivStyle}>
              {currencyArr.map(option => (
                <div style={optionDivStyle} key={option}>
                  <img
                    src={
                      assetHost +
                      '/' +
                      tokenPath +
                      `${String(option)}` +
                      tokenFilenameInfo
                    }
                    style={iconStyle}
                    onClick={() => handleClick(option)}
                  />
                  <br />
                  <p style={labelStyle}>{option}</p>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
