import React from 'react';
import GameView from '../game_view/game_view_container';
import { randomPos } from '../game_view/util';
import key from 'keymaster';


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

  setupKeyHandlers() {
    const moves = {
      w: [0, -10],
      a: [-10, 0],
      s: [0, 10],
      d: [10, 0],
    };
    
    Object.keys(moves).forEach( (k) => {
      const move = moves[k];
      key(k, () => {
        this.props.makeMove(this.username, move)
      });

    });
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
    this.props.setUpUpdatePlayersListener();
    this.props.connect(this.username);
    this.setupKeyHandlers();
  }

  componentDidUpdate() {
    // console.log(this.state.selectedOption)
    if (this.props.isOver) {
      console.log("game over")
      this.props.history.push(`/results`);
    }
  }

  startGame() {
    this.props.startGame(this.username);
    this.props.setUpAskQuestionListener();
    this.props.setUpAnswerCorrectListener();
    this.props.setUpAnswerIncorrectListener();
    this.props.setUpUpdateBubblePosListener();
    this.props.setUpUpdateProjectilesListener();
    this.props.setUpEndGameListener();
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

  shootEvent(pos){
    this.props.shoot(pos, this.username)
  }

  render() {
    let content = (
      <button onClick={this.startGame.bind(this)}>Start Game</button>
    );
    if (this.props.currentQuestion) {
      let choices = this.props.currentQuestion.choices;

      // content = (
      //   <form onSubmit={this.onSubmitChoice.bind(this)}>
      //    
      //     <p>{this.props.currentQuestion.body}</p>

      //     <input 
      //       type="radio" 
      //       name="choice" 
      //       value={choices[0].index} 
      //       onChange={(e) => this.handleOptionChange(e)} 
      //       checked={this.state.selectedOption === choices[0].index} 
      //       /> 
      //       {choices[0].choice} 
      //       <br/>

      //     <input 
      //       type="radio" 
      //       name="choice" 
      //       value={choices[1].index} 
      //       onChange={(e) => this.handleOptionChange(e)} 
      //       checked={this.state.selectedOption === choices[1].index} 
      //       /> 
      //     {choices[1].choice} 
      //     <br />

      //     <input 
      //       type="radio" 
      //       name="choice" 
      //       value={choices[2].index} 
      //       onChange={(e) => this.handleOptionChange(e)} 
      //       checked={this.state.selectedOption === choices[2].index} 
      //       /> 
      //     {choices[2].choice} <br />

      //     <input 
      //       type="radio" 
      //       name="choice" 
      //       value={choices[3].index} 
      //       onChange={(e) => this.handleOptionChange(e)} 
      //       checked={this.state.selectedOption === choices[3].index} 
      //       /> 
      //     {choices[3].choice} <br />
            

       

              
      //     <input type="submit" value="Submit"/>
      //   </form>
      // );
      if(this.props.bubbles && this.props.players ){
        let blasterPositions = [];
        let usernames = [];
        let scores = [];
        for (let key of Object.keys(this.props.players)) {
          blasterPositions.push(this.props.players[key].pos)
          usernames.push(key)
          scores.push(this.props.players[key].score)
        }
        let projectilePositions = [];
        if (this.props.projectiles){
          projectilePositions = this.props.projectiles.map((projectile) =>{
            return projectile.pos
          })
        }
        content =(

          <div className="game-div"> 
            <ul className="username-ul">
              {usernames.map((username, i) => {
                return <li className={`username${i}`}>{username} Score: {scores[i]}</li>
              })}
            </ul>
            <div>
          <h3>Level {this.props.currentQuestion.difficulty}</h3>
          <p>{this.props.currentQuestion.body}</p>
                 A. {choices[0].choice} &nbsp;
                 B. {choices[1].choice} &nbsp;
                C.  {choices[2].choice} &nbsp;
                D. {choices[3].choice}
          <GameView bubblePositions={[
            this.props.bubbles[0].pos, 
            this.props.bubbles[1].pos, 
            this.props.bubbles[2].pos, 
            this.props.bubbles[3].pos, 
            ]} blasterPositions={blasterPositions}
            shootEvent={this.shootEvent.bind(this)}
            projectilePositions={projectilePositions} />
           
            </div>
            
          </div>)
      }
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