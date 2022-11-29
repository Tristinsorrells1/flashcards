const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Deck = require('../src/Deck');
const Card = require('../src/Card');
const Round = require('../src/Round');

//Global Variables
var deck
var card
var round


class Game {
  constructor() {
  }

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }
  start(cardInfo) {
    cardInfo.map((elem) => {
    card = new Card(elem.id, elem.question, elem.answers, elem.correctAnswer)
    deck = new Deck(cardInfo)
    round = new Round(deck)
    // this.printMessage(deck, round)
    // this.printQuestion(round)
    }) 
  }
 checkDeckForCard(cardInfo) {
  return deck.cards === cardInfo
 }
 checkForRound() {
  if (round.deck === deck) {
    return round
  }
 }
}

module.exports = Game;