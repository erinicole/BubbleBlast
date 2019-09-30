import MovingObject from "./moving_object";


class Blaster extends MovingObject {
  constructor(options = {}) {
    options.color = "pink";
    options.radius = 18;
    options.pos = options.pos || options.game.randomPos();
    options.vel = [0, 0];
    MovingObject.call(this, options);

    super(options);
  }
}

export default Blaster;
