import { RECEIVE_QUESTIONS } from "../actions/question_actions";
import { RECEIVE_CONNECT_GAME_SOCKET_MESSAGE, RECEIVE_START_GAME_SOCKET_MESSAGE
  , RECEIVE_QUESTION_SOCKET_MESSAGE, RECEIVE_ANSWER_INCORRECT_SOCKET_MESSAGE
  , RECEIVE_ANSWER_CORRECT_SOCKET_MESSAGE } from "../actions/game_actions";

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
      return newState;
    case RECEIVE_QUESTION_SOCKET_MESSAGE:
      newState.currentQuestion = action.message.question;
      return newState;
    case RECEIVE_ANSWER_CORRECT_SOCKET_MESSAGE:
      newState.players = action.message.scores;
      newState.result = `${action.message.userWhoAnswered} got 1 point`;
      return newState;
    case RECEIVE_ANSWER_INCORRECT_SOCKET_MESSAGE:
      newState.players = action.message.scores;
      newState.result = `${action.message.userWhoAnswered} got -1 points`;
      return newState;
    default:
      return state;
  }
};

export default gameReducer;
