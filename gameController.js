class GameController {
  constructor(quiz) {
    this.quizy = quiz;
    this.topic = null;
    this.number = 0;
    this.question = {};
    this.hangman = null;
    this.gameOver = false;
  }

  chooseTopic(topic) {
    this.topic = topic;
    return {
      category: this.topic,
      question: this.getQuestion(),
    };
  }

  getQuestion(correctQuiz = true) {
    if (correctQuiz) this.number++;

    const ask = this.quizy.randomQuestion(this.topic);
    this.question = {
      ask,
      choices: ask.shuffleChoices(),
    };
    return this.question;
  }

  adjudge(chosenChoice) {
    if (this.question.choices[chosenChoice].correct) {
      this.quizy.addCorrect(this.topic, this.question.ask);
      if (this.quizy.win(this.topic)) {
        return { status: "win" };
      } else {
        return {
          status: "correct but not all 5 questions're met",
          nextQuestion: this.getQuestion(),
        };
      }
    } else {
      this.hangman = new HangmanRound({
        hangmanHint: this.question.ask.hangmanHint,
        hangmanAnswer: this.question.ask.hangmanAnswer,
      });
      return {
        status: "wrong",
        hangmanRound: this.hangman,
      };
    }
  }

  // Execute each time a guessed letter in HangmanRound
  hangman_eachTimeGuessing(letter) {
    const guessingResult = this.hangman.guess(letter);
    const isHangmanRoundDone = this.hangman.adjudge();
    if (isHangmanRoundDone === "lose") {
      this.gameOver = true;
      return {
        hangmanStatus: isHangmanRoundDone,
        mistakeTotal: this.hangman.mistakes,
        correctAnswer: this.hangman.getAnswer(),
      };
    } else if (isHangmanRoundDone === "hangmanWin") {
      return {
        hangmanStatus: isHangmanRoundDone,
        nextQuestion: this.getQuestion(false),
      };
    } else {
      return {
        hangmanStatus: isHangmanRoundDone,
        guessingResult,
        mistakeTotal: this.hangman.mistakes,
        guessedLetterDisplay: this.hangman.displayWord(),
      };
    }
  }

  // Reset Game
  resetGameLogic() {
    this.topic = null;
    this.number = 0;
    this.question = {};
    this.hangman = null;
    this.gameOver = false;
  }
}
