const chai = require('chai');
const expect = chai.expect;

const prototypeData  = require('../src/data.js');
const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Turn', function() {
    let turn 
    let turn2
    let currentCard = prototypeData[0];
    let guess = prototypeData[0].answers[0];

    beforeEach('test setup', function () {
        turn = new Turn(guess, currentCard);
        turn2 = new Turn ('wrong', currentCard);
    });
    it('should be an instance of Turn', function() {
       expect(turn).to.be.an.instanceof(Turn); 
    });
    it('should store a user\'s guess', function() {
        expect(turn.answer).to.equal(guess)
    });
    it('should store the current flashcard', function() {
        expect(turn.currentCard).to.equal(currentCard)
    });
    it('should return the user\'s guess', function() {
        expect(turn.returnGuess()).to.equal(guess)
    });
    it('should return the current flashcard', function() {
        expect(turn.returnCard()).to.equal(currentCard)
    });
    it('should return true if the user\'s guess matches the answer on the card', function() {
        expect(turn.evaluateGuess()).to.equal(true)
    });
    it('should return false if the user\'s guess does not match the answer on the card', function() {
        expect(turn2.evaluateGuess()).to.equal(false)
    })
    it('should return \'correct!\' when the user\'s guess is correct', function() {
        expect(turn.giveFeedback()).to.equal('correct!')
    });
    it('should return \'incorrect!\' when the user\'s guess is incorrect', function() {
        expect(turn2.giveFeedback()).to.equal('incorrect!') 
    });
})