import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react"

import {
  MuiThemeProvider,
  createMuiTheme,
  useTheme,
} from "@material-ui/core/styles"

import useMediaQuery from "@material-ui/core/useMediaQuery"
import { lightBlue, grey } from "@material-ui/core/colors"

const DarkModeContext = createContext(null)

const ThemeProvider = ({ children, theme }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [darkMode, setDarkMode] = useState(prefersDarkMode)

  const memoTheme = useMemo(
    () =>
      createMuiTheme({
        ...theme,
        palette: {
          primary: {
            main: darkMode ? grey[900] : lightBlue[500],
          },
          type: darkMode ? "dark" : "light",
        },
      }),
    [theme, darkMode]
  )

  return (
    <MuiThemeProvider theme={memoTheme}>
      <DarkModeContext.Provider value={setDarkMode}>
        {children}
      </DarkModeContext.Provider>
    </MuiThemeProvider>
  )
}

const useChangeTheme = () => {
  const theme = useTheme()
  const setDarkMode = useContext(DarkModeContext)
  const changeTheme = useCallback(
    () => setDarkMode(theme.palette.type === "light"),
    [theme.palette.type, setDarkMode]
  )

  return changeTheme
}

export { ThemeProvider, useChangeTheme }
