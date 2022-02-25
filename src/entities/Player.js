import Phaser from 'phaser'
import animations from './playerAnimations'


export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.playerSpeed = 200
    this.playerGrav = 800
    this.jumpForce = -400
    this.jumpCount = 0
    this.maxJumps = 1
    // creates hotkeys for up, down, left, right, shift, and space
    this.playerInput = this.scene.input.keyboard.createCursorKeys() 

    // this must go last
    this.init()
    this.initEvents()
  }
  
  init() {
    this.body.setGravityY(this.playerGrav)
    this.setCollideWorldBounds(true)
    animations(this.scene.anims)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update() {
    this.movePlayer()
    this.playerJump()
    
  }

  playerJump() {
    const {space} = this.playerInput
    const spaceDown = Phaser.Input.Keyboard.JustDown(space)
    const onFloor = this.body.onFloor()

    if(spaceDown && (onFloor || this.jumpCount < this.maxJumps)) {
      this.setVelocityY(this.jumpForce)
      this.jumpCount++
    }
    
    if(onFloor) {
      this.jumpCount = 0
    }
    if(this.body.velocity.y !== 0) {
      this.play('jump', true)
    }
  }

  movePlayer() {
    const { left, right } = this.playerInput
    
    if(left.isDown) {
      this.flipX = true
      this.setVelocityX(-this.playerSpeed)
      this.play('run', true)
    } 
    else if(right.isDown) {
      this.flipX = false
      this.setVelocityX(this.playerSpeed)
      this.play('run', true)
    } 
    else {
      this.setVelocityX(0)
      this.play('idle', true)
    }
  }

  
}