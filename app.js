//3lMoJkYsek2V0YLo
//mongodb+srv://admin:<password>@mern-y4sgb.mongodb.net/test?retryWrites=true&w=majority

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

mongoose.connect(db, {
  useNewUrlParser: true
}).then((test) => {
  console.log("Connected to mongoDB");
  console.log(test);
}).catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {

  res.send("Hello a/A!");
});

app.use("/api/users", users);
app.use("/api/tweets", tweets );

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

