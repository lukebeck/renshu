import React from 'react'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded'
import MoreVertIcon from '@material-ui/icons/MoreVert'

function RecognitionContents(props) {
  function handleSubmissionClick(submission) {
    console.log('Answer submitted: ' + submission)
  }
  return (
    <React.Fragment>
      <CardContent>
        <Typography align='center' variant='h1' gutterBottom>
          <Box fontWeight={500} fontSize={150} my={2}>
            {props.data.question}
          </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-end'
          alignItems='center'>
          {props.data.choices.map((choice, index) => (
            <Grid key={index} item xs={6} sm={6}>
              <Button
                onClick={() => handleSubmissionClick(choice)}
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
    </React.Fragment>
  )
}

function StatsBar(props) {
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
  const handleSettingsClick = () => {
    props.onClick()
  }

  function onSubmit(submission) {
    // props.handleSubmission(submission)
    console.log('passed on:' + submission)
  }
  const data = props.data

  return (
    <Box my={4}>
      <Card>
        <Box height={485}>
          <CardHeader
            onClick={handleSettingsClick}
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <RecognitionContents data={data} />
          <StatsBar
            correct={props.data.correct}
            answered={props.data.answered}
          />
        </Box>
      </Card>
    </Box>
  )
}
