import React from 'react'
import { useSpring, animated } from 'react-spring'
// Material Core
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
// Material icons
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles(theme => ({
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
    height: 485,
    width: 350,
    position: 'absolute',
    marginTop: theme.spacing(5)
  },
  footer: {}
}))

const CardInner = props => {
  const classes = useStyles()
  const { onHeaderClick, face, reverse, stats } = props
  const style = face === 'back' ? { opacity: !reverse ? '0' : '1' } : {}

  return (
    <React.Fragment>
      <CardHeader
        action={
          <IconButton aria-label='settings' onClick={onHeaderClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <div style={style}>{props.children}</div>
      <CardContent className={classes.footer}>
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
    </React.Fragment>
  )
}

const CardBase = props => {
  const classes = useStyles()
  const { reverse, face, onHeaderClick, stats } = props
  const AnimatedCard = animated(Card)
  const { transform, opacity } = useSpring({
    opacity: reverse ? 1 : 0,
    transform: `perspective(1000px) rotateY(${reverse ? 180 : 0}deg)`,
    config: { mass: 6, tension: 1000, friction: 120 }
  })
  const backStyle = {
    opacity: opacity.interpolate({
      range: [0, 0.5, 0.5, 1],
      output: [0, 0, 1, 1]
    }),
    transform: transform.interpolate(t => `${t} rotateY(180deg)`)
  }

  const frontStyle = {
    pointerEvents: reverse ? 'none' : 'auto',
    opacity: opacity
      .interpolate(o => 1 - o)
      .interpolate({
        range: [0, 0.55, 0.55, 1],
        output: [0, 0, 1, 1]
      }),
    transform
  }

  return (
    <AnimatedCard
      className={classes.c}
      style={face === 'front' ? frontStyle : backStyle}>
      <CardInner
        onHeaderClick={onHeaderClick}
        reverse={reverse}
        face={face}
        stats={stats}>
        {props.children}
      </CardInner>
    </AnimatedCard>
  )
}

export default CardBase
