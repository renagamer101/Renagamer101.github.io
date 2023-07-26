  // Set up canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Create particles
  var particles = [];
  for (var i = 0; i < 12; i++) {
    particles.push(new Particle());
  }
  
  // Define particle class
  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 3 + 1;
    this.directionX = Math.random() * 2 - 1;
    this.directionY = Math.random() * 2 - 1;
  }
  
  // Draw particles
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2);
      ctx.fillStyle = "#b3b3b3";
      ctx.fill();
      particles[i].x += particles[i].speed * particles[i].directionX;
      particles[i].y += particles[i].speed * particles[i].directionY;
      if (particles[i].x < 0 || particles[i].x > canvas.width) {
        particles[i].directionX = -particles[i].directionX;
      }
      if (particles[i].y < 0 || particles[i].y > canvas.height) {
        particles[i].directionY = -particles[i].directionY;
      }
    }
    requestAnimationFrame(draw);
  }
  
  draw();
