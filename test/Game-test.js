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
	prototypeData;
    let cards;
	beforeEach("test setup", function () {
		cardInfo = prototypeData;
		game = new Game(cardInfo);
		deck = new Deck(cardInfo);
		round = new Round(deck);
        cards = game.createCards(cardInfo);
		game.createDeck(cards);
	});
	it("should be an instance of Game", function () {
		expect(game).to.be.an.instanceof(Game);
	});
	it("should put cards in Deck", function () {
        let newDeck = game.createDeck(cardInfo);
		expect(newDeck).to.be.an.instanceof(Deck);
		expect(newDeck.cards).to.deep.equal(cardInfo);
	});
	it("should create cards", function () {
		expect(game.createCards(cardInfo)[0]).to.be.an.instanceof(Card);
		expect(game.createCards(cardInfo)).to.deep.equal(cardInfo);
	});
	it("should store the Deck", function () {
        
		expect(game.deck).to.be.an.instanceof(Deck);
	});
	it("should create a new Round using the Deck", function () {
		expect(game.createRound()).to.be.an.instanceof(Round);
		expect(game.currentRound.deck).to.be.an.instanceof(Deck);
		expect(game.currentRound.deck).to.deep.equal(deck);
	});
	it("should keep track of the current Round", function () {
		game.createRound()
		expect(game.currentRound).to.deep.equal(round);
	});
});
