import React, { useState } from "react"

import { useMutation, gql } from "@apollo/client"

import { makeStyles, useTheme } from "@material-ui/core/styles"

import Paper from "@material-ui/core/Paper"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"

import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"

import Button from "@material-ui/core/Button"

import Gavel from "@material-ui/icons/Gavel"

import Slide from "@material-ui/core/Slide"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone"

import Error from "../error"
import { useHistory } from "react-router-dom"

const REGISTER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
      }
    }
  }
`

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
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(),
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green",
  },
}))

const Transition = (props) => <Slide direction="up" {...props} />

const Register = () => {
  const history = useHistory()

  const theme = useTheme()
  const classes = useStyles(theme)

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION)

  const handleSubmit = (event) => {
    event.preventDefault()

    setOpen(true)
  }

  const [open, setOpen] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="h5">Register</Typography>
        <form
          className={classes.form}
          onSubmit={(event) => handleSubmit(event)}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              onChange={({ target: { value } }) => setUsername(value)}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              onChange={({ target: { value } }) => setEmail(value)}
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
            color="secondary"
            disabled={
              loading || !username.trim() || !email.trim() || !password.trim()
            }
            className={classes.submit}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
          {error && <Error error={error} />}
        </form>
      </Paper>

      <Dialog
        open={open}
        disableBackdropClick={true}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          New Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User successfully created! You can now login.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            autoFocus
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Register
