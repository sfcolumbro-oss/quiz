const quizContainer = document.getElementById("quiz");
const congratsBox = document.getElementById("congrats");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

let currentQuestion = 0;

// quando clicchi il bottone parte il quiz
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  congratsBox.style.display = "none";
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
          (a, i) => `<button class="answer-btn" data-index="${i}">${a}</button>`
        )
        .join("")}
      <div class="hint" id="hint">${q.hint}</div>
    </div>
  `;

  // aggiungiamo listener ai bottoni delle risposte
  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      checkAnswer(parseInt(btn.dataset.index));
    });
  });
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
