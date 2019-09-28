import { connect } from 'react-redux';
import { startGame, connectGame, setUpConnectGameListener, setUpStartGameListener, setUpAskQuestionListener } from "../../actions/game_actions";
import Game from './game';


const msp = (state, ownProps) => ({

});

const mdp = (dispatch) => {
  return {
    connect: (username) => { connectGame(username); },
    startGame: (username) => { startGame(username); },
    setUpConnectGameListener: () => { dispatch(setUpConnectGameListener()); },
    setUpStartGameListener: () => { dispatch(setUpStartGameListener()); },
    setUpAskQuestionListener: () => { dispatch(setUpAskQuestionListener()); },
  };
};

export default connect(msp, mdp)(Game);