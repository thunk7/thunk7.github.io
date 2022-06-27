'use strict';

//setup
const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');

let food = 0;
let plastic = 0;
let gameFrame = 0;
let gameSpeed = 1;
let stopGame = false;

context.font = '22px Poppins';

//input
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    move: false
}

canvas.addEventListener('mousemove', function(event) {
    mouse.move = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener('mouseout', function(_event) {
    mouse.move = false;
});

//player
const playerLeft = new Image();
playerLeft.src = 'assets/spritesheets/fish_swim_left.png';

const playerRight = new Image();
playerRight.src = 'assets/spritesheets/fish_swim_right.png';

class Player {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 30;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

        let theta = Math.atan2(dy, dx);
        this.angle = theta;

        if (mouse.x != this.x) {
            this.x -= dx / 30;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 30;
        }

        //sprite animation
        if (gameFrame % 5 == 0) {
            this.frame++;
            if (this.frame >= 12) this.frame = 0;
            if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
                this.frameX = 0;
            } else {
                this.frameX++;
            }
        }
    }
    draw() {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        if (this.x >= mouse.x) {
            context.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth / 4,
                this.spriteHeight / 4);
        } else {
            context.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth / 4,
                this.spriteHeight / 4);
        }
        context.restore();
    }
}
const player = new Player();

//foodstuffs
const foodArray = [];

const foodImage1 = new Image();
foodImage1.src = 'assets/images/mealworm.png';

const foodImage2 = new Image();
foodImage2.src = 'assets/images/bubble.png';

const eatFood1 = document.createElement('audio');
eatFood1.src = 'assets/sounds/eat1.ogg';

const eatFood2 = document.createElement('audio');
eatFood2.src = 'assets/sounds/eat2.wav';

class Food {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.count = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw() {
        context.drawImage(foodImage1, this.x - 20, this.y - 20, this.radius * 1.5, this.radius * 1.5);
        context.drawImage(foodImage2, this.x - 45, this.y - 45, this.radius * 3, this.radius * 3);
    }
}

function randomPlastic() {
    return Math.random().toFixed() * (1 - 0) + 0;
}

function makeFood() {
    if (gameFrame % 50 == 0) {
        foodArray.push(new Food());
    }
    //check collision with player
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].update();
        foodArray[i].draw();
        if (foodArray[i].distance < foodArray[i].radius + player.radius) {
            if (!foodArray[i].count) {
                if (foodArray[i].sound == 'sound1') {
                    eatFood1.play();
                } else {
                    eatFood2.play();
                }
                food++;
                plastic += randomPlastic();
                if (plastic >= 20) {
                    gameOver2();
                }
                foodArray[i].count = true;
                foodArray.splice(i, 1);
                i--;
            }
        }
    }
    for (let i = 0; i < foodArray.length; i++) {
        if (foodArray[i].y < 0 - foodArray[i].radius * 2) {
            foodArray.splice(i, 1);
            i--;
        }
    }
}

//backgrounds
const background = new Image();
background.src = 'assets/backgrounds/background' + Math.floor(Math.random() * 3) + '.jpg';

function drawBackground() {
    let scale = Math.max(canvas.width / background.width, canvas.height / background.height);
    let x = (canvas.width / 2) - (background.width / 2) * scale;
    let y = (canvas.height / 2) - (background.height / 2) * scale;
    context.drawImage(background, x, y, background.width * scale, background.height * scale);
}

//enemies
const enemyImage1 = new Image();
enemyImage1.src = 'assets/spritesheets/enemy1.png';

const enemyImage2 = new Image();
enemyImage2.src = 'assets/spritesheets/enemy2.png';

const enemyImage3 = new Image();
enemyImage3.src = 'assets/spritesheets/enemy3.png';

class Enemy {
    constructor() {
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 100;
        this.radius = 40;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 418;
        this.spriteHeight = 397;
    }
    draw1() {
        context.drawImage(enemyImage1, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.x - 40, this.y - 40, this.spriteWidth / 5,
            this.spriteHeight / 5);
    }
    draw2() {
        context.drawImage(enemyImage2, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.x - 40, this.y - 40, this.spriteWidth / 5,
            this.spriteHeight / 5);
    }
    draw3() {
        context.drawImage(enemyImage3, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.x - 40, this.y - 40, this.spriteWidth / 5,
            this.spriteHeight / 5);
    }
    update() {
        this.x -= this.speed;
        if (this.x < 0 - this.radius * 2) {
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 100;
            this.speed = Math.random() * 2 + 2;
        }
        //sprite animation
        if (gameFrame % 5 == 0) {
            this.frame++;
            if (this.frame >= 12) this.frame = 0;
            if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
                this.frameX = 0;
            } else {
                this.frameX++;
            }
            if (this.frame < 3) this.frameY = 0;
            else if (this.frame < 7) this.frameY = 1;
            else if (this.frame < 11) this.frameY = 2;
            else this.frameY = 0;
        }
        //collision with player
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + player.radius) {
            gameOver1();
        }
    }
}

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();

function makeEnemies() {
    enemy1.draw1();
    enemy1.update();
    enemy2.draw2();
    enemy2.update();
    enemy3.draw3();
    enemy3.update();
}

function gameOver1() {
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(`You have been eaten by another fish, Your score is ${food}... press RETURN to play again, or BACKSPACE to return to the main page`, canvas.width / 2, canvas.height / 2);
    stopGame = true;
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter')
            window.location.reload();
        else if (event.key === 'Backspace') {
            document.location.replace('index.html');
        }
    });
}

function gameOver2() {
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(`You ate too much plastic :( Your final score is ${food}... press RETURN to play again, or BACKSPACE to return to the main page`, canvas.width / 2, canvas.height / 2);
    stopGame = true;
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter')
            window.location.reload();
        else if (event.key === 'Backspace') {
            document.location.replace('index.html');
        }
    });
}

function countScore() {
    context.fillStyle = 'white';
    context.textAlign = 'left';
    context.fillText(`Food: ${food}`, 10, 30);
    context.fillText(`Plastic: ${plastic}mg`, 10, 60);
}

//game loop
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    player.update();
    player.draw();
    makeFood();
    makeEnemies();
    countScore();
    gameFrame++;
    if (!stopGame) requestAnimationFrame(animate);
}
animate();

//handle reorienting the cursor on window resize
window.addEventListener('resize', function() {
    canvasPosition = canvas.getBoundingClientRect();
});