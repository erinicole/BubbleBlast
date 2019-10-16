const width = require("../../settings.js").width
const height = require("../../settings.js").height

class MovingObject {
  constructor(options) {
    this.dimX = width ;
    this.dimY = height;
    this.pos = options.pos;
    // this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.ctx = options.ctx;
 
    // this.game = options.game;
    this.bounceBack = this.bounceBack.bind(this)
  }

  draw(pos) {
    if (!pos) {
      return; 
    }
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(pos[0], pos[1], this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();

    // let grd = this.ctx.createRadialGradient(pos[0], pos[1], 20, pos[0] - 10, pos[1], 40);
    // grd.addColorStop(0, 'rgb(18, 18, 160)');
    // grd.addColorStop(1, 'rgba(18, 18, 160, 0.541)');
    // this.ctx.fillStyle = grd;
    // this.ctx.fill();


  }

  // move() {
  //   this.vel = this.bounceBack(this.pos, this.vel);
  //   this.pos[0] += this.vel[0];
  //   this.pos[1] += this.vel[1];
  // }

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
