import { useState } from "react"

import { useMutation, gql } from "@apollo/client"

import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Avatar from "@material-ui/core/Avatar"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Button from "@material-ui/core/Button"

import { Link } from "react-router-dom"

import Lock from "@material-ui/icons/Lock"
import { useTheme, makeStyles } from "@material-ui/core/styles"

import Error from "../error"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.primary.main,
  },
  register: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: theme.palette.grey,
    fontSize: 18,
  },
  link: {
    textDecoration: "none",
  },
  linkText: {
    marginLeft: theme.spacing(),
    color: theme.palette.primary.main,
    fontSize: 18,
  },
}))

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

const Login = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("login")

    // login({ variables: { username, password } }).catch((error) =>
    //   console.log(`login error occurred ${error}`)
    // )
    try {
      await login({ variables: { username, password } })
    } catch (error) {
      console.log(`login error occurred ${error}`)
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Link to="/">
          <Avatar className={classes.avatar}>
            <Lock />
          </Avatar>
        </Link>
        <Typography variant="h5">Login as Existing User</Typography>

        <form onSubmit={(event) => handleSubmit(event)} disabled={loading}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              onChange={({ target: { value } }) => {
                setUsername(value)
              }}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || !username.trim() || !password.trim()}
            className={classes.submit}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && <Error error={error} />}
        </form>
        <div className={classes.register}>
          <Typography variant="h6" className={classes.text} noWrap>
            Do not have an account yet?
          </Typography>

          <Link to="/register" className={classes.link}>
            <Typography variant="h6" className={classes.linkText} noWrap>
              register
            </Typography>
          </Link>
        </div>
      </Paper>
    </div>
  )
}

export default Login
