import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: ""}
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({username: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/game?username=${this.state.username}`);
  }


  render() {

    return (
      <div>
        <div className="blurb-div">
            
        </div>
        <div className="home-main-section">
            <div className="form-div">
            <div>
              <h2 className="blurb">Are you fast enough to shoot the bubbles?</h2>
            </div>
            <form className="username-form" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="username-input"
                  placeholder="Enter a username"
                  onChange={this.handleInput}
                  value={this.state.username}
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



            
      </div>
    )
  }

}

export default HomePage;