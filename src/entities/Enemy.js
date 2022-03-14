import Phaser from 'phaser'
import collidable from '../mixins/collidable'


export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // pulls all values from the source object and adds them to 'this' context
    Object.assign(this, collidable)

    
    this.setSizeX = 0
    this.setSizeY = 0
    this.setOffsetX = 0
    this.setOffsetY = 0


    // this must go last
    this.init(this.setSizeX, this.setSizeY, this.setOffsetX, this.setOffsetY)
    this.initEvents()
  }

  init(setSizeX, setSizeY, setOffsetX, setOffsetY) {
    this.gravityValue = 400
    this.enemySpeed = 40
    this.rayGraphics = this.scene.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xaa00aa,
      }
    })
    
    this.body.setGravityY(this.gravityValue)
    this.setCollideWorldBounds(true)
    this.setSize(this.setSizeX, this.setSizeY)
    this.setOffset(this.setOffsetX, this.setOffsetY)
    this.setOrigin(0.5,1)
    this.setImmovable(true)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(time, delta) {
    this.setVelocityX(this.enemySpeed)
    const ray = this.raycast(this.body)

    this.rayGraphics.clear()
    this.rayGraphics.strokeLineShape(ray)
  }

  raycast(body, rayLength = 30) {
    const {x, y, halfWidth, halfHeight} = body
    const line = new Phaser.Geom.Line()

    line.x1 = x + halfWidth
    line.y1 = y + halfHeight
    line.x2 = line.x1 + rayLength
    line.y2 = line.y1 + rayLength

    return line

  }

}