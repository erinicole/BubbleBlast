import MovingObject from "./moving_object";


class Blaster extends MovingObject {
  constructor(options = {}) {
    options.color = "magenta";
    options.radius = 50;
    options.pos = options.pos || options.game.randomPos();
    options.vel = [0, 0];
    super(options);
  }

  relocate() {
    this.pos = this.game.randomPos();
    this.vel = [0, 0];
  }
}

export default Blaster;
