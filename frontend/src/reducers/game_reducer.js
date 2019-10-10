import { RECEIVE_QUESTIONS } from "../actions/question_actions";
import { 
  RECEIVE_CONNECT_GAME_SOCKET_MESSAGE, 
  RECEIVE_START_GAME_SOCKET_MESSAGE, 
  RECEIVE_QUESTION_SOCKET_MESSAGE, 
  RECEIVE_ANSWER_INCORRECT_SOCKET_MESSAGE, RECEIVE_ANSWER_CORRECT_SOCKET_MESSAGE,
  RECEIVE_END_GAME_SOCKET_MESSAGE
} from "../actions/game_actions";

const questionChoices = (choices) => {
  choices = choices.map((choice, index) => {
    return { choice: choice, index: index.toString()}
  })
  let length = choices.length
  for (let i = (length - 1); i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let x = choices[i];
    choices[i] = choices[j];
    choices[j] = x;
  }
  return choices;
}


const gameReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CONNECT_GAME_SOCKET_MESSAGE:
      console.log(action);
      return newState;
    case RECEIVE_START_GAME_SOCKET_MESSAGE:
      // newState.players = action.message.players;
      newState.players = {};
      for (let i = 0; i < action.message.players.length; i++) {
        let playerName = action.message.players[i];
        newState.players[playerName] = {score: 0};
      }
      newState.isOver = false;
      return newState;
    case RECEIVE_QUESTION_SOCKET_MESSAGE:
      console.log(action.message.question);
      newState.currentQuestion = action.message.question;
      newState.currentQuestion.choices = questionChoices(newState.currentQuestion.choices)
      return newState;
    case RECEIVE_ANSWER_CORRECT_SOCKET_MESSAGE:
      newState.players = action.message.scores;
      newState.result = `${action.message.userWhoAnswered} got 1 point`;
      return newState;
    case RECEIVE_ANSWER_INCORRECT_SOCKET_MESSAGE:
      newState.players = action.message.scores;
      newState.result = `${action.message.userWhoAnswered} got -1 points`;
      return newState;
    case RECEIVE_END_GAME_SOCKET_MESSAGE:
      newState.isOver = true;
      return newState;
    default:
      return state;
  }
};

export default gameReducer;
