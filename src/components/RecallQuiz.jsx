import React, { useState } from 'react'
import clsx from 'clsx'
// Material Core
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
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
  correct: {
    color: '#00e676'
  },
  incorrect: {
    color: '#ff3d00'
  }
}))

const RecallQuiz = props => {
  // State
  const [reverse, setReverse] = useState(false)

  // Props
  const { darkMode, onSubmit, onHeaderClick, quiz, stats } = props.data
  const classes = useStyles()

  function handleReverse() {
    setReverse(!reverse)
  }

  function handleSubmit(response) {
    onSubmit(response)
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
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Button
                className={clsx(classes.button, darkMode && classes.Darkbutton)}
                startIcon={
                  <CheckCircleOutlineIcon className={classes.correct} />
                }
                fullWidth
                variant='outlined'
                onClick={() => handleSubmit(true)}>
                Correct
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                className={clsx(classes.button, darkMode && classes.Darkbutton)}
                startIcon={<CancelOutlinedIcon className={classes.incorrect} />}
                fullWidth
                variant='outlined'
                onClick={() => handleSubmit(false)}>
                Incorrect
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
        <Character main={quiz.question} />
        <CardActions>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Button
                className={clsx(darkMode && classes.button)}
                onClick={() => handleReverse()}
                fullWidth
                size='large'
                variant='outlined'
                color='primary'>
                Flip card
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardBase>
    </Box>
  )
}

export default RecallQuiz
