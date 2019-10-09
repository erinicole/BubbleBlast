import React from 'react';



class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "0"
    };
    this.username = this.parseUserName(this.props.location.search);
    // this.setUpSocketListeners();
  }

  parseUserName(rawQueryString) {
    if (!rawQueryString) {
      return undefined;
    }
    let queryStrings = rawQueryString.substring(1).split("&");
    let entireUsernameStrings = queryStrings.filter(str => {
      return str.includes("username=");
    });
    if (entireUsernameStrings.length === 0) {
      return undefined;
    }
    let entireUsernameString = entireUsernameStrings[0];
    let usernameString = entireUsernameString.substring("username=".length);
    return usernameString;
  }


  // setUpSocketListeners() {
  //   this.socket.on('chat message', function (msg) {
  //     console.log(msg);
  //   });

  //   this.socket.on("Connect", (msg) => {
  //     console.log(msg);
  //   });

  //   this.socket.on("Start Game", (msg) => {
  //     console.log(msg);
  //   });
  // }

  componentDidMount() {
    // this.socket.emit("Connect", { username: this.username, error: 0});
    // this.socket.emit('Start Game', { username: this.username, error: 0 });
    this.props.setUpConnectGameListener();
    this.props.setUpStartGameListener();
    this.props.connect(this.username);
  }

  componentDidUpdate() {
    // console.log(this.state.selectedOption)

  }

  startGame() {
    this.props.startGame(this.username);
    this.props.setUpAskQuestionListener();
    this.props.setUpAnswerCorrectListener();
    this.props.setUpAnswerIncorrectListener();
  }

  onSubmitChoice(e) {
    e.preventDefault();
    this.props.answerQuestion(this.state.selectedOption, this.username);
  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  render() {
    let content = (
      <button onClick={this.startGame.bind(this)}>Start Game</button>
    );
    if (this.props.currentQuestion) {
      let choices = [
        <div>
          <input type="radio" name="choice" value="0" onChange={this.handleOptionChange.bind(this)} checked={this.state.selectedOption === "0"} /> {this.props.currentQuestion.choices[0]} 
        </div>,
       <div>
         <input type="radio" name="choice" value="1" onChange={this.handleOptionChange.bind(this)} checked={this.state.selectedOption === "1"} /> {this.props.currentQuestion.choices[1]}
       </div>,
        <div>
          <input type="radio" name="choice" value="2" onChange={this.handleOptionChange.bind(this)} checked={this.state.selectedOption === "2"} /> {this.props.currentQuestion.choices[2]}
        </div>,
        <div>
          <input type="radio" name="choice" value="3" onChange={this.handleOptionChange.bind(this)} checked={this.state.selectedOption === "3"} /> {this.props.currentQuestion.choices[3]}
        </div>
      ];
      for (let i = choices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = choices[i];
        choices[i] = choices[j];
        choices[j] = x;
      }

      content = (
        <form onSubmit={this.onSubmitChoice.bind(this)}>
          <p>{this.props.currentQuestion.body}</p>
         {choices}
          
        
          <input type="submit" value="Submit"/>
        </form>
      );
    }
    return (
      <div className="result-main-section">
        {content}
        {this.props.result}
      </div>
    );
  }

}

export default Game;