const prototypeData  = require('../src/data.js');
const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectGuesses = []
    this.currentCard = this.deck.cards[this.turns]
  }
  takeTurn(answer) {
      let turn = new Turn(answer, this.currentCard)
      this.currentCard = this.deck.cards[this.turns]
      this.turns++
      if (answer !== turn.currentCard.correctAnswer) {
          this.incorrectGuesses.push(turn.currentCard.id)
          return 'incorrect!'
        }
        return 'correct!'
    }
    returnCurrentCard() {
      return this.currentCard
    }
}

module.exports = Round;