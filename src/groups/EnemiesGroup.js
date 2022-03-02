import Phaser from 'phaser'
import collidable from '../mixins/collidable'
import {ENEMY_TYPES} from '../types/index'


export default class EnemiesGroup extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene)

    // pulls all values from the source object and adds them to 'this' context
    Object.assign(this, collidable)
  }

  getTypes() {
    return ENEMY_TYPES
  }
}