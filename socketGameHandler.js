const Question = require("./models/Question");
const Bubble = require("./game_logic/bubble_model");
const Player = require("./game_logic/player");
const Projectile = require("./game_logic/projectile_model")
const width = require("./frontend/src/settings.js").width
const height = require("./frontend/src/settings.js").height
//socket emit  - one user
// this.io.emit - all users
const ORIGINAL_ANSWER_INDEX = "0";

function getRandomNum(min, max) {
  return Math.floor((Math.random() * (max - min) + min))
}

function getDifferenceInSeconds(date1, date2){
  if (!date1 || !date2){
    return NaN
  }
  let dif = date1.getTime() - date2.getTime()
  return Math.abs(dif/1000)
}



class SocketGameHandler {
  constructor(io) {
    this.io = io;
    this.io.on("connection", socket => {
      this.sockets.push(socket);
      this.setUpListeners(socket);
    });
    setInterval(this.update.bind(this), 100)
    this.reset();
  }

  reset() {
    this.gameRunning = false;
    this.gamePaused = false;
    this.bubbleUpdate = null;
    this.players = [];
    this.readyPlayers = [];
    this.currentIndex = 0;
    this.firstPlayerTimeEntered = null;
    this.questionStartTime = null;
    this.setUpQuestions();
    this.bubbles = [new Bubble(), new Bubble(), new Bubble(), new Bubble()];
    this.projectiles = [];
    this.answerIndex = ORIGINAL_ANSWER_INDEX;
    this.sockets = [];
  }

  setUpQuestions() {
    Question.find().then(questions => {
      this.questions = [];
      //CHANGETHIS
      for (let i = 1; i < 2; i++) {
        let levelQuestions = questions.filter(question => {
          return question.difficulty == i;
        });
        let chosenIndex = getRandomNum(0, levelQuestions.length);
        this.questions.push(levelQuestions[chosenIndex]);
      }
    });
    this.questionsAsked = 0;
  }

  getPlayerScores() {
    let scores = {};
    for (let player of this.players) {
      scores[player.username] = player.score;
    }
    return scores;
  }

  isIncluded(players, username) {
    return (
      players.filter(player => {
        return player.username === username;
      }).length > 0
    );
  }

  removeOutOfBoundsProjectile() {
    for (let i = 0; i < this.projectiles.length; i++) {
      let projectile = this.projectiles[i]
      if(projectile.pos[0] < 0 ||projectile.pos[0] > width || projectile.pos[1] < 0 ||projectile.pos[1] > height){
        this.projectiles.splice(i, 1)
      }
    }
  }

  setUpListeners(socket) {
    socket.on("chat message", msg => {
      this.io.emit("chat message", msg);
    });

    socket.on("connectGame", ({ username }) => {
      if (!this.isIncluded(this.players, username)) {
          this.players.push(new Player(username));
      }
      if(this.gameRunning) {
        socket.emit("startGame", {
          message: "start",
          players: this.players,
          error: 0
        });
        socket.on("shoot", ({ targetPos, username }) => {
          let playerPos = this.players.find(player => {
            return player.username === username;
          }).pos.slice()
          if (this.projectiles.filter((projectile) => {
            return projectile.owner === username
          }).length < 1)
            this.projectiles.push(new Projectile(playerPos, targetPos, username));
        })

        socket.on("makeMove", ({ username, move }) => {
          this.players
            .find(player => {
              return player.username === username;
            })
            .move(move);
        });
        
        socket.emit("askQuestion", {
          question: this.questions[this.currentIndex]
        });

      }


      socket.emit("connectGame", { connected: "connected", error: 0 });
      if(this.players.length === 1 && !this.gameRunning){
        this.firstPlayerTimeEntered = new Date();
      }
    });

    socket.on("startGame", ({ username }) => {
      // if (
      //   this.isIncluded(this.players, username) &&
      //   !this.isIncluded(this.readyPlayers, username)
      // ) {
      //   this.readyPlayers.push(
      //     this.players.find(player => {
      //       return player.username === username;
      //     })
      //   );
      // }

      // if (this.players.length === this.readyPlayers.length) {
      //   for (let player of this.players) {
      //     player.score = 0;
      //   }
      //   this.io.emit("startGame", {
      //     message: "start",
      //     players: this.players,
      //     error: 0
      //   });
      //   this.startGame(socket);
      // }
    });
  }

  checkBubbleCollisions() {
    for (let i = 0; i < this.bubbles.length-1; i++) {
      for (let j = i+1; j < this.bubbles.length; j++) {
        let bubble1 = this.bubbles[i]
        let bubble2 = this.bubbles[j]
        if (bubble1.isCollidedWith(bubble2)){
          bubble1.bubbleBounce(bubble2);
            // console.log(bubble1.pos, bubble2.pos)
        }
      }
    }
  }

  checkPlayerBubbleCollisions() {
    for (let player of this.players){
      for (let bubble of this.bubbles){
        if(bubble.isCollidedWith(player)){
          player.relocate()
        }
      }
    }
  }

