import Phaser from 'phaser'
import crytsalMap from '../../assets/crystalMap.json'
import tileset1 from '../../assets/main_lev_build_1.png'
import player from '../../assets/player/movements/idle01.png'


export default class Preload extends Phaser.Scene {
  constructor(config) {
    super('Preload', config)

  }

  preload() {
    this.load.image('tileset1', tileset1)
    this.load.tilemapTiledJSON('crystal-map', crytsalMap)
    this.load.image('player', player)
  }

  create() {
    this.scene.start('GameScene')
  }
}