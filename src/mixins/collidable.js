


export default {
  addCollider(collision, callback) {
    // params (the context the collision is being applied to, the object being collided with, a callback to handle what should be happen when the two objects collide, a process callback(returns a bool, any bool value ignores the collision), the context to which to apply the callbacks)
    this.scene.physics.add.collider(this, collision, callback, null, this)
  }
}