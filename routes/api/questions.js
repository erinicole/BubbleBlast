const express = require("express");
const router = express.Router();
const Question = require("../../models/Question");

router.get("/test", (req, res) => {
  res.json({
    msg: "Test message MERN"
  });
});

router.get("/", (req, res) => {
  console.log("Hit");
  Question.find().then(questions => {
    res.json({
      questions
    });
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  let newQuestion = new Question({
    question: req.body.question,
    choices: req.body.choices,
    answer: req.body.answer
  });

  newQuestion.save().then((question) => {
    res.send(question);
  }).catch((err) => {
    res.send(err);
  });
});

module.exports = router;