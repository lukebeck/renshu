import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
// Material core

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
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
  },
  cardContainer: {
    overflow: 'hidden',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 475,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  c: {
    borderRadius: 10,
    willChange: 'transform, opacity',
    height: 475,
    width: 300,
    position: 'absolute',
    marginTop: theme.spacing(5)
  }
}))

const RecallCard = props => {
  const { darkMode, onSubmit, onHeaderClick, quiz, stats } = props.data
  const [reverse, setReverse] = useState(false)
  const classes = useStyles()

  function handleReverse() {
    setReverse(!reverse)
  }

  function handleSubmit(response) {
    onSubmit(response)
    setReverse(!reverse)
  }

  const AnimatedCard = animated(Card)
  const { transform, opacity } = useSpring({
    opacity: reverse ? 1 : 0,
    transform: `perspective(1000px) rotateY(${reverse ? 180 : 0}deg)`,
    config: { mass: 6, tension: 1000, friction: 120 }
  })

  return (
    <Box className={classes.cardContainer}>
      <AnimatedCard
        className={classes.c}
        style={{
          opacity: opacity.interpolate({
            range: [0, 0.5, 0.5, 1],
            output: [0, 0, 1, 1]
          }),
          transform: transform.interpolate(t => `${t} rotateY(180deg)`)
        }}>
        <CardHeader
          action={
            <IconButton aria-label='settings' onClick={onHeaderClick}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <div style={{ opacity: !reverse ? '0' : '1' }}>
          {/* Character */}
          <CardContent>
            <Typography
              className={classes.character}
              align='center'
              variant='h1'>
              {quiz.question}
            </Typography>
            {/* A subtitle space should go in here for use on the card reverse */}
          </CardContent>
          {/* Quiz choices */}
          <CardActions className={classes.cardActions}>
            <Grid
              container
              spacing={1}
              direction='row'
              justify='flex-end'
              alignItems='center'>
              {/* Card face internals go here */}
              <Grid align='center' item xs={12} s={12}>
                <Typography variant='h4'>{quiz.answer}</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Button
                  className={darkMode ? classes.darkButton : ''}
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
                  className={darkMode ? classes.darkButton : ''}
                  startIcon={<CancelOutlinedIcon />}
                  fullWidth
                  size='large'
                  variant='outlined'
                  color='primary'
                  onClick={() => handleSubmit(false)}>
                  Incorrect
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </div>
        {/* Card footer */}
        <CardContent>
          <Grid container spacing={1}>
            <Grid item>
              <EqualizerRoundedIcon color='primary' />
            </Grid>
            <Grid item>
              <Typography variant='overline'>
                {stats.correct} of {stats.answered} correct (
                {((stats.correct / stats.answered) * 100).toFixed(2) | 0}
                %)
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </AnimatedCard>
      <AnimatedCard
        className={classes.c}
        style={{
          pointerEvents: reverse ? 'none' : 'auto',
          opacity: opacity
            .interpolate(o => 1 - o)
            .interpolate({
              range: [0, 0.55, 0.55, 1],
              output: [0, 0, 1, 1]
            }),
          transform
        }}>
        <CardHeader
          action={
            <IconButton aria-label='settings' onClick={onHeaderClick}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        {/* Character */}
        <CardContent>
          <Typography className={classes.character} align='center' variant='h1'>
            {quiz.question}
          </Typography>
          {/* A subtitle space should go in here for use on the card reverse */}
        </CardContent>
        {/* Quiz choices */}
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
                className={darkMode ? classes.darkButton : ''}
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
        {/* Card footer */}
        <CardContent>
          <Grid container spacing={1}>
            <Grid item>
              <EqualizerRoundedIcon color='primary' />
            </Grid>
            <Grid item>
              <Typography variant='overline'>
                {stats.correct} of {stats.answered} correct (
                {((stats.correct / stats.answered) * 100).toFixed(2) | 0}%)
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </AnimatedCard>
    </Box>
  )
}

export default RecallCard
