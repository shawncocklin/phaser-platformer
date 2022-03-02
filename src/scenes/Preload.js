import Phaser from 'phaser'
import crytsalMap from '../../assets/crystalMap.json'
import tileset1 from '../../assets/main_lev_build_1.png'
import playerMovement from '../../assets/player/move_sprite_1.png'
import endStar from '../../assets/star.png'
import enemy1 from '../../assets/enemy/enemy_sheet.png'


export default class Preload extends Phaser.Scene {
  constructor(config) {
    super('Preload', config)

  }

  preload() {
    this.load.image('tileset1', tileset1)
    this.load.tilemapTiledJSON('crystal-map', crytsalMap)

    this.load.spritesheet('player', playerMovement, {
      frameWidth: 32,
      spacing: 32,
      frameHeight: 38,
    })
    this.load.spritesheet('birdman', enemy1, {
      frameWidth: 64,
      spacing: 32,
      frameHeight: 64,
    })
    this.load.image('end-star', endStar)
  }

  create() {
    this.scene.start('GameScene')
  }
}