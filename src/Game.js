const util = require("./util");
const Round = require("../src/Round");
const Deck = require("../src/Deck");
const Card = require("../src/Card");

// ---------------------------Global Variables---------------------------//
let card;
let round;
let cards;
let deck;

class Game {
	constructor() {
		this.deck;
		this.currentRound;
	}

	start(cardInfo) {
		this.createCards(cardInfo);
		this.createDeck(cards);
		this.createRound();
		this.printMessage(deck, round);
		this.printQuestion(round);
	}

	createCards(cardInfo) {
		cards = cardInfo.map(
			(elem) =>
				new Card(elem.id, elem.question, elem.answers, elem.correctAnswer)
		);
		return cards;
	}

	createDeck(cards) {
		deck = new Deck(cards);
		this.deck = deck;
		return deck;
	}

	createRound() {
		round = new Round(this.deck);
		this.currentRound = round;
		return round;
	}

	printMessage(deck) {
		console.log(
			`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.--------------------------------------------------------------------`
		);
	}

	printQuestion(round) {
		util.main(round);
	}
}

module.exports = Game;
