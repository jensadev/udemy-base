import Platform from './Platform.js'

export default class Map {
  constructor (game) {
    this.game = game
    this.platforms = []
    this.width = game.width
    this.height = game.height

    this.setup()
  }

  update (deltaTime) {}

  draw (context) {
    this.platforms.forEach((platform) => {
      platform.draw(context)
    })
  }

  setup () {
    this.addPlatform(
      new Platform(this.game, 0, this.height - 80, this.width, 120, '#905520')
    )
    this.addPlatform(new Platform(this.game, 200, 300, 200, 20, '#905520'))
    this.addPlatform(new Platform(this.game, 400, 200, 200, 20, '#905520'))
    this.addPlatform(new Platform(this.game, 600, 100, 200, 20, '#905520'))
  }

  addPlatform(platform) {
    this.platforms.push(platform)
  }
}