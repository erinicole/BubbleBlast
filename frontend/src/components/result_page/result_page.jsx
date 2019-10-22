import React from 'react';
import { Link } from 'react-router-dom';
import GreetingContainer from '../greeting/greeting_container';

class ResultPage extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {
    let usernames = [];
    let scores = [];
    if (this.props.players) {
      for (let key of Object.keys(this.props.players)) {
        usernames.push(key)
        scores.push(this.props.players[key].score)
      }
    }
    return (
      <div>
      <header className="test">
        <GreetingContainer />
      </header>
      <div className="result-main-section">
        <div className="game-div">
          <ul className="username-ul">
            {usernames.map((username, i) => {
              return <li key={i} className={`username${i}`}>{username} Score: {scores[i]}</li>
            })}
          </ul>
        </div>
        {/* <h2 className="stats">That's better than 80% of players.</h2> */}
      </div>
      </div>
    )
  }

}

export default ResultPage;