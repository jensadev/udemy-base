export default class Enemy {
  constructor(game) {
    this.game = game
    this.x = this.game.width
    this.y = 0
    this.speedX = Math.random() * -1.5 - 0.5
    this.speedY = 0
    this.markedForDeletion = false
    this.lives = 5
    this.score = this.lives
    this.grounded = false
    this.collided = false
  }

  update() {
    this.x += this.speedX
    if (this.x < 0) this.markedForDeletion = true

    if (this.frameX < this.endFrameX) {
      this.frameX++
    } else {
      this.frameX = 0
    }

    if (!this.grounded) {
      this.speedY += this.game.gravity
    }

    this.y += this.speedY
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '20px Arial'
      context.fillText(this.lives, this.x, this.y - 5)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
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
      this.height
    )
  }

  onPlatformCollision(platform) {
    this.y = platform.y - this.height
    this.grounded = true
    this.speedY = 0
  }
}
