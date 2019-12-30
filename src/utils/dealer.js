import shuffle from 'array-shuffle'
import arrayMove from 'array-move'
import arrayDiff from 'fast-array-diff'

const _parseSettings = settings => {
  let parsedSettings

  if (typeof settings === 'object') {
    parsedSettings = Object.keys(settings)
      .filter(key => settings[key])
      .map(item => parseInt(item))
  } else {
    parsedSettings = settings
  }

  return parsedSettings
}

const dealer = (deck = []) => {
  let deckArray = deck
  const obj = {
    _prepareCards(data) {
      const cards = shuffle(
        data.map(item => ({ ...item, answered: 0, correct: 0 }))
      )
      return cards
    },

    build(data, settings) {
      const cards = this._prepareCards(data)
      return this.filter(settings, cards)
    },

    // Filters a deck or array of cards against settings
    // @param {object} settings - Object containing card study settings
    // @param {array} cards - Array containing card objects, optional if not filtering prexisting deck
    // @returns {array} this - The deck function, to allow for chaining
    filter(settings, cards) {
      let target = cards || deck
      let studying = _parseSettings(settings.studying)
      deckArray = target.filter(item => studying.includes(item.group))
      return this
    },

    // Returns the deck object
    getDeck() {
      return deckArray
    },

    // Returns the quiz object
    getQuiz(settings) {
      let quiz = { type: settings.type }
      let card = deckArray[0]

      if (settings.type === 'recognition') {
        quiz.question = card[settings.kana]
        quiz.answer = card.romaji
        quiz.choices = shuffle([
          quiz.answer,
          ...shuffle(deckArray)
            .filter(item => item.romaji !== quiz.answer)
            .splice(0, 3)
            .map(item => item.romaji)
        ])
      } else {
        quiz.question = card.romaji
        quiz.answer = card[settings.kana]
        quiz.choices = []
      }

      return quiz
    },

    // shuffles the deck and returns the function for chaining
    shuffle() {
      deck = shuffle(deck)
      return this
    },

    // reschedules the first card by moving it back in the deck
    reschedule(response) {
      let card = deck[0]
      card.answered += 1
      if (response) card.correct += 1

      const length = deck.length
      const stability = ((card.correct + 1) / 100) * (card.answered + 1)
      let r = 0.2 // retrievability threshold
      let t = Math.log(r) * -stability // time before cards retrievability falls below threshold
      const pos = Math.ceil(length * t + length * 0.1)

      deckArray = arrayMove(deck, 0, pos)
      return this
    },

    // resets the stats for all cards in the deck
    reset() {
      deckArray = deckArray.map(card => ({ ...card, answered: 0, correct: 0 }))
      return this
    },

    // Rebuilds the deck after a settings update
    rebuild(prevSettings, newSettings, data) {
      const cards = this._prepareCards(data)
      const { removed, added } = arrayDiff.diff(
        _parseSettings(prevSettings.studying),
        _parseSettings(newSettings.studying)
      )
      if (removed.length > 0) {
        deckArray = deckArray.filter(item => !removed.includes(item.group))
        console.log('removed')
        console.log(deckArray)
      }
      if (added.length > 0) {
        let newCards = shuffle(
          cards.filter(item => added.includes(item.group))
        ).map(item => ({ ...item, answered: 0, correct: 0 }))
        deckArray = [...newCards, ...deckArray]
        console.log('added')
        console.log(deckArray)
      }

      return this
    }
  }

  return obj
}

export default dealer
