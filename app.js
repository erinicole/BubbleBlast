const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const questions = require("./routes/api/questions");
const path = require("path");
const Question = require("./models/Question");
const http = require('http').Server(app);
const io = require('socket.io')(http);
const SocketGameHandler = require('./socketGameHandler');
// const Seeder = require("./models/seeder.js");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

mongoose.connect(db, {
  useNewUrlParser: true
}).then(() => {
  console.log("Connected to mongoDB");
}).catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Hello a/A!");
});

app.use("/api/questions", questions);

const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

let socketHandler = new SocketGameHandler(io);


http.listen(port, function () {
  console.log('listening on *:' + port);
});
