import { createMuiTheme } from '@material-ui/core/styles'

// Custom app theme
const theme = createMuiTheme({
  typography: {
    h1: {}
  },
  palette: {
    primary: {
      main: '#ff5252'
    },
    secondary: {
      main: '#bb29ff'
    }
  }
})

export default theme
