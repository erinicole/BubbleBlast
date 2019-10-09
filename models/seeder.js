const Question = require('./Question'); 


function getRandomNum(min, max) {
  return Math.floor((Math.random() * (max - min) + min))
}

function getRandomDecimal(min, max) {
  return (Math.random() * (max - min) + min)
}


function makeAdditionQuestion(min, max, level) {
  let num1 = getRandomNum(min, max);
  let num2 = getRandomNum(min, max);
  let rightAnswer = num1 + num2;

  let answers = [rightAnswer];
  let wrongAnswer = "";
  while (answers.length < 4) {
    wrongAnswer = getRandomNum(rightAnswer - min * 3, rightAnswer + min * 3);
    if (!answers.includes(wrongAnswer)) {
      answers.push(wrongAnswer)
    }
  }
  return {
    choices: answers,
    body: `${num1} + ${num2} = ?`,
    difficulty: level
  }
}

function makeSubtractionQuestion(min, max, level) {
  let num1 = getRandomNum(min, max);
  let num2 = getRandomNum(min, max);
  let rightAnswer = num1 - num2;

  let answers = [rightAnswer];
  let wrongAnswer = "";
  while (answers.length < 4) {
    wrongAnswer = getRandomNum(rightAnswer - min * 3, rightAnswer + min * 3);
    if (!answers.includes(wrongAnswer)) {
      answers.push(wrongAnswer)
    }
  }
  return {
    choices: answers,
    body: `${num1} - ${num2} = ?`,
    difficulty: level
  }
}

function makeMultiplicationQuestion(min, max, level) {
  let num1 = getRandomNum(min, min + 10);
  let num2 = getRandomNum(min, max);
  let rightAnswer = num1 * num2;

  let answers = [rightAnswer];
  let wrongAnswer = "";
  while (answers.length < 4) {
    wrongAnswer = getRandomNum(rightAnswer - min * 3, rightAnswer + min * 3);
    if (!answers.includes(wrongAnswer)) {
      answers.push(wrongAnswer)
    }
  }
  return {
    choices: answers,
    body: `${num1} * ${num2} = ?`,
    difficulty: level
  }
}

function generateAllQuestions(numPerLevel) {
  let questions = []
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeAdditionQuestion(2, 20, 1))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeSubtractionQuestion(2, 20, 2))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeMultiplicationQuestion(2, 10, 3))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeAdditionQuestion(20, 100, 4))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeSubtractionQuestion(20, 100, 5))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeMultiplicationQuestion(10, 20, 6))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeAdditionQuestion(100, 1000, 7))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeSubtractionQuestion(100, 200, 8))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeMultiplicationQuestion(10, 30, 9))
  }
  for (let i = 0; i < numPerLevel; i++) {
    questions.push(makeMultiplicationQuestion(30, 50, 10))
  }
  return questions;
}

let questions = generateAllQuestions(10);

Question.collection.deleteMany({});

questions.forEach(({ choices, body, difficulty}) => {
  let questionModel = new Question();
  questionModel.body = body;
  questionModel.choices = choices;
  questionModel.difficulty = difficulty;
  questionModel.save();
})