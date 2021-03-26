/**
 * Flock constructor, only manages the array of boids
 */
function Flock() {
  // An array for all the boids
  this.boids = []

  // Calls run method on each boid with the entire list of boid passed
  this.run = function () {
    this.boids.forEach(function (boid) {
      boid.run(this.boids)
    }.bind(this))
  }

  this.addBoid = function (boid) {
    this.boids.push(boid)
  }
}
