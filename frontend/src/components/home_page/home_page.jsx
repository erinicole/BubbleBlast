import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

  }



  render() {

  

    return (
      <div>
        <div className="blurb-div">
            <div>
              <h2 className="blurb">Are you fast enough to shoot the bubbles?</h2>
            </div>
        </div>
        <div className="home-main-section">
            <div className="form-div">
              <form className="username-form">
                <input
                  type="text"
                  className="username-input"
                  placeholder="Enter a username"
                ></input>
                <input
                  type="submit"
                  value="Start Playing"
                  className="username-submit"
              ></input>
              </form>
            </div>
            <div className="leaderboard-div">
              <h1 className="leaderboard-heading">High Scores</h1>
                <ul className="leaderboard-ul">
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Name</div>
                    <div className="leaderboard-score">Score</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                  <li className="leaderboard-li">
                    <div className="leaderboard-name">Kristina</div>
                    <div className="leaderboard-score">100</div>
                  </li>
                </ul>
      
        </div>

            </div>



            <footer>
              <p><a href="https://github.com/erinicole/BubbleBlaster">Github Repo</a></p>
            </footer>
      </div>
    )
  }

}

export default HomePage;