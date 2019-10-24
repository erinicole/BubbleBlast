import React from 'react';
import { Link } from 'react-router-dom';
import GreetingContainer from '../greeting/greeting_container';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: "", errorMessage: ""}
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({username: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username) {
      this.props.history.push(`/game?username=${this.state.username}`);
    } else {
      this.setState({errorMessage: "Please enter a valid username"})
    }
    
  }


  render() {

    return (
      <div>
        <header className="">
          <GreetingContainer />
        </header>
        <div className="blurb-div">
            
        </div>
        <div className="home-main-section">
            <div className="form-div">
            {/* <div>
              <h2 className="blurb">Are you fast enough to shoot the bubbles?</h2>
            </div> */}
              <form className="username-form" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="username-input"
                  placeholder="Enter a username"
                  onChange={this.handleInput}
                  value={this.state.username}
                ></input>
              <span>{this.state.errorMessage}</span>
                <input
                  type="submit"
                  value="Start Playing"
                  className="username-submit"
                ></input>
              </form>
            </div>
            <img className="bubble-background" src="/assets/images/backgroundBubbles3.png"></img>



        

            </div>



            
      </div>
    )
  }

}

export default HomePage;