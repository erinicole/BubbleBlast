import { connect } from 'react-redux';
import {
  startGame,
  connectGame,
  setUpConnectGameListener,
  setUpStartGameListener,
  setUpAskQuestionListener,
  answerQuestion,
  setUpAnswerCorrectListener,
  setUpAnswerIncorrectListener,
  setUpUpdateBubblePosListener,
  makeMove,
  setUpUpdatePlayersListener,
  shoot,
  setUpUpdateProjectilesListener,
  setUpEndGameListener,
  setUpCountdownListener
} from "../../actions/game_actions";
import Game from './game';


const msp = (state, ownProps) => {
  return {
    currentQuestion: state.entities.game.currentQuestion,
    result: state.entities.game.result,
    isOver: state.entities.game.isOver,
    bubbles: state.entities.game.bubbles,
    players: state.entities.game.players,
    projectiles: state.entities.game.projectiles,
    countdownSeconds: state.entities.game.countdownSeconds
  };
};

const mdp = (dispatch) => {
  return {
    connect: username => {
      connectGame(username);
    },
    startGame: username => {
      startGame(username);
    },
    makeMove: (username, move) => {
      makeMove(username, move);
    },
    shoot: (targetPos, username) => {
      shoot(targetPos, username);
    },
    setUpConnectGameListener: () => {
      dispatch(setUpConnectGameListener());
    },
    setUpStartGameListener: () => {
      dispatch(setUpStartGameListener());
    },
    setUpAskQuestionListener: () => {
      dispatch(setUpAskQuestionListener());
    },
    answerQuestion: (choiceIndex, username) => {
      answerQuestion(choiceIndex, username);
    },
    setUpAnswerCorrectListener: () => {
      dispatch(setUpAnswerCorrectListener());
    },
    setUpAnswerIncorrectListener: () => {
      dispatch(setUpAnswerIncorrectListener());
    },
    setUpUpdateBubblePosListener: () => {
      dispatch(setUpUpdateBubblePosListener());
    },
    setUpUpdatePlayersListener: () => {
      dispatch(setUpUpdatePlayersListener());
    },
    setUpUpdateProjectilesListener: () => {
      dispatch(setUpUpdateProjectilesListener());
    },
    setUpEndGameListener: () => {
      dispatch(setUpEndGameListener());
    },
    setUpCountdownListener: () => {
      dispatch(setUpCountdownListener());
    }
  };
};

export default connect(msp, mdp)(Game);