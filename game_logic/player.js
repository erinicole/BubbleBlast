const width = require("../frontend/src/settings.js").width
const height = require("../frontend/src/settings.js").height
const MovingObject = require("./moving_object_model")
class Player extends MovingObject{
  constructor(username) {
     super();
    this.username = username;
    this.score = 0;
    this.pos = this.randomPos();
    this.radius = 50;
    this.scoreChanged = false;
  }

  incrementsScore(points) {
    this.score += points;
    this.scoreChanged = true;
    setTimeout(() => {
      this.scoreChanged = false;
    }, 3000);
  }

  randomPos() {
    let posX = Math.random() * width;
    let posY = Math.random() * height;
    let pos = [posX, posY];
    return pos;
  }
  move(){}

  move(move) {
    let tempPos = this.pos.slice();

    this.pos[0] += move[0];

    this.pos[1] += move[1];

    if (
      this.pos[0] < 0 ||
      this.pos[1] < 0 ||
      this.pos[0] > width ||
      this.pos[1] > height
    ) {
      this.pos = tempPos;
    }
  }

  relocate() {
    this.pos = this.randomPos();
  }

}

module.exports = Player;
