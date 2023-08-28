export default class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
        this.lives = 5;
        this.score = this.lives;
    }

    update () {
        this.x += this.speedX;
        if (this.x < 0) this.markedForDeletion = true;

        if (this.frameX < this.endFrameX) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }

    draw (context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText(this.lives, this.x, this.y - 5);
        }

        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height);
    }
}