import React from 'react';
import { Link } from 'react-router-dom';



class Footer extends React.Component {

  render() {
    return (
      <div className="footer">
        <footer>
          <div>
            <Link to="/">Home Page</Link>
          </div>
          <div>
            <Link to="/question">Question Page</Link>
          </div>
          <div>
            <Link to="/results">Result Page</Link>
          </div>
          <div>
            <Link to="/game">Game Page</Link>
          </div>
          {/* <p><a href="https://github.com/erinicole/BubbleBlaster">Github</a></p> */}
        </footer>
        
      </div>
    )
  }

}

export default Footer;


