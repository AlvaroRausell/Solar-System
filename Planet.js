var MAX_MASS = 100;
var MIN_MASS = 5;
class Planet {
  constructor(
    position = createVector(random(width), random(height)),
    mass = random(MIN_MASS, MAX_MASS),
    initial_force = null,
    colour = null,
    size = null
  ) {
    // TODO: Size according to mass?
    this.mass = mass;
    this.position = position;
    this.acceleration = createVector();
    this.velocity = createVector();
    this.size = size ? size : mass;
    // this.colour = color(random(100, 255), random(50), random(10));
    this.colour = colour ? colour : color(random(190, 255));
    this.max_force = 15;
    this.max_speed = speed;
    this.aoi = map(this.mass, 10, 100, this.mass, 2 * this.mass);
    if (initial_force) {
      this.applyForce(initial_force);
    } else {
      this.applyForce(
        createVector(
          random(-this.max_force, this.max_force),
          random(-this.max_force, this.max_force)
        )
      );
    }
  }
  applyForce(force) {
    force.div(this.mass);
    this.acceleration.add(force);
  }

  applyGravity(planets) {
    planets = planets.filter(
      (planet) =>
        dist(
          this.position.x,
          this.position.y,
          planet.position.x,
          planet.position.y
        ) <= planet.aoi &&
        this.mass <= planet.mass &&
        planet != this
    );
    for (let planet of planets) {
      let distance = dist(
        this.position.x,
        this.position.y,
        planet.position.x,
        planet.position.y
      );
      if (distance <= planet.size / 2 && this.mass <= planet.mass) {
        return true;
      }
      let force = p5.Vector.sub(planet.position, this.position);
      let magnitude = (G_CONST * (this.mass * planet.mass)) / distance ** 2;

      force.setMag(magnitude);
      this.applyForce(force);
    }
    return false;
  }

  move() {
    this.max_speed = speed;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.max_speed);
    this.position.add(this.velocity);
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
    // this.acceleration.mult(0);
  }

  show() {
    // resetMatrix();
    this.colour.setAlpha(255);
    stroke(this.colour);
    fill(this.colour);
    ellipse(this.position.x, this.position.y, this.size, this.size);
    noFill();
    this.colour.setAlpha(127);
    stroke(this.colour);
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, this.aoi * 2, this.aoi * 2);

    // translate(this.position.x, this.position.y);
    // // stroke(127, 0, 0, 100);
    // // line(0, 0, this.velocity.x * 100, this.velocity.y * 100);
    // stroke(0, 0, 127, 100);
    // line(0, 0, this.acceleration.x * 100, this.acceleration.y * 100);
  }
}
