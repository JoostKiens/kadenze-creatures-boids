/**
 * Element with gravitational attraction
 * @param {Number} x coordinate
 * @param {Number} y coordinate
 * @param {Number} m mass
 */
function Attractor(x, y, m) {
  this.position = createVector(x, y)
  this.mass     = m || 1
  this.G        = 1

  // Calcluate the gravitational force thie element excerts on a
  // given particle
  this.calculateAttraction = function (p) {
    var force = p5.Vector.sub(this.position, p.position)
    var distance = force.mag()
    // Arbitrary constrains so the elements on which the force is applied don't fly off the screen
    distance = constrain(distance, 5, 25)
    force.normalize()
    // Gravitational pull
    // F = (G * m1 * m2) / distance squared
    var strength = (this.G * this.mass * p.mass) / (distance * distance)
    force.mult(strength)
    return force
  }
}
