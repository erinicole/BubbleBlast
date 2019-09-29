
class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.ctx = options.ctx;
    this.game = options.game;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  move() {
    this.vel = this.game.bounceBack(this.pos, this.vel)
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
}
export default MovingObject;
