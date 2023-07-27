import { useTheme } from '@core/providers/theme';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'


const DarkModeSwitch = () => {
  const { dark, setDark } = useTheme();

  return (
    <div className="theme-mode-switch" onClick={() => setDark(!dark)}>
      {dark && <FontAwesomeIcon icon={faSun} style={{marginInlineEnd: "8px"}}/>}
      {!dark && <FontAwesomeIcon icon={faMoon} style={{marginInlineEnd: "8px"}}/>}
      {dark ? 'Light': 'Dark'} Mode
    </div>
  )
}

export default DarkModeSwitch
