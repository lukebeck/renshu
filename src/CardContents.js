import React from 'react'

import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

function Recognition(props) {
  function handleSubmissionClick(choice) {
    props.onSubmit(props.answer === choice)
  }

  return (
    <React.Fragment>
      <CardContent>
        <Typography align='center' variant='h1' gutterBottom>
          <Box fontWeight={500} fontSize={150} my={2}>
            {props.question}
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
          {props.choices.map((choice, index) => (
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

function Recall(props) {
  function handleSubmissionClick(choice) {
    props.onSubmit(props.answer === choice)
  }

  return (
    <React.Fragment>
      <CardContent>
        <Typography align='center' variant='h1' gutterBottom>
          <Box fontWeight={500} fontSize={150} my={2}>
            {props.question}
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
          <Grid item xs={12} sm={12}>
            <Box mt={7}>
              <Button
                onClick={() => console.log('flipping card!')}
                fullWidth
                size='large'
                variant='outlined'
                color='primary'>
                Flip card
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
    </React.Fragment>
  )
}

export default function CardContents(props) {
  function handleSubmissionClick(submission) {
    props.onSubmit(submission)
  }

  return (
    <React.Fragment>
      {props.quiz.type === 'recognition' ? (
        <Recognition
          question={props.quiz.question}
          answer={props.quiz.answer}
          choices={props.quiz.choices}
          onSubmit={submission => handleSubmissionClick(submission)}
        />
      ) : (
        <Recall
          question={props.quiz.question}
          answer={props.quiz.answer}
          onSubmit={submission => handleSubmissionClick(submission)}
        />
      )}
    </React.Fragment>
  )
}
