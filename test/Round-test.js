const chai = require("chai");
const expect = chai.expect;

const prototypeData = require("../src/data.js");
const Round = require("../src/Round");
const Card = require("../src/Card");
const Turn = require("../src/Turn");
const Deck = require("../src/Deck");

describe("Round", function () {
	let answers;
	let cards;
	let deck;
	let turn;
	let round;
	beforeEach("test setup", function () {
		cards = [prototypeData[0], prototypeData[1], prototypeData[2]];
		answers = [
			prototypeData[0].answers[0],
			prototypeData[1].answers[1],
			prototypeData[2].answers[2],
		];
		deck = new Deck(cards);
		round = new Round(deck);
	});
	it("should be an instance of Round", function () {
		expect(round).to.be.an.instanceof(Round);
	});
	it("should have a deck", function () {
		expect(round.deck).to.equal(deck);
	});
	it("should create a new Turn instance", function () {
		round.takeTurn(answers[0]);
		expect(round.turn).to.be.an.instanceof(Turn);
	});
	it("should store the current turn", function () {
		round.takeTurn(answers[0]);
		expect(round.turn).to.be.an.instanceof(Turn);
	});
	it("should start every round with 0 turns", function () {
		expect(round.turns).to.equal(0);
	});
	it("should update the turns count by one each round", function () {
		round.takeTurn(answers[0]);
		expect(round.turns).to.equal(1);
		round.takeTurn(answers[1]);
		expect(round.turns).to.equal(2);
		round.takeTurn("wrong guess");
		expect(round.turns).to.equal(3);
	});
	it("should update current card to the next card", function () {
		expect(round.currentCard).to.equal(prototypeData[0]);

		round.takeTurn(answers[1]);
		expect(round.currentCard).to.equal(prototypeData[1]);

		round.takeTurn("wrong guess");
		expect(round.currentCard).to.equal(prototypeData[2]);
	});
	it("should return the current card being played", function () {
		expect(round.returnCurrentCard()).to.equal(cards[0]);

		round.takeTurn(answers[1]);
		expect(round.returnCurrentCard()).to.equal(cards[1]);

		round.takeTurn("incorrect answer");
		expect(round.returnCurrentCard()).to.equal(cards[2]);
	});
	it("should set currentCard as the first Card in the Deck at the start of the Round", function () {
		expect(deck.cards[0]).to.equal(round.currentCard);
	});
	it("should return 'correct!' if the answer matches the card", function () {
		expect(round.takeTurn(answers[0])).to.equal("correct!");
	});
	it("should return 'incorrect!' if the answer matches the card", function () {
		expect(round.takeTurn("wrong guess")).to.equal("incorrect!");
	});
	it("should store incorrect guesses", function () {
		round.takeTurn(answers[0]);
		expect(round.incorrectGuesses).to.deep.equal([]);

		round.takeTurn("wrong guess");
		expect(round.incorrectGuesses).to.deep.equal([2]);

		round.takeTurn("wrong");
		expect(JSON.stringify(round.incorrectGuesses)).to.equal(
			JSON.stringify([2, 3])
		);
	});
	it("should return the percentage of correct guesses", function () {
		round.takeTurn(answers[0]);
		round.takeTurn("wrong");
		expect(round.calculatePercentCorrect()).to.equal(50);
		// round.takeTurn("wrong again");
		// round.takeTurn("still wrong");
		// expect(round.calculatePercentCorrect()).to.equal(25);
	});
	it("should print the percentage of correct questions", function () {
		round.takeTurn(answers[0]);
		round.takeTurn("wrong");
		expect(round.endRound()).to.equal(
			`** Round over! ** You answered 50% of the questions correctly!`
		);
	});
});
