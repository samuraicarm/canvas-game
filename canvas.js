const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//creates player class which is a circle
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
}

//creates projecticle class that the player shoots
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//creates enemies class to shoot
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//sets  player position on the canvas
const positionX = canvas.width / 2;
const positionY = canvas.height / 2;

//draws player on canvas
const player = new Player(positionX, positionY, 12, "white");

//create an array to draw a group of projectiles at the same time
//loop through our animate loop
const projectiles = [];

//create an array of enemies
//loop through our enemyloop
const enemies = [];

//create an enemy every second
//this is what we would want to change based on the music
//angle and velocity move enemy to player
//generate enemies randomly sizes of the screen
function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (15 - 4) + 4;
    //if statement determines where enemy comes from
    // x if spawn from left, y should be any where from full canvas height, if spawn is from y, x should be any where from full canvas width
    let x;
    let y;

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = "green";
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
  console.log(enemies);
}

//runs animation for projecticle and enemies
function animate() {
  requestAnimationFrame(animate);
  //clears canvas and redraws player after every shot
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  //draws a new projectile from player to position of mouse click for each projectile in the projectile array
  projectiles.forEach((projectile) => {
    projectile.update();
  });
  //draws new enemy on screen based on enemy array
  enemies.forEach((enemy) => {
    enemy.update();
  });
}

//listens for mouse event to shoot projecticle, spawn from center, projectile created based on mouse position, pushed in to projecticle array
addEventListener("click", (event) => {
  console.log(event);
  //get angle, put in atan2(), get x and y velocities
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 2, "red", velocity)
  );
});

animate();
spawnEnemies();
