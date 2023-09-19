import Player from './Player.js';
import InputHandler from './InputHandler.js';
import UserInterface from './UserInterface.js';
import Slime from './Slime.js';
import Platform from './Platform.js';

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UserInterface(this);
    this.keys = [];
    this.enemies = [];
    this.platforms = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 500;
    this.gameOver = false;
    this.score = 0;
    this.winningScore = 10;
    this.gameTime = 0;
    this.timeLimit = 50000;

    this.debug = false;

    this.addPlatform(
      new Platform(0, this.height - 80, this.width, 120, '#905520')
    );
    this.addPlatform(new Platform(200, 300, 200, 20, '#905520'));
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime;
    }
    if (this.gameTime > this.timeLimit) {
      this.gameOver = true;
    }

    this.platforms.forEach((platform) => {
      const collisionDirection = this.checkCollision(this.player, platform);
      console.log(collisionDirection);
      if (collisionDirection === 'bottom') {
        this.player.onPlatformCollision(platform);
      }
    });

    this.player.update(deltaTime);
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) {
        this.ammo++;
      }
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.checkCollision(this.player, enemy)) {
        this.gameOver = true;
        enemy.markedForDeletion = true;
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives -= projectile.damage;
          projectile.markedForDeletion = true;
        }
      });
    });

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.lives <= 0) {
        enemy.markedForDeletion = true;
        if (!this.gameOver) {
          this.score += enemy.score;
        }
      }
      if (!enemy.markedForDeletion) {
        return enemy;
      }
    });

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }

    if (this.score >= this.winningScore) {
      this.gameOver = true;
    }
  }

  draw(context) {
    this.ui.draw(context);
    this.platforms.forEach((platform) => {
      platform.draw(context);
    });
    this.player.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }

  addEnemy() {
    this.enemies.push(new Slime(this));
  }

  addPlatform(platform) {
    this.platforms.push(platform);
  }

  checkCollision(object1, object2) {
    const dx = object1.x + object1.width / 2 - (object2.x + object2.width / 2);
    const dy =
      object1.y + object1.height / 2 - (object2.y + object2.height / 2);
    const width = (object1.width + object2.width) / 2;
    const height = (object1.height + object2.height) / 2;
    const crossWidth = width * dy;
    const crossHeight = height * dx;

    let collisionDirection = null;

    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        collisionDirection = crossWidth > -crossHeight ? 'top' : 'right';
      } else {
        collisionDirection = crossWidth > -crossHeight ? 'left' : 'bottom';
      }
    }

    return collisionDirection;
  }

  //   checkCollision(object1, object2) {
  //     return (
  //       object1.x < object2.x + object2.width &&
  //       object1.x + object1.width > object2.x &&
  //       object1.y < object2.y + object2.height &&
  //       object1.height + object1.y > object2.y
  //     );
  //   }

  //   checkCollision(object1, object2) {
  //     const dx = object1.x + object1.width / 2 - (object2.x + object2.width / 2);
  //     const dy =
  //       object1.y + object1.height / 2 - (object2.y + object2.height / 2);
  //     const width = (object1.width + object2.width) / 2;
  //     const height = (object1.height + object2.height) / 2;
  //     const crossWidth = width * dy;
  //     const crossHeight = height * dx;

  //     let collisionDirection = null;

  //     if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
  //       if (crossWidth > crossHeight) {
  //         collisionDirection = crossWidth > -crossHeight ? 'bottom' : 'left';
  //       } else {
  //         collisionDirection = crossWidth > -crossHeight ? 'right' : 'top';
  //       }
  //     }

  //     return collisionDirection;
  //   }
}
