const chai = require("chai");
const expect = chai.expect;

const Game = require("../src/game.js");
const Round = require("../src/Round");
const Card = require("../src/Card");
const Deck = require("../src/Deck");
const prototypeData = require("../src/data.js");

describe("Game", function () {
	let cardInfo;
	let game;
	beforeEach("test setup", function () {
		cardInfo = prototypeData;
		game = new Game(cardInfo);
		deck = new Deck(cardInfo);
		round = new Round(deck);
	});

	it("should be a function", function () {
		expect(Game).to.be.a("function");
	});

	it("should be an instance of Game", function () {
		expect(game).to.be.an.instanceof(Game);
	});

	it("should create a Deck", function () {
		game.createDeck(cardInfo);
		expect(game.deck).to.be.an.instanceof(Deck);
	});

	it("should create Cards", function () {
		expect(game.createCards(cardInfo)[0]).to.be.an.instanceof(Card);
		expect(game.createCards(cardInfo)).to.deep.equal(cardInfo);
	});

	it("should put Cards in Deck", function () {
		let newDeck = game.createDeck(cardInfo);
		expect(newDeck).to.be.an.instanceof(Deck);
		expect(newDeck.cards).to.deep.equal(cardInfo);
	});

	it("should create a new Round using the Deck", function () {
		game.createDeck(cardInfo);
		expect(game.createRound()).to.be.an.instanceof(Round);
		expect(game.currentRound.deck).to.be.an.instanceof(Deck);
	});

	it("should keep track of the current Round", function () {
		game.createDeck(cardInfo);
		game.createRound();
		expect(game.currentRound).to.deep.equal(round);
	});
});
