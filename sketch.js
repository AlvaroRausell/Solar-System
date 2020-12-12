var planets = [];
var NUM_PLANETS = 0;
var NUM_STARS = 1000;
var G_CONST = 15;
var stars = [];
var dead_list = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(color("#575757"));
  planets.push(
    new Planet(
      createVector(width / 2, height / 2),
      100,
      createVector(random(-1, 1) * 5, 0),
      color("#f7bb00")
      // 120
    )
  );
  for (let i = 0; i < NUM_PLANETS; ++i) planets.push(new Planet());
  for (let i = 0; i < NUM_STARS; ++i)
    stars.push(createVector(random(width), random(height)));
  for (let i = 0; i < NUM_STARS; ++i) {
    strokeWeight(5);
    stroke(255, 255, 255, 100);

    point(stars[i].x, stars[i].y);
  }
}
function mousePressed() {
  planets.push(
    new Planet(
      createVector(mouseX, mouseY),
      30,
      createVector(random(-1, 1) * 600, 0),
      color("#8fc33b"),
      10
    )
  );
}
function keyPressed() {
  if (keyCode == ENTER) {
    planets.push(
      new Planet(
        createVector(mouseX, mouseY),
        30,
        createVector(random(-1, 1) * 500, 0),
        color("#5e73ff"),
        10
      )
    );
  } else if (keyCode == BACKSPACE) {
    bcolor = color("#575757");
    fill(bcolor);
    rect(-10, -10, width + 20, height + 20);
    for (let i = 0; i < NUM_STARS; ++i) {
      strokeWeight(5);
      stroke(255, 255, 255, 100);

      point(stars[i].x, stars[i].y);
    }
  }
}
function draw() {
  // if (random() < 0.01) {
  //   planets.push(
  //     new Planet(
  //       createVector(random(width), random(height)),
  //       random(10, 70),
  //       createVector(random(-1, 1) * 500, 0),
  //       color("#8fc33b"),
  //       random(2, 10)
  //     )
  //   );
  // }
  if (random() < 0.001) {
    planets.push(
      new Planet(
        createVector(random(width / 3, (2 * width) / 3), random(height)),
        random(10, 50),
        createVector(random(-1, 1) * 5, random(-1, 1) * 5),
        color(255)
        // random(10, 20)
      )
    );
  }
  bcolor = color("#575757");
  bcolor.setAlpha(100);
  fill(bcolor);
  rect(-10, -10, width + 20, height + 20);
  for (let i = 0; i < NUM_STARS; ++i) {
    strokeWeight(5);
    stroke(255, 255, 255, 100);

    point(stars[i].x, stars[i].y);
  }

  for (let i = 0; i < planets.length; ++i) {
    let planet = planets[i];
    let dead = planet.applyGravity(planets);
    if (dead) {
      planets.splice(i, 1);
      if (i > 0) --i;
    } else {
      planet.move();
      planet.show();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  starts = [];
  for (let i = 0; i < NUM_STARS; ++i)
    stars.push(createVector(random(width), random(height)));
}
