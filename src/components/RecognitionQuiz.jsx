import React, { useState } from 'react'
import clsx from 'clsx'
// Material Core
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
// Material icons
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

// Components
import CardBase from './CardBase'

const useStyles = makeStyles(theme => ({
  character: {
    fontWeight: 500,
    fontSize: 150,
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0)
  },
  Darkbutton: {
    color: '#fff'
  },
  button: {
    fontSize: 20
  },
  cardActions: { height: 100 },
  icon: {
    fontSize: 20
  },
  characterContainer: { height: 250 }
}))

const RecognitionQuiz = props => {
  // State
  const [reverse, setReverse] = useState(false)
  const [response, setResponse] = useState('')

  // Props
  const { darkMode, onSubmit, onHeaderClick, quiz, stats } = props.data
  const classes = useStyles()

  function handleResponse(selection) {
    setResponse(selection)
    setReverse(!reverse)
  }

  function handleSubmit() {
    const result = quiz.answer === response
    onSubmit(result)
    setResponse('')
    setReverse(!reverse)
  }

  return (
    <Box className={classes.cardContainer}>
      <CardBase
        face='back'
        reverse={reverse}
        onHeaderClick={onHeaderClick}
        stats={stats}>
        <CardContent className={classes.characterContainer}>
          <Typography className={classes.character} align='center' variant='h1'>
            {quiz.question}
          </Typography>
          <Typography align='center' color='primary' variant='h3'>
            {quiz.answer}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Grid
            container
            spacing={1}
            direction='row'
            justify='flex-end'
            alignItems='center'>
            <Grid align='center' item xs={12} s={12}>
              <Typography variant='h4'>　</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                startIcon={
                  quiz.answer === response ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <CancelOutlinedIcon />
                  )
                }
                fullWidth
                size='large'
                variant='outlined'
                className={clsx(darkMode && classes.button)}
                color='primary'
                onClick={() => handleSubmit(response)}>
                {quiz.answer === response ? 'Continue' : 'Try again'}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardBase>

      <CardBase
        face='front'
        reverse={reverse}
        onHeaderClick={onHeaderClick}
        stats={stats}>
        <CardContent className={classes.characterContainer}>
          <Typography className={classes.character} align='center' variant='h1'>
            {quiz.question}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Grid
            container
            spacing={1}
            direction='row'
            justify='flex-end'
            alignItems='center'>
            {/* Card face internals go here */}
            {quiz.choices.map((choice, index) => (
              <Grid key={index} item xs={6} sm={6}>
                <Button
                  className={clsx(
                    classes.button,
                    darkMode && classes.Darkbutton
                  )}
                  onClick={() => handleResponse(choice)}
                  fullWidth
                  size='large'
                  variant='outlined'
                  color='primary'>
                  {choice}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardActions>
      </CardBase>
    </Box>
  )
}

export default RecognitionQuiz
