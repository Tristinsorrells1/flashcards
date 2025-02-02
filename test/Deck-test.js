const chai = require("chai");
const expect = chai.expect;

const prototypeData = require("../src/data.js");
const Deck = require("../src/Deck");
const Card = require("../src/Card");

describe("Deck", function () {
	let cards;
	let deck;
	beforeEach("test setup", function () {
		cards = [prototypeData[0], prototypeData[1], prototypeData[2]];
		deck = new Deck(cards);
	});

	it("should be a function", function () {
		expect(Deck).to.be.a("function");
	});

	it("should be an instance of Deck", function () {
		expect(deck).to.be.an.instanceof(Deck);
	});

	it("should store Cards", function () {
		expect(deck.cards).to.equal(cards);
	});

	it("should know how many Cards it stores", function () {
		expect(deck.countCards()).to.equal(3);
	});
});
