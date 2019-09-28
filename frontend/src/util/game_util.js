import io from 'socket.io-client';

let socket = new io();

export const connect = (username) => {
  // console.log(socket.id);
  socket.emit("connectGame", { username: username, error: 0 });
};

export const startGame = (username) => {
  socket.emit('startGame', { username: username, error: 0 });
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