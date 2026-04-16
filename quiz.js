class Question {
  constructor({
    id,
    category,
    question,
    choices,
    answerIndex,
    hangmanHint,
    hangmanAnswer,
    // hangmanAnswerDescription
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
    question: "Who painted Starry Night?",
    choices: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Edvard Munch",
      "Salvador Dali",
    ],
    answerIndex: 0,
    hangmanHint: "The city where the Starry Night museum is located.",
    hangmanAnswer: "New York",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art03",
    category: "Art",
    question: "Who painted The Persistence of Memory?",
    choices: ["Salvador Dali", "Pablo Picasso", "Claude Monet", "Rembrandt"],
    answerIndex: 0,
    hangmanHint: "The country where Salvador Dali was born.",
    hangmanAnswer: "Spain",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art04",
    category: "Art",
    question: "Who painted The Scream?",
    choices: [
      "Edvard Munch",
      "Vincent van Gogh",
      "Claude Monet",
      "Paul Cezanne",
    ],
    answerIndex: 0,
    hangmanHint: "The country where The Scream artist was from.",
    hangmanAnswer: "Norway",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art05",
    category: "Art",
    question: "Who painted Water Lilies?",
    choices: [
      "Claude Monet",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Henri Matisse",
    ],
    answerIndex: 0,
    hangmanHint: "The country where Claude Monet lived.",
    hangmanAnswer: "France",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art06",
    category: "Art",
    question: "Who painted Guernica?",
    choices: ["Pablo Picasso", "Salvador Dali", "Joan Miro", "Henri Matisse"],
    answerIndex: 0,
    hangmanHint: "The country where Picasso was born.",
    hangmanAnswer: "Spain",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art07",
    category: "Art",
    question: "Who sculpted David?",
    choices: ["Michelangelo", "Donatello", "Bernini", "Raphael"],
    answerIndex: 0,
    hangmanHint: "The city where the statue of David is located.",
    hangmanAnswer: "Florence",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art08",
    category: "Art",
    question: "Who painted The Night Watch?",
    choices: ["Rembrandt", "Vermeer", "Van Gogh", "Rubens"],
    answerIndex: 0,
    hangmanHint: "The city where The Night Watch is displayed.",
    hangmanAnswer: "Amsterdam",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art09",
    category: "Art",
    question: "Who painted Girl with a Pearl Earring?",
    choices: ["Johannes Vermeer", "Rembrandt", "Van Gogh", "Rubens"],
    answerIndex: 0,
    hangmanHint: "The city where this painting is displayed.",
    hangmanAnswer: "Hague",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art10",
    category: "Art",
    question: "Who painted The Birth of Venus?",
    choices: [
      "Sandro Botticelli",
      "Leonardo da Vinci",
      "Raphael",
      "Michelangelo",
    ],
    answerIndex: 0,
    hangmanHint: "The city where this painting is displayed.",
    hangmanAnswer: "Florence",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art11",
    category: "Art",
    question: "Who painted Campbell's Soup Cans?",
    choices: [
      "Andy Warhol",
      "Roy Lichtenstein",
      "Jackson Pollock",
      "Keith Haring",
    ],
    answerIndex: 0,
    hangmanHint: "The art style Andy Warhol is famous for.",
    hangmanAnswer: "Pop Art",
  }),
);
quizy.addQuestion(
  new Question({
    id: "art12",
    category: "Art",
    question: "Who painted American Gothic?",
    choices: ["Grant Wood", "Edward Hopper", "Andy Warhol", "Jackson Pollock"],
    answerIndex: 0,
    hangmanHint: "The country where the painting was made.",
    hangmanAnswer: "United States",
  }),
);

