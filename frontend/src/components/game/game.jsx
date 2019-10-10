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
    if (this.props.isOver) {
      this.props.history.push(`/results`)
    }
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
      let choices = this.props.currentQuestion.choices;
      console.log(this.state.selectedOption)

      content = (
        <form onSubmit={this.onSubmitChoice.bind(this)}>
          <h3>Level {this.props.currentQuestion.difficulty}</h3>
          <p>{this.props.currentQuestion.body}</p>

          <input 
            type="radio" 
            name="choice" 
            value={choices[0].index} 
            onChange={(e) => this.handleOptionChange(e)} 
            checked={this.state.selectedOption === choices[0].index} 
            /> 
            {choices[0].choice} 
            <br/>

          <input 
            type="radio" 
            name="choice" 
            value={choices[1].index} 
            onChange={(e) => this.handleOptionChange(e)} 
            checked={this.state.selectedOption === choices[1].index} 
            /> 
          {choices[1].choice} 
          <br />

          <input 
            type="radio" 
            name="choice" 
            value={choices[2].index} 
            onChange={(e) => this.handleOptionChange(e)} 
            checked={this.state.selectedOption === choices[2].index} 
            /> 
          {choices[2].choice} <br />

          <input 
            type="radio" 
            name="choice" 
            value={choices[3].index} 
            onChange={(e) => this.handleOptionChange(e)} 
            checked={this.state.selectedOption === choices[3].index} 
            /> 
          {choices[3].choice} <br />
            

       

              
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