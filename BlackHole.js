class BlackHole extends Planet {
  constructor(position) {
    super(position, 5000, createVector(0, 0), color(0), 100);
  }

  show() {
    stroke(255);
    super.show();
  }
}
