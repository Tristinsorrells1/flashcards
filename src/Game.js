const data = require("./data");
const prototypeQuestions = data.prototypeData;
const util = require("./util");
const Deck = require("../src/Deck");
const Card = require("../src/Card");
const Round = require("../src/Round");

//Global Variables
var card;
var round;

class Game {
	constructor() {}

	start(cardInfo) {
		const cards = cardInfo.map(
			(elem) =>
				new Card(elem.id, elem.question, elem.answers, elem.correctAnswer)
		);
		const deck = new Deck(cards);
		round = new Round(deck);
		// this.printMessage(deck, round)
		// this.printQuestion(round)
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
