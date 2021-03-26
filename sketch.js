/**
 * The flock has flocking behavior as in the session:
 * - alignment
 * - cohesion
 * - separation
 * It has one other steering force:
 * - pursuit
 *
 * The flock pursues the target, which itself has a gravitational attraction to the attractor
 * Sliders give the user the possibility to adjust:
 * - alignment
 * - cohesion
 * - alignment
 * - maxspeed
 * - pursuit
 * - force
 *
 * Clicking the canvas positions the target at the location of the mouse
 */
// Elements
var attractor
var flock
var target
// Sliders
var cohesionSlider
var separationSlider
var alignmentSlider
var pursuitSlider
var maxspeedSlider
var forceSlider
// Variable for backround alpha variation (trails)
var alphaOff

function setup() {

  var canvas = createCanvas(
    windowWidth,
    windowHeight - document.querySelector(".Controls").clientHeight
  );
  canvas.parent('canvas')
  alphaOff = random(100)

  // Initialize controls
  cohesionSlider    = createSlider(0, 5, 1, 0.1).parent('cohesion')
  separationSlider  = createSlider(0, 5, 1, 0.1).parent('separation')
  alignmentSlider   = createSlider(0, 3, 1, 0.1).parent('alignment')
  pursuitSlider     = createSlider(0, 5, 1, 0.1).parent('pursuit')
  maxspeedSlider    = createSlider(0, 4, 2, 0.1).parent('maxspeed')
  forceSlider       = createSlider(0, 0.1, 0.05, 0.001).parent('force')

  // Initialize elements
  flock     = new Flock()
  target    = new Target(width / 4, height / 4 , 2)
  attractor = new Attractor(width / 2, height / 2, 5)

  // Add 100 boids in the upper left corner with a random mass
  for (var i = 0; i < 100; i++) {
    var b = new Boid(100, 100, random(1, 4), target)
    flock.addBoid(b)
  }
}

function mouseClicked(e) {
  // Position target at mouse position if clicked on canvase
  // Note: velocity and acceleration are not impacted
  e.preventDefault()
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    target.position = createVector(mouseX, mouseY)
  }
}

function draw() {
  // Background alpha noise, shamelessly borrowed
  // from https://www.kadenze.com/coursework_field_entries/56397/view_runnable
   var backgroundAlpha = map(noise(alphaOff), 0, 1, 0, 14)
  background(0, backgroundAlpha)
  alphaOff += 0.05

  // Update target
  var force = attractor.calculateAttraction(target)
  target.applyForce(force)
  target.update()

  // Update flock
  flock.run()
}
