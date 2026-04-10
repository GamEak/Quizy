// เดวเสดให้ย้าย 2 บรรทัดนี้กับ Add categorys and questions ใน quizy.js ไปที่ main.js ให้ main เป็นตัวคุม

window.addEventListener("DOMContentLoaded", () => {
  //   Create instance
  const ui = new UI();
  const gameController = new GameController(quizy);

  //   Show category
  ui.showCategory(quizy.quiz);

  //   Choose topic -> Show quiz
  ui.topic.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    // Ensure the click's on a topic button inside the container
    if (!button) return;

    const category = button.dataset.category;
    ui.doneChoosingTopic(category);

    const quiz = gameController.chooseTopic(category);
    ui.showQuiz({
      category: quiz.category,
      number: gameController.number,
      question: quiz.question.ask.question,
      choices: quiz.question.choices,
    });
  });

  //   Choose answer choice
  ui.choices.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    // Ensure the click's on a topic button inside the container
    if (!button) return;

    const currentChoices = gameController.question.choices;
    const chosenChoiceIndex = Number(button.dataset.index);
    ui.quizAnswerFeedback(currentChoices, chosenChoiceIndex);

    const adjudgeResult = gameController.adjudge(chosenChoiceIndex);
    setTimeout(() => {
      if (adjudgeResult.status === "win") {
        ui.showWin();
      } else if (
        adjudgeResult.status === "correct but not all 5 questions're met"
      ) {
        ui.showQuiz({
          category: gameController.topic,
          number: gameController.number,
          question: adjudgeResult.nextQuestion.ask.question,
          choices: adjudgeResult.nextQuestion.choices,
        });
      } else if (adjudgeResult.status === "wrong") {
        ui.showHangman(
          adjudgeResult.hangmanRound.hangmanHint,
          adjudgeResult.hangmanRound.hangmanAnswer,
        );
      }
    }, 1000);
  });

  // Alphabet button input for hangman
  ui.alphabet.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    const letter = button.dataset.letter;
    ui.selectedLetter(letter);

    const result = gameController.hangman_eachTimeGuessing(letter);
    if (result.hangmanStatus === "lose") {
      ui.updateHangmanVisual(result.mistakeTotal);
      ui.showLose(result.correctAnswer);
    } else if (result.hangmanStatus === "hangmanWin") {
      ui.showQuiz({
        category: gameController.topic,
        number: gameController.number,
        question: result.nextQuestion.ask.question,
        choices: result.nextQuestion.choices,
      });
    } else {
      ui.updateWordDisplay(result.guessedLetterDisplay);
      ui.updateHangmanVisual(result.mistakeTotal);
    }
  });

  // Reset Game
  document.addEventListener("click", (e) => {
    const button = e.target.closest(
      ".topic-Header button, .win button, .lose button",
    );
    if (!button) return;

    gameController.resetGameLogic();
    ui.resetGameScreen();
  });
});
