const prototypeData  = require('../src/data.js');
const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectGuesses = []
    this.currentCard = this.deck.cards[0]
  }
  returnCurrentCard() {
    return this.currentCard
  }
  takeTurn(answer) {
      let turn = new Turn(answer, this.currentCard)
      this.currentCard = this.deck.cards[this.turns]
      this.turns++
      if (answer !== this.currentCard.correctAnswer) {
          this.incorrectGuesses.push(this.currentCard.id)
          return 'incorrect!'
        }
        return 'correct!'
    }
    calculatePercentCorrect() {
        return (this.incorrectGuesses.length / this.turns) * 100
    }
    endRound() {
       return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`
    }
}

module.exports = Round;