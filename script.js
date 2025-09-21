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
const API_URL = "https://script.google.com/macros/s/AKfycbz-OotjuN1QL38zCIP0uj6jzXI0XJRH0n07JqGiyAc-yKlhnHvtxWlOTUbPwYFNVIwpJw/exec"; // es: https://script.google.com/macros/s/.../exec

function showQuestion(index) {
  if (index >= questions.length) {
    quizContainer.style.display = "none";
    congratsBox.style.display = "block";

    // invio al backend Google Sheets
    fetch(API_URL, { method: "POST" })
      .then(res => res.json())
      .then(data => {
        console.log("Quiz completato! Totale completamenti:", data.total);
      })
      .catch(err => console.error("Errore:", err));

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

  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      checkAnswer(parseInt(btn.dataset.index));
    });
  });
}
