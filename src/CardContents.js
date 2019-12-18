import React from 'react'

import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export default function RecognitionContents(props) {
  function onSubmit(submission) {
    // props.handleSubmission(submission)
    console.log('passed on:' + submission)
  }
  const data = props.data
  const deck = props.deck
  function handleSubmissionClick(submission) {
    console.log('Answer submitted: ' + submission)
  }
  return (
    <React.Fragment>
      <CardContent>
        <Typography align='center' variant='h1' gutterBottom>
          <Box fontWeight={500} fontSize={150} my={2}>
            {deck[0].hiragana}
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
          {data.choices.map((choice, index) => (
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
