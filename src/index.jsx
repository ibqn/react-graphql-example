import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./app"
import reportWebVitals from "./reportWebVitals"

import { createMuiTheme } from "@material-ui/core/styles"
import indigo from "@material-ui/core/colors/indigo"
import orange from "@material-ui/core/colors/orange"
import CssBaseline from "@material-ui/core/CssBaseline"

import { ThemeProvider } from "./theme-provider"
import "fontsource-roboto"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[500],
      main: indigo[700],
      dark: indigo[900],
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
