const width = require("../frontend/src/settings.js").width
const height = require("../frontend/src/settings.js").height

class Player{
  constructor(username){
    this.username = username;
    this.score = 0;
    this.pos = this.randomPos();
  }

  incrementsScore(points){
    this.score += points
  }

  randomPos() {
    let posX = Math.random() * width;
    let posY = Math.random() * height;
    let pos = [posX, posY];
    return pos;
  }

  move(move) {
    let tempPos = this.pos.slice();

    this.pos[0] += move[0];

    this.pos[1] += move[1];

    if(this.pos[0] < 0 || this.pos[1] < 0 || this.pos[0] > width || this.pos[1] > height) {
      this.pos = tempPos;
    }
  }

}

module.exports = Player;
