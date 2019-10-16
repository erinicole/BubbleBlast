import util from "./util"
import MovingObject from "./moving_object"

class Projectile extends MovingObject {
  constructor(options = {}) {
    options.color = "black";
    options.radius = 4;
    // options.speed = 15;
    super(options);
    this.width = 50;
    this.height = 50;
  }

  draw(pos) {
    if (!pos) {
      return;
    }
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(pos[0], pos[1], this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();

  }
}

 export default Projectile;

