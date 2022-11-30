const chai = require('chai');
const expect = chai.expect;

const Game  = require('../src/game.js');
const Round = require('../src/Round');
const prototypeData  = require('../src/data.js');

describe('Game', function() {
    let cardInfo 
    let game
    prototypeData
    beforeEach('test setup', function () { 
        cardInfo = prototypeData 
        game = new Game(cardInfo)
    });
    it('should be an instance of Game', function() {
       expect(game).to.be.an.instanceof(Game); 
    }); 
    it('should put Cards in a Deck', function() {
        game.start()
        expect(game.checkDeckForCard(cardInfo)).to.equal(true)
    }); 
    it('should create a new Round using the Deck', function() {
        game.start(cardInfo)
        expect(game.checkForRound()).to.be.an.instanceof(Round)
    });
})