import { useState, useEffect, useCallback } from 'react'

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

  function getSize(node) {
    return {
      width: node.getBoundingClientRect().width,
      height: node.getBoundingClientRect().height
    }
  }

  useEffect(() => {
    const handleResize = e => setResized(true)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return [size, elementRef]
}
