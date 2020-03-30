import React, { useState, useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../Input'
import { Element } from '@ds-tools/primitives'

/** Description of a dropdown */
function Dropdown({
  invalid,
  css,
  autocompleteProvider,
  options,
  showOptionsOnFocus,
  placeholder,
  onClear,
  value: selectedOption,
  ...props
}) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  if (autocompleteProvider) {
    options = autocompleteProvider(value)
  }

  const hasValue = !!value

  const selectOption = option => {
    setValue(option.label)
    setActiveIndex(null)
    props.onSelect && props.onSelect(option)
  }

  const keydownHandler = useCallback(
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
          selectOption(options[activeIndex])
          break
        case 'Escape':
          setInputAsBlurred()
        default:
          break
      }
    },
    [activeIndex, value, focused]
  )

  const keyupHandler = useCallback(
    event => {
      switch (event.key) {
        case 'Backspace':
        case 'Delete':
          if (value === '') {
            onClear()
          }
        default:
          break
      }
    },
    [activeIndex, value, focused]
  )

  useEventListener(focused, 'keyup', keyupHandler)
  useEventListener(focused, 'keydown', keydownHandler)

  const setInputAsFocused = () => {
    setActiveIndex(null)
    setFocused(true)
  }

  const setInputAsBlurred = () => {
    setFocused(false)
    selectedOption && setValue(selectedOption.label)
  }

  const setInputValue = value => {
    setValue(value)
    setActiveIndex(0)
  }
  return (
    <>
      <Element
        as="div"
        component="Dropdown"
        css={{ ...css, position: 'relative' }}
      >
        <Element as="div" css={styles.InputWrapper}>
          <Input
            value={!focused && selectedOption ? selectedOption.label : value}
            onFocus={() => setInputAsFocused(true)}
            onBlur={() => setInputAsBlurred(false)}
            onChange={e => setInputValue(e.target.value)}
            placeholder={placeholder}
          ></Input>
        </Element>
        {((hasValue && focused) ||
          (!hasValue && showOptionsOnFocus && focused)) && (
          <Element
            as="ul"
            css={{
              backgroundColor: 'white',
              padding: 0,
              position: 'absolute',
              width: '100%'
            }}
          >
            {options
              .filter(
                option => option.label.toLowerCase() !== value.toLowerCase()
              )
              .map((option, index) => (
                <Option
                  key={`${index}-${option.value}`}
                  active={activeIndex === index}
                  option={option}
                  onSelect={selectOption}
                />
              ))}
          </Element>
        )}
      </Element>
    </>
  )
}

export const Option = ({ option, active, onSelect }) => (
  <Element
    as="li"
    component="Dropdown-Option"
    style={{
      listStyleType: 'none',
      minHeight: '2em',
      fontSize: '0.85em',
      padding: '0.25em 1em',
      display: 'flex',
      alignItems: 'center',
      borderWidth: '0px 1px 1px 1px',
      borderStyle: 'solid',
      borderColor: 'Menu.border',
      position: 'relative'
    }}
    css={{
      ':hover': {
        color: 'text.link'
      },
      ':before': !active || {
        content: '" "',
        width: '0.5em',
        height: '100%',
        backgroundColor: 'blue',
        position: 'absolute',
        left: 0,
        top: 0
      }
    }}
    onMouseDown={() => onSelect(option)}
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
function useEventListener(enabled, eventName, handler, element = window) {
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
      if (!enabled) {
        return
      }
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
    [enabled, eventName, element] // Re-run if eventName or element changes
  )
}
