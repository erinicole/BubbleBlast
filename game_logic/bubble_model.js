const width = require("../frontend/src/settings.js").width
const height = require("../frontend/src/settings.js").height

class Bubble {
  constructor() {
    this.vel = this.randomVec(7)
    this.pos = this.randomPos();
  }

  randomPos() {
    let posX = Math.random() * width;
    let posY = Math.random() * height;
    let pos = [posX, posY];
    return pos;
  }

  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return this.scale([Math.sin(deg), Math.cos(deg)], length);
  }
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }

  move() {
    this.vel = this.bounceBack(this.pos, this.vel);
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  bounceBack(pos, vel) {
    if (pos[0] < 0) {
      vel[0] = -vel[0];
    } else if (pos[0] > width) {
      vel[0] = -vel[0];
    } else if (pos[1] < 0) {
      vel[1] = -vel[1];
    } else if (pos[1] > height) {
      vel[1] = -vel[1];
    }
    return vel;
  }


}

module.exports = Bubble;