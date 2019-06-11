import React, { useState, useRef, useEffect, useCallback } from 'react'

import { useElementSize } from './hooks'
import { GlobalStyle, HiddenInput, Arena } from './styled'
import { getSize } from './helpers'

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, arenaRef] = useElementSize()
  const speed = 12

  const inputRef = useRef()
  const catRef = useRef()

  const [keypress, setKeyPress] = useState({
    ArrowDown: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false
  })

  const keyHOF = func => e => {
    if (keypress.hasOwnProperty(e.key)) func(e)
  }

  const handleKeyDown = keyHOF(e => {
    if (!keypress[e.key]) setKeyPress({ ...keypress, [e.key]: true })
  })

  const handleKeyUp = keyHOF(e => {
    setKeyPress({ ...keypress, [e.key]: false })
  })

  const isMoving = useCallback(() => Object.values(keypress).some(val => val), [keypress])

  // update position with setInterval but only if a key is being pressed.
  useEffect(() => {
    inputRef.current.focus()
    let interval = setInterval(() => {
      // if some keys are currently being pressed.
      if (isMoving()) {
        const { ArrowDown, ArrowUp, ArrowLeft, ArrowRight } = keypress,
          { width, height } = size,
          catSize = getSize(catRef.current),
          catWidth = catSize.width + 7,
          catHeight = catSize.height + 10
        let newPosition = { ...position }
        if (ArrowDown && position.y < height - catHeight) newPosition.y = position.y + speed
        if (ArrowUp && position.y > 0) newPosition.y = position.y - speed
        if (ArrowLeft && position.x > 0) newPosition.x = position.x - speed
        if (ArrowRight && position.x < width - catWidth) newPosition.x = position.x + speed
        setPosition(newPosition)
      }
    }, 10)
    // clear the interval if no arrow keys have been pressed
    const clear = () => clearInterval(interval)
    if (!isMoving()) clear()
    return clear
  }, [position, keypress, size, isMoving])

  return (
    <>
      <GlobalStyle />
      <HiddenInput
        type="text"
        ref={inputRef}
        onBlur={() => inputRef.current.focus()}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <h2 style={{ textAlign: 'center' }}>
        The cat is happy when he moves: Use the arrow keys to move him!!
      </h2>
      <Arena ref={arenaRef}>
        <span
          role="img"
          aria-label="cat"
          ref={catRef}
          style={{
            fontSize: '4rem',
            position: 'absolute',
            transform: `translate3d(${position.x}px,${position.y}px,0)`
          }}
        >
          {isMoving() ? '😸' : '😾'}
        </span>
      </Arena>
    </>
  )
}

export default App
