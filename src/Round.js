const prototypeData = require("../src/data.js");
const Turn = require("../src/Turn");

class Round {
	constructor(deck) {
		this.deck = deck;
		this.turns = 0;
		this.incorrectGuesses = [];
		this.currentCard = deck.cards[this.turns];
    this.turn 
	}
	returnCurrentCard() {
		return this.currentCard;
	}
	takeTurn(answer) {
		let turn = new Turn(answer, this.currentCard);
    this.turn = turn
		this.turns++;
		if (!turn.evaluateGuess()) {
			this.incorrectGuesses.push(this.currentCard.id);
		}
		this.currentCard = this.deck.cards[this.turns];
		return turn.giveFeedback();
	}
	calculatePercentCorrect() {
		return (this.incorrectGuesses.length / this.turns) * 100;
	}
	endRound() {
		var endGame = `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
    console.log(endGame)
    return endGame
  }
}

module.exports = Round;
