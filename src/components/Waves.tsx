import React from 'react'
import { AnimateKeyframes } from 'react-simple-animate'

import frontWave1 from '../images/waves/front-wave1.png'
import frontWave2 from '../images/waves/front-wave2.png'
import rearWave from '../images/waves/rear-wave.png'

const wavesDivStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  position: 'relative' as const,
  width: '100vw',
  overflow: 'hidden'
}

const flexDivStyle = {
  display: 'flex'
}

const frontWaveAnimationDivStyle = {
  position: 'relative' as const,
  zIndex: 2
}

const frontWaveImgStyle = {
  width: '100vw',
  height: '21vh'
}

const rearWaveAnimationDivStyle = {
  position: 'absolute' as const,
  left: '0',
  zIndex: 1
}

const rearWaveImgStyle = {
  width: '100vw',
  height: '19vh'
}

export function Waves(): JSX.Element {
  return (
    <>
      <div style={wavesDivStyle}>
        <div style={frontWaveAnimationDivStyle}>
          <AnimateKeyframes
            iterationCount="infinite"
            duration={10}
            keyframes={[
              { 0: 'margin-left: 0' },
              { 100: 'margin-left: -200vw' }
            ]}
          >
            <div style={flexDivStyle}>
              <img src={frontWave1} style={frontWaveImgStyle} />
              <img src={frontWave2} style={frontWaveImgStyle} />
              <img src={frontWave1} style={frontWaveImgStyle} />
            </div>
          </AnimateKeyframes>
        </div>
        <div style={rearWaveAnimationDivStyle}>
          <AnimateKeyframes
            iterationCount="infinite"
            duration={10}
            keyframes={[
              { 0: 'margin-left: 0' },
              { 100: 'margin-left: -100vw' }
            ]}
          >
            <div style={flexDivStyle}>
              <img src={rearWave} style={rearWaveImgStyle} />
              <img src={rearWave} style={rearWaveImgStyle} />
            </div>
          </AnimateKeyframes>
        </div>
      </div>
    </>
  )
}
