import React, { useState } from 'react'
import shuffle from 'array-shuffle'
// Material core
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
// App components
import Card from './Card'
import data from './data'
import theme from './theme'
import Settings from './Settings'
import CardContents from './CardContents'

const testData = {
  question: 'え',
  answer: 'e',
  choices: ['a', 'ki', 'ku', 'e'],
  answered: 11,
  correct: 7
}

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

// These defaults will be moved to another file when local storage is implemented
// If storage is present, stored cards and stored settings will be passed to the app as props
// If no storage present, they will be passed to the app as props
const defaultSettings = {
  type: 'recall',
  studying: {
    1: true,
    2: true,
    3: false
  },
  kana: 'hiragana'
}

const defaultCards = shuffle(
  data.map(item => ({ ...item, answered: 0, correct: 0 }))
)

// Gets an object like the settings.studying object and returns a formatted, filtered array
const filterKeys = object =>
  Object.keys(object)
    .filter(key => object[key])
    .map(entry => parseInt(entry))

// Gets a card deck array and another array of study groups and returns a new filtered deck
const filterDeck = (deck, groupArray) =>
  deck.filter(item => groupArray.includes(item.group))

function rebuildDeck(deck, cards, previousSettings, newSettings) {
  const previousSettingsArray = filterKeys(previousSettings)
  const newSettingsArray = filterKeys(newSettings)
  const getExcludedItems = (array1, array2) =>
    array1.filter(entry => !array2.includes(entry))

  const subtractions = getExcludedItems(previousSettingsArray, newSettingsArray)
  const additions = getExcludedItems(newSettingsArray, previousSettingsArray)

  let newDeck = deck
  if (subtractions.length !== 0) {
    newDeck = newDeck.filter(item => !subtractions.includes(item.group))
  }
  if (additions.length !== 0) {
    const newCards = shuffle(
      cards.filter(item => additions.includes(item.group))
    ).map(item => ({ ...item, answered: 0, correct: 0 }))
    newDeck = [...newCards, ...newDeck]
  }
  return newDeck
}

// When everything is implemented, the cards and settings should be passed to App as props
function App(props) {
  const cards = defaultCards
  const [settings, setSettings] = useState(defaultSettings)
  const [deck, setDeck] = useState(
    filterDeck(cards, filterKeys(settings.studying))
  )
  const [drawer, setDrawer] = useState(false)

  function handleSettingsSubmit(newSettings) {
    const previousSettings = settings
    setSettings(newSettings)
    if (
      (newSettings.kana !== previousSettings.kana) |
      (newSettings.type !== previousSettings.type)
    ) {
      // console.log('Type/kana have changed: reset, shuffle and filter new deck!')
      setDeck(
        shuffle(
          filterDeck(
            cards.map(item => ({ ...item, answered: 0, correct: 0 })),
            filterKeys(newSettings.studying)
          )
        )
      )
    } else if (newSettings.studying !== previousSettings.studying) {
      // console.log('Card groupings have changed: filter and rebuilt deck!')
      setDeck(rebuildDeck(deck, cards, previousSettings, newSettings))
    }
  }

  function handleDrawer(value) {
    setDrawer(value)
  }

  return (
    <ThemeContainer>
      <Settings
        settings={settings}
        drawer={drawer}
        onDrawerChange={handleDrawer}
        onSubmit={handleSettingsSubmit}
      />
      <Card
        correct={testData.correct}
        answered={testData.answered}
        onClick={() => handleDrawer(true)}>
        <CardContents deck={deck} data={testData} />
      </Card>
    </ThemeContainer>
  )
}

export default App
