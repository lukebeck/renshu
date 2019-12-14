import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import shuffle from 'array-shuffle'
import theme from './theme'
import data from './data'

function Theme(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth='xs'>{props.children}</Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

const defaultSettings = {
  hiragana: true,
  recall: true,
  studying: [1, 2, 3]
}

function Settings(props) {
  const setupSettings = props.settings
  const [tempSettings, setTempSettings] = useState(setupSettings)
  function handleKanaSubmit() {
    const newSettings = { ...tempSettings, hiragana: !tempSettings.hiragana }
    props.onSubmit(newSettings)
    setTempSettings(newSettings)
    // If you console.log(tempSettings) here, they do not appear to be updated
    // But currently, as long as props.onSubmit uses newSettings, there is no error
    // If a settings error appears, this may be the place to check
  }

  return (
    <div>
      <div>
        Currently studying {tempSettings.hiragana ? 'hiragana' : 'katakana'}
      </div>
      <button onClick={submission => handleKanaSubmit(submission)}>
        switch kana
      </button>
    </div>
  )
}

function App() {
  const input = () =>
    shuffle(data.map(item => ({ ...item, answered: 0, correct: 0 })))
  const [deck, setDeck] = useState(input)

  const [settings, setSettings] = useState(defaultSettings)

  function handleSettingsSubmit(newSettings) {
    setSettings(newSettings)
  }

  return (
    <Theme>
      <Settings settings={settings} onSubmit={handleSettingsSubmit} />
      <div>
        {settings.hiragana === true ? deck[0].hiragana : deck[0].katakana}
      </div>
    </Theme>
  )
}

export default App