  checkProjectileBubbleCollisions() {
    for (let j = 0; j < this.projectiles.length; j++) {
      for (let i = 0; i < this.bubbles.length; i++) {
        let shooter = this.players.find((player) => {
          return player.username === this.projectiles[j].owner;
        })
        if (this.bubbles[i].isCollidedWith(this.projectiles[j])) {
          
          if (i == this.answerIndex) {
            shooter.incrementsScore(1);
            this.nextQuestion();
          } else {
            shooter.incrementsScore(-1);
          }
          this.projectiles.splice(j, 1);
          // this.bubbles.splice(i, 1);
          return;
        }
      }
    }
  }

  askQuestion() {

    this.answerIndex = getRandomNum(0, 4);

    let temp = this.questions[this.currentIndex].choices[ORIGINAL_ANSWER_INDEX];

    this.questions[this.currentIndex].choices[ORIGINAL_ANSWER_INDEX] = this.questions[this.currentIndex].choices[this.answerIndex];
    this.questions[this.currentIndex].choices[this.answerIndex] = temp; 
    this.questionStartTime = new Date();
    this.io.emit("askQuestion", {
      question: this.questions[this.currentIndex]
    });
  }

  nextQuestion() {

    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.gamePaused = true;
      this.io.emit("gamePaused", {message: "pause", error: 0});
      setTimeout(() => {
        this.gamePaused = false;
        this.askQuestion();
      }, 3000);
    } else {
      this.io.emit("updatePlayers", {
        message: "update",
        players: this.players,
        error: 0
      });
      this.io.emit("endGame", { error: 0 });
      for(let socket of this.sockets){
        socket.removeAllListeners();
        socket.disconnect(0);
      }
      
      this.reset();
    }
  }

  update(){
    let dif = getDifferenceInSeconds(new Date(), this.firstPlayerTimeEntered);
    const startTimer = 5;
    if (dif > startTimer) {
      this.startGame();
      this.firstPlayerTimeEntered = null;
    } 

    this.io.emit("updatePlayers", {
      message: "update",
      players: this.players,
      error: 0
    });

    if (!this.gameRunning){
      this.io.emit('countdown', {
        countdownSeconds: Math.ceil(startTimer-dif),
        error: 0
      });
      return;
    }

    if(!this.gamePaused){
      let diff = getDifferenceInSeconds(new Date(), this.questionStartTime);
      const roundSeconds = 60;
      if (diff > roundSeconds) {
        this.nextQuestion();
      }
      this.io.emit('countdown', {
        countdownSeconds: Math.ceil(roundSeconds - diff),
        error: 0
      });


      for (let bubble of this.bubbles) {
        bubble.move();
      }
      for (let projectile of this.projectiles) {
        projectile.move();
      }
    }
    

    this.checkBubbleCollisions();
    this.checkPlayerBubbleCollisions();
    this.checkProjectileBubbleCollisions();
    this.removeOutOfBoundsProjectile();
    this.io.emit("updateBubblePos", {
      message: "update",
      bubbles: this.bubbles,
      error: 0
    });
    this.io.emit("updateProjectiles", {
      message: "update",
      projectiles: this.projectiles,
      error: 0
    });
    }

  startGame() {
    this.gameRunning = true;
    for (let player of this.players) {
      player.score = 0;
    }
    this.io.emit("startGame", {
      message: "start",
      players: this.players,
      error: 0
    });

    


    this.askQuestion();


    for(let socket of this.sockets){
      socket.on("shoot", ({ targetPos, username }) => {
        let playerPos = this.players.find(player => {
          return player.username === username;
        }).pos.slice()
        if (this.projectiles.filter((projectile) => {
          return projectile.owner === username
        }).length < 1)
          this.projectiles.push(new Projectile(playerPos, targetPos, username));
      })

      socket.on("makeMove", ({ username, move }) => {

        this.players
          .find(player => {
            return player.username === username;
          })
          .move(move);
      });
      
      // this.socket.on("answerQuestion", ({ choiceIndex, username }) => {
      //   if (choiceIndex === ORIGINAL_ANSWER_INDEX) {
      //     this.players
      //       .find(player => {
      //         return player.username === username;
      //       })
      //       .incrementsScore(1);

      //     this.io.emit("answerCorrect", {
      //       userWhoAnswered: username,
      //       scores: this.getPlayerScores(),
      //       error: 0
      //     });
      //     this.currentIndex++;
      //     if (this.currentIndex < this.questions.length) {
      //       this.io.emit("askQuestion", {
      //         question: this.questions[this.currentIndex],
      //         error: 0
      //       });
      //     } else {
      //       this.io.emit("endGame", { error: 0 });
      //       this.reset();
      //     }
      //   } else {
      //     this.players
      //       .find(player => {
      //         return player.username === username;
      //       })
      //       .incrementsScore(-1);
      //     this.io.emit("answerIncorrect", {
      //       userWhoAnswered: username,
      //       scores: this.getPlayerScores(),
      //       error: 0
      //     });
      //   }
      // });

      
    }
    
  }
}

module.exports = SocketGameHandler;