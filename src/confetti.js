/* confetti.js – fired on load by observing the hero section */
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let fired = false;

// GET THE PARENT CONTAINER (The .hero section)
const heroSection = document.querySelector('.hero'); 

// Set canvas size based on the hero section's dimensions
const setCanvasSize = () => {
  if (heroSection) {
    canvas.width = heroSection.clientWidth; 
    canvas.height = heroSection.clientHeight;
  }
};
setCanvasSize();
// IMPORTANT: Resize the canvas when the window or hero size changes
addEventListener('resize', setCanvasSize); 

const pieces = [];
const confettiColors = ['#CEAFEF', '#00FFA3', '#FFFFFF']; 

function create() {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height, 
    r: Math.random() * 3 + 2,
    d: Math.random() * .1 + 3,
    tilt: Math.random() * 10,
    color: confettiColors[Math.random() * confettiColors.length | 0]
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p, i) => {
    p.y += p.d;
    p.tilt += .1;
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    if (p.y > canvas.height+100) pieces.splice(i, 1); 
  });
  if (pieces.length) requestAnimationFrame(draw);
}

// Intersection Observer to fire confetti when the top of the page is visible
if (heroSection) {
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      for (let i = 0; i < 150; i++) create();
        setTimeout(() => {
            draw();
        }, 1000); // 3000 milliseconds = 3 seconds
        io.disconnect();
    }
  }, { threshold: 0.1 }); 
  
  io.observe(heroSection);
}