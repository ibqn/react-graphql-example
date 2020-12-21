import React from "react"

import { useTheme, makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import { Link } from "react-router-dom"

import { useChangeTheme } from "../theme-provider"

import IconButton from "@material-ui/core/IconButton"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"

import { ReactComponent as Logo } from "./logo.svg"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  auth: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    marginRight: theme.spacing(2),
    width: 30,
    height: 30,
    fill: "#ffffffff",
  },
  link: {
    color: "white",
    fontSize: 18,
  },
  icon: { color: "white" },
}))

const Header = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const changeTheme = useChangeTheme()
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Link to="/" className={classes.grow}>
          <Logo className={classes.logo} alt="" />

          <Typography variant="caption" className={classes.link} noWrap>
            Sharing
          </Typography>
        </Link>

        <Link to="/companies" className={classes.grow}>
          <Typography variant="caption" className={classes.link} noWrap>
            companies
          </Typography>
        </Link>

        <Link to="/cars" className={classes.grow}>
          <Typography variant="caption" className={classes.link} noWrap>
            cars
          </Typography>
        </Link>
        <IconButton
          title="Toggle light/dark mode"
          onClick={() => changeTheme()}
        >
          {theme.palette.type === "light" ? (
            <Brightness4Icon className={classes.icon} />
          ) : (
            <Brightness7Icon className={classes.icon} />
          )}
        </IconButton>
        <Link to="/login" className={classes.auth}>
          <Typography variant="caption" className={classes.link} noWrap>
            login
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
