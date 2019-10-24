const width = require("../frontend/src/settings.js").width
const height = require("../frontend/src/settings.js").height
const MovingObject = require("./moving_object_model");


class Bubble extends MovingObject {
  constructor() {
    super();
    this.vel = this.randomVec(7);
    this.pos = this.randomPos();
    this.radius = 25;
    this.isCorrect = false;
    this.collidedBubble = false;
    this.collidedWall = false;
  }

  randomPos() {
    let posX = Math.random() * width;
    let posY = Math.random() * height;
    let pos = [posX, posY];
    return pos;
  }

  setAsCorrect() {
    this.isCorrect = true;
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
    if(this.pos[0] < 5 || this.pos[0] > width - 5 || this.pos[1] < 5 || this.pos[1] > height - 5){
      this.pos = this.randomPos();
    }
  }

  bounceBack() {
    if (this.collidedWall){
      return this.vel
    }
    this.collidedWall = true
    if (this.pos[0] < this.radius) {
      this.vel[0] = -this.vel[0];
    } else if (this.pos[0] > width - this.radius) {
      this.vel[0] = -this.vel[0];
    } else if (this.pos[1] < this.radius) {
      this.vel[1] = -this.vel[1];
    } else if (this.pos[1] > height - this.radius) {
      this.vel[1] = -this.vel[1];
    }
    setTimeout(() => {
      this.collidedWall = false;
    }, 200);
    return this.vel;
  }

  bubbleBounce(otherBubble) {
    if(this.collidedBubble){
      return
    }
    this.collidedBubble = true
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
    setTimeout(() => {
      this.collidedBubble = false;
    }, 200);
  }


}

module.exports = Bubble;