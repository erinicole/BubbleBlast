import { connect } from 'react-redux';
import { startGame, connectGame, setUpConnectGameListener, setUpStartGameListener, 
  setUpAskQuestionListener, answerQuestion, setUpAnswerCorrectListener, setUpAnswerIncorrectListener } from "../../actions/game_actions";
import Game from './game';


const msp = (state, ownProps) => {
  return {
    currentQuestion: state.entities.game.currentQuestion,
    result: state.entities.game.result
  };
};

const mdp = (dispatch) => {
  return {
    connect: (username) => { connectGame(username); },
    startGame: (username) => { startGame(username); },
    setUpConnectGameListener: () => { dispatch(setUpConnectGameListener()); },
    setUpStartGameListener: () => { dispatch(setUpStartGameListener()); },
    setUpAskQuestionListener: () => { dispatch(setUpAskQuestionListener()); },
    answerQuestion: (choiceIndex, username) => { answerQuestion(choiceIndex, username); },
    setUpAnswerCorrectListener: () => { dispatch(setUpAnswerCorrectListener());},
    setUpAnswerIncorrectListener: () => { dispatch(setUpAnswerIncorrectListener()); }
  };
};

export default connect(msp, mdp)(Game);