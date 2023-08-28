export default class UserInterface {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Arial';
        this.color = 'white';
    }

    draw (context) {
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        // score
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.fillText(`Score: ${this.game.score}`, 20, 40);

        // ammo
        for (let i = 0; i < this.game.ammo; i++) {
            context.fillRect(20 + 5 * i, 50, 3, 20);
        }

        // timer
        context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}`, 20, 100);

        if (this.game.gameOver) {
            context.textAlign = 'center';
         
            let msg1, msg2;

            if (this.game.score >= this.game.winningScore) {
                msg1 = 'You Win!';
                msg2 = 'Press Enter to Play Again';
            } else {
                msg1 = 'Game Over';
                msg2 = 'Press Enter to Try Again';
            }
            context.font = `50px ${this.fontFamily}`;
            context.fillText(msg1, this.game.width / 2, this.game.height / 2 - 20);
            context.font = `${this.fontSize}px ${this.fontFamily}`;
            context.fillText(msg2, this.game.width / 2, this.game.height / 2 + 20);
        }

        context.restore();
    }
}