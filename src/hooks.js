import { useState, useEffect, useCallback } from 'react'
import { getSize } from './helpers'

export const useElementSize = () => {
  const [size, setSize] = useState({ width: 100, height: 100 })
  const [resized, setResized] = useState(true)

  const elementRef = useCallback(
    node => {
      if (node !== null && resized) {
        setSize(getSize(node))
        setResized(false)
      }
    },
    [resized]
  )

  useEffect(() => {
    const handleResize = e => setResized(true)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return [size, elementRef]
}
