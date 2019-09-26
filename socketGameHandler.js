class SocketGameHandler {
  constructor(io){
    this.io = io;
    this.playerCount = 0;
    this.players = [];
    this.io.on('connection', (socket) => {
      this.setUpListeners(socket)
    });
  }

  setUpListeners(socket) {
    socket.on('chat message', (msg) => {
      this.io.emit('chat message', msg);
    });

    socket.on("Connect", (playerName) => {
      this.players.push(playerName);
      this.io.emit("Connect", {message: "connected", error: 0});
    });

    socket.on("Start Game", (msg) => {
      this.io.emit("Start Game", {message: "ready", error: 0});
    });
  }
}

module.exports = SocketGameHandler;