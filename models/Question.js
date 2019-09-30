const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  body:{
    type: String,
    required: true
  },
  choices: {
    type: Array,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  }
});

const Question = mongoose.model("questions", QuestionSchema);

module.exports = Question;