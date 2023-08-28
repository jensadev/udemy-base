import Projectile from './Projectile.js';
import sprite from './assets/img/Ninja Frog/Run (32x32).png';

export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 64;
        this.height = 64;
        this.x = 20;
        this.y = 100;
        this.speedY = 0;
        this.speedX = 0;
        this.maxSpeed = 4;
        this.projectiles = [];

        this.image = new Image();
        this.image.src = sprite;
        this.frameX = 0;
        this.frameY = 0;
        this.startFrameX = 0;
        this.endFrameX = 11;
        this.frameWidth = 32;
        this.frameHeight = 32;

        this.fps = 20;
        this.animationTimer = 0;
        this.animationInterval = 1000 / this.fps;
    }

    update(deltaTime) {
        // key direction
        if (this.game.keys.includes('ArrowUp')) {
            this.speedY = -this.maxSpeed;
        } else if (this.game.keys.includes('ArrowDown')) {
            this.speedY = this.maxSpeed;
        } else {
            this.speedY = 0;
        }
        if (this.game.keys.includes('ArrowLeft')) {
            this.speedX = -this.maxSpeed;
        } else if (this.game.keys.includes('ArrowRight')) {
            this.speedX = this.maxSpeed;
        } else {
            this.speedX = 0;
        }
        this.x += this.speedX;
        this.y += this.speedY;

        // animation
        if (this.animationTimer > this.animationInterval) {
            if (this.frameX < this.endFrameX) {
                this.frameX++;
            } else {
                this.frameX = this.startFrameX;
            }
            this.animationTimer = 0;
        } else {
            this.animationTimer += deltaTime;
        }

        // projectiles
        this.projectiles.forEach((projectile) => {
            projectile.update();
        });
        this.projectiles = this.projectiles.filter((projectile) => !projectile.markedForDeletion);
    }

    draw(context) {
        // context.fillStyle = 'green';
        // context.fillRect(this.x, this.y, this.width, this.height);

        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText(this.frameX, this.x, this.y - 5);
        }

        context.drawImage(
            this.image,
            this.frameX * this.frameWidth,
            this.frameY * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height);

        this.projectiles.forEach((projectile) => {
            projectile.draw(context);
        });
    }

shootTop() {
    if (this.game.ammo > 0) {
        this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
        this.game.ammo--;
    }
}

}