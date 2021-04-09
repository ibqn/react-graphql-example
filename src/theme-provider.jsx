import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

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
      <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
        {children}
      </DarkModeContext.Provider>
    </MuiThemeProvider>
  )
}

const useChangeTheme = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext)
  const changeTheme = useCallback(() => setDarkMode(!darkMode), [
    darkMode,
    setDarkMode,
  ])

  return [darkMode, changeTheme]
}

export { ThemeProvider, useChangeTheme }
