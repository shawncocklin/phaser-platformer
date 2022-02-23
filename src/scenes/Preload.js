import Phaser from 'phaser'
import crytsalMap from '../../assets/crystalMap.json'
import tileset1 from '../../assets/main_lev_build_1.png'
import playerMovement from '../../assets/player/move_sprite_1.png'


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
  }

  create() {
    this.scene.start('GameScene')
  }
}