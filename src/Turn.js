class Turn {
	constructor(answer, currentCard) {
		this.answer = answer;
		this.currentCard = currentCard;
	}

	returnGuess() {
		return this.answer;
	}

	returnCard() {
		return this.currentCard;
	}

	evaluateGuess() {
		if (this.answer === this.currentCard.correctAnswer) {
			return true;
		}
		return false;
	}

	giveFeedback() {
		if (this.evaluateGuess()) {
			return "correct!";
		}
		return "incorrect!";
	}
}

module.exports = Turn;
