import data from './data'
import shuffle from 'array-shuffle'

const defaultSettings = {
  type: 'recognition',
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
    10: true
  },
  kana: 'hiragana'
}

const defaultCards = shuffle(
  data.map(item => ({ ...item, answered: 0, correct: 0 }))
)

export default function loader() {
  return {
    settings: defaultSettings,
    cards: defaultCards
  }
}
