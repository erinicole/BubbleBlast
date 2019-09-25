const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question:{
    type: String,
    required: true
  },
  choices: {
    type: Array,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const Question = mongoose.model("questions", QuestionSchema);

module.exports = Question;