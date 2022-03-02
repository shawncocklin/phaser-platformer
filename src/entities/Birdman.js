import Enemy from './Enemy'


export default class Birdman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'birdman')

    this.setSizeX = 42
    this.setSizeY = 45
    this.setOffsetX = 6
    this.setOffsetY = 20

    super.init(this.setSizeX, this.setSizeY, this.setOffsetX, this.setOffsetY)
  }

  

}