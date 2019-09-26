import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {

    return (
      <div className="header-div">
        <img className="bubble-logo" src="/assets/images/white-logos-transparent.png"></img>
      </div>
    )
  }

}

export default Greeting;