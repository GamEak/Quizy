class Question {
  constructor({
    id,
    category,
    question,
    choices,
    answerIndex,
    hangmanHint,
    hangmanAnswer,
  }) {
    this.id = id;
    this.category = category;
    // Multiple-Choice
    this.question = question;
    this.choices = choices;
    this.answerIndex = answerIndex;
    // Hangman word guess
    this.hangmanHint = hangmanHint;
    this.hangmanAnswer = hangmanAnswer.toUpperCase().trim();
  }

  shuffleChoices() {
    // Create an array of choice objects
    const newChoices = this.choices.map((choice, i) => ({
      choice,
      correct: i === this.answerIndex,
    }));

    //  Shuffle choices
    for (let i = newChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newChoices[i], newChoices[j]] = [newChoices[j], newChoices[i]];
    }

    return newChoices;

    /* เวลาเช็คคำตอบ
    สมมติ User กดตัวเลือกที่ 1
    options[1].correct ถ้า true แปลว่า ตอบถูก

    Answer checking :
    If the user selects option 1
    options[1].correct === true → correct answer */
  }
}

class Quiz {
  constructor() {
    this.quiz = {};
  }

  addCategory({ icon, category, description }) {
    // Ensure the category doesn't already exist
    if (!this.quiz[category]) {
      this.quiz[category] = {
        icon,
        category,
        description,
        questions: [],
        correctQuestions: new Set(),
      };
    }
  }

  addQuestion(question) {
    // Ensure the added question is a Question instance
    if (!(question instanceof Question)) {
      throw new Error("Must add a Question object");
    }

    // Ensure the category exists before adding a question
    if (!this.quiz[question.category]) {
      throw new Error(
        `Category "${question.category}" does not exist. Add the category first.`,
      );
    }

    this.quiz[question.category].questions.push(question);
  }

  randomQuestion(topic) {
    const quizCategory = this.quiz[topic];
    // Return null if the category doesn't exist
    if (!quizCategory) return null;

    const questionList = quizCategory.questions;

    // Return null if the category has no questions
    if (!questionList.length) return null;

    // Prevent infinite loop if all questions have been correctly answered
    if (quizCategory.correctQuestions.size === questionList.length) return null;

    let question;

    // Keep picking random questions until we find an unused or incorrectly answered one
    do {
      const index = Math.floor(Math.random() * questionList.length);
      question = questionList[index];
    } while (quizCategory.correctQuestions.has(question));

    return question;
  }

  addCorrect(topic, question) {
    const quizCategory = this.quiz[topic];
    // Return null if the category doesn't exist
    if (!quizCategory) return null;

    quizCategory.correctQuestions.add(question);
  }

  win(topic, targetScores = 5) {
    return this.quiz[topic].correctQuestions.size === targetScores;
  }
}

//  Add categorys and questions
const quizy = new Quiz();

//  Add categorys
quizy.addCategory({
  icon: "🎨",
  category: "Art",
  description: "Artworks, artists, and styles.",
});
quizy.addCategory({
  icon: "🏛️",
  category: "History",
  description: "Past events and historical figures.",
});
quizy.addCategory({
  icon: "📖",
  category: "Stories",
  description: "Stories, novels, and writers.",
});

// Add questions
// Art questions
quizy.addQuestion(
  new Question({
    id: "art01",
    category: "Art",
    question: "Who painted the Mona Lisa?",
    choices: [
      "Leonardo da Vinci",
      "Vincent van Gogh",
      "Pablo Picasso",
      "Claude Monet",
    ],
    answerIndex: 0,
    hangmanHint: "The museum where the Mona Lisa is displayed.",
    hangmanAnswer: "Louvre",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art02",
    category: "Art",
    question: "Which artist painted The Starry Night?",
    choices: [
      "Vincent van Gogh",
      "Claude Monet",
      "Pablo Picasso",
      "Salvador Dalí",
    ],
    answerIndex: 0,
    hangmanHint: "The country where Van Gogh was born.",
    hangmanAnswer: "Netherlands",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art03",
    category: "Art",
    question:
      "Which artist is famous for the painting 'The Persistence of Memory'?",
    choices: [
      "Salvador Dalí",
      "Pablo Picasso",
      "Henri Matisse",
      "Edvard Munch",
    ],
    answerIndex: 0,
    hangmanHint: "The art movement Dalí belonged to.",
    hangmanAnswer: "Surrealism",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art04",
    category: "Art",
    question: "Which artist helped start the Cubism movement?",
    choices: [
      "Pablo Picasso",
      "Claude Monet",
      "Michelangelo",
      "Leonardo da Vinci",
    ],
    answerIndex: 0,
    hangmanHint: "The country where Picasso was born.",
    hangmanAnswer: "Spain",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art05",
    category: "Art",
    question: "Which artist painted many water lily paintings?",
    choices: ["Claude Monet", "Vincent van Gogh", "Rembrandt", "Edgar Degas"],
    answerIndex: 0,
    hangmanHint: "The art movement Monet helped lead.",
    hangmanAnswer: "Impressionism",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art06",
    category: "Art",
    question:
      "Which Renaissance artist painted the ceiling of the Sistine Chapel?",
    choices: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
    answerIndex: 0,
    hangmanHint: "The city where the Sistine Chapel is located.",
    hangmanAnswer: "Vatican",
  }),
);

