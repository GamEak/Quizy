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
  
});
