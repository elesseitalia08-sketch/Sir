// Canvas setup for particles and fireworks
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Particle setup
const particlesArray = [];
const particleCount = 400;

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > width) this.speedX = -this.speedX;
    if(this.y < 0 || this.y > height) this.speedY = -this.speedY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

// Initialize particles
for(let i=0;i<particleCount;i++){
  particlesArray.push(new Particle());
}

// Firework particle class
class Firework {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for(let i=0;i<30;i++){
      this.particles.push(new ParticleExplosion(x,y));
    }
  }
  draw() {
    this.particles.forEach(p => p.updateAndDraw());
  }
}

class ParticleExplosion {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 2;
    this.speedX = Math.random()*6 - 3;
    this.speedY = Math.random()*6 - 3;
    this.color = `hsl(${Math.random()*360},100%,50%)`;
    this.alpha = 1;
    this.decay = Math.random()*0.03+0.01;
  }
  updateAndDraw() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.decay;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(this.alpha,0);
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

let fireworks = [];

// Animate everything
function animate() {
  // trails
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0,0,width,height);

  // update particles
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  // random fireworks
  if(Math.random()<0.02){
    fireworks.push(new Firework(Math.random()*width, Math.random()*height/2));
  }

  fireworks.forEach(fw => fw.draw());

  requestAnimationFrame(animate);
}

animate();

// Statistical symbols
const symbolsContainer = document.getElementById('stats-symbols');
const statsSymbols = ['Σ','μ','σ','π','θ','λ','Ω','x̄','p','χ²','ρ'];
const symbolCount = 50;
const symbolObjects = [];

class StatSymbol {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('stat-symbol');
    this.el.innerText = statsSymbols[Math.floor(Math.random()*statsSymbols.length)];
    symbolsContainer.appendChild(this.el);
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random()*30 + 20;
    this.speedX = Math.random()*2 - 1;
    this.speedY = Math.random()*2 - 1;
    this.angle = Math.random()*360;
    this.rotationSpeed = Math.random()*2 - 1;
    this.el.style.fontSize = this.size + 'px';
    this.el.style.color = `hsl(${Math.random()*360},100%,50%)`;
    this.update();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.rotationSpeed;
    if(this.x < 0) this.x = window.innerWidth;
    if(this.x > window.innerWidth) this.x = 0;
    if(this.y < 0) this.y = window.innerHeight;
    if(this.y > window.innerHeight) this.y = 0;
    this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.angle}deg)`;
  }
}

for(let i=0;i<symbolCount;i++){
  symbolObjects.push(new StatSymbol());
}

function animateSymbols() {
  symbolObjects.forEach(s => s.update());
  requestAnimationFrame(animateSymbols);
}

animateSymbols();

// Handle resize
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
