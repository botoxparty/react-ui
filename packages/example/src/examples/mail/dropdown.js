import React, { useState, useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'react-ui'
import { Element } from '@ds-tools/primitives'

/** Description of an input */
function Dropdown({ invalid, css, autocompleteProvider, options, ...props }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  if (autocompleteProvider) {
    options = autocompleteProvider(value)
  }

  const hasValue = !!value

  const selectOption = option => {
    setValue('')
    setActiveIndex(null)
    props.onSelect && props.onSelect(option)
  }

  const keyboardHandler = useCallback(
    event => {
      switch (event.key) {
        case 'ArrowUp':
          if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1)
          }
          break
        case 'ArrowDown':
          if (activeIndex < options.length - 1) {
            setActiveIndex(activeIndex + 1)
          }
          break
        case 'Enter':
          console.log('ENTER')
          selectOption()
          break
        case 'Escape':
          setInputAsBlurred()
        default:
          console.warn('Other key')
          break
      }
    },
    [activeIndex, value]
  )

  useEventListener('keydown', keyboardHandler)

  const setInputAsFocused = () => {
    setActiveIndex(null)
    setFocused(true)
  }

  const setInputAsBlurred = () => {
    setFocused(false)
  }

  const setInputValue = value => {
    setValue(value)
    setActiveIndex(0)
  }
  return (
    <>
      <Element as="div" css={{ position: 'relative' }}>
        <Element as="div" css={styles.InputWrapper}>
          <Input
            value={value}
            onFocus={() => setInputAsFocused(true)}
            onBlur={() => setInputAsBlurred(false)}
            onChange={e => setInputValue(e.target.value)}
          ></Input>
        </Element>
        {hasValue && focused && (
          <Element
            as="ul"
            css={{
              backgroundColor: 'white',
              padding: 0,
              position: 'absolute',
              width: '100%',
              li: {
                listStyleType: 'none',
                borderBottom: '1px solid black',
                height: '32px',
                paddingLeft: '1em',
                fontSize: '0.85em',
                paddingRight: '1em',
                display: 'flex',
                alignItems: 'center',
                borderLeft: '1px solid black',
                borderRight: '1px solid black'
              }
            }}
          >
            {options.map((option, index) => (
              <Option
                key={option.value}
                active={activeIndex === index}
                option={option}
              />
            ))}
          </Element>
        )}
      </Element>
    </>
  )
}

export const Option = ({ option, active }) => (
  <Element
    as="li"
    css={{
      ':hover': {
        color: 'text.link'
      },
      backgroundColor: !active || 'red'
    }}
  >
    {option.label}
  </Element>
)

Dropdown.propTypes = {
  /** Description of an input prop */
  type: PropTypes.string,
  autocompleteProvider: PropTypes.func
}

Dropdown.defaultProps = {
  type: 'text'
}

export { Dropdown }

export const styles = {
  InputWrapper: {
    position: 'relative'
  },
  Icon: {
    maxHeight: '1em',
    maxWidth: '1em',
    position: 'absolute',
    marginTop: '7px',
    marginLeft: '7px',
    left: 0
  }
}

// Hook
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef()

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event)

      // Add event listener
      element.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element] // Re-run if eventName or element changes
  )
}
