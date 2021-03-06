import { RECEIVE_QUESTIONS } from "../actions/question_actions";
import merge from 'lodash/merge';

import {
  RECEIVE_CONNECT_GAME_SOCKET_MESSAGE,
  RECEIVE_START_GAME_SOCKET_MESSAGE,
  RECEIVE_QUESTION_SOCKET_MESSAGE,
  RECEIVE_ANSWER_INCORRECT_SOCKET_MESSAGE,
  RECEIVE_ANSWER_CORRECT_SOCKET_MESSAGE,
  RECEIVE_END_GAME_SOCKET_MESSAGE,
  RECEIVE_BUBBLE_POS_SOCKET_MESSAGE,
  RECEIVE_PLAYERS_SOCKET_MESSAGE,
  RECEIVE_PROJECTILES_SOCKET_MESSAGE,
  RECEIVE_COUNTDOWN_SOCKET_MESSAGE,
  RECEIVE_GAME_PAUSED_SOCKET_MESSAGE
} from "../actions/game_actions";

const questionChoices = (choices) => {
  choices = choices.map((choice, index) => {
    return { choice: choice, index: index.toString()}
  })
  // let length = choices.length
  // for (let i = (length - 1); i > 0; i--) {
  //   let j = Math.floor(Math.random() * (i + 1));
  //   let x = choices[i];
  //   choices[i] = choices[j];
  //   choices[j] = x;
  // }
  return choices;
}


const gameReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CONNECT_GAME_SOCKET_MESSAGE:
      newState.isOver = false;
      return newState;
    case RECEIVE_START_GAME_SOCKET_MESSAGE:
      // newState.players = action.message.players;
      newState = {};
      newState.players = {};
      for (let i = 0; i < action.message.players.length; i++) {
        let player = action.message.players[i];
        newState.players[player.username] = {
          score: player.score,
          pos: player.pos
        };
      }
      newState.isOver = false;
      return newState;
    case RECEIVE_QUESTION_SOCKET_MESSAGE:
      newState.gamePaused = false;
      newState.currentQuestion = action.message.question;

      newState.currentQuestion.choices = questionChoices(
        newState.currentQuestion.choices
      );
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
      let players = merge({}, newState.players);
      newState = {};
      newState.players = players;
      newState.isOver = true;
      return newState;
    case RECEIVE_BUBBLE_POS_SOCKET_MESSAGE:
      newState.bubbles = action.message.bubbles;
      return newState;
    case RECEIVE_PLAYERS_SOCKET_MESSAGE:
      newState.players = {};
      for (let i = 0; i < action.message.players.length; i++) {
        let player = action.message.players[i];
        newState.players[player.username] = {
          score: player.score,
          pos: player.pos,
          scoreChanged: player.scoreChanged
        };
      }
      return newState;
    case RECEIVE_PROJECTILES_SOCKET_MESSAGE:
      newState.projectiles = action.message.projectiles;
      return newState;
    case RECEIVE_COUNTDOWN_SOCKET_MESSAGE:
      newState.countdownSeconds = action.message.countdownSeconds;
      return newState;
    case RECEIVE_GAME_PAUSED_SOCKET_MESSAGE:
      newState.gamePaused = true;
      return newState;
    default:
      return state;
  }
};

export default gameReducer;
