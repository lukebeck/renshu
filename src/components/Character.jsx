import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const Character = props => {
  const { main, sub } = props
  return (
    <Box paddingTop={0}>
      <Typography
        align='center'
        variant='h1'
        style={{ fontWeight: 500, fontSize: 140 }}>
        {main}
      </Typography>
      {sub === null ? (
        ''
      ) : (
        <Typography
          style={{ marginTop: '-5px' }}
          align='center'
          color='primary'
          variant='h3'>
          {sub}
        </Typography>
      )}
    </Box>
  )
}

export default Character
