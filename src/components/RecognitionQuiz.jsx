import React, { useState } from 'react'
import clsx from 'clsx'
// Material Core
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
// Material icons
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

// Components
import CardBase from './CardBase'
import Character from './Character'

const useStyles = makeStyles(theme => ({
  Darkbutton: {
    color: '#fff'
  },
  button: {
    fontSize: 20
  },
  response: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    paddingRight: theme.spacing(1),
    fontSize: 45
  },
  correct: {
    color: '#00e676'
  },
  incorrect: {
    color: '#ff3d00'
  }
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
        <Character main={quiz.question} sub={quiz.answer} />

        <div>
          <span className={classes.response}>
            {quiz.answer === response ? (
              <CheckCircleOutlineIcon
                className={clsx(classes.icon, classes.correct)}
              />
            ) : (
              <CancelOutlinedIcon
                className={clsx(classes.icon, classes.incorrect)}
              />
            )}
            <Typography variant='h5'>You answered: {response}</Typography>
          </span>
          <Button
            fullWidth
            size='large'
            className={clsx(darkMode && classes.button)}
            onClick={() => handleSubmit(response)}>
            {quiz.answer === response ? 'Continue' : 'Try again'}
          </Button>
        </div>
      </CardBase>

      <CardBase
        face='front'
        reverse={reverse}
        onHeaderClick={onHeaderClick}
        stats={stats}>
        <Character main={quiz.question} />
        <CardActions>
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
