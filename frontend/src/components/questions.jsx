import React from "react";
import io from 'socket.io-client';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chatMessage: "",
      messages: ""
    };
    this.socket = io();
  }

  componentDidMount() {
    this.props.fetchQuestions();
    
    // $('form').submit(function () {
    //   socket.emit('chat message', $('#m').val());
    //   $('#m').val('');
    //   return false;
    // });
    this.socket.on('chat message', function (msg) {
      console.log(msg);
      // this.setState({
      //   messages: this.state.messages + msg
      // });
      // $('#messages').append($('<li>').text(msg));
    });
  }

  onInputChange(e) {
    this.setState({
      chatMessage: e.target.value
    });
  }

  onSend(e) {
    e.preventDefault();
    this.socket.emit('chat message', this.state.chatMessage);
  }

  render(){
    let body = [];
    if (this.props.questions) {
      console.log(this.props.questions);
    }
    
    return (
      <div>
        <ul id="messages">
          {this.state.messages}
        </ul>
        <form onClick={this.onSend.bind(this)}>
          <input id="m"  onChange={this.onInputChange.bind(this)} value={this.state.chatMessage}/>
          <button>Send</button>
        </form>

      </div>
    );
  }
}

export default Question;