import { combineReducers } from 'redux';
import questionsReducer from "./questions_reducer";
import gameReducer from "./game_reducer";

export default combineReducers({
  questions: questionsReducer,
  game: gameReducer
});