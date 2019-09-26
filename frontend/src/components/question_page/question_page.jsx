import React from 'react';
// import { Link } from 'react-router-dom';

class QuestionPage extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {

    return (
      
        <div class="question-main-section">
          <div class="question-div">963 - 643 = ___?</div>
          <div>
            <ul class="answers-ul">
              <li class="answers-li">
                <div class="answer-icon">A</div>
                <div class="answer-body">420</div>
              </li>
              <li class="answers-li">
                <div class="answer-icon">B</div>
                <div class="answer-body">320</div>
              </li>
              <li class="answers-li">
                <div class="answer-icon">C</div>
                <div class="answer-body">329</div>
              </li>
              <li class="answers-li">
                <div class="answer-icon">D</div>
                <div class="answer-body">310</div>
              </li>

            </ul>
          </div>
      </div>
    )
  }

}

export default QuestionPage;