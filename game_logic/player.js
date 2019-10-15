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

}

module.exports = Player;
