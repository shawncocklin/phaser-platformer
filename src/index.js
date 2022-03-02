import Phaser from 'phaser'
import GameScene from './scenes/GameScene'
import Preload from './scenes/Preload'


const useDebugger = true

const MAP_WIDTH = 1600
const WIDTH = document.body.offsetWidth
const HEIGHT = 600
const CAM_ZOOM = 1.5

const SHARED_CONFIG = {
  // accounts for portion of map that is outside of the rendered space of the canvas
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  camZoom: CAM_ZOOM,
}

const Scenes = [Preload, GameScene]

const initScenes = () => Scenes.map(Scene => new Scene(SHARED_CONFIG))


const config = {
  ...SHARED_CONFIG,
  pixelArt: true,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: {y: 400},
      debug: useDebugger
    }
  },
  scene: initScenes()
}


const game = new Phaser.Game(config)