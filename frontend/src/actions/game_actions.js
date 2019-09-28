import * as GameUtils from "../util/game_util";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const RECEIVE_CONNECT_GAME_SOCKET_MESSAGE = "RECEIVE_CONNECT_GAME_SOCKET_MESSAGE";
export const RECEIVE_START_GAME_SOCKET_MESSAGE = "RECEIVE_START_GAME_SOCKET_MESSAGE";

const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

const receiveStartGameMessage = (message) => {
  return {
    type: RECEIVE_START_GAME_SOCKET_MESSAGE,
    message
  };
};

const receiveConnectGameMessage = (message) => {
  return {
    type: RECEIVE_CONNECT_GAME_SOCKET_MESSAGE,
    message
  };
};

export const connectGame = (username) => {
  GameUtils.connect(username);
};

export const startGame = (username) => {
  GameUtils.startGame(username);
};

export const setUpConnectGameListener = () => {
  return (dispatch) => {
    return GameUtils.setUpConnectGameListener((message) => {
      dispatch(receiveConnectGameMessage(message));
    });
  }
};

export const setUpStartGameListener = () => {
  return (dispatch) => {
    return GameUtils.setUpStartGameListener((message) => {
      dispatch(receiveStartGameMessage(message));
    });
  }
};

export const setUpAskQuestionListener = () => {
  return (dispatch) => {

  };
};