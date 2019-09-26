import React from 'react';
import io from 'socket.io-client';

class ResultPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.socket = new io();
    this.setUpSocketListeners();
    
  }

  setUpSocketListeners() {
    this.socket.on('chat message', function (msg) {
      console.log(msg);
    });

    this.socket.on("Connect", (msg) => {
      console.log(msg);
    });

    this.socket.on("Start Game", (msg) => {
      console.log(msg);
    });
  }

  componentDidMount() {
    this.socket.emit("Connect", "username");
    this.socket.emit('Start Game', "username");
  }

  send() {
    this.socket.emit('chat message', "Hello World");
  }

  render() {

    return (
      <div className="result-main-section">
        Hello Blasterss
        <button onClick={this.send.bind(this)}>Send</button>
      </div>
    )
  }

}

export default ResultPage;