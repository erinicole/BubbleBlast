//3lMoJkYsek2V0YLo
//mongodb+srv://admin:<password>@mern-y4sgb.mongodb.net/test?retryWrites=true&w=majority

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const questions = require("./routes/api/questions");
const path = require("path");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

//L


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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
