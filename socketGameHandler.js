const Question = require("./models/Question");
const Bubble = require("./game_logic/bubble_model");
const Player = require("./game_logic/player")
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

  reset() {
    this.players = [];
    this.readyPlayers = [];
    this.currentIndex = 0;
    this.setUpQuestions();
    this.bubbles = [
      new Bubble(),
      new Bubble(),
      new Bubble(),
      new Bubble()
    ];
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

  getPlayerScores(){
    let scores = {}
    for(let player of this.players){
      scores[player.username] = player.score
    }
    return scores
  }

  isIncluded(players, username){
    return players.filter(player => {
      return player.username === username
    }).length > 0;
  }

  setUpListeners(socket) {
    socket.on('chat message', (msg) => {
      this.io.emit('chat message', msg);
    });

    socket.on("connectGame", ({username}) => {
      if (!this.isIncluded(this.players, username)){
        this.players.push(new Player(username));
      } 
      socket.emit("connectGame", { connected: "connected", error: 0 }); 
    });

    socket.on("startGame", ({username}) => {
      console.log(username)
      if (this.isIncluded(this.players, username) && !this.isIncluded(this.readyPlayers, username)) {
        this.readyPlayers.push(this.players.find((player) => {
          return player.username === username
        }));
      }

      if (this.players.length === this.readyPlayers.length) {
        for(let player of this.players) {
          player.score = 0;
        }
        this.io.emit("startGame", { message: "start", players: this.players.map((player) =>{
          return player.username
        }), error: 0 });
        this.startGame(socket);
      }
    });    
  }

  startGame(socket) {
    
    this.bubbleUpdate = setInterval(() => {
        for (let bubble of this.bubbles) {
          bubble.move();
        }
        this.io.emit("updateBubblePos", {
          message: "update",
          bubbles: this.bubbles,
          error: 0
        })
    }, 100)

        this.io.emit("askQuestion", {question: this.questions[this.currentIndex]})
    socket.on("answerQuestion", ({ choiceIndex, username }) => {

      if (choiceIndex === ANSWER_INDEX) {
        this.players.find((player)=>{
          return player.username === username
        }).incrementsScore(1)

        this.io.emit("answerCorrect", { 
          userWhoAnswered: username,
          scores: this.getPlayerScores(),
          error: 0
        }); 
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
          this.io.emit("askQuestion", { question: this.questions[this.currentIndex], error: 0 })
        } else {
          this.io.emit("endGame", {error: 0})
          this.reset();
        }

      } else {
        this.players.find((player)=>{
          return player.username === username
        }).incrementsScore(-1)
        this.io.emit("answerIncorrect", { 
          userWhoAnswered: username,
          scores: this.getPlayerScores(),
          error: 0 
        });
      } 
    });

  }


  }

module.exports = SocketGameHandler;