import Bubble from "./bubble";
import {randomVec} from "./util";
import Blaster from "./blaster";
import Projectile from "./projectile"


class Game {
  constructor(ctx) {
    this.dimX = document.documentElement.clientWidth;
    this.dimY = document.documentElement.clientHeight;
    this.numBubbles = 4;
    this.numPlayers = 1;
    this.bubbles = [];
    this.ships = [];
    this.ctx = ctx;
    this.addBubbles();
    this.addBlasters();
  }

  addBubbles() {
    for (let i = 0; i < this.numBubbles; i++) {
      this.bubbles.push(
        new Bubble({ ctx: this.ctx, game: this })
        // new Bubble({ pos: this.randomPos(), ctx: this.ctx })
      );
    }
  }

  addBlasters() {
    const blaster = new Blaster({
      ctx: this.ctx,
      game: this
    });

    this.ships.push(blaster);
    // return blaster;
  }

  allObjects() {
    return [].concat(this.ships, this.bubbles);
  }

  randomPos() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    let posX = Math.random() * width;
    let posY = Math.random() * height;
    let pos = [posX, posY];
    return pos;
  }

  draw() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    this.ctx.clearRect(0, 0, width, height);
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      allObjects[i].draw(this.ctx);
    }
  }

  moveObjects() {
    for (let i = 0; i < this.bubbles.length; i++) {
      this.bubbles[i].move();
    }
  }

  bounceBack(pos, vel) {
    if (pos[0] < 0) {
      vel[0] = -vel[0];
      vel[1] = -vel[1];
    } else if (pos[0] > this.dimX) {
      vel[0] = -vel[0];
      vel[1] = -vel[1];
    } else if (pos[1] < 0) {
      vel[0] = -vel[0];
      vel[1] = -vel[1];
    } else if (pos[1] > this.dimY) {
      vel[0] = -vel[0];
      vel[1] = -vel[1];
    }
    return vel;
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
          // if (j < i) {
          //   if (this.allObjects[i].isCollidedWith(this.allObjects[j])) {
          //     this.allObjects[i].vel = randomVec(7);
          //     this.allObjects[j].vel = randomVec(7);
          //     return true;
          //   }
        }
      }
    }
    return false;
  }

  checkBubbleCollisions() {
    for (let i = 0; i < this.bubbles.length; i++) {
      for (let j = 0; j < this.bubbles.length; j++) {
          if (j < i) {
            if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
              this.bubbles[i].vel = randomVec(7);
              this.bubbles[j].vel = randomVec(7);
              return true;
            }
        }
      }
    }
    return false;
  }

  bubbleRicochet() {
    if (this.checkCollisions()) {
      const collided = this.checkCollisions();
      collided[0].options.vel = randomVec(7);
      collided[1].options.vel = randomVec(7);
    }
  }

  remove(object) {
    if (object instanceof Projectile) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Bubble) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Blaster) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
    this.checkBubbleCollisions();
  }
}

export default Game;