



export default anims => {
  // run animation
  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player', {start: 11, end: 16}),
    frameRate: 10,
    repeat: -1
  })

  // idle animation
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player', {start: 0, end: 8}),
    frameRate: 10,
    repeat: -1
  })
}