// History questions
quizy.addQuestion(
  new Question({
    id: "history01",
    category: "History",
    question: "Who was the first President of the United States?",
    choices: [
      "George Washington",
      "Thomas Jefferson",
      "John Adams",
      "Abraham Lincoln",
    ],
    answerIndex: 0,
    hangmanHint: "The capital city of the United States.",
    hangmanAnswer: "Washington",
  }),
);
quizy.addQuestion(
  new Question({
    id: "history02",
    category: "History",
    question: "Which ancient civilization built the pyramids of Giza?",
    choices: ["Egyptians", "Romans", "Greeks", "Persians"],
    answerIndex: 0,
    hangmanHint: "The river that was important to ancient Egypt.",
    hangmanAnswer: "Nile",
  }),
);
quizy.addQuestion(
  new Question({
    id: "history03",
    category: "History",
    question: "Who was the famous queen of ancient Egypt?",
    choices: ["Cleopatra", "Elizabeth I", "Victoria", "Catherine"],
    answerIndex: 0,
    hangmanHint: "The empire Cleopatra was part of.",
    hangmanAnswer: "Egypt",
  }),
);
quizy.addQuestion(
  new Question({
    id: "history04",
    category: "History",
    question: "Which empire built the Colosseum?",
    choices: [
      "Roman Empire",
      "Greek Empire",
      "Ottoman Empire",
      "Persian Empire",
    ],
    answerIndex: 0,
    hangmanHint: "The city where the Colosseum is located.",
    hangmanAnswer: "Rome",
  }),
);
quizy.addQuestion(
  new Question({
    id: "history05",
    category: "History",
    question:
      "The Great Wall was built mainly to protect China from which group?",
    choices: ["Mongols", "Romans", "Vikings", "Persians"],
    answerIndex: 0,
    hangmanHint: "The country where the Great Wall is located.",
    hangmanAnswer: "China",
  }),
);
quizy.addQuestion(
  new Question({
    id: "history06",
    category: "History",
    question:
      "Who led the civil rights movement in the United States during the 1960s?",
    choices: [
      "Martin Luther King Jr.",
      "Malcolm X",
      "Rosa Parks",
      "Nelson Mandela",
    ],
    answerIndex: 0,
    hangmanHint:
      "The famous speech he delivered beginning with 'I Have a Dream'.",
    hangmanAnswer: "Dream",
  }),
);

// Stories questions
quizy.addQuestion(
  new Question({
    id: "stories01",
    category: "Stories",
    question: "Who wrote 'Harry Potter'?",
    choices: ["J.K. Rowling", "J.R.R. Tolkien", "C.S. Lewis", "Rick Riordan"],
    answerIndex: 0,
    hangmanHint: "The magical school Harry attends.",
    hangmanAnswer: "Hogwarts",
  }),
);
quizy.addQuestion(
  new Question({
    id: "stories02",
    category: "Stories",
    question: "Who wrote 'The Hobbit'?",
    choices: [
      "J.R.R. Tolkien",
      "C.S. Lewis",
      "George R.R. Martin",
      "J.K. Rowling",
    ],
    answerIndex: 0,
    hangmanHint: "The creature guarding treasure in the story.",
    hangmanAnswer: "Dragon",
  }),
);
quizy.addQuestion(
  new Question({
    id: "stories03",
    category: "Stories",
    question: "Which character's nose grows longer when he lies?",
    choices: ["Pinocchio", "Peter Pan", "Aladdin", "Cinderella"],
    answerIndex: 0,
    hangmanHint: "The man who created Pinocchio.",
    hangmanAnswer: "Geppetto",
  }),
);
quizy.addQuestion(
  new Question({
    id: "stories04",
    category: "Stories",
    question: "Who wrote 'Alice in Wonderland'?",
    choices: [
      "Lewis Carroll",
      "Roald Dahl",
      "Beatrix Potter",
      "Hans Christian Andersen",
    ],
    answerIndex: 0,
    hangmanHint: "The mysterious cat that appears and disappears.",
    hangmanAnswer: "Cheshire",
  }),
);
quizy.addQuestion(
  new Question({
    id: "stories05",
    category: "Stories",
    question: "Who wrote 'Romeo and Juliet'?",
    choices: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    answerIndex: 0,
    hangmanHint: "The Italian city where Romeo and Juliet lived.",
    hangmanAnswer: "Verona",
  }),
);
quizy.addQuestion(
  new Question({
    id: "stories06",
    category: "Stories",
    question: "Who wrote 'The Little Prince'?",
    choices: [
      "Antoine de Saint-Exupéry",
      "Victor Hugo",
      "Jules Verne",
      "Albert Camus",
    ],
    answerIndex: 0,
    hangmanHint: "The flower the prince loves.",
    hangmanAnswer: "Rose",
  }),
);
