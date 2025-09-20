Qual questions = [
  {
    text: "ciao Qual è il colore del cielo in una giornata serena?",
    answers: [
      { text: "Blu", correct: true },
      { text: "Verde", correct: false, hint: "Pensa al mare, ma più in alto!" },
      { text: "Rosso", correct: false, hint: "Rosso solo al tramonto..." }
    ]
  },
  {
    text: "Quanto fa 2 + 2?",
    answers: [
      { text: "3", correct: false, hint: "Un po' di più!" },
      { text: "4", correct: true },
      { text: "5", correct: false, hint: "Troppo alto!" }
    ]
  },
  {
    text: "Quale animale fa 'miao'?",
    answers: [
      { text: "Cane", correct: false, hint: "Quello abbaia." },
      { text: "Gatto", correct: true },
      { text: "Mucca", correct: false, hint: "Quella fa 'muuu'!" }
    ]
  }
];

const quizDiv = document.getElementById("quiz");

questions.forEach((q, i) => {
  const box = document.createElement("div");
  box.className = "question-box";
  if (i === 0) box.classList.add("active");

  const qText = document.createElement("h2");
  qText.textContent = q.text;
  box.appendChild(qText);

  const hint = document.createElement("div");
  hint.className = "hint";
  box.appendChild(hint);

  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.text;
    btn.onclick = () => {
      if (a.correct) {
        box.classList.remove("active");
        if (i + 1 < questions.length) {
          quizDiv.children[i + 1].classList.add("active");
        } else {
          document.getElementById("congrats").style.display = "block";
        }
      } else {
        hint.textContent = a.hint || "Risposta sbagliata, riprova!";
        // Aggiungi la classe per l'animazione e il bordo
        btn.classList.add("wrong-answer");
        // Rimuovi la classe dopo un breve ritardo
        setTimeout(() => {
          btn.classList.remove("wrong-answer");
        }, 500);
      }
    };
    box.appendChild(btn);
  });

  quizDiv.appendChild(box);
});

// 🎊 Effetto coriandoli (Nessuna modifica)
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function Confetto() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height - canvas.height;
  this.size = Math.random() * 8 + 4;
  this.speed = Math.random() * 3 + 2;
  this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
  this.tilt = Math.random() * 10 - 10;
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.size, c.size / 2, c.tilt, 0, 2 * Math.PI);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.speed;
    c.x += Math.sin(c.y * 0.05);
    if (c.y > canvas.height) confetti[i] = new Confetto();
  });
  requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  confetti = Array.from({ length: 200 }, () => new Confetto());
  drawConfetti();
}
