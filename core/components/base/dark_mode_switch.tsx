import { useTheme } from '@core/providers/theme';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'


const DarkModeSwitch = () => {
  const { dark, setDark } = useTheme();

  return (
    <>
      {dark && <FontAwesomeIcon icon={faSun} style={{marginInlineEnd: "8px"}}/>}
      {!dark && <FontAwesomeIcon icon={faMoon} style={{marginInlineEnd: "8px"}}/>}
      <span onClick={() => setDark(!dark)}>
        {dark ? 'Light': 'Dark'} Mode
      </span>
    </>
  )
}

export default DarkModeSwitch