// History questions
quizy.addQuestion(
  new Question({
    id: "his01",
    category: "History",
    question: "Who was the first President of the United States?",
    choices: [
      "George Washington",
      "Abraham Lincoln",
      "Thomas Jefferson",
      "John Adams",
    ],
    answerIndex: 0,
    hangmanHint: "The capital city of the United States.",
    hangmanAnswer: "Washington",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his02",
    category: "History",
    question: "Where did the Titanic sink?",
    choices: [
      "Atlantic Ocean",
      "Pacific Ocean",
      "Indian Ocean",
      "Arctic Ocean",
    ],
    answerIndex: 0,
    hangmanHint: "The ocean where the Titanic sank.",
    hangmanAnswer: "Atlantic",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his03",
    category: "History",
    question: "Who discovered America?",
    choices: [
      "Christopher Columbus",
      "Ferdinand Magellan",
      "Marco Polo",
      "James Cook",
    ],
    answerIndex: 0,
    hangmanHint: "The country Columbus sailed for.",
    hangmanAnswer: "Spain",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his04",
    category: "History",
    question: "What wall divided Berlin?",
    choices: ["Berlin Wall", "Great Wall", "Hadrian's Wall", "Iron Curtain"],
    answerIndex: 0,
    hangmanHint: "The city where the wall was located.",
    hangmanAnswer: "Berlin",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his05",
    category: "History",
    question: "Who was known as the Maid of Orleans?",
    choices: [
      "Joan of Arc",
      "Marie Antoinette",
      "Catherine the Great",
      "Cleopatra",
    ],
    answerIndex: 0,
    hangmanHint: "The country Joan of Arc fought for.",
    hangmanAnswer: "France",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his06",
    category: "History",
    question: "Which empire built the Colosseum?",
    choices: [
      "Roman Empire",
      "Greek Empire",
      "Persian Empire",
      "Ottoman Empire",
    ],
    answerIndex: 0,
    hangmanHint: "The city where the Colosseum is located.",
    hangmanAnswer: "Rome",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his07",
    category: "History",
    question: "Who was the first man to walk on the moon?",
    choices: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    answerIndex: 0,
    hangmanHint: "The name of the space mission.",
    hangmanAnswer: "Apollo",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his08",
    category: "History",
    question: "Where were the pyramids built?",
    choices: ["Egypt", "Mexico", "Peru", "India"],
    answerIndex: 0,
    hangmanHint: "The river near the pyramids.",
    hangmanAnswer: "Nile",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his09",
    category: "History",
    question: "Who was the emperor of France?",
    choices: ["Napoleon", "Louis XVI", "Charlemagne", "Henry IV"],
    answerIndex: 0,
    hangmanHint: "The island where Napoleon was exiled.",
    hangmanAnswer: "Elba",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his10",
    category: "History",
    question: "Where did World War II end in Europe?",
    choices: ["Germany", "France", "Italy", "Poland"],
    answerIndex: 0,
    hangmanHint: "The capital city of Germany.",
    hangmanAnswer: "Berlin",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his11",
    category: "History",
    question: "Where was the Statue of Liberty built?",
    choices: ["USA", "France", "UK", "Germany"],
    answerIndex: 0,
    hangmanHint: "The city where the Statue of Liberty is located.",
    hangmanAnswer: "New York",
  }),
);
quizy.addQuestion(
  new Question({
    id: "his12",
    category: "History",
    question: "Where did World War II start?",
    choices: ["Europe", "Asia", "Africa", "America"],
    answerIndex: 0,
    hangmanHint: "The country that started World War II.",
    hangmanAnswer: "Nazi Germany",
  }),
);

