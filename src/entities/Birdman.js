import Enemy from './Enemy'
import initAnims from './enemyAnimations'


export default class Birdman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'birdman')

    this.setSizeX = 42
    this.setSizeY = 45
    this.setOffsetX = 6
    this.setOffsetY = 20

    initAnims(this.scene.anims)
    super.init(this.setSizeX, this.setSizeY, this.setOffsetX, this.setOffsetY)
  }

  update(time, delta) {
    super.update(time, delta)
    this.play('birdman-idle', true)
  }

}