import { useContext, useState, useEffect } from 'react'

const BREAKPOINTS = {
  xs: 320,
  s: 360,
  w375: 375,
  w400: 400,
  ms: 480,
  xms: 640,
  'pre-sm': 760,
  sm: 768,
  'pre-md': 1024,
  md: 1030,
  'pre-max': 1360,
  laptop: 1440,
  lg: 1460,
  max: 1460,
  xl: 1920
}

interface RespondToProps {
  breakpoint: keyof typeof BREAKPOINTS | number
  type: 'gte' | 'lt' // greater than or equal, less than
}

export const useRespondTo = ({ breakpoint, type }: RespondToProps) => {
  if (typeof breakpoint !== 'number') {
    breakpoint = BREAKPOINTS[breakpoint]
  }

  const queryType = type === 'lt' ? 'max' : 'min'
  const querySize = type === 'lt' ? breakpoint - 1 : breakpoint
  const query = `(${queryType}-width: ${querySize}px)`

  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches
  })

  return matches
}
