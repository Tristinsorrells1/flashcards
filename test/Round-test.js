const chai = require("chai");
const expect = chai.expect;

const prototypeData = require("../src/data.js");
const Round = require("../src/Round");
const Card = require("../src/Card");
const Turn = require("../src/Turn");
const Deck = require("../src/Deck");

describe("Round", function () {
	let cards;
	let answers;
	let deck;
	let round;
	let turn;
	beforeEach("test setup", function () {
		cards = [prototypeData[0], prototypeData[1], prototypeData[2]];
		answers = [
			prototypeData[0].answers[0],
			prototypeData[1].answers[1],
			prototypeData[2].answers[2],
		];
		deck = new Deck(cards);
		round = new Round(deck);
		turn = new Turn(answers[0], cards[0]);
	});

	it("should be a function", function () {
		expect(Round).to.be.a("function");
	});

	it("should be an instance of Round", function () {
		expect(round).to.be.an.instanceof(Round);
	});

	it("should store a Deck", function () {
		expect(round.deck).to.equal(deck);
		expect(round.deck).to.be.an.instanceof(Deck);
	});

	it("should set current Card as the first Card in the Deck at the start of the Round", function () {
		expect(round.currentCard).to.equal(round.deck.cards[0]);
	});

	it("should update current Card to the next Card", function () {
		round.takeTurn(answers[1]);
		expect(round.currentCard).to.equal(round.deck.cards[1]);

		round.takeTurn("wrong guess");
		expect(round.currentCard).to.equal(round.deck.cards[2]);
	});

	it("should start each round with 0 turns", function () {
		expect(round.turns).to.equal(0);
	});

	it("should create a new Turn each round", function () {
		round.takeTurn(answers[0]);
		expect(round.turn).to.be.an.instanceof(Turn);
	});

	it("should store the Turn", function () {
		round.takeTurn(answers[0]);
		expect(round.turn).to.deep.equal(turn);
	});

	it("should update the turns count by one each round", function () {
		round.takeTurn(answers[0]);
		expect(round.turns).to.equal(1);

		round.takeTurn(answers[1]);
		expect(round.turns).to.equal(2);

		round.takeTurn("wrong guess");
		expect(round.turns).to.equal(3);
	});

	it("should start with no incorrect guesses", function () {
		expect(round.incorrectGuesses).to.deep.equal([]);
	});

	it("should store incorrect guesses", function () {
		round.takeTurn(answers[0]);
		expect(round.incorrectGuesses).to.deep.equal([]);

		round.takeTurn("wrong guess");
		expect(round.incorrectGuesses).to.deep.equal([2]);

		round.takeTurn("wrong");
		expect(round.incorrectGuesses).to.deep.equal([2, 3]);
	});

	it("should return the current Card being played", function () {
		round.takeTurn(answers[1]);
		expect(round.returnCurrentCard()).to.equal(round.currentCard);

		round.takeTurn("incorrect answer");
		expect(round.returnCurrentCard()).to.equal(round.currentCard);
	});

	it("should return 'correct!' if the answer matches the Card", function () {
		expect(round.takeTurn(answers[0])).to.equal("correct!");
	});

	it("should return 'incorrect!' if the answer matches the Card", function () {
		expect(round.takeTurn("wrong guess")).to.equal("incorrect!");
	});

	it("should return the percentage of correct guesses", function () {
		round.takeTurn(answers[0]);
		round.takeTurn("wrong");
		expect(round.calculatePercentCorrect()).to.equal(50.0);
	});

	it("should print the percentage of correct questions", function () {
		round.takeTurn(answers[0]);
		expect(round.endRound()).to.equal(
			`** Round over! ** You answered 100.00% of the questions correctly!`
		);
	});

	it("should start a new Round if they scored less than 90%", function () {
		round.takeTurn(answers[0]);
		round.takeTurn("wrong");
		expect(round.endRound()).to.equal(
			`** New round! Repeat flashcards until you score a 90.00% or better **`
		);
	});

	it("should reset the number of turns in the new Round", function () {
		round.takeTurn(answers[0]);
		round.takeTurn("wrong");
		round.endRound();
		expect(round.turns).to.equal(0);
	});

	it("should reset the number of incorrect guesses in the new Round", function () {
		round.takeTurn("wrong");
		round.endRound();
		expect(round.incorrectGuesses).to.deep.equal([]);
	});

	it("should reset current Card to the first Card in the Deck in the new Round", function () {
		round.endRound();
		expect(round.currentCard).to.deep.equal(round.deck.cards[0]);
	});
});
