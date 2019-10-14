class Player{
  constructor(username){
    this.username = username;
    this.score = 0;
  }

  incrementsScore(points){
    this.score += points
  }

}

module.exports = Player;
