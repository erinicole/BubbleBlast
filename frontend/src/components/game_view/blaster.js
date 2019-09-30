import MovingObject from "./moving_object";


class Blaster extends MovingObject {
  constructor(options = {}) {
    options.color = "magenta";
    options.radius = 18;
    options.pos = options.pos || options.game.randomPos();
    options.vel = [0, 0];
    super(options);
  }
}

export default Blaster;
