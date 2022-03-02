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
  }

  init(setSizeX, setSizeY, setOffsetX, setOffsetY) {
    this.gravityValue = 400
    this.enemySpeed = 200
    
    
    this.body.setGravityY(this.gravityValue)
    this.setCollideWorldBounds(true)
    this.setSize(this.setSizeX, this.setSizeY)
    this.setOffset(this.setOffsetX, this.setOffsetY)
    this.setOrigin(0.5,1)
    this.setImmovable(true)
  }

}