import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth='xs'>
          <div>かな</div>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
