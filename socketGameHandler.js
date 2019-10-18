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



class SocketGameHandler {
  constructor(io) {
    this.io = io;
    this.io.on("connection", socket => {
      this.setUpListeners(socket);
    });

    this.reset();
  }

  reset() {
    this.players = [];
    this.readyPlayers = [];
    this.currentIndex = 0;
    this.setUpQuestions();
    this.bubbles = [new Bubble(), new Bubble(), new Bubble(), new Bubble()];
    this.projectiles = [];
    this.answerIndex = ORIGINAL_ANSWER_INDEX;
  }

  setUpQuestions() {
    Question.find().then(questions => {
      this.questions = [];
      for (let i = 1; i < 11; i++) {
        let levelQuestions = questions.filter(question => {
          return question.difficulty == i;
        });
        let chosenIndex = getRandomNum(0, levelQuestions.length);
        this.questions.push(levelQuestions[chosenIndex]);
      }
    });
    this.questionsAsked = 0;
    let a = 1
    this.method(a); //pass by reference
    console.log(a); //2


  }

  method(num){
    a = 2
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
      socket.emit("connectGame", { connected: "connected", error: 0 });
    });

    socket.on("startGame", ({ username }) => {
      if (
        this.isIncluded(this.players, username) &&
        !this.isIncluded(this.readyPlayers, username)
      ) {
        this.readyPlayers.push(
          this.players.find(player => {
            return player.username === username;
          })
        );
      }

      if (this.players.length === this.readyPlayers.length) {
        for (let player of this.players) {
          player.score = 0;
        }
        this.io.emit("startGame", {
          message: "start",
          players: this.players,
          error: 0
        });
        this.startGame(socket);
      }
    });
  }

  checkBubbleCollisions() {
    for (let i = 0; i < this.bubbles.length-1; i++) {
      for (let j = i+1; j < this.bubbles.length; j++) {
        let bubble1 = this.bubbles[i]
        let bubble2 = this.bubbles[j]
        if (bubble1.isCollidedWith(bubble2)){
          bubble1.bubbleBounce(bubble2)
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
    for (let projectile of this.projectiles) {
      for (let bubble of this.bubbles) {
        if (bubble.isCollidedWith(projectile)) {
          
        }
      }
    }
  }

  askQuestion() {

    this.answerIndex = getRandomNum(0, 4);

    let temp = this.questions[ORIGINAL_ANSWER_INDEX];

    this.questions[ORIGINAL_ANSWER_INDEX] = this.questions[this.answerIndex];
    this.questions[this.answerIndex] = temp; 

    this.io.emit("askQuestion", {
      question: this.questions[this.currentIndex]
    });
  }

  startGame(socket) {
    this.bubbleUpdate = setInterval(() => {
      for (let bubble of this.bubbles) {
        bubble.move();
      }
      for (let projectile of this.projectiles) {
        projectile.move()
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
      this.io.emit("updatePlayers", {
        message: "update",
        players: this.players,
        error: 0
      });
      this.io.emit("updateProjectiles", {
        message: "update",
        projectiles: this.projectiles,
        error: 0
      });
    }, 100);

    socket.on("shoot", ({targetPos, username}) => {
      let playerPos = this.players.find(player => {
        return player.username === username;
      }).pos.slice()
      if (this.projectiles.filter( (projectile) => {
          return projectile.owner === username
      }).length < 1 )
        this.projectiles.push(new Projectile(playerPos, targetPos, username));
    }) 


    this.askQuestion();


  


    socket.on("answerQuestion", ({ choiceIndex, username }) => {
      if (choiceIndex === ORIGINAL_ANSWER_INDEX) {
        this.players
          .find(player => {
            return player.username === username;
          })
          .incrementsScore(1);

        this.io.emit("answerCorrect", {
          userWhoAnswered: username,
          scores: this.getPlayerScores(),
          error: 0
        });
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
          this.io.emit("askQuestion", {
            question: this.questions[this.currentIndex],
            error: 0
          });
        } else {
          this.io.emit("endGame", { error: 0 });
          this.reset();
        }
      } else {
        this.players
          .find(player => {
            return player.username === username;
          })
          .incrementsScore(-1);
        this.io.emit("answerIncorrect", {
          userWhoAnswered: username,
          scores: this.getPlayerScores(),
          error: 0
        });
      }
    });

    socket.on("makeMove", ({ username, move }) => {
      this.players
        .find(player => {
          return player.username === username;
        })
        .move(move);
    });
  }
}

module.exports = SocketGameHandler;