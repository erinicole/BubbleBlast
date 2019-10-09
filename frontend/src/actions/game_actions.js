import * as GameUtils from "../util/game_util";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const RECEIVE_CONNECT_GAME_SOCKET_MESSAGE = "RECEIVE_CONNECT_GAME_SOCKET_MESSAGE";
export const RECEIVE_START_GAME_SOCKET_MESSAGE = "RECEIVE_START_GAME_SOCKET_MESSAGE";
export const RECEIVE_QUESTION_SOCKET_MESSAGE = "RECEIVE_QUESTION_SOCKET_MESSAGE";
export const RECEIVE_ANSWER_CORRECT_SOCKET_MESSAGE = "RECEIVE_ANSWER_CORRECT_SOCKET_MESSAGE";
export const RECEIVE_ANSWER_INCORRECT_SOCKET_MESSAGE = "RECEIVE_ANSWER_INCORRECT_SOCKET_MESSAGE";

const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

const receiveAnswerIncorrectMessage = (message) => {
  return {
    type: RECEIVE_ANSWER_INCORRECT_SOCKET_MESSAGE,
    message
  };
};

const receiveAnswerCorrectMessage = (message) => {
  return {
    type: RECEIVE_ANSWER_CORRECT_SOCKET_MESSAGE,
    message
  };
};

const receiveStartGameMessage = (message) => {
  return {
    type: RECEIVE_START_GAME_SOCKET_MESSAGE,
    message
  };
};

const receiveQuestionMessage = (message) => {
  return {
    type: RECEIVE_QUESTION_SOCKET_MESSAGE,
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


export const answerQuestion = (choiceIndex, username) => {
  GameUtils.answerQuestion(choiceIndex, username);
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
    return GameUtils.setUpAskQuestionListener((message) => {
      dispatch(receiveQuestionMessage(message));
    });
  };
};

export const setUpAnswerCorrectListener = () => {
  return (dispatch) => {
    return GameUtils.setUpAnswerCorrectListener((msg) => {
      dispatch(receiveAnswerCorrectMessage(msg));
    });
  };
};

export const setUpAnswerIncorrectListener = () => {
  return (dispatch) => {
    return GameUtils.setUpAnswerIncorrectListener((msg) => {
      dispatch(receiveAnswerIncorrectMessage(msg));
    });
  };
};