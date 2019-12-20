import React from 'react'
// Material core
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// Material icons
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    height: 485
  }
}))

function CardFooter(props) {
  return (
    <CardContent>
      <Grid container>
        <Grid item xs={1}>
          <EqualizerRoundedIcon color='primary' />
        </Grid>
        <Grid item>
          <Typography variant='overline'>
            {props.correct} of {props.answered} correct (
            {((props.correct / props.answered) * 100).toFixed(2)} %)
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default function KanaCard(props) {
  const classes = useStyles()
  const correct = props.correct
  const answered = props.answered

  function handleSettingsClick() {
    props.onClick()
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label='settings' onClick={handleSettingsClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      {props.children}
      <CardFooter correct={correct} answered={answered} />
    </Card>
  )
}
