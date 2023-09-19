export default class Background {
  constructor(game) {
    this.game = game;
    this.width = game.width;
    this.height = game.height;
    this.x = 0;
    this.y = 0;
    this.color = '#000000';
  }

  update(deltaTime) {}

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