// Stories questions
// quizy.addQuestion(
//   new Question({
//     id: "story01",
//     category: "Stories",
//     question: "Who wrote Harry Potter?",
//     choices: [
//       "J.K. Rowling",
//       "J.R.R. Tolkien",
//       "C.S. Lewis",
//       "George R.R. Martin",
//     ],
//     answerIndex: 0,
//     hangmanHint: "The school where Harry studies magic.",
//     hangmanAnswer: "Hogwarts",
//   }),
// );
// quizy.addQuestion(
//   new Question({
//     id: "story02",
//     category: "Stories",
//     question: "Who wrote The Hobbit?",
//     choices: ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "George Orwell"],
//     answerIndex: 0,
//     hangmanHint: "The creature Bilbo is.",
//     hangmanAnswer: "Hobbit",
//   }),
// );
// quizy.addQuestion(
//   new Question({
//     id: "story03",
//     category: "Stories",
//     question: "Who wrote Alice in Wonderland?",
//     choices: ["Lewis Carroll", "Roald Dahl", "Dr. Seuss", "Mark Twain"],
//     answerIndex: 0,
//     hangmanHint: "The place Alice falls into.",
//     hangmanAnswer: "Wonderland",
//   }),
// );
// quizy.addQuestion(
//   new Question({
//     id: "story04",
//     category: "Stories",
//     question: "Who wrote The Lion, the Witch and the Wardrobe?",
//     choices: ["C.S. Lewis", "J.R.R. Tolkien", "J.K. Rowling", "Roald Dahl"],
//     answerIndex: 0,
//     hangmanHint: "The magical land inside the wardrobe.",
//     hangmanAnswer: "Narnia",
//   }),
// );
// quizy.addQuestion(
//   new Question({
//     id: "story05",
//     category: "Stories",
//     question: "Who wrote Cinderella?",
//     choices: [
//       "Charles Perrault",
//       "Brothers Grimm",
//       "Hans Christian Andersen",
//       "Roald Dahl",
//     ],
//     answerIndex: 0,
//     hangmanHint: "The glass item Cinderella loses.",
//     hangmanAnswer: "Slipper",
//   }),
// );
// quizy.addQuestion(
//   new Question({
//     id: "story06",
//     category: "Stories",
//     question: "Who wrote Snow White?",
//     choices: [
//       "Brothers Grimm",
//       "Hans Christian Andersen",
//       "Charles Perrault",
//       "Roald Dahl",
//     ],
//     answerIndex: 0,
//     hangmanHint: "The place where the dwarfs live.",
//     hangmanAnswer: "Cottage",
//   }),
// );
// quizy.addQuestion(
//   new Question({
//     id: "story07",
//     category: "Stories",
//     question: "Who wrote Peter Pan?",
//     choices: ["J.M. Barrie", "C.S. Lewis", "J.R.R. Tolkien", "Roald Dahl"],
//     answerIndex: 0,
//     hangmanHint: "The place Peter Pan lives.",
//     hangmanAnswer: "Neverland",
//   }),
// );
quizy.addQuestion(
  new Question({
    id: "story08",
    category: "Stories",
    question: "Who wrote The Little Mermaid?",
    choices: [
      "Hans Christian Andersen",
      "Brothers Grimm",
      "Charles Perrault",
      "Dr. Seuss",
    ],
    answerIndex: 0,
    hangmanHint: "The place where the mermaid lives.",
    hangmanAnswer: "Ocean",
  }),
);
quizy.addQuestion(
  new Question({
    id: "story09",
    category: "Stories",
    question: "Who wrote Beauty and the Beast?",
    choices: [
      "Gabrielle-Suzanne Barbot",
      "Charles Perrault",
      "Brothers Grimm",
      "Hans Andersen",
    ],
    answerIndex: 0,
    hangmanHint: "The place where the Beast lives.",
    hangmanAnswer: "Castle",
  }),
);
quizy.addQuestion(
  new Question({
    id: "story10",
    category: "Stories",
    question: "Who wrote Pinocchio?",
    choices: ["Carlo Collodi", "Hans Andersen", "Brothers Grimm", "Roald Dahl"],
    answerIndex: 0,
    hangmanHint: "What Pinocchio is made of.",
    hangmanAnswer: "Wood",
  }),
);
quizy.addQuestion(
  new Question({
    id: "story11",
    category: "Stories",
    question: "Who wrote Peter Pan?",
    choices: ["J.M. Barrie", "C.S. Lewis", "J.R.R. Tolkien", "Roald Dahl"],
    answerIndex: 0,
    hangmanHint: "The magical place where Peter Pan lives.",
    hangmanAnswer: "Never Land",
  }),
);
quizy.addQuestion(
  new Question({
    id: "story12",
    category: "Stories",
    question: "Who wrote Aladdin?",
    choices: [
      "Anonymous",
      "Brothers Grimm",
      "Charles Perrault",
      "Hans Andersen",
    ],
    answerIndex: 0,
    hangmanHint: "The object that grants wishes.",
    hangmanAnswer: "Magic Lamp",
  }),
);
