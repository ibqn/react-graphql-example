import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"

const useStyles = makeStyles((theme) => ({
  snackbar: {
    margin: theme.spacing(),
  },
}))

const Error = ({ error }) => {
  const [open, setOpen] = useState(true)

  const classes = useStyles()

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
