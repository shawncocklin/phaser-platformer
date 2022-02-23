import Phaser from 'phaser'
import Player from '../entities/Player'

export default class GameScene extends Phaser.Scene {
  constructor(config) {
    super('GameScene', config)

    
  }
  
  create() {
    const map = this.createMap()
    const layers = this.createLayers(map)
    const player = this.createPlayer()

    this.physics.add.collider(player, layers.platfromCollision)
  }

  createPlayer() {
    return new Player(this, 100, 250)
  }

  createMap() {
    const map = this.make.tilemap({key: 'crystal-map'})
    map.addTilesetImage('main_lev_build_1', 'tileset1')
    return map
  }

  createLayers(map) {
    // order in the code will affect the rendering order
    const tileset = map.getTileset('main_lev_build_1')
    const platfromCollision = map.createLayer('platfromCollision', tileset)
    const platformLayer = map.createLayer('platforms', tileset)
    const envLayer = map.createLayer('environment', tileset)

    platfromCollision.setCollisionByProperty({collides: true})
    return {envLayer, platformLayer, platfromCollision}
  }
}