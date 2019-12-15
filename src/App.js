import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import shuffle from 'array-shuffle'
import theme from './theme'
import data from './data'
import Settings from './Settings'

import Button from '@material-ui/core/Button'

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
  type: 'recall',
  studying: {
    1: true,
    2: true,
    3: false
  },
  kana: 'hiragana'
}

function App() {
  const input = () =>
    shuffle(data.map(item => ({ ...item, answered: 0, correct: 0 })))
  const [deck, setDeck] = useState(input)
  const [settings, setSettings] = useState(defaultSettings)
  const [drawer, setDrawer] = useState(false)

  function handleSettingsSubmit(newSettings) {
    setSettings(newSettings)
  }

  function handleDrawer(value) {
    setDrawer(value)
  }

  return (
    <Theme>
      <Settings
        settings={settings}
        drawer={drawer}
        onDrawerChange={handleDrawer}
        onSubmit={handleSettingsSubmit}
      />
      <Button onClick={() => handleDrawer(true)}>Open drawer</Button>
      <div>
        <div>
          {settings.kana === 'hiragana' ? deck[0].hiragana : deck[0].katakana}
        </div>
        <div>{settings.type}</div>
      </div>
    </Theme>
  )
}

export default App
