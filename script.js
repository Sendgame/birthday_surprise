let currentScreen = 1;
let musicPlaying = false;

function nextScreen(num) {
  document.getElementById("screen" + currentScreen).classList.remove("active");
  document.getElementById("screen" + num).classList.add("active");
  currentScreen = num;

  if (num === 4 || num === 6) {
    startConfetti();
  }
}

function blowCandle() {
  document.querySelector(".candle").innerHTML = "💨";
  document.getElementById("afterCandle").classList.remove("hidden");
  startConfetti();
}

function openGift() {
  document.querySelector(".gift").innerHTML = "💝";
  document.getElementById("giftText").classList.remove("hidden");
  document.getElementById("afterGift").classList.remove("hidden");
  startConfetti();
}

function restart() {
  document.getElementById("screen" + currentScreen).classList.remove("active");
  document.getElementById("screen1").classList.add("active");
  currentScreen = 1;
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");

  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
  } else {
    music.play().catch(() => {
      alert("Add music.mp3 file in the same folder first.");
    });
    musicPlaying = true;
  }
}

/* Simple confetti animation */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function startConfetti() {
  pieces = [];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }
  animateConfetti();

  setTimeout(() => {
    pieces = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 3500);
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
    p.x += Math.sin(p.y * 0.03);
  });

  if (pieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}
