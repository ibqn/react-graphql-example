import React from "react"

import { useTheme, makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import SvgIcon from "@material-ui/core/SvgIcon"
import Typography from "@material-ui/core/Typography"

import { Link } from "react-router-dom"

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
}))

const Header = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
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
      </Toolbar>
    </AppBar>
  )
}

export default Header
