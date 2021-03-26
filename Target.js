/**
 * Element which the boids pursue,
 * Target itself is invisible
 * @param {Number} x coordinate
 * @param {Number} y coordinate
 * @param {Number} m mass
 */
function Target(x, y, m) {
  this.position     = createVector(x, y)
  this.velocity     = createVector(random(-1, 1), random(-1, 1))
  this.acceleration = createVector(0, 0)
  this.maxspeed     = 4
  this.mass         = m

  // 2nd law of Newton
  // a = F / m
  this.applyForce = function (force) {
    this.acceleration.add(force.copy().div(this.mass))
  }

  // Update position, based on velocity & acceleration
  this.update = function () {
    this.position = this.position.add(this.velocity.add(this.acceleration))
    // Reset accelaration
    this.acceleration.set(0, 0)
  }
}
