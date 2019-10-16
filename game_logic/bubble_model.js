const width = require("../frontend/src/settings.js").width
const height = require("../frontend/src/settings.js").height
const MovingObject = require("./moving_object_model");


class Bubble extends MovingObject {
  constructor() {
    super();
    this.vel = this.randomVec(7);
    this.pos = this.randomPos();
    this.radius = 25;
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
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }

  move() {
    this.vel = this.bounceBack();
    super.move();
  }

  bounceBack() {
    if (this.pos[0] < 0) {
      this.vel[0] = -this.vel[0];
    } else if (this.pos[0] > width) {
      this.vel[0] = -this.vel[0];
    } else if (this.pos[1] < 0) {
      this.vel[1] = -this.vel[1];
    } else if (this.pos[1] > height) {
      this.vel[1] = -this.vel[1];
    }
    return this.vel;
  }

  bubbleBounce(otherBubble) {
    if( (this.vel[0] < 0 && otherBubble.vel[0] > 0) 
      || (this.vel[0] > 0 && otherBubble.vel[0] < 0) ){
        this.vel[0] = -this.vel[0]
        otherBubble.vel[0] = -otherBubble.vel[0]
    } 
    if ((this.vel[1] < 0 && otherBubble.vel[1] > 0) 
      || (this.vel[1] > 0 && otherBubble.vel[1] < 0)){
        this.vel[1] = -this.vel[1]
        otherBubble.vel[1] = -otherBubble.vel[1]
    }
  }


}

module.exports = Bubble;