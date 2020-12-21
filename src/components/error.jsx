import React, { useState } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"

const useStyles = makeStyles((theme) => ({
  snackbar: {
    margin: theme.spacing(),
  },
}))

const Error = ({ error }) => {
  const [open, setOpen] = useState(true)

  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <Snackbar
      open={open}
      className={classes.snackbar}
      message={error.message}
      action={
        <Button onClick={() => setOpen(false)} color="secondary" size="small">
          Close
        </Button>
      }
    />
  )
}

export default Error
