class UI {
  constructor() {
    this.topic = document.getElementById("categoryContainer");

    // Quiz : Quiz Description, Quiz & Choices
    // Quiz Description
    this.quizDesCate = document.getElementById("quizDescription-category");
    this.quizDesNum = document.getElementById("quizDescription-number");
    // Quiz & Choices
    this.quiz = document.getElementById("quizContainer");
    this.question = document.getElementById("quizQuestion");
    this.choices = document.getElementById("quizChoiceContainer");

    // Hangman
    this.hangman = document.getElementById("hangmanModeContainer");
    this.hint = document.getElementById("hangmanHint");
    this.hangmanAnswer = document.getElementById("hangmanAnswerContainer");
    this.hangmanParts = [];
    this.hangmanVisual = document.getElementById("hangmanVisualContainer");

    // Win/Lose
    this.win = document.getElementById("winContainer");
    this.lose = document.getElementById("loseContainer");
    this.hangmanCorrectAnswer = document.getElementById("correctAnswer");
  }

  showCategory(categories) {
    this.topic.innerHTML = "";
    Object.entries(categories).forEach(([key, value]) => {
      const button = document.createElement("button");
      button.dataset.category = key;
      button.innerHTML = `
        <div>
        <span>${value.icon}</span>
        <h3>${key}</h3>
        </div>
        <p>${value.description}</p>
      `;

      this.topic.appendChild(button);
    });
  }

  doneChoosingTopic(chosenTopic) {
    const button = this.topic.children;
    // Disable all topics
    Array.from(button).forEach((btn) => {
      btn.disabled = true;
      // Highlight selected topic
      if (btn.dataset.category === chosenTopic)
        btn.classList.add("selectedTopic");
    });
  }

  showQuiz({ category, number, question, choices }) {
    // Display : show quiz & hide hangman
    this.quiz.hidden = false;
    this.hangman.hidden = true;

    // Quiz : Quiz Description, Quiz & Choices
    // Quiz Description
    this.quizDesCate.innerText = `${category}`;
    this.quizDesNum.innerText = `${number}/5`;

    // Quiz & Choices
    this.question.innerText = `${question}`;

    this.choices.innerHTML = "";
    const choiceLetters = ["A", "B", "C", "D"];
    choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.dataset.index = index;
      button.innerHTML = `
      <span>${choiceLetters[index]}.</span>
      <p>${choice.choice}</p>
      `;

      this.choices.appendChild(button);
    });
  }

  // Note : quizAnswerFeedback รับ Status มาใช้ไม่ได้ เพราะ adjudge(chosenChoice) return ออกมาแค่ Status คือ บอกผลลัพธ์มาเลย ไม่แนบว่า ข้อไหนที่เราเลือกมาด้วย UI เลยไม่รู้ว่า ข้อที่เลือก คือ ข้อไหน
  quizAnswerFeedback(choices, selectedIndex) {
    const button = this.choices.children;
    // Disable all choices
    Array.from(button).forEach((btn) => (btn.disabled = true));
    // Highlight selected choice
    const selectedChoice = choices[selectedIndex];
    if (selectedChoice.correct) {
      button[selectedIndex].classList.add("correctChoose");
    } else {
      button[selectedIndex].classList.add("wrongChoose");
    }
  }

  showHangman(hint, word) {
    // Display : hide quiz & show hangman
    this.quiz.hidden = true;
    this.hangman.hidden = false;

    this.hint.innerText = hint;
    this.createHangmanParts();
    this.updateHangmanVisual(0);
    // Create initial guess space display for answering hangman answer
    const guessSpace = word.split("").map((ch) => (ch === " " ? " " : "_"));
    this.updateWordDisplay(guessSpace);
  }

  updateWordDisplay(guessWord) {
    this.hangmanAnswer.innerHTML = "";
    guessWord.forEach((character) => {
      const span = document.createElement("span");
      span.innerText = character;

      if (character === " ") {
        span.classList.add("spacebar");
      }

      this.hangmanAnswer.appendChild(span);
    });
  }

  createHangmanParts() {
    this.hangmanVisual.innerHTML = "";
    this.hangmanParts = [];
    const parts = [
      "/public/hangman0.png",
      "/public/hangman1.png",
      "/public/hangman2.png",
      "/public/hangman3.png",
      "/public/hangman4.png",
      "/public/hangman5.png",
      "/public/hangman6.png",
    ];
    parts.forEach((part, index) => {
      const img = document.createElement("img");
      img.src = part;
      img.alt = `hangman${index}`;
      img.dataset.index = index;
      img.classList.add("invisibleHangmanPart");

      this.hangmanVisual.appendChild(img);
      this.hangmanParts.push(img);
    });
  }

  updateHangmanVisual(mistakes) {
    this.hangmanParts?.forEach((part, index) => {
      if (index === mistakes) {
        return part.classList.remove("invisibleHangmanPart");
      } else {
        return part.classList.add("invisibleHangmanPart");
      }
    });
  }

  clearHangmanVisual() {
    this.hangmanParts?.forEach((part, index) => {
      part.classList.add("invisibleHangmanPart");
    });
  }

  showWin() {
    this.quiz.hidden = true;
    this.win.hidden = false;
  }

  showLose(word) {
    this.lose.hidden = false;
    this.hangmanCorrectAnswer.innerText = `"${word.join("")}"`;
  }

  resetGameScreen() {
    // Reset choosing topic
    Array.from(this.topic.children).forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("selectedTopic");
    });

    // Quiz : Quiz Description, Quiz & Choices
    // Quiz Description
    this.quizDesCate.innerText = "";
    this.quizDesNum.innerText = "";
    // Quiz & Choices
    this.question.innerText = "";
    this.choices.innerHTML = "";

    this.quiz.hidden = true;

    // Hangman
    this.hint.innerText = "";
    this.hangmanAnswer.innerHTML = "";
    this.hangmanVisual.innerHTML = "";
    this.hangmanParts = [];
    this.clearHangmanVisual();

    this.hangman.hidden = true;

    // Win/Lose
    this.win.hidden = true;
    this.lose.hidden = true;
  }
}
