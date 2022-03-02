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
    const playerZones = this.getPlayerZones(layers.playerZones)
    const player = this.createPlayer(playerZones.start)


    this.createPlayerColliders(player, {
      colliders: {
        platformCollision: layers.platformCollision
      }
    })

    this.createEndGoal(playerZones.end, player)
    this.setupFollowCamera(player)

  }

  setupFollowCamera(target) {
    const { width, height, mapOffset, camZoom } = this.config
    this.physics.world.setBounds(0,0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0,0, width + mapOffset, height).setZoom(camZoom)
    this.cameras.main.startFollow(target)
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects //.objects seems to convert this from an object layer into an actual array
    return {
      start: playerZones.find(zone => zone.name === 'startZone'),
      end: playerZones.find(zone => zone.name === 'endZone')
    }
  }

  createEndGoal(endZone, player) {
    const endGoal = this.physics.add.sprite(endZone.x, endZone.y, 'end-star')
      .setSize(5, 50)
      .setOrigin(0.5, 1)
      .setAlpha(0.5)
    
    const onPlayerReachGoal = this.physics.add.overlap(player, endGoal, ()=> {
      onPlayerReachGoal.active = false
      console.log('level won!')
    })

    // TODO: create logic to only set end goal as active when x amount of diamonds have been collected, 
    // this should also set the alpha value of the star image to 1 to signify that it is active to the player
      
  }

  createPlayer(start) {
    return new Player(this, start.x, start.y)
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
    const playerZones = map.getObjectLayer('player_zones')

    platformCollision.setCollisionByProperty({collides: true})
    return {envLayer, platformLayer, platformCollision, playerZones}
  }
}