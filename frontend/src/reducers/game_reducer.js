import { RECEIVE_QUESTIONS } from "../actions/question_actions";
import { RECEIVE_CONNECT_GAME_SOCKET_MESSAGE, RECEIVE_START_GAME_SOCKET_MESSAGE } from "../actions/game_actions";

const gameReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CONNECT_GAME_SOCKET_MESSAGE:
      console.log(action);
      return newState;
    case RECEIVE_START_GAME_SOCKET_MESSAGE:
      newState.players = action.message.players;
      return newState;
    default:
      return state;
  }
};

export default gameReducer;