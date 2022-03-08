import Phaser from 'phaser'
import Player from '../entities/Player'
import EnemiesGroup from '../groups/EnemiesGroup'

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
    const enemies = this.createEnemies(layers.enemySpawnPoints)

    // player colliders
    this.createPlayerColliders(player, {
      colliders: {
        platformCollision: layers.platformCollision
      }
    })
    // birdman enemy colliders
    this.createEnemyColliders(enemies, {
      colliders: {
        platformCollision: layers.platformCollision,
        player: player,
      }
    })

    this.createEndGoal(playerZones.end, player)
    this.setupFollowCamera(player)

    this.plotting = false
    this.graphics = this.add.graphics()
    this.line = new Phaser.Geom.Line()
    this.graphics.lineStyle(1, 0x00ff00)
    this.input.on('pointerdown', this.startDraw, this)
    this.input.on('pointerup', pointer => this.finishDraw(pointer, layers.platformLayer), this)


  }

  startDraw(pointer) {
    this.line.x1 = pointer.worldX
    this.line.y1 = pointer.worldY
    this.plotting = true
  }

  finishDraw(pointer, layer) {
    this.line.x2 = pointer.worldX
    this.line.y2 = pointer.worldY

    this.hits = layer.getTilesWithinShape(this.line)
    if(this.hits.length > 0) {
      this.hits.forEach(hit => {
        if(hit.index !== -1) {
          console.log('ray hit the platform')
        }
      })
    }
    
    this.graphics.clear()
    this.graphics.strokeLineShape(this.line)
    this.plotting = false
  }

  // map related methods

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
    const enemySpawnPoints = map.getObjectLayer('enemy_spawns')

    platformCollision.setCollisionByProperty({collides: true})
    return {envLayer, platformLayer, platformCollision, playerZones, enemySpawnPoints}
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

  // Player related methods

  createPlayer(start) {
    return new Player(this, start.x, start.y)
  }

  createPlayerColliders(player, {colliders}) {
    player.addCollider(colliders.platformCollision)
  }

  setupFollowCamera(target) {
    const { width, height, mapOffset, camZoom } = this.config
    this.physics.world.setBounds(0,0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0,0, width + mapOffset, height).setZoom(camZoom)
    this.cameras.main.startFollow(target)
  }

  // enemy related methods

  createEnemies(spawnPoints) {
    const enemies = new EnemiesGroup(this)
    const enemyTypes = enemies.getTypes()
    spawnPoints.objects.forEach(spawnPoint => {
      const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y)
      enemies.add(enemy)
    })

    return enemies
  }

  createEnemyColliders(enemies, {colliders}) {
    enemies.addCollider(colliders.platformCollision).addCollider(colliders.player)
  }

  update() {
    
    if(this.plotting) {
      const pointer = this.input.activePointer
      this.line.x2 = pointer.worldX
      this.line.y2 = pointer.worldY
      this.graphics.clear()
      this.graphics.strokeLineShape(this.line)
    }
    
  }
  
}