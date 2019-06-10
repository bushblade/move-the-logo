import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent } from './logo.svg'

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const inputRef = useRef()
  const gameContainer = useRef()

  const speed = 10

  const [keypress, setKeyPress] = useState({
    ArrowDown: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false
  })

  const handleKeyDown = e => {
    if (!keypress[e.key]) {
      setKeyPress({ ...keypress, [e.key]: true })
    }
  }
  const handleKeyUp = e => {
    setKeyPress({ ...keypress, [e.key]: false })
  }

  useEffect(() => {
    inputRef.current.focus()
    let interval = setInterval(() => {
      if (Object.values(keypress).some(val => val)) {
        const { ArrowDown, ArrowUp, ArrowLeft, ArrowRight } = keypress
        let newPosition = { ...position }
        if (ArrowDown) newPosition.y = position.y + speed
        if (ArrowUp) newPosition.y = position.y - speed
        if (ArrowLeft) newPosition.x = position.x - speed
        if (ArrowRight) newPosition.x = position.x + speed
        setPosition(newPosition)
      }
    }, 10)
    const clear = () => clearInterval(interval)
    if (!Object.values(keypress).some(val => val)) clear()
    return clear
  }, [position, keypress])

  useEffect(() => {
    console.dir(gameContainer.current)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        style={{ height: 0, width: 0, opacity: 0 }}
        ref={inputRef}
        onBlur={() => inputRef.current.focus()}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <div ref={gameContainer} style={{ width: '100vw', height: '100vh' }}>
        <span
          role="img"
          aria-label="cat"
          style={{
            fontSize: '4rem',
            position: 'absolute',
            transform: `translate3d(${position.x}px,${position.y}px,0)`
          }}
        >
          😸
        </span>
      </div>
    </div>
  )
}

export default App
