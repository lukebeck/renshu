import React, { useState } from 'react'
// Material core

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// Material icons
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 475,
    borderRadius: 10
  },
  character: {
    fontWeight: 500,
    fontSize: 150,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  darkButton: {
    color: '#fff'
  },
  cardActions: {
    height: 120
  }
}))

function CardFooter(props) {
  const { correct, answered } = props
  return (
    <CardContent>
      <Grid container spacing={1}>
        <Grid item>
          <EqualizerRoundedIcon color='primary' />
        </Grid>
        <Grid item>
          <Typography variant='overline'>
            {correct} of {answered} correct (
            {((correct / answered) * 100).toFixed(2) | 0}%)
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  )
}

const Character = props => {
  const classes = useStyles()
  return (
    <CardContent>
      <Typography className={classes.character} align='center' variant='h1'>
        {props.display}
      </Typography>
    </CardContent>
  )
}

const QuizCard = props => {
  const classes = useStyles()

  function handleHeaderClick() {
    props.onHeaderClick()
  }

  function handleSubmit(submission) {
    props.onSubmit(submission)
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label='settings' onClick={handleHeaderClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Character display={props.quiz.question} />
      <CardActions className={classes.cardActions}>
        <Grid
          container
          spacing={1}
          direction='row'
          justify='flex-end'
          alignItems='center'>
          {props.quiz.type === 'recognition' ? (
            <Recognition
              darkMode={props.darkMode}
              quiz={props.quiz}
              onSubmit={submission => handleSubmit(submission)}
            />
          ) : (
            <Recall
              quiz={props.quiz}
              onSubmit={submission => handleSubmit(submission)}
            />
          )}
        </Grid>
      </CardActions>
      <CardFooter correct={props.correct} answered={props.answered} />
    </Card>
  )
}

const Recognition = props => {
  const classes = useStyles()
  const { answer, choices } = props.quiz

  const [reverse, setReverse] = useState(false)
  const [response, setResponse] = useState('')

  function handleResponse(selection) {
    setResponse(selection)
    setReverse(!reverse)
  }

  function handleSubmit() {
    const result = answer === response
    props.onSubmit(result)
    setResponse('')
    setReverse(!reverse)
  }

  return (
    <React.Fragment>
      {!reverse ? (
        <React.Fragment>
          {choices.map((choice, index) => (
            <Grid key={index} item xs={6} sm={6}>
              <Button
                className={props.darkMode ? classes.darkButton : ''}
                onClick={() => handleResponse(choice)}
                fullWidth
                size='large'
                variant='outlined'
                color='primary'>
                {choice}
              </Button>
            </Grid>
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid align='center' item xs={12} s={12}>
            <Typography variant='h4'>{answer}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              startIcon={
                answer === response ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <CancelOutlinedIcon />
                )
              }
              fullWidth
              size='large'
              variant='outlined'
              color='primary'
              onClick={() => handleSubmit(response)}>
              {answer === response ? 'Continue' : 'Try again'}
            </Button>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

function Recall(props) {
  const { answer } = props.quiz
  const classes = useStyles()

  const [reverse, setReverse] = useState(false)

  function handleReverse() {
    setReverse(!reverse)
  }

  function handleSubmit(response) {
    props.onSubmit(response)
    setReverse(!reverse)
  }

  return (
    <React.Fragment>
      {!reverse ? (
        <React.Fragment>
          <Grid align='center' item xs={12} s={12}>
            <Typography variant='h4'>　</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              onClick={() => handleReverse()}
              fullWidth
              size='large'
              variant='outlined'
              color='primary'>
              Flip card
            </Button>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid align='center' item xs={12} s={12}>
            <Typography variant='h4'>{answer}</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              startIcon={<CheckCircleOutlineIcon />}
              fullWidth
              size='large'
              variant='outlined'
              color='primary'
              onClick={() => handleSubmit(true)}>
              Correct
            </Button>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              startIcon={<CancelOutlinedIcon />}
              fullWidth
              size='large'
              variant='outlined'
              color='primary'
              onClick={() => handleSubmit(false)}>
              Incorrect
            </Button>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default QuizCard
