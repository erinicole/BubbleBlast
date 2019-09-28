const Question = require("./models/Question");

class SocketGameHandler {
  constructor(io){
    this.io = io;
    this.players = [];
    this.readyPlayers = [];
    this.io.on('connection', (socket) => {
      this.setUpListeners(socket);
    });
    this.setUpQuestions();
    this.currentIndex = 0;
  }

  setUpQuestions() {
    Question.find().then(questions => {
      this.questions = questions;
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
      if (this.players.includes(username) && !this.readyPlayers.includes(username)) {
        this.readyPlayers.push(username);
      }

      if (this.players.length === this.readyPlayers.length) {
        this.startGame();
        this.io.emit("startGame", { message: "start", players: this.players, error: 0 });
      }
    });

    
  }

  startGame() {
    
    this.io.emit("askQuestion", {question: this.questions[currentIndex]})
    socket.on("answerAttempt", ({ choiceIndex }) => {
      if (choiceIndex === this.questions[this.currentIndex.answer]) {

      } else {

      }
    });

  }
}

module.exports = SocketGameHandler;