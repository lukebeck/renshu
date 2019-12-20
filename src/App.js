import React, { useState, useEffect } from 'react'
// Material core
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
// App components
import Card from './Card'
import theme from './theme'
import Settings from './Settings'
import CardContents from './CardContents'
import Deck from './Deck'

function ThemeContainer(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth='xs'>{props.children}</Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

function App(props) {
  const [deck, setDeck] = useState(new Deck(props.cards, props.settings))
  const [drawer, setDrawer] = useState(false)
  const [quiz, setQuiz] = useState(deck.getQuiz())

  function handleSettingsSubmit(newSettings) {
    const previousSettings = deck.getSettings()
    if (
      (newSettings.kana !== previousSettings.kana) |
      (newSettings.type !== previousSettings.type)
    ) {
      setDeck(
        deck
          .setSettings(newSettings)
          .reset()
          .filter(newSettings.studying)
          .shuffle()
          .setQuiz()
      )
      setQuiz(deck.getQuiz())
    } else if (newSettings.studying !== previousSettings.studying) {
      setDeck(deck.rebuild(newSettings).setQuiz())
      setQuiz(deck.getQuiz())
    }
  }

  function handleDrawer(value) {
    setDrawer(value)
  }

  function handleQuizSubmit(response) {
    setDeck(deck.reschedule(response).setQuiz())
    setQuiz(deck.getQuiz())
  }

  return (
    <ThemeContainer>
      <Settings
        settings={deck.settings}
        drawer={drawer}
        onDrawerChange={handleDrawer}
        onSubmit={handleSettingsSubmit}
      />
      <Card correct={3} answered={10} onClick={() => handleDrawer(true)}>
        <CardContents onSubmit={handleQuizSubmit} quiz={quiz} />
      </Card>
    </ThemeContainer>
  )
}

export default App
