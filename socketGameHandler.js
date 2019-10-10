const Question = require("./models/Question");

//socket emit  - one user
// this.io.emit - all users
const ANSWER_INDEX = "0";

function getRandomNum(min, max) {
  return Math.floor((Math.random() * (max - min) + min))
}


class SocketGameHandler {
  constructor(io){
    this.io = io;
    this.io.on('connection', (socket) => {
      this.setUpListeners(socket);
    });
    
    this.reset();
  }

 

  setUpQuestions() {
    Question.find().then(questions => {
      this.questions = [];
      for (let i = 1; i < 11; i++) {
        let levelQuestions = questions.filter((question) => {
          return question.difficulty == i;
        });
        let chosenIndex = getRandomNum(0, levelQuestions.length);
        this.questions.push(levelQuestions[chosenIndex]);
      }
    });
    this.questionsAsked = 0;
  }

  setUpListeners(socket) {
    socket.on('chat message', (msg) => {
      this.io.emit('chat message', msg);
    });

    socket.on("connectGame", ({username}) => {
      if (!this.players.includes(username)){
        this.players.push(username);
      } 
      socket.emit("connectGame", { connected: "connected", error: 0 }); 
    });

    socket.on("startGame", ({username}) => {
      console.log(username)
      if (this.players.includes(username) && !this.readyPlayers.includes(username)) {
        this.readyPlayers.push(username);
      }

      if (this.players.length === this.readyPlayers.length) {
        this.startGame(socket);
        for(let player of this.players) {
          this.playerScores[player] = 0;
        }
        this.io.emit("startGame", { message: "start", players: this.players, error: 0 });
      }
    });    
  }


  reset() {
    this.players = [];
    this.readyPlayers = [];
    this.playerScores = {};
    this.currentIndex = 0;
    this.setUpQuestions();
  }

  startGame(socket) {
    this.io.emit("askQuestion", {question: this.questions[this.currentIndex]})
    socket.on("answerQuestion", ({ choiceIndex, username }) => {

      if (choiceIndex === ANSWER_INDEX) {
        this.playerScores[username]++;

        this.io.emit("answerCorrect", { 
          userWhoAnswered: username,
          scores: this.playerScores, error: 0
        }); 
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
          this.io.emit("askQuestion", { question: this.questions[this.currentIndex], error: 0 })
        } else {
          this.io.emit("endGame", {error: 0})
          this.reset();
        }
        
      } else {
        this.playerScores[username]--;
        this.io.emit("answerIncorrect", { 
          userWhoAnswered: username,
          scores: this.playerScores, error: 0 
        });
      } 
    });

  }
}

module.exports = SocketGameHandler;