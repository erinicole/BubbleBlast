const width = require("../../settings.js").width
const height = require("../../settings.js").height

class MovingObject {
  constructor(options) {
    this.dimX = width;
    this.dimY = height;
    this.pos = options.pos;
    this.radius = options.radius;
    this.color = options.color;
    this.ctx = options.ctx;
    this.bounceBack = this.bounceBack.bind(this);
  }


  draw(pos) {
    if (!pos) {
      return;
    }

    this.ctx.drawImage(this.image, pos[0], pos[1], this.width, this.height);
  }



  collideWith(otherObject) {
    //supposed to be the parent bubbles overwrites
  }

  isCollidedWith(otherObject) {
    let [x_1, y_1] = this.pos;
    let [x_2, y_2] = otherObject.pos;
    let dist = Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2);
    if (dist < this.radius + otherObject.radius) {
      return true;
    } else {
      return false;
    }
  }

  bounceBack(pos, vel) {
    if (pos[0] < 0) {
      vel[0] = -vel[0];
      // vel[1] = -vel[1];
    } else if (pos[0] > this.dimX) {
      vel[0] = -vel[0];
      // vel[1] = -vel[1];
    } else if (pos[1] < 0) {
      // vel[0] = -vel[0];
      vel[1] = -vel[1];
    } else if (pos[1] > this.dimY) {
      // vel[0] = -vel[0];
      vel[1] = -vel[1];
    }
    return vel;
  }
}
export default MovingObject;
