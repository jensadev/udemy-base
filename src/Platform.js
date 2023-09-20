export default class Platform {
  constructor(game, x, y, width, height, color) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  update(deltaTime) {}

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.fillStyle = 'black';
    }
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
