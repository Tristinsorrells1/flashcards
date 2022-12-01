const chai = require('chai');
const expect = chai.expect;

const Game  = require('../src/game.js');
const Round = require('../src/Round');
const Card = require("../src/Card");
const Deck = require("../src/Deck");
const prototypeData  = require('../src/data.js');

describe('Game', function() {
    let cardInfo 
    let game
    prototypeData
    beforeEach('test setup', function () { 
        cardInfo = prototypeData 
        game = new Game(cardInfo)
		deck = new Deck(cardInfo);
		round = new Round(deck);
    });
    it('should be an instance of Game', function() {
       expect(game).to.be.an.instanceof(Game); 
    }); 
    it("should put cards in Deck", function () {
			game.start(cardInfo);
			expect(game.deck.cards[0]).to.be.an.instanceof(Card);
		}); 
    it('should create cards', function() {
        var checkCards = game.start(cardInfo);
        expect(checkCards[0]).to.be.an.instanceof(Card);
    }); 
    it("should store the Deck", function () {
			game.start(cardInfo);
			expect(game.deck).to.be.an.instanceof(Deck);
		}); 
    it('should create a new Round using the Deck', function() {
        game.start(cardInfo)
        expect(game.currentRound).to.be.an.instanceof(Round)
    });
    it("should keep track of the current Round", function () {
			game.start(cardInfo);
			expect(game.currentRound).to.deep.equal(round);
		});
})