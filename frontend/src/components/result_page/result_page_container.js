import { connect } from 'react-redux';
import ResultPage from './result_page';


const msp = (state, ownProps) => ({
  players: state.entities.game.players
});

const mdp = (dispatch) => ({

});

export default connect(msp, mdp)(ResultPage)