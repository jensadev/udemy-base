import Enemy from './Enemy'
import sprite from './assets/img/Slime/Idle-Run (44x30).png'

export default class Slime extends Enemy {
  constructor(game) {
    super(game)
    this.width = 44
    this.height = 30
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
    this.x = Math.random() * (this.game.width - (this.width - 100))
    this.image = new Image()
    this.image.src = sprite
    this.frameX = 0
    this.frameY = 0
    this.endFrameX = 7
  }
}
