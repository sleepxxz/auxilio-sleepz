// login
document.getElementById("btnLogin").onclick = () => {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  if (u === "sleepz" && p === "7789") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("panel").style.display = "block";
    startBgEffect();
  } else {
    document.getElementById("msg").innerText = "Usuário ou senha incorretos!";
  }
};

// painel interativo
function toggleOptions(el, id) {
  const opt = document.getElementById(id);
  const open = opt.style.display === "block";
  opt.style.display = open ? "none" : "block";
  el.classList.toggle("open", !open);
}

function updatePrompt(cb, mod) {
  const cp = document.getElementById("commandPrompt");
  const msg = `${mod}${cb.checked ? " Ativado" : " Desativado"}`;
  const c = cb.checked ? "#39FF14" : "red";
  cp.innerHTML += `<span style="color:${c}">${msg}</span><br>`;
}

// fundo animado
function startBgEffect() {
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const particles = [];
  for (let i = 0; i < 80; i++)
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    });
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x,
          dy = p.y - q.y;
        if (Math.sqrt(dx * dx + dy * dy) < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(255,0,0,0.2)";
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  })();
}
