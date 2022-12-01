const prototypeData = require("../src/data.js");
const Turn = require("../src/Turn");
const Game = require("../src/Game");
const util = require("./util");

class Round {
	constructor(deck) {
		this.deck = deck;
		this.turns = 0;
		this.turn;
		this.currentCard = deck.cards[this.turns];
		this.incorrectGuesses = [];
	}
	returnCurrentCard() {
		return this.currentCard;
	}
	takeTurn(answer) {
		let turn = new Turn(answer, this.currentCard);
		this.turn = turn;
		this.turns++;
		if (!turn.evaluateGuess()) {
			this.incorrectGuesses.push(this.currentCard.id);
		}
		this.currentCard = this.deck.cards[this.turns];
		return turn.giveFeedback();
	}
	calculatePercentCorrect() {
		return ((this.turns - this.incorrectGuesses.length) / this.turns) * 100;
	}
	endRound() {
		var endGame = `** Round over! ** You answered ${this.calculatePercentCorrect().toFixed(
			2
		)}% of the questions correctly!`;
		console.log(endGame);
		if (this.calculatePercentCorrect() < 90) {
			return this.startOver();
		}
		return endGame;
	}
	startOver() {
		this.turns = 0;
		this.incorrectGuesses = [];
		this.currentCard = this.deck.cards[this.turns];
		this.returnCurrentCard();
		var newRound = `** New round! Repeat flashcards until you score a 90.00% or better **`;
		console.log(newRound);
		util.main(this);
		return newRound
	}
}

module.exports = Round;
