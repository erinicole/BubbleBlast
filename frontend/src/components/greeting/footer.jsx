import React from 'react';
import { Link } from 'react-router-dom';



class Footer extends React.Component {

  render() {
    return (
      <div className="footer">
        <footer>
          <div className="footer-person">
            <h1 className="footer-name">Erin Hill</h1>
            <div className="footer-icons">
              <a href="https://github.com/erinicole"> <img className="github-logo" src="/assets/images/github-logo.png"></img></a>
              <a href="https://www.linkedin.com/in/erinicole1988/"> <img className="github-logo" src="/assets/images/linkedin-black.png"></img></a>
            </div>
          </div>
          <div className="footer-person">
            <h1 className="footer-name">Kristina Miller</h1>
            <div className="footer-icons">
              <a href="https://github.com/kristinamiller"> <img className="github-logo" src="/assets/images/github-logo.png"></img></a>
              <a href="https://www.linkedin.com/in/kristinafmiller/"> <img className="github-logo" src="/assets/images/linkedin-black.png"></img></a>
            </div>
          </div>
          <div className="footer-person">
            <h1 className="footer-name">Phillip Ko</h1>
            <div className="footer-icons">
              <a href="https://github.com/Ko38"> <img className="github-logo" src="/assets/images/github-logo.png"></img></a>
              <a href="https://www.linkedin.com/in/phillip-ko-a14818183/"> <img className="github-logo" src="/assets/images/linkedin-black.png"></img></a>
            </div>
          </div>
          
          {/* <p><a href="https://github.com/erinicole/BubbleBlaster">Github Repo</a></p> */}
        </footer>
        
      </div>
    )
  }

}

export default Footer;


