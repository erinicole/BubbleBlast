import { connect } from 'react-redux';
import { startGame, connectGame, setUpConnectGameListener, setUpStartGameListener, 
  setUpAskQuestionListener, answerQuestion, setUpAnswerCorrectListener, setUpAnswerIncorrectListener, setUpUpdateBubblePosListener } from "../../actions/game_actions";
import Game from './game';


const msp = (state, ownProps) => {
  return {
    currentQuestion: state.entities.game.currentQuestion,
    result: state.entities.game.result,
    isOver: state.entities.game.isOver,
    bubbles: state.entities.game.bubbles
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
    setUpAnswerIncorrectListener: () => { dispatch(setUpAnswerIncorrectListener()); },
    setUpUpdateBubblePosListener: () => {
      dispatch(setUpUpdateBubblePosListener()
    )}
  };
};

export default connect(msp, mdp)(Game);