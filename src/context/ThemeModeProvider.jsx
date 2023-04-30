import React, { useContext } from 'react'
import { createContext } from "react"

export const ThemeModeContext = createContext()
export const ThemeModeContextValue = createContext()

export function useThemeValue() {
  return useContext(ThemeModeContextValue)
}

export function useThemeMode() {
  return useContext(ThemeModeContext)
}

export function ThemeModeProvider({ children }) {

  const [themeMode, setThemeMode] = React.useState('light')

  function toggleTheme() {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    // console.log(themeMode)
  }
  return (
    <ThemeModeContextValue.Provider value={themeMode}>
      <ThemeModeContext.Provider value={toggleTheme}>
        {children}
      </ThemeModeContext.Provider>
    </ThemeModeContextValue.Provider>
  )
}
