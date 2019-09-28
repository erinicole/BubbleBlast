import React from 'react';



class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

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

  startGame() {
    this.props.startGame(this.username);
  }

  render() {

    return (
      <div className="result-main-section">
        <button onClick={this.startGame.bind(this)}>Start Game</button>
      </div>
    )
  }

}

export default Game;