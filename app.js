//3lMoJkYsek2V0YLo
//mongodb+srv://admin:<password>@mern-y4sgb.mongodb.net/test?retryWrites=true&w=majority

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello a/A!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

