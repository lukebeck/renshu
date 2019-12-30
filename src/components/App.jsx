import React, { useState, useEffect } from 'react'
// Material core
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
// App components
import RecognitionQuiz from './RecognitionQuiz'
import RecallQuiz from './RecallQuiz'
import Settings from './Settings'
import dealer from '../utils/dealer'
import data from '../data'

const DEFAULT_SETTINGS = {
  darkMode: false,
  type: 'recognition',
  kana: 'hiragana',
  studying: {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
  }
}

const red = '#ff3d00'
const purple = '#d500f9'

function App() {
  const cards = data
  const save = JSON.parse(localStorage.getItem('kana-data'))
  const [settings, setSettings] = useState(
    save ? save.settings : DEFAULT_SETTINGS
  )
  const [deck, setDeck] = useState(
    save
      ? save.deck
      : dealer()
          .build(cards, settings)
          .getDeck()
  )
  const [drawer, setDrawer] = useState(false)
  const [quiz, setQuiz] = useState(dealer(deck).getQuiz(settings))
  const [stats, setStats] = useState(
    save ? save.stats : { answered: 0, correct: 0 }
  )

  const [theme, setTheme] = useState({
    palette: {
      type: settings.darkMode ? 'dark' : 'light',
      primary: {
        main: settings.kana === 'hiragana' ? red : purple
      }
    }
  })

  const resetDeck = () => {
    const newSettings = DEFAULT_SETTINGS
    const newDeck = dealer()
      .build(cards, newSettings)
      .getDeck()
    const newTheme = {
      palette: {
        type: newSettings.darkMode ? 'dark' : 'light',
        primary: {
          main: newSettings.kana === 'hiragana' ? red : purple
        }
      }
    }

    setSettings(newSettings)
    setDeck(newDeck)
    setStats({ answered: 0, correct: 0 })
    setQuiz(dealer(newDeck).getQuiz(newSettings))
    setTheme(newTheme)
  }

  const toggleDarkTheme = () => {
    let darkMode = !settings.darkMode
    let newPaletteType = darkMode ? 'dark' : 'light'
    setSettings({ ...settings, darkMode: darkMode })
    setTheme({
      theme,
      palette: { ...theme.palette, type: newPaletteType }
    })
  }

  const toggleAltColour = kana => {
    let newPalettePrimaryColour = kana === 'hiragana' ? red : purple
    setTheme({
      theme,
      palette: {
        ...theme.palette,
        primary: {
          main: newPalettePrimaryColour
        }
      }
    })
  }

  const themeConfig = createMuiTheme(theme)

  useEffect(() => {
    localStorage.setItem('kana-data', JSON.stringify({ deck, settings, stats }))
  })

  function handleSettingsSubmit(newSettings) {
    if (
      (newSettings.kana !== settings.kana) |
      (newSettings.type !== settings.type)
    ) {
      let newDeck = dealer(deck)
        .reset()
        .filter(newSettings)
        .shuffle()
        .reset()
        .getDeck()
      setDeck(newDeck)
      setQuiz(dealer(newDeck).getQuiz(newSettings))
      setStats({ correct: 0, answered: 0 })
    } else if (newSettings.studying !== settings.studying) {
      let newDeck = dealer(deck)
        .rebuild(settings, newSettings, cards)
        .getDeck()
      setDeck(newDeck)
      setQuiz(dealer(newDeck).getQuiz(newSettings))
    }
    setSettings(newSettings)
  }

  function handleDrawer(value) {
    setDrawer(value)
  }

  function handleQuizSubmit(response) {
    setStats({
      answered: (stats.answered += 1),
      correct: response ? (stats.correct += 1) : stats.correct
    })
    let newDeck = dealer(deck)
      .reschedule(response)
      .getDeck()
    setDeck(newDeck)
    setQuiz(dealer(newDeck).getQuiz(settings))
  }

  const quizData = {
    darkMode: theme.palette.type === 'dark' ? true : false,
    onSubmit: submission => handleQuizSubmit(submission),
    onHeaderClick: () => handleDrawer(true),
    quiz: quiz,
    stats: stats
  }

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Container maxWidth='xs'>
        <Settings
          deck={deck}
          settings={settings}
          drawer={drawer}
          onDrawerChange={handleDrawer}
          onSubmit={handleSettingsSubmit}
          resetDeck={resetDeck}
          toggleAltColour={toggleAltColour}
          toggleDarkTheme={toggleDarkTheme}
        />
        {quiz.type === 'recognition' ? (
          <RecognitionQuiz data={quizData} />
        ) : (
          <RecallQuiz data={quizData} />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
