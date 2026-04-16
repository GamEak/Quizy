class HangmanRound {
  constructor({ hangmanHint, hangmanAnswer }) {
    this.hangmanHint = hangmanHint;
    this.hangmanAnswer = hangmanAnswer.toUpperCase();
    this.guessedLetters = new Set();
    this.mistakes = 0;
    this.maxMistakes = 6;
  }

  guess(letter) {
    letter = letter.toUpperCase();

    // Check if repeated letter
    if (this.guessedLetters.has(letter)) {
      return "repeated";
    }

    this.guessedLetters.add(letter);

    // Check if hangmanAnswer has no this letter
    if (!this.hangmanAnswer.includes(letter)) {
      this.mistakes++;
      return "wrong";
    }
    return "correct";
  }

  displayWord() {
    const displayLetters = [];

    for (let i = 0; i < this.hangmanAnswer.length; i++) {
      if (this.hangmanAnswer[i] === " ") {
        displayLetters.push(" ");
      } else if (this.guessedLetters.has(this.hangmanAnswer[i])) {
        displayLetters.push(this.hangmanAnswer[i]);
      } else {
        displayLetters.push("_");
      }
    }

    return displayLetters;
  }

  adjudge() {
    // Return "lose" if mistakes meets maxMistakes
    if (this.mistakes === this.maxMistakes) return "lose";

    let hasEmptySpace = false;
    for (let i = 0; i < this.hangmanAnswer.length; i++) {
      // Skip spaces
      if (this.hangmanAnswer[i] === " ") continue;
      // Check if guessedLetters doesn't have hangmanAnswer[i] letter
      if (!this.guessedLetters.has(this.hangmanAnswer[i])) {
        hasEmptySpace = true;
        break;
      }
    }
    // Return "win" if empty space not found
    if (!hasEmptySpace) return "hangmanWin";

    return "playing";
  }

  // Get an answer word if the player loses
  getAnswer() {
    let displayAnswer = [];
    for (let i = 0; i < this.hangmanAnswer.length; i++) {
      displayAnswer.push(this.hangmanAnswer[i]);
    }
    return displayAnswer;
  }
}
