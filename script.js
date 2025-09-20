const quizContainer = document.getElementById("quiz");
const congratsBox = document.getElementById("congrats");
const startScreen = document.getElementById("start-screen");

let currentQuestion = 0;

function startQuiz() {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  currentQuestion = 0;
  showQuestion(currentQuestion);
}

function showQuestion(index) {
  if (index >= questions.length) {
    quizContainer.style.display = "none";
    congratsBox.style.display = "block";
    return;
  }

  const q = questions[index];
  quizContainer.innerHTML = `
    <div class="question-box active">
      <h2>${q.question}</h2>
      ${q.answers
        .map(
          (a, i) => `<button onclick="checkAnswer(${i})">${a}</button>`
        )
        .join("")}
      <div class="hint" id="hint">${q.hint}</div>
    </div>
  `;
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  if (selected === q.correct) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    document.getElementById("hint").style.display = "block";
  }
}
