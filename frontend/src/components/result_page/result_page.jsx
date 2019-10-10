import React from 'react';
import { Link } from 'react-router-dom';

class ResultPage extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {

    return (
      <div className="result-main-section">
        <h1 className="score">{this.props.players}</h1>
        <h2 className="stats">That's better than 80% of players.</h2>
      </div>
    )
  }

}

export default ResultPage;