const chai = require('chai');
const expect = chai.expect;

const prototypeData  = require('../src/data.js');
const Round = require('../src/Round');
const Card = require('../src/Card');
const Turn = require('../src/Turn');
const Deck = require('../src/Deck');

describe('Round', function() {
    let currentCard = prototypeData[0];
    let answer = prototypeData[0].answers[0];
    let cards
    let deck
    let turn
    let round
    beforeEach('test setup', function() {
        cards = [prototypeData[0],prototypeData[1], prototypeData[2]]
        deck = new Deck(cards)
        // turn = new Turn(answer, currentCard)
        round = new Round(deck);

    });
    it('should be an instance of Round', function() {
        expect(round).to.be.an.instanceof(Round); 
    });
    it('should create a new Turn instance', function() {
        // stuck
        
    });
    it('should update the turns count', function() {
        round.takeTurn(answer)
        expect(round.turns).to.equal(1);
        round.takeTurn(answer)
        expect(round.turns).to.equal(2);
        round.takeTurn('wrongGuess')
        expect(round.turns).to.equal(3);
        
    });
    it('should update current card to the next card', function() {
        round.takeTurn(answer)
       
        expect(round.currentCard).to.equal(prototypeData[0])

        round.takeTurn('hi')
        expect(round.currentCard).to.equal(prototypeData[1])

        round.takeTurn('wrongGuess')
        expect(round.currentCard).to.equal(prototypeData[2])
        
    });
    it('should return the current card being played', function() {
        expect(round.returnCurrentCard()).to.equal(currentCard)
    });
    it('currentCard should be the first Card in the Deck at the start of the Round', function() {
        expect(deck.cards[0]).to.equal(currentCard)
    });
    it('should return \'correct!\' if the answer matches the card', function() {
        expect(round.takeTurn(answer)).to.equal('correct!')
    });
    it('should return \'incorrect!\' if the answer matches the card', function() {
        expect(round.takeTurn('wrongGuess')).to.equal('incorrect!')
    });
    it('should store incorrect guesses', function() {
        round.takeTurn(answer)
        expect(JSON.stringify(round.incorrectGuesses)).to.equal(JSON.stringify([]))

        round.takeTurn('wrongGuess')
        expect(JSON.stringify(round.incorrectGuesses)).to.equal(JSON.stringify([2]))

        round.takeTurn('wrong')
         expect(JSON.stringify(round.incorrectGuesses)).to.equal(JSON.stringify([2, 3]))
    });
    it('should return the percentage of correct guesses', function() {
        round.takeTurn(answer)
        round.takeTurn('wrong')
        expect(round.calculatePercentCorrect()).to.equal(50)

    });
    it('should print the percentage of correct questions', function() {
        round.takeTurn(answer)
        round.takeTurn('wrong')
        expect(round.endRound()).to.equal(`** Round over! ** You answered 50% of the questions correctly!`)

    });
})