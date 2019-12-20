import shuffle from 'array-shuffle'
import arrayMove from 'array-move'

export default class Deck {
  constructor(cards, settings) {
    this.cards = cards
    this.deck = []
    this.settings = settings
    this.filter(this.settings.studying)
    this.setQuiz()
  }

  // Sets the value of the deck to value
  setDeck(value) {
    this.deck = value
  }

  // Returns the deck array
  getDeck() {
    return this.deck
  }

  setQuiz() {
    let card = this.deck[0]
    let quiz = {
      type: this.settings.type
    }

    if (this.settings.type === 'recognition') {
      quiz.question = card[this.settings.kana]
      quiz.answer = card.romaji
      quiz.choices = shuffle([
        quiz.answer,
        ...shuffle(this.deck)
          .filter(item => item.romaji !== quiz.answer)
          .splice(0, 3)
          .map(item => item.romaji)
      ])
    } else {
      quiz.question = card.romaji
      quiz.answer = card[this.settings.kana]
      quiz.choices = [1, 2, 3, 4] // Remove this line once different card types have been implemented
    }

    this.quiz = quiz

    return this
  }

  setSettings(newSettings) {
    this.settings = newSettings
    return this
  }

  getSettings() {
    return this.settings
  }

  getQuiz() {
    return this.quiz
  }

  // Checks if settings is an array or an object
  // If an object, converts to and returns array
  // If an array, returns array
  _parseSettings(settings) {
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

  reschedule(response) {
    this.deck[0].answered += 1
    if (response) {
      this.deck[0].correct += 1
    }

    const length = this.deck.length
    const card = this.deck[0]
    const stability = ((card.correct + 1) / 100) * (card.answered + 1)
    let r = 0.2 // retrievability threshold
    let t = Math.log(r) * -stability // time before cards retrievability falls below threshold
    const pos = Math.ceil(length * t + length * 0.1)

    this.setDeck(arrayMove(this.deck, 0, pos))
    return this
  }

  // Shuffles the cards in the deck
  shuffle() {
    this.setDeck(shuffle(this.deck))
    return this
  }

  // Filters the deck to include only card groups specified by studySettings
  filter(studySettings) {
    let studying = this._parseSettings(studySettings)
    let filteredDeck = this.cards.filter(item => studying.includes(item.group))
    this.setDeck(filteredDeck)
    return this
  }

  reset() {
    this.deck = this.deck.map(card => ({
      ...card,
      answered: 0,
      correct: 0
    }))
    return this
  }

  _getExcludedItems(arr1, arr2) {
    return arr1.filter(item => !arr2.includes(item))
  }

  rebuild(newSettings) {
    const subtractions = this._getExcludedItems(
      this._parseSettings(this.settings.studying),
      this._parseSettings(newSettings.studying)
    )

    const additions = this._getExcludedItems(
      this._parseSettings(newSettings.studying),
      this._parseSettings(this.settings.studying)
    )

    if (subtractions.length !== 0) {
      this.deck = this.deck.filter(item => !subtractions.includes(item.group))
    }

    if (additions.length !== 0) {
      let newCards = shuffle(
        this.cards.filter(item => additions.includes(item.group))
      ).map(item => ({ ...item, answered: 0, correct: 0 }))
      this.deck = [...newCards, ...this.deck]
    }

    this.setSettings(newSettings)

    return this
  }
}
