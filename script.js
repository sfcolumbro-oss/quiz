function nextQuestion(num, correct) {
  if (correct) {
    document.getElementById("q" + num).classList.remove("active");
    let next = document.getElementById("q" + (num + 1));
    if (next) {
      next.classList.add("active");
    } else {
      document.getElementById("congrats").style.display = "block";
      launchConfetti();
    }
  }
}

function showHint(num) {
  document.getElementById("hint" + num).style.display = "block";
}

/* Effetto coriandoli */
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 150,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 10 - 10
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });
    update();
  }

  function update() {
    particles.forEach(p => {
      p.y += 2;
      p.x += Math.sin(p.d) * 0.5;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }
  loop();
}
