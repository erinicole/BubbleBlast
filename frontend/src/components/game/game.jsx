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
    // this.startGame();
    this.props.setUpAskQuestionListener();
    this.props.setUpAnswerCorrectListener();
    this.props.setUpAnswerIncorrectListener();
    this.props.setUpUpdateBubblePosListener();
    this.props.setUpUpdateProjectilesListener();
    this.props.setUpEndGameListener();
    this.props.setUpCountdownListener();
    this.props.setUpGamePausedListener();
  }

  componentDidUpdate() {
    // console.log(this.state.selectedOption)
    if (this.props.isOver) {
      key.unbind('a');
      key.unbind('w');
      key.unbind('s');
      key.unbind('d');
      this.props.history.push(`/results`);
    }
  }

  componentWillUnmount(){
    key.unbind('a');
    key.unbind('w');
    key.unbind('s');
    key.unbind('d');
  }

  startGame() {
    this.props.startGame(this.username);
    // this.props.setUpAskQuestionListener();
    // this.props.setUpAnswerCorrectListener();
    // this.props.setUpAnswerIncorrectListener();
    // this.props.setUpUpdateBubblePosListener();
    // this.props.setUpUpdateProjectilesListener();
    // this.props.setUpEndGameListener();
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
    let logoImage = (<img className="game-bubble-logo" src="/assets/images/white-logos-transparent.png"></img>)

    let gameInstructions = (<div className="game-panel-instructions">
      <h1>Instructions</h1>
      <p>Help your starfish shoot the bubble that corresponds to the right answer to the math question!</p>
      <p>- Press keys W-A-S-D to move your starfish.</p>
      <p>- Mouse click to shoot the bubbles.</p>
    </div>)

    let points = "points"

    let usernames = [];
    if (this.props.players){
      for (let key of Object.keys(this.props.players)) {
        usernames.push(key)
      }
    }
    //initial game page with just timer
    let content = (<div>
      <div className="pregame-div">
        {logoImage}
        <p className="game-page-countdown">Game starting in {this.props.countdownSeconds} seconds</p>
        
        <ul className="username-ul">
          {usernames.map((username, i) => {
            return <li key={i} className={`username-${i}`}>{username} </li>
          })}
        </ul>
        {gameInstructions}
        <img className="bubble-background" src="/assets/images/backgroundBubbles3.png"></img>
        </div>
    </div>)

    
    
 
    if (this.props.currentQuestion) {
      let choices = this.props.currentQuestion.choices;
      if(this.props.bubbles && this.props.players ){
        let blasterPositions = [];
        let usernames = [];
        let scores = [];
        let scoreChanged = [];
        for (let key of Object.keys(this.props.players)) {
          blasterPositions.push(this.props.players[key].pos)
          usernames.push(key)
          scores.push(this.props.players[key].score);
          scoreChanged.push(this.props.players[key].scoreChanged);
        }
        let projectilePositions = [];
        if (this.props.projectiles){
          projectilePositions = this.props.projectiles.map((projectile) =>{
            return projectile.pos
          })
        }
        content =(
          //left panel with timer
          <div className="game-content-div"> 
            <div className="game-left-panel">
              {logoImage}
              <div className="game-panel-info">
                <div className="game-page-countdown">
                  <h1 className="time-left">Time Left</h1>
                  <h2 className="coundown">{this.props.countdownSeconds} </h2>
                </div>
                <ul className="username-ul">
                  {usernames.map((username, i) => {
                    if (scores[i] == 1) {points = "point"}
                    return <li key={i} className={`username-${i} username-${scoreChanged[i] ? i : "foo"}-blink`} >
                      <p className="username">{username}</p>
                      <p className="game-left-score">{scores[i]} {points}</p>
                    </li>
                    })}
                </ul>
                {gameInstructions}
              </div>
            </div>
           
            <div className="game-main-section">
              <div className="question-info">
                <div className="question-body">
                  <h3 className="level">Level {this.props.currentQuestion.difficulty}</h3>
                  <h4 className="question-box">{this.props.currentQuestion.body}</h4>
                </div>
                <ul className="question-choices">
                  <li className="choices-li">
                    <img className="choice-bubble" src="/assets/images/bubbleA.png"></img>
                    <div className="choice-body">{choices[0].choice}</div>
                  </li>
                  <li className="choices-li">
                    <img className="choice-bubble" src="/assets/images/bubbleB.png"></img>
                    <div className="choice-body">{choices[1].choice}</div>
                  </li>
                  <li className="choices-li">
                    <img className="choice-bubble" src="/assets/images/bubbleC.png"></img>
                    <div className="choice-body">{choices[2].choice}</div>
                  </li>
                  <li className="choices-li">
                    <img className="choice-bubble" src="/assets/images/bubbleD.png"></img>
                    <div className="choice-body">{choices[3].choice}</div>
                  </li>
                </ul>
              </div>
          
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
    let pauseContent;
    if (this.props.gamePaused) {
      pauseContent = (
        <div className="pause-between-levels">
          <img className="starfish-next-level" src="/assets/images/starfishNextLevel2.png"></img>
        </div>
      )
     
      
    }

    return (
      <div className="game-div">
          {content}
          {pauseContent}
      </div >
    );
  }

}

export default Game;