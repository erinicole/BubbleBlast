import MovingObject from "./moving_object";
import { randomPos } from "./util";


class Blaster extends MovingObject {
  constructor(options = {}) {
    options.radius = 50;
    options.pos = options.pos || randomPos();
    options.vel = options.vel || [0, 0];
    super(options);
  }

  relocate() {
    this.pos = randomPos();
    this.vel = [0, 0];
  }

  power(impulse) {
    if ((this.vel[0] < 2 && impulse[0] > 0) || (this.vel[0] > -2 && impulse[0] < 0)) {
      this.vel[0] += impulse[0];
      console.log("hello");
    }
    if ((this.vel[1] < 2 && impulse[1] > 0) || (this.vel[1] > -2 && impulse[1] < 0)) {
      this.vel[1] += impulse[1];
    }
    // debugger;
  }
}

export default Blaster;
