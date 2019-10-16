import io from 'socket.io-client';

let socket = new io();

export const connect = (username) => {
  // console.log(socket.id);
  socket.emit("connectGame", { username: username, error: 0 });
};

export const startGame = (username) => {
  socket.emit('startGame', { username: username, error: 0 });
};

export const makeMove = (username, move) => {
  socket.emit('makeMove', { username: username, move: move, error: 0 });
};

export const answerQuestion = (choiceIndex, username) => {
  socket.emit('answerQuestion', { choiceIndex: choiceIndex, username: username, error: 0 });  
};

export const shoot = (targetPos, username) => {
  socket.emit("shoot", { targetPos: targetPos, username: username, error: 0 });  
};

export const setUpConnectGameListener = (cb) => {
  socket.on("connectGame", (msg) => {
    cb(msg);
  });
};

export const setUpStartGameListener = (cb) => {
  socket.on("startGame", (msg) => {
    cb(msg);
  });
};

export const setUpAskQuestionListener = (cb) => {
  socket.on("askQuestion", (msg) => {
    cb(msg);
  });
};

export const setUpAnswerCorrectListener = (cb) => {
  socket.on("answerCorrect", (msg) => {
    cb(msg);
  });
};

export const setUpAnswerIncorrectListener = (cb) => {
  socket.on("answerIncorrect", (msg) => {
    cb(msg);
  });
};

export const setUpEndGameListener = (cb) => {
  socket.on("endGame", (msg) => {
    cb(msg);
  });
};


export const setUpUpdateBubblePosListener = (cb) => {
  socket.on("updateBubblePos", (msg) => {
    cb(msg);
  });
};

export const setUpUpdatePlayersListener = (cb) => {
  socket.on("updatePlayers", (msg) => {
    cb(msg);
  });
};

export const setUpUpdateProjectilesListener = (cb) => {
  socket.on("updateProjectiles", msg => {
    cb(msg);
  });
};



