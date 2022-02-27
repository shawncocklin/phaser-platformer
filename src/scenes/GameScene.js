import Phaser from 'phaser'
import Player from '../entities/Player'

export default class GameScene extends Phaser.Scene {
  constructor(config) {
    super('GameScene', config)

    this.config = config
  }
  
  create() {
    const map = this.createMap()
    const layers = this.createLayers(map)
    const player = this.createPlayer()

    this.createPlayerColliders(player, {
      colliders: {
        platformCollision: layers.platformCollision
      }
    })

    this.setupFollowCamera(player)

  }

  setupFollowCamera(target) {
    const { width, height, mapOffset, camZoom } = this.config
    this.physics.world.setBounds(0,0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0,0, width + mapOffset, height).setZoom(camZoom)
    this.cameras.main.startFollow(target)
  }

  createPlayer() {
    return new Player(this, 100, 250)
  }

  createPlayerColliders(player, {colliders}) {
    player.addCollider(colliders.platformCollision)
  }

  createMap() {
    const map = this.make.tilemap({key: 'crystal-map'})
    map.addTilesetImage('main_lev_build_1', 'tileset1')
    return map
  }

  createLayers(map) {
    // order in the code will affect the rendering order
    const tileset = map.getTileset('main_lev_build_1')
    const platformCollision = map.createLayer('platformCollision', tileset)
    const platformLayer = map.createLayer('platforms', tileset)
    const envLayer = map.createLayer('environment', tileset)

    platformCollision.setCollisionByProperty({collides: true})
    return {envLayer, platformLayer, platformCollision}
  }
}