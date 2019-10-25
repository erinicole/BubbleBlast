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
      <div className="result-div">
      <header className="header">
        <GreetingContainer />
      </header>
      <div className="result-main-section">
        <div className="results">
            <div className="game-over">
              <img src="/assets/images/starfishGameOver.png"></img>
              </div>
          <ul className="username-ul">
              <li className="username-0">Username</li>
            {usernames.map((username, i) => {
              return <li key={i} className={`username-${i}`}>
                <p className="username">{username}</p>
                
                <p className="game-left-score">{scores[i]} points</p>
              </li>
            })}
          </ul>
            <a className="username-submit" href="/">Play Again!</a>
            {/* <img className="bubble-background" src="/assets/images/backgroundBubbles3.png"></img> */}
            
        </div>
        {/* <h2 className="stats">That's better than 80% of players.</h2> */}
      </div>
      </div>
    )
  }

}

export default ResultPage;