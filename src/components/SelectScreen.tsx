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
const tokenPath: string = 'currencyIcons/'
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


  const options = Object.entries(config.currencies).sort();

  console.log("Options: ", options)

  const { usdToCoinRates } = props
  const list = Object.keys(usdToCoinRates).sort((a, b) => a.localeCompare(b))

  const slideArr: object[][] = []
  options.forEach((obj, index) => {
    if (index % ITEMS_PER_PAGE === 0) slideArr.push([])
    const slideNum = Math.floor(index / ITEMS_PER_PAGE)
    slideArr[slideNum].push(obj)
  })

  console.log("Slide Array: ", slideArr)
  return (
    <>
      <Swiper pagination={{ clickable: true }}>
        {slideArr.map((currencyArr, index) => {
          return (
            <SwiperSlide key={index}>
              <div style={optionGridDivStyle}>
                {currencyArr.map(currency => (
                  <div style={optionDivStyle} key={currency[0]}>
                    <img
                      src={
                        assetHost +
                        tokenPath +
                        `${String(currency[1].chain).toLowerCase()}` + '/' +
                        `${String(currency[1].currencyName).toLowerCase()}` + '.png'
                      }
                      style={iconStyle}
                      onClick={() => handleClick(currency[0])}
                    />
                    <br />
                    <p style={labelStyle}>{currency[0]}</p>
                  </div>
                )
                )}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
