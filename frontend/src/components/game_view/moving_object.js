class MovingObject {
  constructor(options) {
    this.pos = options.pos;
      pos: pos,
      vel: vel,
      radius: radius,
      color: color,
      ctx: ctx,
      game: game
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  move() {
    this.pos = this.game.wrap(this.pos);
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
}
export default MovingObject;
